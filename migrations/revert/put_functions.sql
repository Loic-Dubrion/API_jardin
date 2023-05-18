-- Revert connectedGarden:put_functions from pg

BEGIN;

DROP FUNCTION IF EXISTS
"update_category",
"update_alliance",
"update_family",
"update_user",
"update_culture",
"update_plot",
"update_plant";

COMMIT;
