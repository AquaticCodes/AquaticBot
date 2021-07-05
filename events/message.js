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

if (db.has(`${message.guild.id}_levels`)) {

addexp(message);

/*

if the guild has enabled auto leveling system

# add xp to the author 

*/

}

if (db.has(`${message.guild.id}.automod`)) {

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

} else if (db.has(`${message.guild.id}.automod_swears)) {

if (is_swear(message.content.toLowerCase())) {

/*

$ If The Message Content Is/Has Swearing Word

# Delete Message
# Save The Data
# Warn The User

*/

if (db.has(`${message.guild.id}.${message.author.id}_sweared`)) {



} else {

try {

} catch(e) {

}

}

}

}

}



}
