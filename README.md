<h2 align="center">
🔑 PristisVerify
</h2>
<h3 align="center">
Un bot de vérification Discord utilisant reCAPTCHA v2.  
Complètement en français !
</h3>

## Fonctionnalités du bot PristisVerify

<p align="center">🟢 Traduction en français <b>100%</b></p>

### 1. **Vérification des utilisateurs via reCAPTCHA**
   - Le bot utilise Google reCAPTCHA v2 pour vérifier que les nouveaux utilisateurs ne sont pas des robots. Lorsqu'un utilisateur rejoint le serveur, il reçoit un lien vers un formulaire reCAPTCHA à compléter.
   - Une fois la vérification réussie, le bot attribue automatiquement un rôle "vérifié" à l'utilisateur.

### 2. **Gestion des rôles**
   - **Attribution automatique du rôle vérifié** : Après avoir complété la vérification via reCAPTCHA, le bot attribue un rôle spécifique (défini dans la configuration) à l'utilisateur.
   - **Suppression automatique d'un rôle** : Si activé dans la configuration (`removeRole: true`), le bot peut également retirer un rôle spécifique une fois que l'utilisateur est vérifié.
   - **Rôle administrateur** : Un rôle administrateur peut être défini pour accorder des privilèges spéciaux aux administrateurs lors de certaines interactions avec le bot.

### 3. **Présence personnalisée du bot**
   - Le bot peut afficher un statut personnalisé sur Discord, tel que "regarde les utilisateurs non vérifiés", "écoute", ou "en compétition". Le type de statut et le message peuvent être configurés dans le fichier `config.js`.
   - **Types de statuts disponibles** :
     - Jouer (PLAYING)
     - Diffuser (STREAMING)
     - Écouter (LISTENING)
     - Regarder (WATCHING)
     - Compétition (COMPETING)

### 4. **Affichage des règles du serveur**
   - Si activé (`rulesEnabled: true`), le bot peut envoyer un message contenant les règles du serveur aux nouveaux membres lorsqu'ils rejoignent. Ces règles sont présentées sous forme d'intégration (*embed*) avec un titre et une couleur personnalisables.
   - Les utilisateurs doivent accepter ces règles avant de pouvoir continuer avec la vérification.

### 5. **Système de gestion des liens d'invitation**
   - Le bot peut fournir un lien d'invitation Discord personnalisé pour rejoindre le serveur, ce qui permet aux nouveaux utilisateurs d'accéder facilement au serveur pour commencer la vérification.

### 6. **Serveur web intégré pour la vérification**
   - Le bot inclut un petit serveur web qui gère les requêtes HTTP pour la vérification via reCAPTCHA.
     - **HTTPS supporté** : Si activé, le serveur peut fonctionner en HTTPS avec des certificats SSL fournis par l'utilisateur (`certificate.pem` et `private.pem`).
     - Les utilisateurs peuvent accéder à une page web où ils complètent le reCAPTCHA pour prouver qu'ils ne sont pas des robots.

### 7. **Commandes slash personnalisées**
   - Le bot utilise les commandes slash de Discord pour permettre aux administrateurs et aux utilisateurs d'interagir avec lui directement depuis l'interface Discord.
     - **/verify** : Commande permettant aux utilisateurs de demander leur vérification manuellement.
     - **/unverify** : Commande permettant aux utilisateurs de se dévérifier eux-mêmes si nécessaire.
     - **/verifyembed** : Envoie une intégration avec un bouton de réaction ; lorsque l'utilisateur clique dessus, il reçoit automatiquement le rôle vérifié.

### 8. **Journalisation avancée avec Signale**
   - Le bot utilise la bibliothèque `Signale` pour journaliser les événements importants, comme :
     - Les erreurs lors de l'attribution ou suppression des rôles.
     - Les tentatives échouées d'envoi de messages privés (par exemple, si les DMs sont désactivés).
     - Les actions réussies comme l'attribution du rôle vérifié ou la suppression d'un rôle.
   - Chaque action critique est enregistrée dans la console avec différents niveaux de gravité (info, warning, error).

