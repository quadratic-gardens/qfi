import * as React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import { CSSReset } from "@chakra-ui/react";
import { WalletProvider, web3modalOptions, SUPPORTED_NETWORKS, nameToChainId } from "@qfi/hooks";

import { App } from "./App";

const DEFAULT_CHAIN_ID = nameToChainId("Mainnet"); // Used to switch to if the user is on an unsupported network

ReactDOM.render(
  <React.StrictMode>
    <CSSReset />
    <HashRouter>
      <WalletProvider
        web3modalOptions={web3modalOptions}
        networks={SUPPORTED_NETWORKS}
        // Optional if you want to auto switch the network
        defaultChainId={DEFAULT_CHAIN_ID}
        // Optional but useful to handle events.
        handleAccountsChangedEvent={(accounts: string[]) => {
          console.log("Accounts changed");
        }}
        handleChainChangedEvent={(chainId: number) => {
          console.log("ChainId changed to: " + chainId);
        }}
        handleConnectEvent={(info: { chainId: number }) => {
          console.log(info);
        }}
        handleDisconnectEvent={(error: { code: number; message: string }) => {
          if (error) console.log(error);
          else console.log("Disconnected");
        }}
        handleErrorEvent={(error: { code: string; message: string }) => {
          console.log("Error", error);
        }}>
        <App />
      </WalletProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
