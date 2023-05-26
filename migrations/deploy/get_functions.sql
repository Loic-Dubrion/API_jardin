-- Deploy connectedGarden:get_functions to pg

BEGIN;

CREATE FUNCTION "get_all_users"()
    RETURNS TABLE (
        "username" TEXT,
        "email" TEXT,
        "id_role" INT,
        "total_plots" BIGINT
    )
AS $$
    SELECT
        "user"."username",
        "user"."email",
        "user"."id_role",
        COUNT("plot") AS "total_plots"
    FROM "user"
    JOIN "plot" ON "user"."id" = "plot"."id_user"
    GROUP BY "user"."id";
$$
LANGUAGE SQL STABLE;

-- For the user profil
CREATE FUNCTION "get_user_details"("user_id" INT)
    RETURNS TABLE (
        "username" TEXT,
        "email" TEXT,
        "id_role" INT,
        "total_plots" BIGINT
    )
AS $$
    SELECT
        "user"."username",
        "user"."email",
        "user"."id_role",
        COUNT("plot") AS "total_plots"
    FROM "user"
    JOIN "plot" ON "user"."id" = "plot"."id_user"
    WHERE "user"."id" = "user_id"
    GROUP BY "user"."id";
$$
LANGUAGE SQL STABLE;

-- For detail culture, plot, plant with conditions
CREATE OR REPLACE FUNCTION "get_production_by_user"(
    "user_id" INT,
    "is_harvesting_null" BOOLEAN,
    "_plot_id" INT DEFAULT NULL,
    "_culture_id" INT DEFAULT NULL)
RETURNS TABLE (
    "username" TEXT,
    "plot_id" integer,
    "name" TEXT,
    "availability" BOOLEAN,
    "family_id" INT,
    "family_name" TEXT,
    "variety" TEXT,
    "category" TEXT,
    "sowing" TIMESTAMPTZ,
    "planting" TIMESTAMPTZ,
    "harvesting" TIMESTAMPTZ,
    "comment" TEXT
)
AS $$
SELECT
    "user"."username",
    "plot"."id" AS "plot_id",
    "plot"."name" AS "name",
    "plot"."availability",
    "family"."id" AS "family_id",
    "family"."name" AS "family",
    "plant"."name" AS "variety",
    "category"."name" AS "category",
    "culture"."sowing" AS "sowing",
    "culture"."planting" AS "planting",
    "culture"."harvesting" AS "harvesting",
    "culture"."comment" AS "comment"
FROM
    "plot"
JOIN
    "user" ON "user"."id" = "plot"."id_user"
JOIN
    "culture" ON "culture"."id_plot" = "plot"."id"
JOIN
    "plant" ON "plant"."id" = "culture"."id_plant"
JOIN
    "family" ON "family"."id" = "plant"."id_family"
JOIN
    "category" ON "category"."id" = "plant"."id_category"
WHERE
    "plot"."id_user" = user_id
    AND (
        "is_harvesting_null" = TRUE AND "culture"."harvesting" IS NULL
        OR "is_harvesting_null" = FALSE AND "culture"."harvesting" IS NOT NULL
    )
    AND ("plot"."id" = _plot_id OR _plot_id IS NULL)
    AND ("culture"."id" = _culture_id OR _culture_id IS NULL);
$$
LANGUAGE SQL STABLE;

-- plant detail
CREATE FUNCTION "get_plant_detail"("_plant_id" INTEGER)
    RETURNS TABLE (
        "name" TEXT,
        "specification" TEXT[],
        "culture_advice" TEXT[],
        "category" TEXT,
        "family" TEXT,
        "alliances" TEXT[]
    )
AS $$
    SELECT
        "plant"."name",
        "plant"."specification",
        "plant"."culture_advice",
        "category"."name" AS "category",
        "family"."name" AS "family",
        "plant_alliances"."alliances"
    FROM "plant"
    JOIN "category" ON "category"."id" = "plant"."id_category"
    LEFT JOIN "family" ON "family"."id" = "plant"."id_family"
    LEFT JOIN (
        SELECT
            "plant"."id" AS "plant_id",
            ARRAY_AGG("alliance_family"."name") AS "alliances"
        FROM "plant"
        LEFT JOIN "family" ON "family"."id" = "plant"."id_family"
        LEFT JOIN "alliance" ON "alliance"."id" = "family"."id_alliance"
        LEFT JOIN "family" AS "alliance_family" ON "alliance_family"."id" = ANY("alliance"."alliance")
        GROUP BY "plant"."id"
    ) AS "plant_alliances" ON "plant_alliances"."plant_id" = "plant"."id"
    WHERE "plant"."id" = "_plant_id"
$$
LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION "get_last_cultures"(_plot_id INTEGER)
RETURNS TABLE (
    "plot_name" TEXT,
    "three_last_culture" TEXT[]
) AS $$
    SELECT
        "plot"."name" AS "plot_name",
        ARRAY_AGG("category"."name" || ', ' || "family"."name" || ', ' || "culture"."harvesting"::TEXT) AS "three_last_culture"
    FROM "plot"
    JOIN "culture" ON "plot"."id" = "culture"."id_plot"
    JOIN "plant" ON "plant"."id" = "culture"."id_plant"
    JOIN "family" ON "family"."id" = "plant"."id_family"
    JOIN "category" ON "category"."id" = "plant"."id_category"
    WHERE "plot"."id" = "_plot_id"
    AND "culture"."harvesting" IS NOT NULL
    GROUP BY "plot"."name"
    ORDER BY ABS(EXTRACT(DAY FROM (NOW() - MIN("culture"."harvesting"))))
    LIMIT 3;
$$
LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION "get_alliance"("family_id" INTEGER)
RETURNS TABLE (
    "alliance" INT[],
    "family_names" TEXT[]
) AS $$
    SELECT
        "alliance"."alliance",
        ARRAY(
            SELECT "family"."name"
            FROM UNNEST("alliance"."alliance") AS "temporary_table"("id")
            JOIN "family" ON "family"."id" = "temporary_table"."id"
        ) AS "family_names"
    FROM "alliance"
    WHERE "family_id" = ANY ("alliance"."alliance");
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION "get_alliances_and_families"()
RETURNS TABLE(
  family_id INT,
  family_name TEXT,
  alliance_id INT,
  alliance_ids INT[],
  alliance_families TEXT[]
) AS $$
DECLARE
  _id INT;
  _family_id INT;
  _family_name TEXT;
  _alliance_id INT;
  _alliance_ids INT[];
  _alliance_families TEXT[];
BEGIN
  FOR _family_id, _family_name, _alliance_id, _alliance_ids IN
    SELECT "family"."id", "family"."name", "alliance"."id", "alliance"."alliance"
    FROM "family"
    JOIN "alliance" ON "family"."id_alliance" = "alliance"."id"
  LOOP
    _alliance_families := '{}';
    FOREACH _id IN ARRAY _alliance_ids
    LOOP
      _alliance_families := _alliance_families || (SELECT ARRAY["name"] FROM "family" WHERE "id" = _id);
    END LOOP;
    RETURN QUERY SELECT _family_id, _family_name, _alliance_id, _alliance_ids, _alliance_families;
  END LOOP;
END;
$$ LANGUAGE plpgsql STABLE;

COMMIT;
