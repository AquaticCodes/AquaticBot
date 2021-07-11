/* ＲＡＷ ＤＥＶＥＬＯＰＭＥＮＴＡＬ ＭＯＤＵＬＥＳ */

const db = require("quick.db");
const { addexp } = require("../handlers/xp.js");
const { ownerid, adminsid, bot_prefix } = require("../root/configuration.json");
let cooldown = {}
const is_url = require("../functions/islink.js");
const is_swear = require("../functions/isswear.js");
const { simillarCommand, normalize } = require('simillar-commands');
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
# package to make a did you mean? => {

well we could use Levenshtein Distance algorithm

but im too lazy to code such huge algorithm 

so here is a package to simple that

to make it more simpler, im using direct discord one :)

}

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

/* ＶＡＲＩＯＵＳ ＣＯＭＭＡＮＤ ＲＥＳＴＲＩＣＴＩＯＮＳ */

if (command.owner) {

if (message.author.id != ownerid) {
return message.lineReplyNoMention("Only My Developer Can Use This Command!");
}

} else if (command.nsfw) {

if (!db.has(`${message.guild.id}.NSFW`)) {
return message.lineReply("NSFW Commands Isn't Enabled In This Server");
} else if (!message.channel.nsfw) {

let NSFW_channelsOnly = new MessageEmbed()
.setColor("#FD0000")
.attachFiles
.setTitle("NSFW Command In Non-NSFW channel")
.setDescription(`We See, You Used ${cmd} Which Is A NSFW Command, Either Use These Commands In DM (or) \n - Enable NSFW To This Channel \n (or) \n - Use These Commands In A NSFW Channel`);

return message.lineReply(NSFW_channelsOnly);
}

} else if (command.adminsOnly) {

if (!adminsid.includes(message.author.id.toString())) {
return message.lineReply("You Aren't A Admin Of Aquatic Bot, Thus You Can't Use This Command!");
}

} else if (command.devmode) {

if (!db.has(`${message.guild.id.devmode`)) {
return message.lineReply("Permission To Enable Developer Mode Isn't Granted To This Server, Drop A Request First Using The devmode/req Command!");
} else if (!db.has(`${message.guild.id}_devmode`)) {
return message.lineReply("Developer Mode Isn't Enabled. \n Developer Mode Must Be Enabled To Use These Developer-Specific Commands!");
}

} else if (command.root) {

if (!db.has(`${message.guild.id.devmode`)) {
return message.lineReply("Permission To Enable Developer Mode Isn't Granted To This Server, Drop A Request First Using The devmode/req Command!");
} else if (!db.has(`${message.guild.id}_devmode`)) {
return message.lineReply("Developer Mode Isn't Enabled. \n Developer Mode And Root Must Be Enabled To Use These Root-Specific Special Commands!");
} else if (!db.has(`${message.guild.id}_root`)) {
return message.lineReply("No Root Permission Granted (or) Enabled. \n Enable Root, Root Must Be Enabled To Use These Root-Specific-Special Commands!");
}

} else if (command.guild && !message.guild) {

return message.lineReply(`These Commands Such As ${cmd} Must Be Used In Guild [ Any Discord Servers ] Only`);

} else if (command.dm) {

if (message.guild) {
return message.lineReply("Confidential Commands, Use DM");
}

}

/* ＵＳＥＲ ＡＮＤ ＣＬＩＥＮＴ ＰＥＲＭＩＳＳＩＯＮＳ */

if (command.botPermission) {
    const Permissions = command.botPermission.filter(x => !message.guild.me.hasPermission(x)).map(x => "`" + x + "`")
    if (Permissions.length) return message.channel.send(`I need ${Permissions.join(", ")} permission(s) to execute the command!`)
  } 
  
  if (command.authorPermission && !db.has(`${message.guild.id}_root_permi`)) {
    const Permissions = command.authorPermission.filter(x => !message.member.hasPermission(x)).map(x => "`" + x + "`")
    if (Permissions.length) return message.channel.send(`You need ${Permissions.join(", ")} permission(s) to execute this command!`)
  }

if (command) {

command.run(client, message, args);

} else {



}

}
