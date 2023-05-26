-- Deploy connectedGarden:view to pg

BEGIN;

CREATE VIEW "plants_details" AS
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
) AS "plant_alliances" ON "plant_alliances"."plant_id" = "plant"."id";

CREATE VIEW "get_families" AS
SELECT * FROM "family";

CREATE VIEW "get_categories" AS
SELECT * FROM "category";

CREATE VIEW "get_alliances" AS
SELECT "alliance"."id", array_agg("family"."name") AS "family_names"
FROM "alliance"
JOIN "family" ON "alliance"."id" = "family"."id_alliance"
GROUP BY "alliance"."id";
;

COMMIT;
