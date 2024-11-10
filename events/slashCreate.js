const { Signale } = require('signale'),
logger = new Signale({ scope: 'slashCreate' });

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { client } = interaction;
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({
                content: 'Il y a eu un problème lors de l\'exécution de cette commande !',
                ephemeral: true
            });
        }
    }
};