require('dotenv').config()
const Web3 = require('web3')
// Import Open Zeppelin test utils.
const { expectRevert, constants } = require('@openzeppelin/test-helpers')
// Import our test utilities.
const testUtils = require('./utils')
// Import Chai should interface.
const { expect, should } = require('chai')

// Crowdfunding contract tests.
contract('Crowdfunding', (accounts) => {
  before(async function () {
    // Initialize test utilities class.
    await testUtils.init()

    // Get the default transaction parameters.
    this.transactionParameters = testUtils.getTransactionParameters()

    // Get a new Crowdfunding SC instance.
    this.crowdfundingInstance = await testUtils.createNewCrowdfundingInstance()
  })

  describe('# Initialization', function () {
    it('[1] Should return an empty array of projects', async function () {
      const expectedEmptyArray = await this.crowdfundingInstance.methods.getAllProjects().call({
        from: testUtils._accounts.crowdfundingDeployer,
      })

      expect(expectedEmptyArray).to.be.empty
    })
  })

  describe('# Projects ', function () {
    it('[2] Should start the crowdfunding for a new project', async function () {
      // Set project data.
      const name = 'Project A'
      const description = 'Not a so useful project'
      const durationInDays = 7
      const amountToRaise = 1000000

      // Starts the Project SC.
      const transactionReceipt = await this.crowdfundingInstance.methods.startProject(
        name,
        description,
        durationInDays,
        amountToRaise,
      ).send({
        ...this.transactionParameters,
        from: testUtils._accounts.starterProjectA,
      })

      // Check Project SC instance.
      const projectAddress = transactionReceipt.events.ProjectStarted.returnValues.projectAddress
      const expectedProjectsArray = await this.crowdfundingInstance.methods.getAllProjects().call({
        from: testUtils._accounts.crowdfundingDeployer,
      })

      // Checks.
      expect(expectedProjectsArray.length).to.be.equal(1)
      expect(expectedProjectsArray[0]).to.be.equal(projectAddress)
    })
  })
})
