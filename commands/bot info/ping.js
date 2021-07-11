module.exports = {
name: "ping",
guild: false,
run: async (client, message, args) => {
message.channel.send(`Pong 🏓, My Ping Is ${client.ws.ping}`);
},
};
