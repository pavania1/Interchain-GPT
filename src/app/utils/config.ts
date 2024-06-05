type Currency = {
    coinDenom: string
    coinMinimalDenom: string
    coinDecimals: number
    coinGeckoId?: string
    gasPriceStep?: GasPrice
}

type StakeCurrency = {
    coinDenom: string
    coinMinimalDenom: string
    coinDecimals: number
    coinGeckoId?: string
}

type BIP44 = { coinType: number }

type GasPrice = { low: number; average: number; high: number }

type Bech32Config = {
    bech32PrefixAccAddr: string
    bech32PrefixAccPub: string
    bech32PrefixValAddr: string
    bech32PrefixValPub: string
    bech32PrefixConsAddr: string
    bech32PrefixConsPub: string
}

type Theme = {
    primaryColor: string
    gradient: string
}

interface NetworkConfig {
    rpc: string
    rest: string
    restURIs: string[]
    rpcURIs: string[]
    chainId: string
    chainName: string
    stakeCurrency: StakeCurrency
    walletUrlForStaking?: string
    bip44: BIP44
    bech32Config: Bech32Config
    currencies: Currency[]
    feeCurrencies: Currency[]
    features?: string[]
    image: string
    theme: Theme
}

export const networkInfo: NetworkConfig = {
    chainId: 'arka-local',
    chainName: 'Arka',
    rest: 'https://beta.arka.network/rest/',
    rpc: 'https://beta.arka.network/rpc/',
    restURIs: ['https://beta.arka.network/rest/'],
    rpcURIs: ['https://beta.arka.network/rpc/'],
    currencies: [
        {
            coinDenom: 'ARKA',
            coinMinimalDenom: 'uarka',
            coinDecimals: 6,
        },
    ],
    bech32Config: {
        bech32PrefixAccAddr: 'arka',
        bech32PrefixAccPub: 'arkapub',
        bech32PrefixValAddr: 'arkavaloper',
        bech32PrefixValPub: 'arkavaloperpub',
        bech32PrefixConsAddr: 'arkagvalcons',
        bech32PrefixConsPub: 'arkavalconspub',
    },
    feeCurrencies: [
        {
            coinDenom: 'ARKA',
            coinMinimalDenom: 'uarka',
            coinDecimals: 6,
            gasPriceStep: {
                low: 0,
                average: 0.0,
                high: 0.0,
            },
        },
    ],
    bip44: {
        coinType: 118,
    },
    stakeCurrency: {
        coinDenom: 'ARKA',
        coinMinimalDenom: 'uarka',
        coinDecimals: 6,
    },
    image: 'https://raw.githubusercontent.com/leapwallet/assets/2289486990e1eaf9395270fffd1c41ba344ef602/images/logo.svg',
    theme: {
        primaryColor: '#fff',
        gradient:
            'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 100%)',
    },
}
