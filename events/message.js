/* ＲＡＷ ＤＥＶＥＬＯＰＭＥＮＴＡＬ ＭＯＤＵＬＥＳ */

const db = require("quick.db");
const { addexp } = require("../handlers/xp.js");
const { ownerid, adminsid, bot_prefix } = require("../root/configuration.json");
let cooldown = {}
const is_url = require("../functions/islink.js");
const is_swear = require("../functions/isswear.js");
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
require("discord-reply"); 
require("reconlx");
const AntiSwear = require("ez-antiswear"),
  filterAR = new AntiSwear("ar"),
  filterCS = new AntiSwear("cs"),
  filterDA = new AntiSwear("da"),
  filterDE = new AntiSwear("de"),
  filterEO = new AntiSwear("eo"),
  filterES = new AntiSwear("es"),
  filterFA = new AntiSwear("fa"),
  filterFI = new AntiSwear("fi"),
  filterFIL = new AntiSwear("fil"),
  filterFR = new AntiSwear("fr"),
  filterHI = new AntiSwear("hi"),
  filterHU = new AntiSwear("hu"),
  filterIT = new AntiSwear("it"),
  filterJA = new AntiSwear("ja"),
  filterKAB = new AntiSwear("kab"),
  filterKO = new AntiSwear("ko"),
  filterNL = new AntiSwear("nl"),
  filterNO = new AntiSwear("no"),
  filterPL = new AntiSwear("pl"),
  filterPT = new AntiSwear("pt"),
  filterEN = new AntiSwear("en");

/*

Modules Imported:

# Database
# Add XP
# Get owner's id and admins id, and bot's prefix
# set cooldown
# get function to check if message content is a url
# get function to check if message content has swearing words
# import discord.js and embed creation from discord.js
# import a module for stylish replies
# ez-antiswear, a module to check multi language swearing words
# reconlx, a multi task package

*/

/* 

NOTE:

& Database: 

On The Entire Code, We Use (.) 
# To Either Form A Object In Database (Or) 
# To Make A Bond Between 2 Un-Bonded Things (Or) 
# As A Notation

$ (_) To Extend The (.) Noation!

& Errors:

Throughout The Code, I Will Push Errors To My Direct Mail (DM)

*/


