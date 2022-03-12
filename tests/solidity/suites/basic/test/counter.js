const Counter = artifacts.require("Counter")
const truffleAssert = require('truffle-assertions');

async function expectRevert(promise) {
  try {
    await promise;
  } catch (error) {
    if (error.message.indexOf('revert') === -1) {
      expect('revert').to.equal(error.message, 'Wrong kind of exception received');
    }
    return;
  }
  expect.fail('Expected an exception but none was received');
}

contract('Counter', (accounts) => {
  console.log(`Using Accounts (${accounts.length}): \n${accounts.join('\n')}`);
  console.log('==========================\n');
  const [one, two, three] = accounts;
  let counter

  beforeEach(async () => {
    counter = await Counter.new()
    console.log('Counter:', counter.address)

    console.log('Current eth:')
    console.log('  - ', await web3.eth.getBalance(one))
    console.log('')
  })

  it('should add', async () => {
    const balanceOne = await web3.eth.getBalance(one)

    let count

    await counter.add({ from: one })
    count = await counter.getCounter()
    console.log(count.toString())
    assert.equal(count, '1', 'Counter should be 1')
    assert.notEqual(balanceOne, await web3.eth.getBalance(one), `${one}'s balance should be different`)
  })

  it('should subtract', async () => {
    let count

    await counter.add()
    count = await counter.getCounter()
    console.log(count.toString())
    assert.equal(count, '1', 'Counter should be 1')

    // Use receipt to ensure logs are emitted
    const receipt = await counter.subtract()
    count = await counter.getCounter()
    console.log(count.toString())
    console.log()
    console.log('Subtract tx receipt:', receipt)
    assert.equal(count, '0', 'Counter should be 0')
    assert.equal(receipt.logs[0].event, 'Changed', "Should have emitted 'Changed' event")
    assert.equal(receipt.logs[0].args.counter, '0', "Should have emitted 'Changed' event with counter being 0")

    // Check lifecycle of events
    const contract = new web3.eth.Contract(counter.abi, counter.address)
    const allEvents = await contract.getPastEvents("allEvents", { fromBlock: 1, toBlock: 'latest' })
    const changedEvents = await contract.getPastEvents("Changed", { fromBlock: 1, toBlock: 'latest' })
    console.log('allEvents', allEvents)
    console.log('changedEvents', changedEvents)
    assert.equal(allEvents.length, 3)
    assert.equal(changedEvents.length, 2)

    await expectRevert(counter.subtract());

  })
})
