function runCmd(bot, message, args) {
  require('roblox-js').post(bot.groupId, args.join(" "));
  
  message.channel.send(`I posted ${args.join(" ")} to the group wall.`)
}

module.exports = {
  name: "wallpost",
  perm: "Admin",
  run: runCmd
}
