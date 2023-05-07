# DATABASE MY_GARDEN

Pour mémoire :

- Si depuis une table on a un N en cardinalité => FK dans l'autre table
- Si depuis une table on n'a pas de N en cardinalité => Pas de FK
- Si on N des 2 côtés => Table de liason avec 2 FK

## TABLES

**categorie**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**family**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**plant**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |
| specification | ARRAY | |
| culture_advice | ARRAY | |
| id_family | INTEGER | Foreign Key - familie.id |
| id_category | INTEGER | Foreign Key - categorie.id |
| id_alliance | INTEGER | Foreign Key - alliance.id |


**plot**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |
| availability | BOOLEAN | |
| id_user | INTEGER | Foreign Key - user.id |

**culture**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| sowing | DATE | |
| planting | DATE | |
| harvesting | DATE | |
| id_vegetable | INTEGER | Foreign Key - vegetable.id |
| id_plot | INTEGER | Foreign Key - plot.id |
| comment | TEXT | |

**user**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| username | TEXT | |
| email | TEXT | |
| password | TEXT | |
| id_role | INTEGER | Foreign Key - role.id |

**role**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**alliance**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| alliance | ARRAY[id_vegetable] | |
