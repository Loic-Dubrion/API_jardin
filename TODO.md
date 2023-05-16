# TODO LIST

- Faire un sauvegarde automatique de la BDD

## Fonction retourne les dernières récoltes d'une parcelle
SELECT
	plot.name AS plot_name,
    ARRAY_AGG((category.name, family.name, culture.harvesting)) AS three_last_culture
FROM plot
JOIN culture ON plot.id = culture.id_plot
JOIN plant ON plant.id = culture.id_plant
JOIN family ON family.id = plant.id_family
JOIN category ON category.id = plant.id_category
WHERE plot.id = 1
AND culture.harvesting IS NOT NULL
GROUP BY plot.name
ORDER BY ABS(EXTRACT(DAY FROM (NOW() - MIN(culture.harvesting))))
LIMIT 3;
