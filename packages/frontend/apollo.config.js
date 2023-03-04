module.exports = {
  client: {
    service: {
      name: 'The Graph - eip721-subgraph',
      url: 'http://localhost:4200/api/subgraphs/name/wighawag/eip721-subgraph',
      // optional headers
      headers: {},
    },
    includes: ['./src/**/*.{ts,tsx}'],
  },
};
