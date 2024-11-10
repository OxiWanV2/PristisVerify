const { Signale } = require('signale');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const logger = new Signale({ scope: 'Discord' });
const config = require('../config.js');
const messages = require('../messages.js');
const pool = require('../pool.js');

module.exports = {
	name: "guildMemberAdd",

	async execute(member) {
        const domain = config.server.domain === 'localhost' ? `${config.server.domain}:${config.server.httpPort}` : `${config.server.domain}`; 
        
        if (config.Discord.rulesEnabled) {
            const linkID = pool.createLink(member.id);

            const rulesEmbed = new EmbedBuilder()
                .setColor(config.Discord.rulescolor)
                .setTitle(config.Discord.rulestitle)
                .setDescription(config.Discord.rules);

            const captchaEmbed = new EmbedBuilder()
                .setColor(messages.verify.onjoin.captchaEmbed.color)
                .setTitle(messages.verify.onjoin.captchaEmbed.title)
                .setDescription(messages.verify.onjoin.captchaEmbed.description + `\n${config.server.https ? 'https://' : 'http://' }${domain}/verify/${linkID}`);

            member.send({ 
                content: messages.verify.onjoin.important, 
                embeds: [rulesEmbed, captchaEmbed] 
            }).catch(() => {
                logger.error(`Échec de l'envoi du captcha à l'utilisateur ! (Peut-être que ses messages privés sont désactivés ?)`);
            });    
                
        } else {
            const linkID = pool.createLink(member.id);
            const captchaEmbed = new EmbedBuilder()
                .setColor(messages.verify.onjoin.captchaEmbed.color)
                .setTitle(messages.verify.onjoin.captchaEmbed.title)
                .setDescription(messages.verify.onjoin.captchaEmbed.description + `\n${config.server.https ? 'https://' : 'http://' }${domain}/verify/${linkID}`);

            member.send({ 
                content: messages.verify.onjoin.important, 
                embeds: [captchaEmbed] 
            }).catch(() => {
                logger.error(`Échec de l'envoi du captcha à l'utilisateur ! (Peut-être que ses messages privés sont désactivés ?)`);
            });    
        }
	},
};