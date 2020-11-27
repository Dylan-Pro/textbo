const {
  Client,
  Util,
  MessageEmbed,
  MessageAttachment,
  Intents
} = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
let prefijos = new db.crearDB("prefijos");
let channelUpdate = new db.crearDB("channelUpdate");
let emojiUpdate = new db.crearDB("emojiUpdate");
let guildUpdate = new db.crearDB("guildUpdate");
let messageUpdate = new db.crearDB("messageUpdate");
let userNoteUpdate = new db.crearDB("userNoteUpdate");
let roleUpdate = new db.crearDB("roleUpdate");
let userUpdate = new db.crearDB("userUpdate");
let guildIntegrationsUpdate = new db.crearDB("guildIntegrationsUpdate");
let warn = new db.crearDB("warn");
let messageReactionAdd = new db.crearDB("messageReactionAdd");
let guildCreate = new db.crearDB("guildCreate");
let guildDelete = new db.crearDB("guildDelete");
let reconnecting = new db.crearDB("reconnecting");
let guildBanAdd = new db.crearDB("guildBanAdd");
let presenceUpdate = new db.crearDB("presenceUpdate");
let channelCreate = new db.crearDB("channelCreate");
let emojiCreate = new db.crearDB("emojiCreate");
let roleCreate = new db.crearDB("roleCreate");
let disconnect = new db.crearDB("disconnect");
let guildBanRemove = new db.crearDB("guildBanRemove");
let channelDelete = new db.crearDB("channelDelete");
let emojiDelete = new db.crearDB("emojiDelete");
let messageDelete = new db.crearDB("messageDelete");
let messageDeleteBulk = new db.crearDB("messageDeleteBulk");
let roleDelete = new db.crearDB("roleDelete");
let voiceStateUpdate = new db.crearDB("voiceStateUpdate");
let error = new db.crearDB("error");
let guildMemberAdd = new db.crearDB("guildMemberAdd");
let guildMemberRemove = new db.crearDB("guildMemberRemove");
let guildMembersChunk = new db.crearDB("guildMembersChunk");
let guildMemberSpeaking = new db.crearDB("guildMemberSpeaking");
let guildMemberUpdate = new db.crearDB("guildMemberUpdate");
let typingStart = new db.crearDB("typingStart");
let typingStop = new db.crearDB("typingStop");
let webhookUpdate = new db.crearDB("webhookUpdate");
let messageReactionRemove = new db.crearDB("messageReactionRemove");
let messageReactionRemoveAll = new db.crearDB("messageReactionRemoveAll");
let guildUnavailable = new db.crearDB("guildUnavailable");
const client = new Client();
const fs = require("fs");
const moment = require("moment");
const { debug } = require("console");
client.comandos = new Discord.Collection();
client.alias = new Discord.Collection();
moment.locale("es");

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////READY/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
  console.log(client.user.tag);
  client.user.setStatus("online");
  client.user.setActivity("Logs, log!ayuda", { type: "WATCHING" });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////ARCHIVOS Y COMANDOS/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (const file of fs.readdirSync("./comandos/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./comandos/${file}`);
    client.comandos.set(fileName, fileContents);
    if (fileContents.alias) {
      for (let alias of fileContents.alias) {
        client.alias.set(alias, fileContents);
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MESSAGE/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  let prefix = prefijos.tiene(message.guild.id)
    ? await prefijos.obtener(message.guild.id)
    : "log!";
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let command = args.shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (message.author.bot) return;
  let permisos = message.channel.permissionsFor(message.guild.me);

  let cmd = await client.comandos.get(command);
  if (!cmd) return;
  cmd.run(
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
    guildUnavailable,
    guildMemberSpeaking,
    guildMemberUpdate,
    guildMembersChunk,
    guildUpdate,
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
    permisos,
    moment
  );
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MESSAGEDELETE////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
client.on("messageDelete", async message => {
  if (!message.channel.type === "dm") return;
  let messagede = await messageDelete.obtener(message.guild.id);

  let getchannel = await client.channels.cache.get(messagede);
  if (!getchannel) return;
  const alerta = new Discord.MessageEmbed()
    .setTitle("MessageDelete Logs")
    .setAuthor(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .addField("Mensaje de", "<@" + message.author.id + ">")
    .addField("Canal", "<#" + message.channel.id + ">")
    .addField("Mensaje", message.content)
    .addField("ID del mensaje", message.id)
    .setColor("#ff0000");
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CHANNELUPDATE////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
client.on("channelUpdate", async (oldc, newc) => {
  if (!oldc.guild) return;
  let channelu = await channelUpdate.obtener(oldc.guild.id);
  let getchannel = await client.channels.cache.get(channelu);
  if (!getchannel) return;
  if (!oldc.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  oldc.guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    if (oldc.name != newc.name) {
      const alerta = new Discord.MessageEmbed()
        .setTitle("ChannelUpdate logs")
        .setDescription("Un canal fue editado")
        .addField("Canal", "<#" + oldc.id + ">")
        .addField("Antiguo nombre", oldc.name)
        .addField("Nuevo nombre", newc.name)
        .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
        .setColor("#ff0000");
      getchannel.send(alerta);
    }
    if (oldc.topic != newc.topic) {
      const alerta = new Discord.MessageEmbed()
        .setTitle("ChannelUpdate logs")
        .setDescription("Un canal fue editado")
        .addField("Canal", "<#" + oldc.id + ">")
        .addField(
          "Tópico anterior",
          oldc.topic != null ? oldc.topic : "Ninguno"
        )
        .addField("Nuevo tópico", newc.topic != null ? newc.topic : "Ninguno")
        .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
        .setColor("#ff0000");
      getchannel.send(alerta);
    }
    if (oldc.rateLimitPerUser != newc.rateLimitPerUser) {
      const alerta = new Discord.MessageEmbed()
        .setTitle("ChannelUpdate logs")
        .setDescription("Un canal fue editado")
        .addField("Canal", "<#" + oldc.id + ">")
        .addField(
          "Cooldown anterior",
          (oldc.rateLimitPerUser / 60).toFixed(2) +
            " Minutos (" +
            oldc.rateLimitPerUser +
            " Segundos)"
        )
        .addField(
          "Cooldown actual",
          (newc.rateLimitPerUser / 60).toFixed(2) +
            " Minutos " +
            "(" +
            newc.rateLimitPerUser +
            " Segundos)"
        )
        .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
        .setColor("#ff0000");
      getchannel.send(alerta);
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CHANNELCREATE////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("channelCreate", async channel => {
  if (!channel.guild) return;
  let channelc = await channelCreate.obtener(channel.guild.id);
  let getchannel = await client.channels.cache.get(channelc);
  if (!getchannel) return;
  if (!channel.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  channel.guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
      .setTitle("ChannelCreate logs")
      .setDescription("Un canal fue creado")
      .addField("Canal", "<#" + channel.id + ">")
      .addField("ID", channel.id)
      .addField(
        "Tipo",
        channel.type
          .replace("text", "Canal de texto")
          .replace("voice", "Canal de voz")
      )
      .addField("Creador", `${moderador.tag}(<@${moderador.tag}>)`)
      .setColor("#ff0000");
    getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CHANNELDELETE////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("channelDelete", async channel => {
  if (!channel.guild) return;
  let channeld = await channelDelete.obtener(channel.guild.id);
  let getchannel = await client.channels.cache.get(channeld);
  if (!getchannel) return;
  if (!channel.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  channel.guild.fetchAuditLogs().then(logs => {
    const alerta = new Discord.MessageEmbed()
      .setTitle("ChannelDelete logs")
      .setDescription("Un canal fue eliminado")
      .addField("Nombre del canal", channel.name)
      .addField("ID", channel.id)
      .addField(
        "Tipo",
        channel.type
          .replace("text", "Canal de texto")
          .replace("voice", "Canal de voz")
      )
      .addField("Eliminador", `${channel.author.tag}(<@${channel.author.id}>)`)
      .setColor("#ff0000");
    getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////EMOJICREATE//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("emojiCreate", async emoji => {
  if (!emoji.guild) return;
  let emojic = await emojiCreate.obtener(emoji.guild.id);
  let getchannel = await client.channels.cache.get(emojic);
  if (!getchannel) return;
  if (!emoji.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

  emoji.guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
      .setTitle("EmojiCreate logs")
      .setDescription("Un emoji fue creado")
      .addField("Nombre", emoji.name)
      .setColor("#ff0000")
      .addField("Creador del emoji", `${moderador.tag}(<@${moderador.id}>)`)
      .setThumbnail(emoji.url);
    if (emoji.animated) {
      alerta
        .addField("Corta ID", emoji.id)
        .addField("Larga ID", "`<" + emoji.identifier + ">`")
        .addField("Emoji", "<" + emoji.identifier + ">");
    }
    if (!emoji.animated) {
      alerta
        .addField("Corta ID", emoji.id)
        .addField("Larga ID", "`<:" + emoji.identifier + ">`")
        .addField("Emoji", "<:" + emoji.identifier + ">");
    }
    getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MESSAGEUPDATE////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("messageUpdate", async (oldM, newM) => {
  if (!oldM.guild) return;
  let messageu = await messageUpdate.obtener(oldM.guild.id);
  let getchannel = await client.channels.cache.get(messageu);
  if (!getchannel) return;
  if (!oldM.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

  const alerta = new Discord.MessageEmbed()
    .setTitle("MessageUpdate logs")
    .setDescription("Un mensaje fue editado")
    .addField("Mensaje anterior", oldM.content != null ? oldM.content : "Ninguno")
    .addField("Mensaje ahora", newM.content != null ? newM.content : "Ninguno")
    .addField("ID mensaje", newM.id)
    .addField("Mensaje de", oldM.author.tag+`<@${oldM.author.id}>`)
    .addField(
      "Mensaje",
      `[Ir al mensaje](https://discordapp.com/channels/${newM.guild.id}/${newM.channel.id}/${newM.id})`
    )
    .setColor("#ff0000")
    .setAuthor(
      newM.author.tag,
      newM.author.displayAvatarURL({ dynamic: true })
    );
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDBANADD//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildBanAdd", async (guild, user) => {
  let guildb = await guildBanAdd.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildb);
  if (!getchannel) return;
  if (!guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
      .setTitle("GuildBanAdd logs")
      .setDescription("Alguien fue baneado")
      .addField("Usuario", `${user.tag}(<@${user.id}>)`)
      .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
      .setColor("#ff0000")
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }));
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDBANREMOVE///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildBanRemove", async (guild, user) => {
  let guildbr = await guildBanRemove.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildbr);
  if (!getchannel) return;
  if (!guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
      .setTitle("GuildBanRemove logs")
      .setDescription("Alguien fue desbaneado")
      .addField("Usuario", `${user.tag}(<@${user.id}>)`)
      .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
      .setColor("#ff0000");
    getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDINTEGRATIONSUPDATE//////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildIntegrationsUpdate", async (guild, integration) => {
  let guildi = await guildIntegrationsUpdate.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildi);
  if (!getchannel) return;
  if (!guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
      .setTitle("GuildIntegrationsUpdate logs")
      .setDescription("Las integraciones fueron actualizadas")
      .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
      .addField("Servidor", `${guild.name}[${guild.id}]`)
      .setColor("#ff0000");
    getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDMEMBERADD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("guildMemberAdd", async member => {
  if (!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  let guildma = await guildMemberAdd.obtener(member.guild.id);
  let getchannel = await client.channels.cache.get(guildma);
  if (!getchannel) return;
  const alerta = new Discord.MessageEmbed()
    .setTitle("GuildMemberAdd logs")
    .setDescription("Alguien se unió al servidor")
    .addField("Usuario", `${member.user.tag}(<@${member.user.id}>)`)
    .addField(
      "Creación de cuenta",
      `${moment.utc(member.user.createdAt).format("LLLL")}`
    )
    .addField("Miembros actuales", member.guild.memberCount)
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#ff0000");
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDMEMBERREMOVE////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberRemove", async member => {
  if (!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  let guildmr = await guildMemberRemove.obtener(member.guild.id);
  let getchannel = await client.channels.cache.get(guildmr);
  if (!getchannel) return;
  const alerta = new Discord.MessageEmbed()
    .setTitle("GuildMemberRemove logs")
    .setDescription("Alguien salió del servidor")
    .addField("Usuario", `${member.user.tag}(<@${member.user.id}>)`)
    .addField(
      "Creación de cuenta",
      `${moment.utc(member.user.createdAt).format("LLLL")}`
    )
    .addField("Miembros actuales", member.guild.memberCount)
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#ff0000");
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDELETE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildDelete", async guild => {
  let guildd = await guildDelete.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildd);
  if (!getchannel) return;

  const alerta = new Discord.MessageEmbed()
    .setTitle("GuildDelete logs")
    .setDescription("Me quitaron de un server")
    .addField("Servidor", `${guild.name}(${guild.id})`)
    .addField("Creador", `${guild.owner.user.tag}(<@${guild.ownerID}>)`)
    .addField(
      "Miembros",
      `${guild.memberCount} Total **|** ${guild.members.cache.filter(
        m => m.user.bot
      )} Bots **|** ${guild.members.cache.filter(m => !m.user.bot)} Humanos`
    )
    .addField("Servidores actuales", client.guilds.cache.size)
    .setColor("#ff0000");
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILCREATE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildCreate", async guild => {
  let guildc = await guildCreate.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildc);
  if (!getchannel) return;

  const alerta = new Discord.MessageEmbed()
    .setTitle("GuildCreate logs")
    .setDescription("Me agregaron a un server")
    .addField("Servidor", `${guild.name}(${guild.id})`)
    .addField("Creador", `${guild.owner.user.tag}(<@${guild.ownerID}>)`)
    .addField(
      "Miembros",
      `${guild.memberCount} Total **|** ${guild.members.cache.filter(
        m => m.user.bot
      )} Bots **|** ${guild.members.cache.filter(m => !m.user.bot)} Humanos`
    )
    .addField("Servidores actuales", client.guilds.cache.size)
    .setColor("#ff0000");
  getchannel.send(alerta);
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDUNAVAILABLE/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildUnavailable", async guild => {
  let guildu = await guildUnavailable.obtener(guild.id);
  let getchannel = await client.channels.cache.get(guildu);
  if(!guild) return;
  if(!guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  if(!getchannel) return;
  const alerta = new Discord.MessageEmbed()
  .setTitle("GuildUnavailable logs")
  .setDescription("Un servidor se volvió inestable")
  .addField("Servidor", `${guild.name}(${guild.id})`)
  .addField("Miembros",`${guild.memberCount} Total **|** ${guild.members.cache.filter(m => m.user.bot
      )} Bots **|** ${guild.members.cache.filter(m => !m.user.bot)} Humanos`
    )
    .setColor("#ff0000")
    .setAuthor(guild.name, guild.iconURL({dynamic: true}));
  getchannel.send(alerta);

});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDMEMBERSPEAKING//////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberSpeaking", async (member, speaking) => {
    if (!member.guild) return;
    let guildms = await guildMemberSpeaking.obtener(member.guild.id);
    let getchannel = await client.channels.cache.get(guildms);
    if(!getchannel) return;
    if (!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const alerta = new Discord.MessageEmbed();

    if (speaking) {

        alerta.setTitle("GuildMemberSpeaking logs")
            .setDescription("Alguien está hablando")
            .addField("Usuario", `${member.user.username}(<@${member.user.id})>`)
            .addField("Canal", `${member.channel.name}(${member.channel.id})`)
            .addField("Servidor", `${member.guild.name}(${member.guild.id})`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }));
    } else {
        alerta.setTitle("GuildMemberSpeaking logs")
            .setDescription("Alguien dejó de hablar")
            .addField("Usuario", `${member.user.username}(<@${member.user.id})>`)
            .addField("Canal", `${member.channel.name}(${member.channel.id})`)
            .addField("Servidor", `${member.guild.name}(${member.guild.id})`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }));
    }
    getchannel.send(alerta);

});


/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDMEMBERUPDATE////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberUpdate", async (oldM, newM) => {
    if (!oldM.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    let guildmu = await guildMemberUpdate.obtener(oldM.guild.id);
    let getchannel = await client.channels.cache.get(guildmu);
    if (!getchannel) return;
    oldM.guild.fetchAuditLogs().then(logs => {
        let moderador = logs.entries.first().executor;
        if (oldM.nickname !== newM.nickname) {
            const alerta = new Discord.MessageEmbed()
                .setTitle("GuildMemberUpdate logs")
                .setDescription("Alguien se cambió el apodo")
                .addField("Usuario", `${oldM.user.tag}(<@${oldM.user.id}>)`)
                .addField("Antiguo apodo", oldM.nickname != null ? "**"+oldM.nickname+"**" : "**"+"Ninguno"+"**")
                .addField("Nuevo apodo", newM.nickname != null ? "**"+newM.nickname+"**" : "**"+"Ninguno"+"**")
                .addField("Cambiante", `${moderador.tag || oldM.user.tag}(<@${moderador.id || oldM.user.id}>)`)
                .setAuthor(oldM.user.tag, oldM.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff0000");
            getchannel.send(alerta);
        } if (oldM.roles.cache.size > newM.roles.cache.size) {
            let roles = oldM.roles.cache.map(e => e.name);
            const alerta = new Discord.MessageEmbed()
                .setTitle("GuildMemberUpdate logs")
                .setDescription("A alguien se le cambiaron los roles")
                .addField("Usuario", `${oldM.user.tag}(<@${oldM.user.id}>)`)
                .addField("Rol eliminado", "**"+roles[0]+"**")
                .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
                .setAuthor(oldM.user.tag, oldM.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff0000");
            getchannel.send(alerta);
        } if (oldM.roles.cache.size < newM.roles.cache.size) {
            let roles = newM.roles.cache.map(e => e.name);
            const alerta = new Discord.MessageEmbed()
                .setTitle("GuildMemberUpdate logs")
                .setDescription("A alguien se le cambiaron los roles")
                .addField("Usuario", `${oldM.user.tag}(<@${oldM.user.id}>)`)
                .addField("Rol agregado", roles[0])
                .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
                .setAuthor(oldM.user.tag, oldM.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff0000");
            getchannel.send(alerta);
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////EMOJIUPDATE/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("emojiUpdate", async (olde, newe) => {
    let emojiu = await emojiUpdate.obtener(olde.guild.id);
    let getchannel = await client.channels.cache.get(emojiu);
    if (!olde.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    if (!getchannel) return;
    olde.guild.fetchAuditLogs().then(logs => {
        let moderador = logs.entries.first().executor;
        if (olde.name != newe.name) {
            const alerta = new Discord.MessageEmbed()
                .setTitle("EmojiUpdate logs")
                .setDescription("Un emoji fue editado")
                .setColor("#ff0000");
            if (olde.animated) {
                alerta
                    .addField("Emoji", `<${newe.identifier}>`)
                    .addField("Antiguo nombre", `${olde.name}`)
                    .addField("Nuevo nombre", newe.name)
                    .addField("Editor", `${moderador.tag}(<@${moderador.id}>)`);
            } else {
                alerta
                    .addField("Emoji", `<:${newe.identifier}>`)
                    .addField("Antiguo nombre", olde.name)
                    .addField("Nuevo nombre", newe.name)
                    .addField("Editor", `${moderador.tag}(<@${moderador.id}>)`);
            }
            getchannel.send(alerta)
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDMEMBERSCHUNK///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMembersChunk", async (member, guild) => {
  let guildmc = await guildMembersChunk.obtener(member.guild.id);
  let getchannel = await client.channels.cache.get(guildmc);
  if(!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  member.map(miembro => {
    const alerta = new Discord.MessageEmbed()
    .setTitle("GuildMembersChunk logs")
    .setDescription("Alguien se unió desde un servidor")
    .addField("Usuario", `${miembro.user.tag}(<@${miembro.user.id}>)`)
    .addField("Servidor del que viene", guild.name+"("+guild.id+")")
    .addField("Miembros actuales", miembro.guild.memberCount)
    .setAuthor(miembro.user.tag, miembro.user.displayAvatarURL({dynamic: true}));
  getchannel.send(alerta);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////EMOJIDELETE//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("emojiDelete", async emoji => {
  let emojid = await emojiDelete.obtener(emoji.guild.id);
  let getchannel = await client.channels.cache.get(emojid);
  if(!getchannel) return;
  if(!emoji.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
  emoji.guild.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    const alerta = new Discord.MessageEmbed()
    .setTitle("EmojiDelete logs")
    .setDescription("Un emoji fue eliminado")
    .setThumbnail(emoji.url)
    .setColor("#ff0000");
    if(emoji.animated) {
      alerta
      .addField("Emoji", `<${emoji.identifier}>`)
      .addField("Eliminador", `${moderador.tag}(<@${moderador.id}>)`)
    } else {
      alerta
      .addField("Emoji", `<:${emoji.identifier}> ${emoji.name}`)
      .addField("Eliminador", `${moderador.tag}(<@${moderador.id}>)`)
    }
    getchannel.send(alerta);
  });

});

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////GUILDUPDATE//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

client.on("guildUpdate", async (oldg, newg) => {
  let guildup = await guildUpdate.obtener(oldg.id);
  let getchannel = await client.channels.cache.get(guildup);
  if(!getchannel) return;
  if(!oldg.me.permissions.has("VIEW_AUDIT_LOG")) return;
  oldg.fetchAuditLogs().then(logs => {
    let moderador = logs.entries.first().executor;
    if(oldg.name != newg.name) {
      const alerta = new Discord.MessageEmbed()
      .setTitle("GuildUpdate logs")
      .setDescription("El servidor fue editado")
      .addField("Antiguo nombre", "**"+oldg.name+"**")
      .addField("Nuevo nombre", "**"+newg.name+"**")
      .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`)
      .setAuthor(oldg.name, oldg.iconURL({dynamic: true}))
      .setColor("#ff0000");
    getchannel.send(alerta);
    } if(oldg.iconURL({dynamic: true}) != newg.iconURL({dynamic: true})) {
      const alerta = new Discord.MessageEmbed()
      .setTitle("GuildUpdate logs")
      .setDescription("El servidor fue editado")
      .addField("Ícono anterior", `[Click aquí](${oldg.iconURL({dynamic: true})})`)
      .addField("Ícono ahora", `[Click aquí](${newg.iconURL({dynamic: true})})`)
      .addField("Moderador", `${moderador.tag+"(<@"+moderador.id+">)" || "Ninguno"}`)
      .setThumbnail(newg.iconURL({dynamic: true}))
      .setColor("#ff0000");
    getchannel.send(alerta);  
    } if(oldg.bannerURL({dynamic: true}) != newg.bannerURL({dynamic: true})) {
      const alerta = new Discord.MessageEmbed()
      .setTitle("GuildUpdate logs")
      .setDescription("El servidor fue editado")
      .addField("Banner anterior", `[Click aquí](${oldg.bannerURL({dynamic: true})})`)
      .addField("Banner ahora", `[Click aquí](${newg.bannerURL({dynamic: true})})`)
      .addField("Moderador", `${moderador.tag+"(<@"+moderador.id+">)" || "Ninguno"}`)
      .setImage(newg.bannerURL({dynamic: true, format: "png", size: 4096}))
      .setColor("#ff0000");
      getchannel.send(alerta);
    } if(oldg.afkChannelID != newg.afkChannelID) {
      const alerta = new Discord.MessageEmbed()
      .setTitle("GuildUpdate logs")
      .setDescription("El servidor fue editado")
      .addField("Antiguo Canal de AFK", `<#${oldg.afkChannelID || "Ninguno"}>`)
      .addField("Nuevo canal de AFK", `<#${olg.afkChannelID || "Ninguno"}>`)
      .addField("Moderador", `${moderador.tag}(<@${moderador.id}>)`);
      getchannel.send(alerta);
    }
  })
})

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////LOGIN Y KEEPALIVE///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const keepAlive = require('./server');
const Monitor = require('ping-monitor');

keepAlive();
const monitor = new Monitor({
    website: 'https://loggerbot2.dylanbot.repl.run',
    title: 'Secundario',
    interval: 15
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));

client.login(process.env.TOKEN);
