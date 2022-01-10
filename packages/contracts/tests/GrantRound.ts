describe('Funding Round Factory', () => {
  
  beforeEach(async () => {
    
  })

  it('initializes', async () => {
    
  })

  it('configured', async () => {
  
  })

  describe('Grant Round', () => {
  
    it('initializes grant round correctly', async () => {
      
    })
  
    describe('accepting contributions', () => {
     
      it('accepts contributions from everyone', async () => {
      })
  
      it('rejects contributions if MACI has not been linked to a round', async () => {
      })
  
      it('limits the number of contributors', async () => {
      })
  
      it('rejects contributions if funding round has been finalized', async () => {
      })
  
      it('rejects contributions with zero amount', async () => {
      })
  
      it('rejects contributions that are too large', async () => {
      })
  
      it('allows to contribute only once per round', async () => {
      })
  
      it('requires approval to transfer', async () => {
      })
  
      it('rejects contributions from unverified users', async () => {
      })
  
      it('should not allow users who have not contributed to sign up directly in MACI', async () => {
      
      })
  
      it('should not allow users who have already signed up to sign up directly in MACI', async () => {
       
      })
  
      it('should not return the amount of voice credits for user who has not contributed', async () => {
      })
    })
  
    describe('voting', () => {
      
  
      it('submits a vote', async () => {
       
      })
  
      it('submits a key-changing message', async () => {
        
      })
  
      it('submits an invalid vote', async () => {
       
      })
  
      it('submits a vote for invalid vote option', async () => {
        
      })
  
      it('submits a batch of messages', async () => {
        
    })
  
    describe('publishing tally hash', () => {
      it('allows coordinator to publish vote tally hash', async () => {
        
      })
  
      it('allows only coordinator to publish tally hash', async () => {
        
      })
  
      it('reverts if round has been finalized', async () => {
       
      })
  
      it('rejects empty string', async () => {
        
      })
    })
  
    describe('finalizing round', () => {
  
      it('allows owner to finalize round', async () => {
       
      })
  
      it('allows owner to finalize round when matching pool is empty', async () => {
        
      })
  
      it('counts direct token transfers to funding round as matching pool contributions', async () => {
        
      })
  
      it('reverts if round has been finalized already', async () => {
        
      })

  
      it('reverts if voting is still in progress', async () => {
       
      })
  
      it('reverts if votes has not been tallied', async () => {
        
      })
  
      it('reverts if tally hash has not been published', async () => {
        
      })
  
      it('reverts if total votes is zero', async () => {
       
      })
  
      it('reverts if total amount of spent voice credits is incorrect', async () => {
        
      })
  
      it('allows only owner to finalize round', async () => {
      })
    })
  
    describe('cancelling round', () => {
      it('allows owner to cancel round', async () => {
      
      })
  
      it('reverts if round has been finalized already', async () => {
       
      })
  
      it('reverts if round has been cancelled already', async () => {
        
      })
  
      it('allows only owner to cancel round', async () => {
        
      })
    })
  
    
  
    describe('claiming funds', () => {
  
      it('allows recipient to claim allocated funds', async () => {
        
      })
  
      it('allows address different than recipient to claim allocated funds', async () => {
        
      })
  
      it('allows recipient to claim zero amount', async () => {
        
      })
  
      it('allows recipient to claim if the matching pool is empty', async () => {
        
      })
  
      it('should not allow recipient to claim funds if round has not been finalized', async () => {
        
      })
  
      it('should not allow recipient to claim funds if round has been cancelled', async () => {
       
      })
  
      it('sends funds allocated to unverified recipients back to matching pool', async () => {
        
      })
  
      it('allows recipient to claim allocated funds only once', async () => {
       
      })
  
      it('should verify that tally result is correct', async () => {
       
      })
  
      it('should verify that amount of spent voice credits is correct', async () => {
        
      })
    })
  })

  describe('cancelling round', () => {

    it('allows owner to cancel round', async () => {
     
    })

    it('allows only owner to cancel round', async () => {
      
    })

    it('reverts if round has not been deployed', async () => {
      
    })

    it('reverts if round is finalized', async () => {
      
    })
  })

  
})