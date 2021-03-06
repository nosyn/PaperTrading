const fetch = require("node-fetch");

module.exports = async (_parent, { currency }, _context, _info) => {
  try {
    const results = await fetch("https://api.coinbase.com/v2/currencies");
    const currencyData = await results.json();

    const currencyInfo = currencyData.data.find(
      (c) => c.id.toUpperCase() === currency
    );
    return currencyInfo ? currencyInfo.name : null;
  } catch (error) {
    console.error(`Error while fetching data from Coinbase: ${error}`);
  }
};
