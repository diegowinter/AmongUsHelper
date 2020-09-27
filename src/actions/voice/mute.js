module.exports = function muteAction(permissions,voiceChannel,message, mute) {
  if (!permissions.has("CONNECT") || !permissions.has("MUTE_MEMBERS")) {
      return channel.send(
        "I need the permissions to mute players in your voice channel!"
      );
  } 

  if (voiceChannel) {
      let channel = message.guild.channels.cache.get(voiceChannel.id);
      for (const [memberID, member] of channel.members) {
          member.voice.setMute(mute);
      }
  } else {
      message.reply('You need to join a voice channel first!');
  }
}
