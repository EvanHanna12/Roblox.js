module.exports.run = (bot, message, args) => {
  const ping = Math.floor(bot.ping)
  
  const em = new (require('discord.js').RichEmbed)()
  .setTitle("Roblox.js Ping Command")
  .setDescription(`PONG! My ping is ${ping}ms.`)
  .setTimestamp()
  .setColor("GREEN");
  message.channel.send({embed: em})
}

module.exports.name = "ping"
module.exports.perm = "All"
