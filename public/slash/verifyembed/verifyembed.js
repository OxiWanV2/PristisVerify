const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} = require('discord.js'),
config = require('../../../config.js'),
messages = require('../../../messages.js'),
{ Signale } = require('signale'),
logger = new Signale({ scope: 'VerifyEmbed' });

module.exports = {
  data: new SlashCommandBuilder()
    .setName(messages.verify.embed.command)
    .setDescription(messages.verify.embed.description),

  async execute(interaction) {
    const embedMessage = {
        color: messages.verify.embed.oncommand.embed.color,
        title: messages.verify.embed.oncommand.embed.title,
        description: messages.verify.embed.oncommand.embed.description,
    };

    const confirmButton = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel(messages.verify.embed.oncommand.reaction)
      .setStyle(ButtonStyle.Success);

    const actionRow = new ActionRowBuilder().addComponents(confirmButton);

    const sentMessage = await interaction.reply({
      embeds: [embedMessage],
      components: [actionRow],
      fetchReply: true,
    });

    const filter = (buttonInteraction) => {
      return buttonInteraction.customId === 'confirm' && !buttonInteraction.user.bot;
    };

    const collector = sentMessage.createMessageComponentCollector({
      filter,
      time: messages.verify.embed.oncommand.timeout,
    });

    collector.on('collect', async (buttonInteraction) => {
      const member = buttonInteraction.guild.members.cache.get(buttonInteraction.user.id);
      const verifiedRole = buttonInteraction.guild.roles.cache.get(config.Discord.verifiedRole);
      const removeRole = buttonInteraction.guild.roles.cache.get(config.Discord.removeRoleId);

      if (config.Discord.removeRole === true) {
        await member.roles.remove(removeRole);
        logger.info(`${member.user.tag} a perdu le rôle id : ${removeRole.id}`);
      }

      await member.roles.add(verifiedRole);
      const successMessage = messages.verify.embed.oncommand.success.msg
        .replace('{usertag}', buttonInteraction.user.tag)
        .replace('{rolename}', verifiedRole.name);

      await buttonInteraction.reply({
        content: successMessage,
        ephemeral: messages.verify.embed.oncommand.success.ephemeral,
      });

      const consoleMessage = messages.verify.embed.oncommand.success.consolemsg
        .replace('{usertag}', buttonInteraction.user.tag)
        .replace('{rolename}', verifiedRole.name)
        .replace('{servername}', buttonInteraction.guild.name);

      logger.info(consoleMessage);
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        interaction.followUp({
          content: messages.verify.embed.oncommand.timedout,
          ephemeral: true,
        });
      }
    });
  },
};
