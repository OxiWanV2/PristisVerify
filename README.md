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
module.exports = {
    server: {
        domain: "localhost",
        https: false,
        httpPort: 8080,
    },

    Discord: {
        // —— Éléments requis pour que l'ensemble du projet fonctionne.
        token: "", // —— Le token de votre bot.
        botId: "", // —— L'ID du bot.
        guildId: "", // —— L'ID du serveur où les commandes seront déployées.
        verifiedRole: "", // —— Rôle qui sera ajouté à l'utilisateur lorsqu'il vérifiera son compte.

        // —— Pour les utilisateurs qui souhaitent qu'un rôle soit supprimé lors de la vérification, si vous voulez cela, réglez removeRole à true et définissez l'ID du rôle à supprimer.
        removeRole: false,
        removeRoleId: "",

        // —— Définissez la présence du bot. Pour statusType, voir : https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType
        statusType: 3, // 1 (STREAMING), 2 (LISTENING), 3 (WATCHING), 5 (COMPETING). Par défaut : 0 (PLAYING).
        statusMsg: "utilisateurs non vérifiés !",

        // —— Par défaut, les règles sont désactivées. Cela signifie que les règles seront cachées. Si vous souhaitez utiliser la fonction des règles, changez disabled par vos règles. Assurez-vous d'utiliser \n pour chaque saut de ligne et n'utilisez aucun symbole qui pourrait interférer avec JSON.
        rulesEnabled: true,
        rules: "Tapez vos règles ici si rulesEnabled est activé, assurez-vous d'utiliser \n pour les nouvelles lignes."
    },

    reCAPTCHA: {
        secretKey: "",
        publicKey: ""
    }
}
```

- Une fois que vous avez terminé d'éditer les fichiers et que vous êtes prêt à lancer votre bot, exécutez `npm start` dans le dossier du bot.

## Problèmes

**Je ne reçois pas de message privé lorsque je rejoins mon serveur**

- Si vous ne recevez pas de message privé lorsque vous rejoignez votre serveur, allez sur le tableau de bord de votre bot Discord et activez les deux intentions (*intents*). Remarque : Si votre bot est sur plus de 100 serveurs, vous devrez vérifier votre bot.

**Le bot échoue lors de la connexion**

- Vous devez aller sur le tableau de bord de votre bot Discord et activer les deux intentions (*intents*). Remarque : Si votre bot est sur plus de 100 serveurs, vous devrez vérifier votre bot.

## Aperçu
Embed
Website
