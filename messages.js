module.exports = {
    config: {
        noperm: "Vous n'avez pas la permission d'utiliser cette commande !",
        reload: {
            success: "Vous avez rechargé le fichier de configuration !",
            console: "La configuration a été rechargée par l'utilisateur"
        },
        set: {
            invalid_format: "Utilisation incorrecte ! Utilisation correcte : /config set (variable de config, exemple : roleid) (nouvelle valeur, exemple : 1234)",
            success: "La valeur de {parameter} a été modifiée avec succès : {newvalue}",
        },
        get: {
            success: "Voici la valeur de {parameter} : {value}"
        }
    },
    verify: {
        onjoin: {
            enabled: true,
            important: "Bienvenue sur le Discord officiel de X, pour accéder à l'intégralité du serveur, il te faudra accepter le règlement et valider un captcha Google !",
            captchaEmbed: {
                color: "#0099ff",
                title: "Vérification captcha",
                description: "Pour accéder à ce serveur, vous devez résoudre un captcha. Le lien expirera dans 15 minutes."
            }
        },
        dm: {
            command: "verify",
            description: "Permet de vérifier que tu n'es pas un robot 🤖",
            oncommand: {
                failedverify: "Oups, vous êtes déjà vérifié !",
                button: {
                    rulesbutton: {
                        label: "J'accepte le règlement et l'applique sur l'ensemble du Discord",
                        emoji: "✅",
                        style: "3" // 1 = Principal, 2 = Secondaire, 3 = Succès, 4 = Danger, 5 = Lien
                    }
                },
                acceptmsg: {
                    msg: ":wave: Accepte le règlement avant de continuer.",
                    ephemeral: "true"
                },
                timedout: "Vous n'avez pas accepté les règles. Vérification annulée.",
                checkdm: "Un lien de vérification vous a été envoyé en privé !",
                checkdm_ephemeral: true,
                captchaEmbed: {
                    color: "#0099ff",
                    title: "Vérification CAPTCHA",
                    description: "Pour accéder à ce serveur, vous devez résoudre un captcha. Le lien expirera dans 15 minutes."
                }
            }
        },
        embed: {
            command: "verifyembed",
            description: "Envoie une intégration avec une réaction. Si l'utilisateur réagit, assigne le rôle !",
            oncommand: {
                embed: {
                    title: "Vérification",
                    color: 0x0099ff,
                    description: "Réagissez à ce message pour vous vérifier !"
                },
                reaction: "Confirmer",
                timeout: null,
                timedout: "Vérification hors délai. Veuillez réessayer.",
                success: {
                    msg: "Cher(e) {usertag} ! Vous avez obtenu le rôle {rolename} ! ",
                    consolemsg: "{usertag} a été vérifié via l'intégration ! Il/Elle a obtenu {rolename} dans {servername}",
                    ephemeral: true
                }
            }
        
        }
    },
    unverify: {
        command: "unverify",
        description: "Se dévérifier soi-même dans le serveur.",
        oncommand: {
            failedunverify: "Vous n'êtes pas vérifié !",
            success: "Vous avez été dévérifié avec succès !"
        }
    }
}