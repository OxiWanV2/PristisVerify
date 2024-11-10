const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js'),
config = require('../../../config.js'),
messages = require('../../../messages.js'),
pool = require('../../../pool.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName(messages.verify.dm.command)
    .setDescription(messages.verify.dm.description),

  async execute(interaction) {
    const domain =
      config.server.domain === 'localhost'
        ? `${config.server.domain}:${config.server.httpPort}`
        : config.server.domain;

    if (
      interaction.member.roles.cache.some(
        (role) => role.id === config.Discord.verifiedRole
      )
    ) {
      await interaction.reply({
        content: messages.verify.dm.oncommand.failedverify,
        ephemeral: true,
      });
      return;
    }

    if (config.Discord.rulesEnabled) {
      const rulesButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('accept_rules')
          .setLabel(messages.verify.dm.oncommand.button.rulesbutton.label)
          .setEmoji(messages.verify.dm.oncommand.button.rulesbutton.emoji)
          .setStyle(1)
      );

      const rulesEmbed = new EmbedBuilder()
        .setColor(config.Discord.rulescolor)
        .setTitle(config.Discord.rulestitle)
        .setDescription(config.Discord.rules);

      await interaction.reply({
        embeds: [rulesEmbed],
        content: messages.verify.dm.oncommand.acceptmsg.msg,
        components: [rulesButton],
        ephemeral: true,
      });

      try {
        const buttonInteraction = await interaction.channel.awaitMessageComponent({
          filter: (i) =>
            i.customId === 'accept_rules' && i.user.id === interaction.user.id,
          time: 60000,
        });

        if (!buttonInteraction) {
          await interaction.followUp({
            content: messages.verify.dm.oncommand.timedout,
            ephemeral: true,
          });
          return;
        }
      } catch (error) {
        await interaction.followUp({
          content: messages.verify.dm.oncommand.timedout,
          ephemeral: true,
        });
        return;
      }
    }

    await interaction.followUp({
      content: messages.verify.dm.oncommand.checkdm,
      ephemeral: true,
    });

    const linkID = pool.createLink(interaction.user.id);
    const captchaEmbed = new EmbedBuilder()
      .setColor(messages.verify.dm.oncommand.captchaEmbed.color)
      .setTitle(messages.verify.dm.oncommand.captchaEmbed.title)
      .setDescription(
        `${messages.verify.dm.oncommand.captchaEmbed.description}\n${
          config.server.https ? 'https://' : 'http://'
        }${domain}/verify/${linkID}`
      );

    try {
      const dmChannel = await interaction.user.createDM();
      await dmChannel.send({ embeds: [captchaEmbed] });
    } catch (error) {
      logger.error(
        "Échec de l'envoi du captcha à l'utilisateur ! (Peut-être que ses messages privés sont désactivés ?)"
      );
    }
  },
};
