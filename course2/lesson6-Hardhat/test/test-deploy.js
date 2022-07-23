const { ehters } = require("hardhat");
const { expect, assert } = require("chai");

describe("simpleStorage", () => { // yarn hh test > cmd for run test
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = ehters.getContractFactory("simpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = simpleStorage.retrieve();
        const expectedValue = "0";
        // assert
        // expect > both can use
        assert.equal(currentValue.toString(), expectedValue);
        //expect(currentValue.toString()).to.equal(expectedValue);
    })
    it("Should update when we call store", async () => {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        expect(currentValue.toString()).to.equal(expectedValue);
    })
    // it.only() > for run only 1 test
    // can also be nested describe mean describe inside desc
})