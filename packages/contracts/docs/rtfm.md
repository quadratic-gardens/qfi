npx solidity-docgen --solc-module solc-0.8 -t ./docs/templates/

cd docs 
nvm use v12.18.1
gitbook install
gitbook build
gitbook serve