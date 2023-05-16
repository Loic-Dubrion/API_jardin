-- Verify connectedGarden:view on pg

BEGIN;

SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public' AND table_name = 'plants_details';

ROLLBACK;
