-- Verify connectedGarden:view on pg

BEGIN;

SELECT * FROM plants_details WHERE FALSE;
SELECT * FROM get_families WHERE FALSE;
SELECT * FROM get_categories WHERE FALSE;



ROLLBACK;
