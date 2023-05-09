# Logbook "connected garden"

## Conception

Le 01/05
### Elaboration du cahier des charges

Détermine les besoins et objectifs
Définit les fonctionnalités, contraintes et performances attendues

### Conception du MCD (Modèle Conceptuel de Données)

Représentation globale de la base de donnée, définitions des entités et relations

### Conception du MLD (Modèle Logique de Données)

Définition des tables, attributs, type de données
Représentation des clefs étrangères

Le 06/05
### Conception du MPD (Modèle Physique de Données)

Schématisation des tables, des contraintes d'intégrité, des index.

Le 07/05
## Configuration de l'environnement de travail

- eslint (configuration airBnB)
- ajout du fichier .editorConfig
- sqitch
- initialisation d'un dépôt git
- initialisation d'un projet Node.js
- installation de jsDoc
- installation de swagger pour express
- installation des dépendances :
  - express
  - cors
  - dotenv
  - pg
  - bunyan
  - joi
  - jest

## Création de la base de donnée

Création de la base de données dans postgres
Ajout d'une migration sqitch "create_tables"
Déploiement de la migration, création du revert et de verify
Peuplement des tables avec un des données test

Le 09/05
## Création du serveur

- l'index.js et du dossier app
- dossier routers avec index.js
- première route '/' avec test `res.send('create OK')`
