import { Dispatch, SetStateAction, PropsWithChildren } from "react";

export type SetValue<T> = Dispatch<SetStateAction<T>>;
export type DappStateType = {
  address?: string | null;
  blockExplorer?: string;
};

export type DappContextType = {
  dappState: DappStateType;
  setDappState: SetValue<DappStateType>;
};

export type Props = PropsWithChildren<{}>;
