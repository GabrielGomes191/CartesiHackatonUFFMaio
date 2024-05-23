import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { IInputBox, CartesiDApp, IERC20Portal, IERC721Portal } from "@cartesi/rollups";
import { Argv } from "yargs";
import { Deployment } from "./abi";
export interface Args {
    dapp: string;
    address?: string;
    addressFile?: string;
    deploymentFile?: string;
}
interface Contracts {
    dapp: string;
    inputContract: IInputBox;
    outputContract: CartesiDApp;
    erc20Portal: IERC20Portal;
    erc721Portal: IERC721Portal;
    deployment: Deployment;
}
/**
 * Builder for args for connecting to Rollups instance
 * @param yargs yargs instance
 * @returns Argv instance with all options
 */
export declare const builder: <T>(yargs: Argv<T>) => Argv<Args & T>;
/**
 * Connect to instance of Rollups application
 * @param chainId number of chain id of connected network
 * @param provider provider or signer of connected network
 * @param args args for connection logic
 * @returns Connected rollups contracts
 */
export declare const rollups: (chainId: number, provider: Provider | Signer, args: Args) => Promise<Contracts>;
export {};
