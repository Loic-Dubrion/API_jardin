-- Revert connectedGarden:get_functions from pg

BEGIN;

DROP FUNCTION IF EXISTS
  "get_all_users",
  "get_user_details",
  "get_production_by_user",
  "get_plant_detail",
  "get_alliance",
  "get_last_cultures";

COMMIT;
