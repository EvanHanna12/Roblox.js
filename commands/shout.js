const roblox = require('roblox-js')

module.exports.run = (bot, message, args) => {
  roblox.shout(process.env.groupId, args.join(" "))
  .then(() => {
    message.channel.send(`I shouted "${args.join(" ")}" to the group.`)
  })
  .catch(err => message.channel.send("Something went wrong."))
}

module.exports.name = "shout"
module.exports.perm = "Admin"
