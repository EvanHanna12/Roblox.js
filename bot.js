const discord = require('discord.js')
const bot = new discord.Client()
const prefix = "r."
const roblox = require('roblox-js')
//const mongoose = require('mongoose')
const fs = require('fs')
bot.commands = new discord.Collection()
console.log("Loading commands...");
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
  setTimeout(() => {bot.user.setActivity("over Hulk's Group 2.0 | r.help", {type: "WATCHING"})}, 10000)
})

bot.on('message', message => {
  const mArray = message.content.split(" ")
  const args = mArray.slice(1)
  const com = mArray[0].slice(prefix.length)
  const cmd = bot.commands.get(com)
  
  if (cmd && cmd.perm == "All") {
    cmd.exec(bot, message, args);
  } elseif (cmd.perm == "admin" && !message.member.roles.find(r => r.name == "Admin")) { message.channel.send("Invalid permissions!") }
})

bot.login(process.env.token)
