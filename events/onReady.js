const { Signale } = require('signale'),
config = require('../config.js'),
logger = new Signale({ scope: 'Discord' });

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        logger.success(client.user.username + ' est en ligne !');
        
        client.user.setPresence({
            activities: [{
                type: config.Discord.statusType,
                name: '' + config.Discord.statusMsg,
            }],
            status: '' + config.Discord.status,
        });

        logger.success("Le statut de " + client.user.username + " a été activé !");
        logger.success("Le statut de " + client.user.username + " est : " + config.Discord.status + ' !');
    }
};