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


COMMIT;
