-- Revert connectedGarden:create from pg

BEGIN;

DROP TABLE IF EXISTS
    "culture",
    "plot",
    "plant",
    "alliance",
    "family",
    "category",
    "user",
    "role";

COMMIT;
