# DATABASE MY_GARDEN

Pour mémoire :

- Si depuis une table on a un N en cardinalité => FK dans l'autre table
- Si depuis une table on n'a pas de N en cardinalité => Pas de FK
- Si on N des 2 côtés => Table de liason avec 2 FK

## TABLES

**categories**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**families**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |
| specification | ARRAY | |
| culture_advice | ARRAY | |
| id_family | INTEGER | Foreign Key - families.id |
| id_category | INTEGER | Foreign Key - categories.id |


**plots**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |
| availability | BOOLEAN | |
| id_user | INTEGER | Foreign Key - users.id |

**cultures**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| sowing | DATE | |
| planting | DATE | |
| harvesting | DATE | |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |
| id_plot | INTEGER | Foreign Key - plots.id |
| comment | TEXT | |

**users**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| username | TEXT | |
| email | TEXT | |
| password | TEXT | |
| id_role | INTEGER | Foreign Key - roles.id |

**roles**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**alliance**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| id_alliance | ARRAY[id_vegetable] | |

## RELATIONSHIP TABLES

**alliance_has_vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id_alliance | INTEGER | Foreign Key - alliance.id |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |
