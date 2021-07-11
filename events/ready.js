const status = require("../root/status.json");

module.exports.run = (client) => { // when bot is ready without errors
console.log("https://aquatic.aquaticdev.repl.co");
// website
console.log(`${client.user.tag} is now online with ${client.ws.ping} ms ping for a total of ${client.users.cache.size} users in ${client.guilds.cache.size} servers`);
// bot is online, printing it
client.user.setPresence({ activity:{ name: status.name }, status: status.status });
//setting bot activity
}
