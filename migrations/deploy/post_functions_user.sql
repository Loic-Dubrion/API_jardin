-- Deploy connectedGarden:post_functions_user to pg

BEGIN;

CREATE OR REPLACE FUNCTION "insert_new_plot"("_id_user" INT, "o_plot" JSON)
 RETURNS TABLE("id" integer, "name" text, "availability" boolean, "id_user" integer, "username" text)
 LANGUAGE sql
AS $$
  WITH "new_plot" AS (
    INSERT INTO "plot" ("name", "availability", "id_user")
      VALUES (
        o_plot->>'name',
        (o_plot->>'availability')::BOOLEAN,
        _id_user
        )
      RETURNING *
    )
    SELECT
      "new_plot"."id",
      "new_plot"."name",
      "new_plot"."availability",
      "new_plot"."id_user",
      "user"."username" AS "username"
    FROM "new_plot"
    INNER JOIN "user" ON "new_plot"."id_user" = "user"."id";
$$;

CREATE OR REPLACE FUNCTION "insert_new_culture"("_id_plot" INT, "o_culture" json)
 RETURNS TABLE("id" INT, "sowing" TIMESTAMPTZ, "planting" TIMESTAMPTZ, "id_plant" INT, "id_plot" INT, "comment" TEXT, "family" TEXT, "plant" TEXT, "category" TEXT)
 LANGUAGE sql
AS $$
  WITH "new_culture" AS (
    INSERT INTO "culture" ("sowing", "planting", "id_plant", "id_plot", "comment")
      VALUES (
        (o_culture->>'sowing')::TIMESTAMPTZ,
        (o_culture->>'planting')::TIMESTAMPTZ,
        (o_culture->>'id_plant')::INTEGER,
        _id_plot,
        o_culture->>'comment'
      )
      RETURNING *
    )
    SELECT
      "new_culture"."id",
      "new_culture"."sowing",
      "new_culture"."planting",
      "new_culture"."id_plant",
      "new_culture"."id_plot",
      "new_culture"."comment",
      "family"."name" AS "family",
      "plant"."name" AS "plant",
      "category"."name" AS "category"
    FROM "new_culture"
    INNER JOIN "plant" ON "new_culture"."id_plant" = "plant"."id"
    INNER JOIN "family" ON "plant"."id_family" = "family"."id"
    INNER JOIN "category" ON "plant"."id_category" = "category"."id";
$$;

COMMIT;