### 9. **Anti-crash et gestion des erreurs**
   - Le bot est équipé d'un système anti-crash pour capturer les erreurs non gérées et éviter qu'il ne plante :
     - Gestion des exceptions non gérées (`uncaughtException`).
     - Gestion des promesses rejetées non gérées (`unhandledRejection`).
   - Cela garantit que le bot reste opérationnel même en cas d'erreurs inattendues.

## Prérequis

- [Node.js v16.9.0 ou supérieur](https://nodejs.org/en/)
- [Clé Google reCaptcha](https://www.google.com/recaptcha/admin/create)

## Configuration

- Renommez votre fichier `config-example.js` en `config.js`.

- Enregistrez votre site avec [reCaptcha](https://www.google.com/recaptcha/admin/create) en utilisant le domaine que vous utilisez actuellement. Si vous exécutez le bot en local, mettez simplement "localhost" dans la zone de domaine. Choisissez reCAPTCHA v2 "Je ne suis pas un robot" pour le type de reCaptcha, et copiez la clé secrète et la clé publique dans le fichier `config.js`. Si vous utilisez HTTPS, activez-le dans la configuration et ajoutez vos fichiers de certificat et de clé privée sous les noms : `certificate.pem` et `private.pem`.

- Pour exécuter votre propre version sur Repl.it, créez un nouveau projet et cliquez sur le bouton `Importer depuis Github`, puis copiez l'URL de ce dépôt et collez-la sur le site Repl.it.

- Voici à quoi ressemble le fichier de configuration et les éléments requis pour que le bot fonctionne correctement :

```js
// Renommez-le en config.js !
module.exports = {
  "server": {
    "domain": "server.example.com:00000", // Remplacez par votre domaine réel
    "https": false, // Activez-le si vous utilisez HTTPS
    "httpPort": 00000 // Remplacez par le port que vous souhaitez utiliser
  },
  "Discord": {
    "token": "", // Le token de votre bot Discord
    "botId": "", // L'ID du bot
    "guildId": "", // L'ID du serveur où les commandes seront déployées
    "verifiedRole": "", // Le rôle qui sera attribué à l'utilisateur une fois vérifié
    "discordinvite": "", // Lien d'invitation pour rejoindre le serveur Discord
    "removeRole": true, // Si défini à true, un rôle sera retiré après vérification
    "removeRoleId": "", // L'ID du rôle à retirer lors de la vérification
    "adminRoleId": "", // L'ID du rôle administrateur (si nécessaire)
    "statusType": 3, // Type de statut du bot (1: STREAMING, 2: LISTENING, 3: WATCHING, 5: COMPETING)
    "statusMsg": "", // Message de statut personnalisé affiché par le bot
    "status": "dnd", // Statut du bot (online, idle, dnd, invisible)
    "rulesEnabled": true, // Active l'affichage des règles si défini à true
    "rulestitle": "", // Titre des règles affichées dans un embed
    "rulescolor": "#0099ff", // Couleur de l'encadré des règles (en hexadécimal)
    "rules": "" // Texte des règles (utilisez \n pour les sauts de ligne)
  },
  "reCAPTCHA": {
    "secretKey": "", // Clé secrète reCAPTCHA obtenue via Google reCAPTCHA
    "publicKey": ""  // Clé publique reCAPTCHA utilisée pour afficher le widget sur le site
  }
}
```

- Une fois que vous avez terminé d'éditer les fichiers et que vous êtes prêt à lancer votre bot, exécutez `npm start` dans le dossier du bot.

## Problèmes

**Je ne reçois pas de message privé lorsque je rejoins mon serveur**

- Si vous ne recevez pas de message privé lorsque vous rejoignez votre serveur, allez sur le tableau de bord de votre bot Discord et activez les deux intentions (*intents*). Remarque : Si votre bot est sur plus de 100 serveurs, vous devrez vérifier votre bot.

**Le bot échoue lors de la connexion**

- Vous devez aller sur le tableau de bord de votre bot Discord et activer les deux intentions (*intents*). Remarque : Si votre bot est sur plus de 100 serveurs, vous devrez vérifier votre bot.
