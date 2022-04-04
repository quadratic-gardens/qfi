QFI (Quadratic Funding Infrastructure)
---

## Pre-commit hook

pre-commit hook is a custom git script triggered by commit operation. It's used to see if you've forgotten something and to make sure tests run. Failure from this hook aborts the commit.

pre-commit hook on QFI will check code style(lint) and run an unit tests of `contracts` subpackage. Unit tests runs only if solidity codes has been changed.

To skip a pre-commit hook, commit with `--no-verify` option.
e.g.:
```
git commit --no-verify
```
