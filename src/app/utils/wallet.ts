import { OfflineAminoSigner } from '@keplr-wallet/types';

declare let window: WalletWindow;

export const isWalletInstalled = (): boolean => {
  if (!window.keplr) return false;
  window.wallet = window.keplr;
  return true;
};

export async function getWalletAmino(
  chainID: string
): Promise<
  [OfflineAminoSigner, { address: string; algo: string; pubKey: Uint32Array }]
> {
  await window.wallet.enable(chainID);
  const offlineSigner = window.wallet.getOfflineSignerOnlyAmino(chainID);
  const accounts = await offlineSigner.getAccounts();
  return [offlineSigner, accounts[0]];
}
