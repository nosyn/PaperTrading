const sampleData = require("./sampleData");

// Resolvers define the technique for fetching the types defined in the
// schema.
module.exports = (_parent, args, _context, _info) => sampleData;
