-- Verify connectedGarden:create_tables on pg

BEGIN;

SELECT * FROM 
    "culture", 
    "plot",
    "plant",
    "alliance",
    "family",
    "category",
    "user",
    "role" 
WHERE false;

ROLLBACK;
