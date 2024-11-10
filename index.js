const fs = require("fs");
const { Client, Collection, Partials } = require("discord.js");
const { Signale } = require('signale');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const express = require('express');
const path = require('path');
const axios = require('axios');
const https = require('https');
const pool = require('./pool');
const config = require("./config.js");
const logger = new Signale({ scope: 'Discord' });
const licenselogger = new Signale({ scope: 'License' });

const APIconfig = {
  pluginName: 'PristisVerify'
};

const options = {
  disabled: false,
  interactive: false,
  logLevel: 'info',
  scope: 'custom',
  secrets: [],
  stream: process.stdout,
  types: {
    remind: {
      badge: '!',
      color: 'yellow',
      label: 'rappel',
      logLevel: 'info'
    },
    warningx: {
      badge: '!',
      color: 'yellow',
      label: 'avis',
      logLevel: 'info'
    }
  }
};

const loggerx = new Signale(options);

const client = new Client({ 
    intents: [ 131071 ],
    partials: [
        Partials.Channel
    ] 
});

const eventFiles = fs
.readdirSync("./events")
.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
const event = require(`./events/${file}`);
if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
} else {
    client.on(event.name, async (...args) => await event.execute(...args, client));
}
}

client.slashCommands = new Collection();

const slashCommands = fs.readdirSync("./public/slash");

for (const module of slashCommands) {
 const commandFiles = fs
   .readdirSync(`./public/slash/${module}`)
   .filter((file) => file.endsWith(".js"))

 for (const commandFile of commandFiles) {
   const command = require(`./public/slash/${module}/${commandFile}`);
   client.slashCommands.set(command.data.name, command);
 }
}

const rest = new REST({ 'version': '9'}).setToken(config.Discord.token);
const commandJsonData = Array.from(client.slashCommands.values()).map((c) => c.data.toJSON());

(async () => {
  try {
		console.log(' ')
        licenselogger.success(`Bot de OxiWan`);
		console.log(' ')
    logger.success("Démarrage du rafraîchissement des commandes d'application (/).");
    await rest.put(Routes.applicationCommands(config.Discord.botId), {
      'body': commandJsonData
    });
    logger.success("Commandes d'application (/) rechargées avec succès.");
  } catch (error) {
    console.error(error);
  }
})();

async function addRole(userID) {
    try {
		const guild = await client.guilds.fetch(config.Discord.guildId),
        	 role = await guild.roles.fetch(config.Discord.verifiedRole),
          	 member = await guild.members.fetch(userID);

        member.roles.add(role)
			.catch(() => {
				logger.error(`Échec de l'ajout du rôle à l'utilisateur ${member.user.tag} ! (Le rôle vérifié est peut-être au-dessus du rôle du bot ?)`);
				return;
        	})
			.then(() => {
				logger.info(`Rôle vérifié ajouté à l'utilisateur ${member.user.tag}.`);
			})
    } catch (e) {
		console.log(e)
        logger.error(`Échec de l'ajout du rôle à l'utilisateur ${userID} !`);
    }
}

async function removeRole(userID) {
    const removeRole = config.Discord.removeRole

	if(removeRole) {
		try {
			const guild = await client.guilds.fetch(config.Discord.guildId),
				 removeRoleId = await guild.roles.fetch(config.Discord.removeRoleId),
				 member = await guild.members.fetch(userID);

			member.roles.remove(removeRoleId)
				.catch(() => {
					logger.error(`Échec de la suppression du rôle pour l'utilisateur ${member.user.tag} ! (Le rôle est peut-être au-dessus du rôle du bot ?)`);
					return;
				})
				.then(() => {
					logger.info(`Rôle supprimé pour l'utilisateur ${member.user.tag}.`);
				})
			
		} catch(e) {
			logger.error(`Échec de la suppression du rôle pour l'utilisateur ${userID} !`);
		}
	} else {
		logger.info(`La suppression du rôle est désactivée, étape ignorée.`)
	}  
}

client.login(config.Discord.token)
	.catch(() => {
		logger.fatal('Échec de la connexion ! Vos intentions sont-elles activées ?');
		process.exit(0);
	})

const app = express(),
     port = config.server.https ? config.server.httpPort : config.server.httpPort;

const rootDir = path.join(__dirname, '/');

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(rootDir, '/assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/verify/:verifyId?', (req, res) => {
    if (!req.params.verifyId) return res.sendFile(path.join(rootDir, '/html/invalidLink.html'));
    if (!pool.isValidLink(req.params.verifyId)) return res.sendFile(path.join(rootDir, '/html/invalidLink.html'));
    res.render(path.join(rootDir, '/html/verify.html'), { publicKey: config.reCAPTCHA.publicKey });
});

app.post('/verify/:verifyId?', async (req, res) => {
    if (!req.body || !req.body['g-recaptcha-response']) return res.sendFile(path.join(rootDir, '/html/invalidLink.html'));

    const response = await axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCAPTCHA.secretKey}&response=${req.body['g-recaptcha-response']}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (!response.data.success) return res.sendFile(path.join(rootDir, '/html/invalidCaptcha.html'));
    if (!pool.isValidLink(req.params.verifyId)) return res.sendFile(path.join(rootDir, '/html/invalidLink.html'));
    await addRole(pool.getDiscordId(req.params.verifyId));
    await removeRole(pool.getDiscordId(req.params.verifyId));
    pool.removeLink(req.params.verifyId);
    res.sendFile(path.join(rootDir, '/html/valid.html'));
});

const start = () => {
  const domain = config.server.domain === 'localhost' ? `${config.server.domain}:${config.server.httpPort}` : `${config.server.domain}`; 
  logger.info(`URL WebAPI : ${config.server.https ? 'https://' : 'http://'}${domain}/verify/API_ID`);
	if (config.https) {
		https.createServer({
			key: fs.readFileSync('private.pem'),
			cert: fs.readFileSync('certificate.pem')
		}, app).listen(port, () => logger.info(`Écoute sur le port ${port}.`));
	} else {
		app.listen(port, () => logger.info(`Écoute sur le port ${port}.`));
	}
}

function reconnect(client, attempts = 1) {
    setTimeout(() => {
        client.login(config.Discord.token).catch(error => {
            logger.error('Échec de la reconnexion :', error.message);
            reconnect(client, attempts + 1);
        });
    }, Math.min(1000 * 2 ** attempts, 30000));
}

client.on('disconnect', () => {
    logger.warn('Bot déconnecté. Tentative de reconnexion...');
    reconnect(client);
});

process.on('uncaughtException', (error) => {
    logger.fatal('Une exception non gérée a été capturée :', error);r
});

process.on('unhandledRejection', (reason, promise) => {
    logger.fatal('Une promesse non gérée a été rejetée :', reason);
});

client.on('shardError', (error) => {
    logger.error('Erreur critique sur le shard:', error);
});

client.on('rateLimit', (info) => {
    logger.warn(`Limite de requêtes atteinte : ${info.timeout}ms`);
});

client.on('error', (error) => {
    logger.error('Erreur générale du client Discord:', error);
});

start();
