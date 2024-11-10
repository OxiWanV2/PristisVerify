<h2 align="center">
🔑 PristisVerify
</h2>
<h3 align="center">
Un bot de vérification Discord utilisant reCAPTCHA v2.  
Complètement en français !
</h3>

<p align="center">🟢 Traduction en français <b>100%</b></p>

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
