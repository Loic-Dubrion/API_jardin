-- Deploy connectedGarden:put_functions to pg

BEGIN;

CREATE OR REPLACE FUNCTION "update_category"("_data" JSON, "_id" INT)
RETURNS TABLE (
    "name" TEXT
) AS $$
    WITH "updated" AS (
        UPDATE "category" SET
        "name" = COALESCE(("_data" ->> 'name')::TEXT, "name")
        WHERE "id" = _id
        RETURNING *
    )
    SELECT "name" FROM "updated";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION "update_family"("_data" JSON, "_id" INT)
RETURNS TABLE (
    "name" TEXT,
    "id_alliance" INT
) AS $$
    WITH "updated" AS (
        UPDATE "family" SET
        "name" = COALESCE(("_data" ->> 'name')::TEXT, "name"),
        "id_alliance" = COALESCE(("_data" ->> 'id_alliance')::INT, "id_alliance")
        WHERE "id" = _id
        RETURNING *
    )
    SELECT "name", "id_alliance" FROM "updated";
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION "update_alliance"("_data" JSON, "_id" INT)
RETURNS TABLE (
    "alliance" TEXT[]
) AS $$
    WITH "updated" AS (
        UPDATE "alliance" SET
        "alliance" = COALESCE(ARRAY(SELECT json_array_elements_text(("_data"->'alliance'))::INT), "alliance")
        WHERE "id" = "_id"
        RETURNING *
    )
    SELECT ARRAY(
        SELECT "family"."name"
        FROM "family"
        WHERE "family"."id" = ANY((SELECT "alliance" FROM "updated")::INT[])
    ) AS "alliance";
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION "update_user"("_data" json, "_id" INT)
RETURNS TABLE (
    "username" TEXT,
    "email" TEXT,
    "id_role" INT,
    "role" TEXT
) AS $$
    WITH "updated" AS (
        UPDATE "user" SET
        "username" = COALESCE(("_data" ->> 'username')::text, "username"),
        "email" = COALESCE(("_data" ->> 'email')::text, "email"),
        "password" = COALESCE(("_data" ->> 'password')::text, "password"),
        "id_role" = COALESCE(("_data" ->> 'id_role')::integer, "id_role"),
        "updated_at" = NOW()
        WHERE "id" = _id
        RETURNING *
    )
    SELECT "username", "email", "id_role", "role"."name" FROM "updated"
    JOIN "role" ON "role"."id" = "id_role";
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION "update_culture"("_data" json, "_id" INT)
RETURNS TABLE (
    "sowing" TIMESTAMPTZ,
    "planting" TIMESTAMPTZ,
    "harvesting" TIMESTAMPTZ,
    "comment" TEXT,
    "plot" TEXT,
    "plant" TEXT
) AS $$
    WITH "updated" AS (
        UPDATE "culture" SET
        "sowing" = COALESCE(("_data" ->> 'sowing')::TIMESTAMPTZ, "sowing"),
        "planting" = COALESCE(("_data" ->> 'planting')::TIMESTAMPTZ, "planting"),
        "harvesting" = COALESCE(("_data" ->> 'harvesting')::TIMESTAMPTZ, "harvesting"),
        "comment" = COALESCE(("_data" ->> 'comment')::TEXT, "comment"),
        "id_plot" = COALESCE(("_data" ->> 'id_plot')::INT, "id_plot"),
        "id_plant" = COALESCE(("_data" ->> 'id_plant')::INT, "id_plant")
        WHERE "id" = _id
        RETURNING *
    )
    SELECT
    "sowing",
    "planting",
    "harvesting",
    "comment",
    "plot"."name",
    "plant"."name"
    FROM "updated"
    JOIN "plot" ON "plot"."id" = "id_plot"
    JOIN "plant" ON "plant"."id" = "id_plant";
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION "update_plot"("_data" JSON, "_id" INT)
RETURNS TABLE (
    "name" TEXT,
    "availability" BOOLEAN
) AS $$
    WITH "updated" AS (
        UPDATE "plot" SET
        "name" = COALESCE(("_data" ->> 'name')::TEXT, "name"),
        "availability" = COALESCE(("_data" ->> 'availability')::BOOLEAN, "availability"),
        "id_user" = COALESCE(("_data" ->> 'id_user')::INT, "id_user")
        WHERE "id" = _id
        RETURNING *
    )
    SELECT "name", "availability"
    FROM "updated";
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION "update_plant"("_id" INT, "_data" json)
RETURNS TABLE (
    "name" TEXT,
    "specification" TEXT[],
    "culture_advice" TEXT[],
    "category" TEXT,
    "family" TEXT
) AS $$
    WITH "updated" AS (
        UPDATE "plant" SET
        "name" = COALESCE(("_data" ->> 'name')::TEXT, "name"),
        "specification" = COALESCE(ARRAY(SELECT json_array_elements_text(("_data"->'specification'))), "specification"),
        "culture_advice" = COALESCE(ARRAY(SELECT json_array_elements_text(("_data"->'culture_advice'))), "culture_advice"),
        "id_category" = COALESCE(("_data" ->> 'id_category')::INT, "id_category"),
        "id_family" = COALESCE(("_data" ->> 'id_family')::INT, "id_family")
        WHERE "id" = _id
        RETURNING *
    )
    SELECT "updated"."name", "specification", "culture_advice", "category"."name", "family"."name"
    FROM "updated"
    JOIN "category" ON "category"."id" = "id_category"
    JOIN "family" ON "family"."id" = "id_family";
$$ LANGUAGE SQL;


COMMIT;
