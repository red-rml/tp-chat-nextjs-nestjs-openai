# Projet de Chat utilisant NextJS, NestJS et OpenAI API 

## Auteurs 🎭

* **Rédouane RÉMILI** _alias_ [@FinOrfy](https://github.com/FinOrfy)

## Consignes et explications 👍

- Application de communication : ouvrir 2 pages web pour converser
- Choisir en haut à gauche la langue de son choix pour les traductions des messages
- Une vignette **Vert** sur le message lorsque le message est vérifié par ChatGPT et **Exacte**
- Une vignette **Rouge** sur le message lorsque le message est vérifié par ChatGPT et **Inexacte**
- Une vignette **Orange** sur le message lorsque le message est vérifié par ChatGPT et **Sans réponse sûr**
- Une vignette **Transparent** sur le message lorsque le message est vérifié par ChatGPT et que **c'est neutre**
- Les suggestions de message sont juste audessus de la barre de texte
  
- Le vocal ne marche pas encore 😥

---

# Sujet

## Introduction

Dans le cadre de ce projet, nous allons déployer un chat en temps réel, construit avec NextJS et NestJS, et intégrant des fonctionnalités basées sur l'API d'OpenAI. Ce chat fera appel à l'API d'OpenAI pour différentes opérations comme la traduction de messages, la validation des informations et la suggestion de réponses.

## Fonctionnalités du Projet

### 1. Communication En Temps Réel

Les utilisateurs pourront échanger des messages en direct. Le module de chat en temps réel est construit avec NextJS en vue côté client et NestJS côté serveur, avec socket.io assurant la communication temps réel.

### 2. Traduction Automatique

En utilisant l'API OpenAI, les messages des utilisateurs peuvent être traduits en temps réel dans la langue de leur choix. Cette fonctionnalité permet de rendre le chat vraiment global et de briser les barrières linguistiques entre les utilisateurs.

### 3. Validation De L'Information

Pour promouvoir l'exactitude et la fiabilité de l'information dans les discussions, le chatbot va utiliser OpenAI pour vérifier les informations en temps réel. Si un utilisateur partage une information, le chatbot peut la vérifier et le signaler si l'information semble inexacte ou trompeuse.

### 4. Suggestions De Réponse

Basées sur le contexte de la conversation en cours, OpenAI propose des réponses aux utilisateurs pour faciliter et accélérer leur interaction dans le chat. Les utilisateurs pourront voir une liste de réponses suggérées et sélectionner celle qui convient le mieux à leurs intentions.

### 5. Speech to text

Utiliser le model whisper pour permettre à l'utilisateur de transmettre un audio afin qu'il soit transcripté en texte.

## Technologies Utilisées

- **NextJS** sera utilisé pour créer l'interface utilisateur du chat.
- **NestJS** sera notre choix pour la création du serveur backend.
- L'**API OpenAI** sera utilisée pour intégrer des fonctionnalités basées sur l'IA dans le chat.
- **Socket.io** sera utilisé pour gérer la communication en temps réel.
- Aucune base de données n'est requise pour ce projet, et aucune fonctionnalité d'authentification n'est nécessaire.
  
## Design et Interface Utilisateur

Les étudiants sont libres d'expérimenter en ce qui concerne le design et l'interface utilisateur du chat. Ils sont encouragés à adopter les meilleures pratiques UX/UI pour créer une expérience utilisateur optimale.

## Déploiement

Pour ce projet, il n'y a pas de nécessité de déploiement. Le code sera exécuté localement pour des fins de développement et de test.


<p align="right">(<a href="#readme-top">retour en haut ⬆</a>)</p>