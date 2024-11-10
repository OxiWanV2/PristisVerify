const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'),
  config = require('../../../config.js'),
  messages = require('../../../messages.js'),
  pool = require('../../../pool.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName(messages.unverify.command)
    .setDescription(messages.unverify.description),

  async execute(interaction) {
    const member = interaction.member;
    const verifiedRole = member.roles.cache.find(
      (role) => role.id === config.Discord.verifiedRole
    );

    if (!verifiedRole) {
      await interaction.reply({
        content: messages.unverify.oncommand.failedunverify,
        ephemeral: true,
      });
      return;
    }

    try {
      await member.roles.remove(verifiedRole);
      await interaction.reply({
        content: messages.unverify.oncommand.success,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      
      await interaction.reply({
        content: 'Une erreur est survenue lors de la suppression de votre vérification.',
        ephemeral: true,
      });
    }
  },
};
