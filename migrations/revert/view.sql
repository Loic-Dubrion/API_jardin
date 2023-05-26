-- Revert connectedGarden:view from pg

BEGIN;

DROP VIEW IF EXISTS
  "plants_details",
  "get_families",
  "get_categories",
  "get_alliances";

COMMIT;
