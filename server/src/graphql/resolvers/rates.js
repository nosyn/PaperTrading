const fetch = require("node-fetch");
const _ = require("lodash");

module.exports = async (_parent, { currency }, _context, _info) => {
  try {
    const results = await fetch(
      `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
    );
    const exchangeRates = await results.json();

    return _.map(exchangeRates.data.rates, (rate, currency) => ({
      currency,
      rate,
    }));
  } catch (error) {
    console.error(`Error while fetching data from Coinbase: ${error}`);
  }
};
