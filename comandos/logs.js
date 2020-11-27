const Discord = require("discord.js");

exports.run = async (
    client,
    message,
    args,
    command,
    prefix,
    prefijos,
    db,
    channelUpdate,
    channelCreate,
    channelDelete,
    emojiCreate,
    emojiDelete,
    emojiUpdate,
    guildBanAdd,
    guildBanRemove,
    guildCreate,
    guildIntegrationsUpdate,
    guildMemberAdd,
    guildMemberRemove,
    guildDelete,
    guildMemberSpeaking,
    guildMemberUpdate,
    guildMembersChunk,
    guildUpdate,
    guildUnavailable,
    messageDelete,
    messageDeleteBulk,
    messageReactionAdd,
    messageReactionRemove,
    messageReactionRemoveAll,
    messageUpdate,
    userNoteUpdate,
    roleCreate,
    roleDelete,
    roleUpdate,
    userUpdate,
    warn,
    reconnecting,
    presenceUpdate,
    disconnect,
    voiceStateUpdate,
    error,
    typingStart,
    typingStop,
    webhookUpdate,
    permisos
) => {
    if (!args[0]) {
        //////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////USO/////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////
        const embed = new Discord.MessageEmbed()
            .setTitle("Uso")
            .addField(
                prefix + "logs ver",
                "Mira las logs establecidas para este servidor",
                false
            )
            .addField(
                prefix + "logs set <all (off[opcional])/tipo de log (#canal/off)>",
                "Establece los logs",
                false
            )
            .setColor("RANDOM");
        message.channel.send(embed);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////VER/////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    if (args[0] == "ver") {
        const embed = new Discord.MessageEmbed()
            .setTitle("Logs establecidos para " + message.guild.name)
            .setColor("RANDOM")
            .addField(
                "Actualización de canal (channelUpdate)",
                channelUpdate.tiene(message.guild.id)
                    ? "<#" + (await channelUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Creación de canal (channelCreate)",
                channelCreate.tiene(message.guild.id)
                    ? "<#" + (await channelCreate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Eliminación de canal (channelDelete)",
                channelDelete.tiene(message.guild.id)
                    ? "<#" + (await channelDelete.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )

            .addField(
                "Creación de un emoji (emojiCreate)",
                emojiCreate.tiene(message.guild.id)
                    ? "<#" + (await emojiCreate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Eliminación de un emoji (emojiDelete)",
                emojiDelete.tiene(message.guild.id)
                    ? "<#" + (await emojiDelete.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Actualización de emoji (emojiUpdate)",
                emojiUpdate.tiene(message.guild.id)
                    ? "<#" + (await emojiUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro baneado (guildBanAdd)",
                guildBanAdd.tiene(message.guild.id)
                    ? "<#" + (await guildBanAdd.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro desbaneado (guildBanRemove)",
                guildBanRemove.tiene(message.guild.id)
                    ? "<#" + (await guildBanRemove.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            );
        const embed0 = new Discord.MessageEmbed()
            .setTitle("Logs establecidos para " + message.guild.name)
            .setColor("RANDOM")
            .addField(
                "Estoy en un nuevo servidor (guildCreate)",
                guildCreate.tiene(message.guild.id)
                    ? "<#" + (await guildCreate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Me sacan de un servidor (guildDelete)",
                guildDelete.tiene(message.guild.id)
                    ? "<#" + (await guildDelete.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Integraciones actualizadas (guildIntegrationsUpdate)",
                guildIntegrationsUpdate.tiene(message.guild.id)
                    ? "<#" +
                    (await guildIntegrationsUpdate.obtener(message.guild.id)) +
                    ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro se une al servidor (guildMemberAdd)",
                guildMemberAdd.tiene(message.guild.id)
                    ? "<#" + (await guildMemberAdd.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro deja el servidor (guildMemberRemove)",
                guildMemberRemove.tiene(message.guild.id)
                    ? "<#" + (await guildMemberRemove.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro habla en un canal de voz (guildMemberSpeaking)",
                guildMemberSpeaking.tiene(message.guild.id)
                    ? "<#" + (await guildMemberSpeaking.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Miembro se actualiza (guildMemberUpdate)",
                guildMemberUpdate.tiene(message.guild.id)
                    ? "<#" + (await guildMemberUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            );
        const embed1 = new Discord.MessageEmbed()
            .setTitle("Logs establecidos para " + message.guild.name)
            .setColor("RANDOM")
            .addField(
                "Cantidad de miembros de un servidor se unen (guildMembersChunk)",
                guildMembersChunk.tiene(message.guild.id)
                    ? "<#" + (await guildMembersChunk.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Servidor editado (guildUpdate)",
                guildUpdate.tiene(message.guild.id)
                    ? "<#" + (await guildUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Servidor no disponible (guildUnavaliable)",
                guildUnavailable.tiene(message.guild.id)
                    ? "<#" + (await guildUnavailable.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Mensaje eliminado (messageDelete)",
                messageDelete.tiene(message.guild.id)
                    ? "<#" + (await messageDelete.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Mensajes eliminados (messageDeleteBulk)",
                messageDeleteBulk.tiene(message.guild.id)
                    ? "<#" + (await messageDeleteBulk.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Una reaccion es añadida (messageReactionAdd)",
                messageReactionAdd.tiene(message.guild.id)
                    ? "<#" + (await messageReactionAdd.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Una reaccion se remueve (messageReactionRemove)",
                messageReactionRemove.tiene(message.guild.id)
                    ? "<#" + (await messageReactionRemove.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Todas las reacciones de un mensaje se remueven (messageReacionRemoveAll)",
                messageReactionRemoveAll.tiene(message.guild.id)
                    ? "<#" +
                    (await messageReactionRemoveAll.obtener(message.guild.id)) +
                    ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            );
        const embed2 = new Discord.MessageEmbed()
            .setTitle("Logs establecidos para " + message.guild.name)
            .setColor("RANDOM")
            .addField(
                "Un mensaje es editado (messsageUpdate)",
                messageUpdate.tiene(message.guild.id)
                    ? "<#" + (await messageUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "La nota de un usuario es editada (userNoteUpdate)",
                userNoteUpdate.tiene(message.guild.id)
                    ? "<#" + (await userNoteUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Un rol es creado (roleCreate)",
                roleCreate.tiene(message.guild.id)
                    ? "<#" + (await roleCreate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Un rol es eliminado",
                roleDelete.tiene(message.guild.id)
                    ? "<#" + (await roleDelete.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Un rol es editado (roleUpdate)",
                roleUpdate.tiene(message.guild.id)
                    ? "<#" + (await roleUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Un usuario se actualiza (userUpdate)",
                userUpdate.tiene(message.guild.id)
                    ? "<#" + (await userUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Advertencia sobre el bot (warn)",
                warn.tiene(message.guild.id)
                    ? "<#" + (await warn.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Me estoy reconectando (reconnecting)",
                reconnecting.tiene(message.guild.id)
                    ? "<#" + (await reconnecting.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            );
        const embed3 = new Discord.MessageEmbed()
            .setTitle("Logs establecidos para " + message.guild.name)
            .setColor("RANDOM")
            .addField(
                "Alguien actualiza su estado (presenceUpdate)",
                presenceUpdate.tiene(message.guild.id)
                    ? "<#" + (await presenceUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Me desconecto (disconnect)",
                disconnect.tiene(message.guild.id)
                    ? "<#" + (await disconnect.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Alguien cambia su estado en el canal de voz (voiceStateUpdate)",
                voiceStateUpdate.tiene(message.guild.id)
                    ? "<#" + (await voiceStateUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Tengo un error (error)",
                error.tiene(message.guild.id)
                    ? "<#" + (await error.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Alguien empieza a escribir (typingStart)",
                typingStart.tiene(message.guild.id)
                    ? "<#" + (await typingStart.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Alguien deja de escribir (typingStop)",
                typingStop.tiene(message.guild.id)
                    ? "<#" + (await typingStop.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            )
            .addField(
                "Un webhook se crea, elimina o actualiza",
                webhookUpdate.tiene(message.guild.id)
                    ? "<#" + (await webhookUpdate.obtener(message.guild.id)) + ">"
                    : "<:desactivado:780782730338107413> Desactivado"
            );

        let l = await message.channel.send(embed);
        if (permisos.has("ADD_REACTIONS")) {
            await l.react("1️⃣");
            await l.react("2️⃣");
            await l.react("3️⃣");
            await l.react("4️⃣");
            await l.react("5️⃣");
            await l.awaitReactions(async (reaction, user) => {
                if (reaction.emoji.name === "1️⃣") {
                    l.edit(embed);
                }
                if (reaction.emoji.name === "2️⃣") {
                    l.edit(embed0);
                }
                if (reaction.emoji.name === "3️⃣") {
                    l.edit(embed1);
                }
                if (reaction.emoji.name === "4️⃣") {
                    l.edit(embed2);
                }
                if (reaction.emoji.name === "5️⃣") {
                    l.edit(embed3);
                }
            });
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////SET/////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    if (args[0] == "set") {
        if (!message.member.permissions.has("MANAGE_GUILD"))
            return message.channel.send("No tienes permisos");
        if (!message.guild.me.permissions.has("VIEW_AUDIT_LOG"))
            return message.reply(
                "Necesito el permiso de ver el registro de auditoría para funcionar!"
            );
        let canal =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]);
        if (!args[1])
            return message.reply(
                "Escribe `all` o escribe un log (para ver logs usa `" +
                prefix +
                "logs ver`)"
            );

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////SET ALL/////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (args[1] == "all") {
            if (!args[2]) {
                if (!canal) return message.reply("Debes mencionar un canal o una ID");
                channelUpdate.establecer(`${message.guild.id}`, `${canal.id}`);
                channelCreate.establecer(`${message.guild.id}`, canal.id);
                channelDelete.establecer(message.guild.id, canal.id);
                emojiCreate.establecer(message.guild.id, canal.id);
                emojiDelete.establecer(message.guild.id, canal.id);
                emojiUpdate.establecer(message.guild.id, canal.id);
                guildBanAdd.establecer(message.guild.id, canal.id);
                guildBanRemove.establecer(message.guild.id, canal.id);
                guildIntegrationsUpdate.establecer(message.guild.id, canal.id);
                guildMemberAdd.establecer(message.guild.id, canal.id);
                guildMemberRemove.establecer(message.guild.id, canal.id);
                guildDelete.establecer(message.guild.id, canal.id);
                guildUnavailable.establecer(message.guild.id, canal.id);
                guildMemberSpeaking.establecer(message.guild.id, canal.id);
                guildMemberUpdate.establecer(message.guild.id, canal.id);
                guildMembersChunk.establecer(message.guild.id, canal.id);
                guildUpdate.establecer(message.guild.id, canal.id);
                messageDelete.establecer(message.guild.id, canal.id);
                messageDeleteBulk.establecer(message.guild.id, canal.id);
                messageReactionAdd.establecer(message.guild.id, canal.id);
                messageReactionRemove.establecer(message.guild.id, canal.id);
                messageReactionRemoveAll.establecer(message.guild.id, canal.id);
                messageUpdate.establecer(message.guild.id, canal.id);
                userNoteUpdate.establecer(message.guild.id, canal.id);
                roleCreate.establecer(message.guild.id, canal.id);
                roleDelete.establecer(message.guild.id, canal.id);
                roleUpdate.establecer(message.guild.id, canal.id);
                userUpdate.establecer(message.guild.id, canal.id);
                warn.establecer(message.guild.id, canal.id);
                reconnecting.establecer(message.guild.id, canal.id);
                presenceUpdate.establecer(message.guild.id, canal.id);
                disconnect.establecer(message.guild.id, canal.id);
                voiceStateUpdate.establecer(message.guild.id, canal.id);
                error.establecer(message.guild.id, canal.id);
                typingStart.establecer(message.guild.id, canal.id);
                typingStop.establecer(message.guild.id, canal.id);
                webhookUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "Todas las logs fueron establecidas a <#" + canal.id + "> !!"
                );

                //////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////SET ALL OFF/////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////
            }
            if (args[2] == "off") {
                if (channelUpdate.tiene(message.guild.id))
                    channelUpdate.eliminar(`${message.guild.id}`);
                if (channelCreate.tiene(message.guild.id))
                    channelCreate.eliminar(`${message.guild.id}`);
                if (channelDelete.tiene(message.guild.id))
                    channelDelete.eliminar(message.guild.id);
                if (emojiCreate.tiene(message.guild.id))
                    emojiCreate.eliminar(message.guild.id);
                if (emojiDelete.tiene(message.guild.id))
                    emojiDelete.eliminar(message.guild.id);
                if (emojiUpdate.tiene(message.guild.id))
                    emojiUpdate.eliminar(message.guild.id);
                if (guildBanAdd.tiene(message.guild.id))
                    guildBanAdd.eliminar(message.guild.id);
                if (guildBanRemove.tiene(message.guild.id))
                    guildBanRemove.eliminar(message.guild.id);
                if (guildCreate.tiene(message.guild.id))
                    guildCreate.eliminar(message.guild.id);
                if (guildIntegrationsUpdate.tiene(message.guild.id))
                    guildIntegrationsUpdate.eliminar(message.guild.id);
                if (guildMemberAdd.tiene(message.guild.id))
                    guildMemberAdd.eliminar(message.guild.id);
                if (guildMemberRemove.tiene(message.guild.id))
                    guildMemberRemove.eliminar(message.guild.id);
                if (guildDelete.tiene(message.guild.id))
                    guildDelete.eliminar(message.guild.id);
                if (guildUnavailable.tiene(message.guild.id))
                    guildUnavailable.eliminar(message.guild.id);
                if (guildMemberSpeaking.tiene(message.guild.id))
                    guildMemberSpeaking.eliminar(message.guild.id);
                if (guildMemberUpdate.tiene(message.guild.id))
                    guildMemberUpdate.eliminar(message.guild.id);
                if (guildMembersChunk.tiene(message.guild.id))
                    guildMembersChunk.eliminar(message.guild.id);
                if (guildUpdate.tiene(message.guild.id))
                    guildUpdate.eliminar(message.guild.id);
                if (messageDelete.tiene(message.guild.id))
                    messageDelete.eliminar(message.guild.id);
                if (messageDeleteBulk.tiene(message.guild.id))
                    messageDeleteBulk.eliminar(message.guild.id);
                if (messageReactionAdd.tiene(message.guild.id))
                    messageReactionAdd.eliminar(message.guild.id);
                if (messageReactionAdd.tiene(message.guild.id))
                    messageReactionRemove.eliminar(message.guild.id);
                if (messageReactionRemoveAll.tiene(message.guild.id))
                    messageReactionRemoveAll.eliminar(message.guild.id);
                if (messageUpdate.tiene(message.guild.id))
                    messageUpdate.eliminar(message.guild.id);
                if (userNoteUpdate.tiene(message.guild.id))
                    userNoteUpdate.eliminar(message.guild.id);
                if (roleCreate.tiene(message.guild.id))
                    roleCreate.eliminar(message.guild.id);
                if (roleDelete.tiene(message.guild.id))
                    roleDelete.eliminar(message.guild.id);
                if (roleUpdate.tiene(message.guild.id))
                    roleUpdate.eliminar(message.guild.id);
                if (userUpdate.tiene(message.guild.id))
                    userUpdate.eliminar(message.guild.id);
                if (warn.tiene(message.guild.id)) warn.eliminar(message.guild.id);
                if (reconnecting.tiene(message.guild.id))
                    reconnecting.eliminar(message.guild.id);
                if (presenceUpdate.tiene(message.guild.id))
                    presenceUpdate.eliminar(message.guild.id);
                if (voiceStateUpdate.tiene(message.guild.id))
                    voiceStateUpdate.eliminar(message.guild.id);
                if (error.tiene(message.guild.id)) error.eliminar(message.guild.id);
                if (typingStart.tiene(message.guild.id))
                    typingStart.eliminar(message.guild.id);
                if (typingStop.tiene(message.guild.id))
                    typingStop.eliminar(message.guild.id);
                if (webhookUpdate.tiene(message.guild.id))
                    webhookUpdate.eliminar(message.guild.id);
                message.channel.send("Todas las logs fueron desactivadas!");
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////SET CHANNELUPDATE///////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (args[1].toLowerCase() === "channelupdate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!channelUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                channelUpdate.eliminar(message.guild.id);
                message.channel.send("El log `channelUpdate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                channelUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `channelUpdate` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "messagedelete") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!channelUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                messageDelete.eliminar(message.guild.id);
                message.channel.send("El log `messageDelete` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                messageDelete.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `messageDelete` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "channelcreate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!channelCreate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                channelCreate.eliminar(message.guild.id);
                message.channel.send("El log `channelCreate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                channelCreate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `channelCreate` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "channeldelete") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!channelDelete.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                channelDelete.eliminar(message.guild.id);
                message.channel.send("El log `channelDelete` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                channelDelete.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `channelDelete` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "emojicreate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!emojiCreate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                emojiCreate.eliminar(message.guild.id);
                message.channel.send("El log `emojiCreate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                emojiCreate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `emojiCreate` fue establecido a <#" + canal + ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "messageupdate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!messageUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                messageUpdate.eliminar(message.guild.id);
                message.channel.send("El log `messageUpdate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                messageUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `messageUpdate` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "emojiupdate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!emojiUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                emojiUpdate.eliminar(message.guild.id);
                message.channel.send("El log `emojiUpdate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                emojiUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `emojiUpdate` fue establecido a <#" + canal + ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildbanadd") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildBanAdd.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildBanAdd.eliminar(message.guild.id);
                message.channel.send("El log `guildBanAdd` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildBanAdd.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildBanAdd` fue establecido a <#" + canal + ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildbanremove") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildBanRemove.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildBanRemove.eliminar(message.guild.id);
                message.channel.send("El log `guildBanRemove` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildBanRemove.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildBanRemove` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildintegrationsupdate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildIntegrationsUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildIntegrationsUpdate.eliminar(message.guild.id);
                message.channel.send("El log `guildIntegrationsUpdate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildIntegrationsUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildIntegrationsUpdate` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildmemberadd") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildMemberAdd.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildMemberAdd.eliminar(message.guild.id);
                message.channel.send("El log `guildMemberAdd` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildMemberAdd.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildMemberAdd` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildmemberremove") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildMemberRemove.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildMemberRemove.eliminar(message.guild.id);
                message.channel.send("El log `guildMemberRemove` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildMemberRemove.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildMemberRemove` fue establecido a <#" +
                    canal +
                    ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guilddelete") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildDelete.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildDelete.eliminar(message.guild.id);
                message.channel.send("El log `guildDelete` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildMemberRemove.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildDelete` fue establecido a <#" + canal + ">!!"
                );
            }
        }

        if (args[1].toLowerCase() === "guildcreate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildCreate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildCreate.eliminar(message.guild.id);
                message.channel.send("El log `guildCreate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildCreate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildCreate` fue establecido a <#" + canal + ">!!"
                );
            }
        }


        if (args[1].toLowerCase() === "guildunavailable") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildUnavailable.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildUnavailable.eliminar(message.guild.id);
                message.channel.send("El log `guildUnavailable` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildUnavailable.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildUnavailable` fue establecido a <#" + canal + ">!!"
                );
            }
        }


        if (args[1].toLowerCase() === "guildmemberspeaking") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildMemberSpeaking.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildMemberSpeaking.eliminar(message.guild.id);
                message.channel.send("El log `guildMemberSpeaking` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildMemberSpeaking.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildMemberSpeaking` fue establecido a <#" + canal + ">!!"
                );
            }
        }


        if (args[1].toLowerCase() === "guildmemberupdate") {
            if (!args[2])
                return message.channel.send("Escribe `off` o menciona un canal");

            if (args[2].toLowerCase() === "off") {
                if (!guildMemberUpdate.tiene(message.guild.id))
                    return message.reply("Este servidor no tiene este log!");
                guildMemberUpdate.eliminar(message.guild.id);
                message.channel.send("El log `guildMemberUpdate` se desactivó!");
            } else {
                if (!canal) return message.reply("Debes mencionar un canal");
                guildMemberUpdate.establecer(message.guild.id, canal.id);
                message.channel.send(
                    "El canal del log `guildMemberUpdate` fue establecido a <#" + canal + ">!!"
                );
            }
        }
    }
};
