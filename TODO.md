# TODO LIST

- Faire un sauvegarde automatique de la BDD

## Fonction profil de l'utilisateur
CREATE OR REPLACE FUNCTION public.get_user_details(user_id integer)
    RETURNS TABLE (
        username text,
        email text,
        id_role integer,
        total_plots bigint
    )
    LANGUAGE SQL
AS $function$
    SELECT
        "user"."username",
        "user"."email",
        "user"."id_role",
        COUNT("plot") AS total_plots
    FROM "user"
    JOIN "plot" ON "user"."id" = "plot"."id_user"
    WHERE "user"."id" = user_id
    GROUP BY "user"."id";
$function$


## Fonction pour récupérer tous les légumes en cours de production ou non par utilisateur par parcelle ou non
CREATE OR REPLACE FUNCTION public.get_production_by_user_with_condition(user_id integer, is_harvesting_null boolean, plot_id integer DEFAULT NULL)
    RETURNS TABLE (
        username text,
        plot_id integer,
        name text,
        availability boolean,
        family text,
        variety text,
        category text,
        sowing date,
        planting date,
        harvesting date
    )
    LANGUAGE SQL
AS $function$
    SELECT
        "user"."username",
        "plot"."id" AS plot_id,
        "plot"."name" AS name,
        "plot"."availability",
        "family"."name" AS family,
        "plant"."name" AS variety,
        "category"."name" AS category,
        "culture"."sowing",
        "culture"."planting",
        "culture"."harvesting",
        "culture"."comment"
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
            is_harvesting_null = TRUE AND "culture"."harvesting" IS NULL
            OR is_harvesting_null = FALSE
        )
        AND ("plot"."id" = plot_id OR plot_id IS NULL);
$function$

## Récupère le détail d'une plante
CREATE OR REPLACE FUNCTION public.get_plants_details()
    RETURNS TABLE (
        name text,
        specification text,
        culture_advice text,
        category text,
        family text,
        alliances text[]
    )
    LANGUAGE SQL
AS $function$
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
$function$
