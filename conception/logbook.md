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

### Conception du MPD (Modèle Physique de Données)

Le 06/05

Schématisation des tables, des contraintes d'intégrité, des index (pour l'instant pas d'index en raison des index
créé automatiquement par postgres sur les colonnes ayant des contraintes d'unicité).

## Configuration de l'environnement de travail

Le 07/05

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

## Création du serveur

Le 09/05

création:

- de l'index.js et du dossier app
- du dossier routers avec index.js
- de la première route '/' avec test `res.send('create OK')`

## Gestions des erreurs et premier controller

Le 10/05

- Configuration de Swagger, test de l'affichage à l'adresse /api-docs
- Configuration et personnalisation de Bunyan
- Création du fichier de connexion à la bdd
- Esquive d'un MCV
  - Définition d'une route en GET ( /plants )
  - Un model dataMapper pour récupérer toutes les plantes
  - Un controller qui déclenche et récupère ma requete
  - Une vue, pour l'instant le résultat de la requête au format JSON
- Début de gestion des erreurs avec un module controllerHandler qui "centralise" les try/catch
- Création d'une class de gestion des erreurs 404 ("noRessourceFoundError")
- Création d'un middleware de gestion des erreurs. Réponse au format JSON

## Test Unitaire

Le 11/05

-Configuration de Jest et test de la route /api/plants
