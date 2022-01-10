describe('Funding Round Factory', () => {
  
  beforeEach(async () => {
    
  })

  it('initializes', async () => {
    
  })

  it('configured', async () => {
  
  })

  describe('changing signup gatekeeper', () => {
    it('allows owner to set signup gatekeeper', async () => {
    })

    it('allows only owner to set signup gatekeeper', async () => {
    })

    it('allows owner to change signup gatekeeper', async () => {
    })
  })

  

  describe('deploying funding round', () => {
    it('deploys funding round', async () => {
      
    })

    it('require fail - reverts if signup gatekeeper is not set', async () => {
      
    })

    it('require fail - reverts if recipient registry is not set', async () => {
      
    })

    it('require fail - reverts if native token is not set', async () => {
      
    })

    it('require fail - reverts if coordinator is not set', async () => {
      
    })

    it('require fail - reverts if current round is not finalized', async () => {
      
    })

    it('require fail - verify - deploys new funding round after previous round has been finalized', async () => {
     
    })

    it('require fail - only owner can deploy funding round', async () => {
    })
  })

  describe('transferring matching funds', () => {

    it('returns the amount of available matching funding', async () => {
     
    })

    it('allows owner to finalize round', async () => {
      
    })

    it('does not allow funds to be sent without a tally', async () => {
      
    })

    it('pulls funds from funding source', async () => {
      
    })

    it('pulls funds from funding source if allowance is greater than balance', async () => {
      
    })

    it('allows only owner to finalize round', async () => {
      
    })

    it('reverts if round has not been deployed', async () => {
      
    })
  })

  // describe('cancelling round', () => {

  //   it('allows owner to cancel round', async () => {
      
  //   })

  //   it('allows only owner to cancel round', async () => {
     
  //   })

  //   it('reverts if round has not been deployed', async () => {
     
  //   })

  //   it('reverts if round is finalized', async () => {
      
  //   })
  // })

  // it('allows owner to set native token', async () => {
    
  // })

  // it('only owner can set native token', async () => {
    
  // })

})