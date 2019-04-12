const discord = require('discord.js')
const bot = new discord.Client()
const prefix = "r."
const roblox = require('roblox-js')
//const mongoose = require('mongoose')
const fs = require('fs')
bot.commands = new discord.Collection()
bot.groupId = "4314732"
console.log("Loading commands...");
roblox.login(process.env.username, process.env.password)
fs.readdir(`./commands/`, (err, files) => {
  if (err) return console.log("Error loading commands.");
  
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).name, require(`./commands/${f}`))
  })
})

bot.on('ready', () => {
  console.log("Loading Roblox.js...")
  setTimeout(() => {console.log("Roblox.js is ready!")}, 2500)
  bot.user.setActivity("Loading Roblox.js...", {type: "STREAMING", url: "https://twitch.tv/discordapp"})
  setTimeout(() => {bot.user.setActivity("over Humans| r.help", {type: "WATCHING"})}, 10000)
})

bot.on('message', message => {
  const mArray = message.content.split(" ")
  const args = mArray.slice(1)
  const com = mArray[0].slice(prefix.length)
  const cmd = bot.commands.get(com)
  const role = message.member.roles.find(r => r.name == "Admin") || null
  if (cmd) {
    cmd.run(bot, message, args)
  }
})

bot.login(process.env.token)
