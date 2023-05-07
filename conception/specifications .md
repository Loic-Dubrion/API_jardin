# Cahier des charges - "Connected Garden"

## 1. Introduction

  1.1. Objectif du document
    Ce cahier des charges présente les spécifications fonctionnelles et non-fonctionnelles pour le développement d'une application de gestion de jardins, appelée "Connected Garden".

  1.2. Portée du projet
    La web application "Connected Garden" vise à aider les utilisateurs à gérer et optimiser leurs jardins en fournissant des informations sur les légumes, les cultures, les parcelles, et en tenant compte des différents facteurs environnementaux.

## Description générale

  2.1. Utilisateurs cibles
    Les utilisateurs cibles de l'application sont les jardiniers amateurs et professionnels qui souhaitent mieux gérer leurs jardins et suivre les informations relatives aux cultures, aux légumes et aux conditions environnementales.

  2.2. Périmètre du projet
    France

  2.3. Fonctionnalités principales
    - Gestion des utilisateurs et des rôles
      - Une version limité gratuite
      - Une version complète payante
    - Gestion des parcelles
      - L'utilisateur doit pouvoir enregistrer ses parcelles cultivable ainsi que leurs caractéristique
    - Gestion des cultures
      - Date de semis, récoltes, alliances de légumes...
    - Propositions de culture
      - En fonction des caractéristique de la parcelle proposition de culture (rotation, exposition,...)

  2.4. Evolution possible du projet
    - Informations sur les mésalliance de légumes
    - Propositions de culture en fonction de la date
    - Identification des ravageurs et maladies avec proposition de traitement
    - Notifications sur les taches à réaliser en fonction des dates de plantation
    - Extension de l'application aux autres végétaux (fleurs, arbustes,...)

## Exigences fonctionnelles

  3.1. Gestion des utilisateurs et des rôles
    - Création, modification et suppression d'utilisateurs
    - Attribution de rôles aux utilisateurs
    - Authentification et autorisation

  3.2. Gestion des parcelles
    - Création, modification et suppression de parcelles
    - Attribution de parcelles aux utilisateurs
    - Affichage des informations détaillées sur une parcelle (y compris la disponibilité pour une culture)

  3.3. Gestion des cultures
    - Création, modification et suppression de cultures
    - Attribution de cultures aux parcelles et aux légumes
    - Affichage des informations détaillées sur une culture

  3.4. Gestion des légumes
    - Création, modification et suppression (uniquement par l'admin)
    - Affichage des informations détaillées sur un légume, y compris les caractéristiques, les conseils de culture.

## Exigences non-fonctionnelles

  4.1. Performance
    L'application doit être capable de gérer un grand nombre d'utilisateurs et de données sans ralentissement ni dégradation des performances.

  4.2. Sécurité
    L'application doit assurer la protection des données sensibles, comme les mots de passe des utilisateurs, et mettre en œuvre des mécanismes d'authentification et d'autorisation appropriés pour garantir l'accès aux informations en fonction des rôles des utilisateurs.

  4.3. Extensibilité
    L'application doit être conçue de manière modulaire pour faciliter l'ajout de nouvelles fonctionnalités ou la modification des fonctionnalités existantes.

  4.4. Compatibilité
    L'application doit être compatible avec les principaux navigateurs web et les systèmes d'exploitation mobiles.


## Contraintes

  5.1. Technologie
    - Back en utilisant Node.js et postgres en SGBD et react ou jquery pour le front.
    - Tests unitaires obligatoire.
    - API RESTFULL

  5.2. Calendrier
    L'application doit être développée et livrée dans un délai de 3 mois à compter de la date d'approbation du cahier des charges.

## Livrables

  6.1. Code source de l'application, y compris la documentation et les tests unitaires
  6.2. Documentation utilisateur et technique

## Acceptation
  Les critères d'acceptation pour l'application incluent la vérification que toutes les exigences fonctionnelles et non-fonctionnelles sont respectées, ainsi que la réussite des tests unitaires et des tests d'intégration.

## Annexes
  User Stories
  MCD détaillé
  MLD
  MPD
  Documentation
  Wireframe
  Plans de tests
