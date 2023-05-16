# TODO LIST

- Faire un sauvegarde automatique de la BDD

## Fonction insert plant
CREATE OR REPLACE FUNCTION "insert_new_plant"("o_plant" JSON)
RETURNS TABLE("id" INT, "name" TEXT, "specification" TEXT[], "culture_advice" TEXT[], "family_name" TEXT, "category_name" TEXT) AS
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
