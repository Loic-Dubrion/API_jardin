-- Revert connectedGarden:create_tables from pg

BEGIN;

DROP TABLE 
    "culture", 
    "plot",
    "plant",
    "alliance",
    "family",
    "category",
    "user",
    "role";

COMMIT;