module.exports.run = async (client, message) => { // code for the message events and commands begins!

if (message.author.bot || db.has(`${message.author.id}_blacklisted`)) { /*

a simple confirmation to check if the user that used command is:
# a bot
# if the user is blacklisted

once either one is proven correct, 
!!! don't respond to user

*/
return;

}

if (message.guild) {

if (db.has(`${message.guild.id}_levels`)) {

addexp(message);

/*

if the guild has enabled auto leveling system

# add xp to the author 

*/

}

/* ＡＵＴＯ ＭＯＤＥＲＡＴＩＯＮ */

if (db.has(`${message.guild.id}.automod`)) {/*

If Auto-Moderation Service Is Enabled:

check "$" then try "#" =>

$ if link protection is enabled {
# If The Message Sent Is A Link, Then Warn The User!
}

$ If Swearing Is Banned {
# If The Message Sent Has A Swearing Word, Warn The User!
}

*/

if (db.has(`${message.guild.id}.automod_links`)) {

if (is_url(message.content)) {

/*

If Message Has/Is A URL:
# Delete The Message
# Add Data To Logs 
# Return A Message To Not Send Links!

*/

message.delete();

if (db.has(`${message.guild.id}.${message.author.id}_links`)) {

/*

$ If user sent a link previously and was saved

# log to add the data

*/

db.add(`${message.guild.id}.${message.author.id}_links`).then(() => {
return message.channel.send(`${message.author} Don't Send Links!`); // send the warn after added to database!
}).catch(e => { message.channel.send(`${message.author} Don't Send Links!`);

} else {

/*

$ If user hasn't sent link and has no connection with server

# delete the message
# set the connection 
# form an extension to links

*/

try {

message.delete();
await db.set(`${message.guild.id}.${message.author.id}`, "Connected");
await db.set(`${message.guild.id}.${message.author.id}_links`);
message.channel.send(`${message.author} Don't Send Links Here!`).then(msg => {
msg.delete({ timeout: 5000 })
}).catch(e => { client.users.cache.get("765151089620156418").send(e); });

} catch(e) {

message.delete();
message.channel.send("Don't Send Links Here");
return client.users.cache.get("765151089620156418").send(e);

}

}

}

} else if (db.has(`${message.guild.id}.automod_swears`)) {

if (is_swear(message.content.toLowerCase())) {

/*

$ If The Message Content Is/Has Swearing Word

# Delete Message
# Save The Data
# Warn The User

*/

if (db.has(`${message.guild.id}.${message.author.id}_sweared`)) {

/*

If user Cursed In The Channel Previously and was saved

# warn the user

# delete the message

*/

message.delete();

db.add(`${message.guild.id}.${message.author.id}_sweared`, 1).then(() => {

message.channel.send(`${message.author} Don't Swear Here!`); // warn user

}).catch(e => { 
message.channel.send("Don't Swear Here!");
client.users.cache.get("765151089620156418").send(e);
});

} else {

/*

if user is swearing for first time,

# delete message
# set the database
# add it into database
# warn user
*/

message.delete();

try {

db.set(`${message.guild.id}.${message.author.id}_sweared`, 1)

message.channel.send(`${message.author} Don't Swear Here`);

} catch(e) {

message.channel.send("Don't Swear Here");

}

}

}

} else if (db.has(`${message.guild.id}.automod_swears_multilang`)) {

/*

If multi-language package was chosen for server
by any person

# install and fetch the ez-antiswear dependency
# use it here to check if user sweared
# if yes, do stuff, else check for command!

*/

if (filterAR.check(message.content) || filterEN.check(message.content) || filterCS.check(message.content) || filterDA.check(message.content) || filterDE.check(message.content) || filterEO.check(message.content) ||  filterES.check(message.content) || filterFA.check(message.content) || filterFI.check(message.content) || filterFIL.check(message.content) || filterFR.check(message.content) || filterHI.check(message.content) || filterHU.check(message.content) || filterIT(message.content) || filterJA.check(message.content) || filterKAB.check(message.content) || filterKO.check(message.content) || filterNL.check(message.content) || filterNO.check(message.content) || filterPL.check(message.content) || filterPT.check(message.content)) {
    return message.delete();
  }

}

}

}

/* ＡＵＴＯ ＭＯＤＥＲＡＴＩＯＮ ＣＯＭＰＬＥＴＥＤ */

/* ＧＥＴ ＴＨＥ ＰＲＥＦＩＸ ＯＦ ＢＯＴ */

if (message.guild) {

/*

If message was sent from a discord server

then first check if a custom prefix was set

if none was set, use AB as prefix

*/

let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = "AB";
  
  if (!message.member) message.member = message.guild.members.fetch(message);

} else {

// if message was sent from dm
// prefix is AB

let prefix = "AB"

}

/* ＣＵＳＴＯＭ ＣＯＭＭＡＮＤＳ ＩＮ ＦＵＴＵＲＥ ＷＩＬＬ ＢＥ ＡＤＤＥＤ ＨＥＲＥ */

/* ＥＮＤ ＯＦ ＣＵＳＴＯＭ ＣＯＭＭＡＮＤＳ */

if (!message.content.startsWith(prefix)) {
/*

If message content doesn't start with prefix

then don't respond and stay calm

*/

return;

}

/*

we define a constant called args which is a message content but

# splited of prefix and trimed of spaces

then we define a constant cmd which stands for command as args in lowercase

*/

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const cmd = args.shift().toLowerCase();

if (cmd.length === 0) return; // If no command or message, stay calm

if (message.guild) {

/* Custom guild commmands checking and execution */

let guildCommands = db.get(`cmd_${message.guild.id}`)
  if (guildCommands) {
    let guildCommand_usedNow= guildCommands.find(x => x.name === cmd)
    if (guildCommand_usedNow) {
message.channel.send(guildCommand_usedNow.responce)
}
  }

}

let command = client.commands.get(cmd); // find the command
if (!command) command = client.commands.get(client.aliases.get(cmd)); // if no such command, check the command with aliases

}
