import { KeplrWindow } from '@keplr-wallet/types';
declare global {
  interface WalletWindow extends Window {
    keplr: KeplrWindow;

    leap: any;

    wallet: KeplrWindow | any;

    cosmostation: any;

    metamask: any;

    ethereum: any;
  }
}
