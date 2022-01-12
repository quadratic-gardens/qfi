import { ethers } from 'hardhat';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';

chai.use(solidity);
const { expect } = chai;

describe('Grant Round Factory', () => {
  
  beforeEach(async () => {
    
  })

  it('verify - initializes properly', async () => {
    
  })

  it('verify - configured properly', async () => {
  
  })

  describe('managing funding sources', () => {
    it('verify - allows owner to add funding source', async () => {
      
    })

    it('require fail - allows only owner to add funding source', async () => {
      
    })

    it('require fail - reverts if funding source is already added', async () => {
      
    })

    it('verify - allows owner to remove funding source', async () => {
      
    })

    it('require fail - allows only owner to remove funding source', async () => {
      
    })

    it('require fail - reverts if funding source is already removed', async () => {
      
    })
  })

  it('allows direct contributions to the matching pool', async () => {
    
  })

  describe('withdrawing funds', () => {
      
  
    it('allows contributors to withdraw funds', async () => {
     
    })

    it('disallows withdrawal if round is not cancelled', async () => {
      
    })

    it('reverts if user did not contribute to the round', async () => {
     
    })

    it('reverts if funds are already withdrawn', async () => {
      
    })
  })



  describe('transferring matching funds', () => {
    

    it('returns the amount of available matching funding', async () => {
      
    })

    it('pulls funds from funding source', async () => {
      
    })

    it('pulls funds from funding source if allowance is greater than balance', async () => {
      
    })

    
  })



})