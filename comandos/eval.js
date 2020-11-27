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
) => {
  if (!["761404868460019732"].includes(message.author.id)) return;

  let limit = 1950;
  try {
    let code = args.join(" ");

    let evalued = eval(code);
    if (typeof evalued !== "string") evalued = require("util").inspect(evalued);
    let txt = "" + evalued;

    if (txt.length > limit) {
      message.channel.send("Texto demasiado largo");
      return;
    } else {
      message.channel.send(txt);
    }
  } catch (err) {
    message.channel.send(err + " ");
    return;
  }
};
