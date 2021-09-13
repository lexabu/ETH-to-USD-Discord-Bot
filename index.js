//REQUIRE STATMENTS

// Import the discord.js module
//const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");

// Import coingecko-api
const CoinGecko = require("coingecko-api");

//require a .env file that includes the api token
require("dotenv").config();

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
// Create an instance of a Discord client
//const client = new Discord.Client();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Variable for prefix $
const BOT_PREFIX = "!";

//The ready event is vital, it means that only _after_ this will your bot start reacting to information received from Discord
client.on("ready", () => {});

client.on("message", async function (message) {
  if (message.content.startsWith(BOT_PREFIX)) {
    const [command, amount] = message.content.split(" ");
    const commandString = command.substring(1);

    if (commandString === "convert") {
      const data = await CoinGeckoClient.coins.fetch("ethereum", {});
      const price = data.data.market_data.current_price.usd;
      const ethInput = amount;
      const USDInput = amount;
      const ethConversion = ethInput * price;
      const usdConversion = USDInput / price;

      // Create our number formatter.
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const formattedUSD = formatter.format(ethConversion);

      message.channel.send(
        `ETH: ${usdConversion}
USD: ${formattedUSD}`
      );
    }
    if (commandString === "help") {
      message.channel.send(
        `Use !convert <number> to interact with the bot. Example: !convert 100`
      );
  }
};

client.login(process.env.DISCORD_BOT_TOKEN);
