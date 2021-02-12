require('dotenv').config()
require('web3')
const colors = require('colors')
const SharedUtils = require('../shared/utils')

// Get all mocked projects.
const mockedProjects = require('../mocks/projects.json')

async function main () {
  // Initialize test utilities class.
  await SharedUtils.init(web3)

  // Get the default transaction parameters.
  this.transactionParameters = SharedUtils.getTransactionParameters()

  // Get a new Crowdfunding SC instance.
  console.log(`\n${colors.white('Deploying Crowdfunding SC...')}`)
  this.crowdfundingInstance = await SharedUtils.createNewCrowdfundingInstance()
  console.log(`\n${colors.green('Crowdfunding SC Address')} -> (${colors.magenta(this.crowdfundingInstance._address)})`)
  console.log(`\n${colors.white('-------------------------------------------------------------------')}`)

  console.log(`\n${colors.green('Everything is fine.')}`)

  let val = 3;

  for (let i=0; i < 10; i++) {
	const trsct1 = await this.crowdfundingInstance.methods.addPrice(
    		"eurusd", 
    		val
  	).send({
  		...this.transactionParameters,
    		from: (await web3.eth.getAccounts())[0],
  	})
        
  	const trsct1Address = trsct1.events.ppT.returnValues

	console.log('val: ' + val);
  	console.log(`${colors.green('Data get from blockchain')} -> (${colors.magenta(trsct1Address)})`)
	console.log(`${colors.green('Data get from blockchain')} -> (${colors.magenta(trsct1Address.cross)})`)
	console.log(`${colors.green('Data get from blockchain')} -> (${colors.magenta(trsct1Address.pp)})`)
	console.log(`${colors.white('-------------------------------------------------------------------')}\n`)


	console.log('val: ' + val);
	val++;
  }	

  console.log(`\n\n\n${colors.green('Data send to blockchain: ')}` + val);

  console.log("Loading: ...   SUCCESS");

  const trsct2 = await this.crowdfundingInstance.methods.getLastPP()
  .send({
    ...this.transactionParameters,
    from: (await web3.eth.getAccounts())[0],
  })


  const trsct2Address = trsct2.events.pricePrediction.returnValues

  console.log(`\n${colors.green('Data get from blockchain')} -> (${colors.magenta(trsct2Address.pp)})`)

  return true
}

// Required by `truffle exec`
module.exports = function (callback) {
  return new Promise((resolve, reject) => {
    main()
      .then((value) => resolve(value))
      .catch(err => {
        console.log('Error:', err)
        reject(err)
      })
  })
}
