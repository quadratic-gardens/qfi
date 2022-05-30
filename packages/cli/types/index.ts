export type KeyPair = {
  privateKey: string
  publicKey: string
}

export enum QRCodeFileType {
  PNG = "png",
  SVG = "svg",
  UTF8 = "utf8"
}

export type Network = {
  name: string,
  rpcUrl: string,
  chainId: number
}