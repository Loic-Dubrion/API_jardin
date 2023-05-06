# DATABASE MY_GARDEN

Pour mémoire :

- Si depuis une table on a un N en cardinalité => FK dans l'autre table
- Si depuis une table on n'a pas de N en cardinalité => Pas de FK
- Si on N des 2 côtés => Table de liason avec 2 FK

## TABLES

**diseases**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key|
| description | TEXT | |
| prevention | TEXT | |
| treatment | TEXT | |

**pests**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |
| description | TEXT | |
| prevention | TEXT | |
| treatment | TEXT | |

**categories**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |

**soils**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |

**exposure**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |

**families**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |

**vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |
| height | INTEGER | |
| sowing_period | VARCHAR(100) | |
| planting_period | VARCHAR(100) | |
| hervting_period | VARCHAR(100) | |
| id_family | INTEGER | Foreign Key - families.id |
| id_category | INTEGER | Foreign Key - categories.id |
| id_exposure | INTEGER | Foreign Key - exposures.id |
| id_ground | INTEGER | Foreign Key - grounds.id |
| cultivation_advice | TEXT | |
| characteristics | TEXT | |

**plots**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |
| position | INTEGER | |
| availability | BOOLEAN
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
| username | VARCHAR(100) | |
| email | VARCHAR(100) | |
| password | VARCHAR(100) | |
| id_role | INTEGER | Foreign Key - roles.id |

**roles**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | VARCHAR(50) | |

**alliance**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| id_alliance | ARRAY[id_vegetable] | |

**misalliance**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| id_misalliance | ARRAY[id_vegetable] | |

## RELATIONSHIP TABLES

**alliance_has_vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id_alliance | INTEGER | Foreign Key - alliance.id |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |

**misalliance_has_vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id_misalliance | INTEGER | Foreign Key - misalliance.id |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |

**disease_has_vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id_disease | INTEGER | Foreign Key - diseases.id |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |

**pest_has_vegetables**
| Column | Type | |
| :--- | :--- | :--- |
| id_disease | INTEGER | Foreign Key - diseases.id |
| id_vegetable | INTEGER | Foreign Key - vegetables.id |
