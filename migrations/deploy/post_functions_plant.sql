-- Deploy connectedGarden:post_functions_plant to pg

BEGIN;

CREATE OR REPLACE FUNCTION "insert_new_plant"("o_plant" JSON)
RETURNS TABLE(
  "id" INT,
  "name" TEXT,
  "specification" TEXT[],
  "culture_advice" TEXT[],
  "family_name" TEXT,
  "category_name" TEXT)
  AS
$$
  WITH new_plant AS (
    INSERT INTO "plant" ("name", "specification", "culture_advice", "id_family", "id_category")
      VALUES (
        o_plant->>'name',
        ARRAY(SELECT json_array_elements_text(o_plant->'specification')),
        ARRAY(SELECT json_array_elements_text(o_plant->'culture_advice')),
        (o_plant->>'id_family')::INTEGER,
        (o_plant->>'id_category')::INTEGER
        )
      RETURNING *
    )
    SELECT
      new_plant.id,
      new_plant.name,
      new_plant.specification,
      new_plant.culture_advice,
      family.name AS family_name,
      category.name AS category_name
    FROM new_plant
    INNER JOIN "family" ON new_plant.id_family = family.id
    INNER JOIN "category" ON new_plant.id_category = category.id;
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION "insert_new_family"("o_family" JSON)
RETURNS TABLE("id" INT, "name" TEXT, "id_alliance" INT) AS
$$
    WITH new_family AS (
        INSERT INTO "family" ("name", "id_alliance")
        VALUES (
            o_family->>'name',
            (o_family->>'id_alliance')::INT
        )
        RETURNING *
    )
    SELECT "id", "name", "id_alliance" FROM new_family;
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION "insert_new_category"("o_category" JSON)
RETURNS TABLE("id" INT, "name" TEXT) AS
$$
    WITH new_category AS (
        INSERT INTO "category" ("name")
        VALUES (o_category->>'name')
        RETURNING *
    )
    SELECT "id", "name" FROM "new_category";
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION "insert_new_alliance"("o_alliance" JSON)
RETURNS TABLE("id" INT, "family_names" TEXT[]) AS
$$
WITH new_alliance AS (
    INSERT INTO "alliance" ("alliance")
    VALUES (
        ARRAY(SELECT json_array_elements_text(o_alliance->'alliance')::INTEGER)
    )
    RETURNING id, alliance
)
SELECT new_alliance.id, ARRAY(SELECT "family"."name" FROM "family" WHERE "family"."id" = ANY(new_alliance.alliance)) AS family_names
FROM new_alliance;
$$
LANGUAGE sql;



COMMIT;
