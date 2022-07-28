QFI (Quadratic Funding Infrastructure)
---

[![codecov](https://codecov.io/gh/quadratic-funding/qfi/branch/main/graph/badge.svg?token=KMU9X6GE2E)](https://codecov.io/gh/quadratic-funding/qfi)

## Development

### Pre-commit hook

pre-commit hook is a custom git script triggered by commit operation. It's used to see if you've forgotten something and to make sure tests run. Failure from this hook aborts the commit.

pre-commit hook on QFI will check code style(lint) and run an unit tests of `contracts` subpackage. Unit tests runs only if solidity codes has been changed.

To skip a pre-commit hook, commit with `--no-verify` option.
e.g.:
```
git commit --no-verify
```

### CI/CD pipeline

CI/CD pipeline ensures that we have automated tests that constantly validate that we are in a deployable state. For more information about pipeline workflows, see https://hackmd.io/@mdhackmdkakao/rkoVmtr75.

## Protocol Diagrams


![QFI set up diagram](assets/QFI-setup.png?raw=true "Setup")
![QFI voting diagram](assets/QFI-voting.png?raw=true "Voting")
![QFI merge and proof gen diagram](assets/QFI-Proofgen.png?raw=true "Merge and Proof Gen")
![QFI processing, tally and verification diagram](assets/QFI-Tally.png?raw=true "Processing, Tally and Verification")

