# Meeemor

Memes are our best tool for maintaining alignment within decentralized communities.

B

Meeemor is a web3 dapp that fosters community through memes.

We think that meme artists contribute to our shared understanding of the world.

While NFT artists can easily become famous, meme creators are often overlooked, dismissed and undervalued.

Meeemor is an app that is built on POAP. 

# Getting Started
1. Run `nvm use 14.18.0`
1. Run `npm install`
1. Run `docker-compose up`
1. Run `nx create:subgraph:poap meeemor-subgraph`
1. Run `nx deploy:subgraph:poap meeemor-subgraph`
1. Run `nx serve frontend`

# Deploying
1. Set your private key in .env.local `PRIVATE_KEY=<INSERT_KEY_HERE>`
1. Run `nx deploy backend`


# Challenges
- Wallet connect buffer not defined version compatibility
- Incompatibility of wallet connect and webpack version bundled with @nrwl. Had to inject node dependencies into webpack


# Next Steps
- Deploy script for the contract
- Write out contracts addresses to an javascript file:

```
const meemoreAddress = '';
const poapAddress = '';
```

Backend
- Subgraph for Meeemor
- Creating an event
    - Create poap
    - Register with Meeemor and set the bounty
- Submit a meme
- Vote
- Trigger the award event.
- Claim button for winners


UI
- Creating an event UI linked to backend
- Display of events and memes and votes "blind voting"
- Event admin award trigger page
- Claim page

