require('dotenv').config()
const Web3 = require('web3')

async function main () {
  // A web3 provider comes from truffle.
  // Through `truffle exec` command we execute this function using that web3 provider.
  // NB. The web3 provider comes from --network parameter specified (development or testnet).
  if (!web3) {
    throw Error('Something went wrong with the web3 provider. Did you have run the command using truffle exec?')
  }

  // Initialize Web3 instance with the truffle provider.
  const web3Instance = new Web3(web3.currentProvider)

  // Your script code here.
}

// Required by `truffle exec`
module.exports = function () {
  return new Promise((resolve, reject) => {
    main()
      .then((value) => resolve(value))
      .catch(err => {
        console.log('Something went wrong: ', err)
        reject(err)
      })
  })
}