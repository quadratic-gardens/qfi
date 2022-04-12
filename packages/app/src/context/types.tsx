import { Dispatch, SetStateAction, PropsWithChildren } from "react";

export type SetValue<T> = Dispatch<SetStateAction<T>>;
export type DappStateType = {
  address?: string | null;
};

export type DappContextType = {
  state: DappStateType;
  setState: SetValue<DappStateType>;
};

export type Props = PropsWithChildren<{}>;
