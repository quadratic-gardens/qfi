import { utils } from "ethers";

import { NetworkConfig, SUPPORTED_NETWORKS } from "./WalletContext";

export const switchChainOnMetaMask = async (networks: NetworkConfig, chainId: string): Promise<boolean> => {
  if (!networks[chainId]) return false;

  const { name, symbol } = networks[chainId] || {};
  const networkName = networks[chainId].name;
  const rpcUrl = networks[chainId].rpc;
  const explorerUrl = networks[chainId].explorer;

  if (!(name && symbol && networkName && rpcUrl && explorerUrl && window.ethereum)) return false;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: utils.hexValue(chainId),
        },
      ],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if ((switchError as any).code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: utils.hexValue(chainId),
              chainName: networkName,
              nativeCurrency: {
                name,
                symbol,
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: [explorerUrl],
            },
          ],
        });
        return true;
      } catch (addError) {
        // eslint-disable-next-line no-console
        console.error("Unable to add chain to metamask", addError);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error("Unable to switch to chain on metamask", switchError);
    }
  }
  return false;
};

export const switchChainToDefault = async (defaultChainId: string) => {
  await switchChainOnMetaMask(SUPPORTED_NETWORKS, defaultChainId);
};

// MIT License

// Copyright (c) 2022 Raid Guild

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
