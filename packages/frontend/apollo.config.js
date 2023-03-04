module.exports = {
  client: {
    service: {
      name: 'Poap W3Q Subgraph',
      url: 'http://localhost:4200/api/subgraphs/name/3VLINC/poap-w3q-subgraph',
      // optional headers
      headers: {},
    },
    includes: ['./src/**/*.{ts,tsx}'],
  },
};
