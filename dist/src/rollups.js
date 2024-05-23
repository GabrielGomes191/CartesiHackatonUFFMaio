"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollups = exports.builder = void 0;
const rollups_1 = require("@cartesi/rollups");
const networks_1 = require("./networks");
const utils_1 = require("./utils");
/**
 * Builder for args for connecting to Rollups instance
 * @param yargs yargs instance
 * @returns Argv instance with all options
 */
const builder = (yargs) => {
    return yargs
        .option("dapp", {
        describe: "DApp name",
        type: "string",
        default: "dapp",
    })
        .option("address", {
        describe: "Rollups contract address",
        type: "string",
    })
        .option("addressFile", {
        describe: "File with rollups contract address",
        type: "string",
    })
        .option("deploymentFile", {
        describe: "JSON file with deployment of rollups contracts",
        type: "string",
    });
};
exports.builder = builder;
/**
 * Read address from file located at deployment path
 * @param dapp DApp name
 * @param chainId number of chain id of connected network
 * @returns address or undefined if can't resolve network name of file does not exist
 */
const readDApp = (dapp, chainId) => {
    const network = networks_1.networks[chainId];
    if (network && dapp) {
        return (0, utils_1.readAddressFromFile)(`../deployments/${network.name}/${dapp}.json`);
    }
};
const readDeployment = (chainId, args) => {
    if (args.deploymentFile) {
        const deployment = require(args.deploymentFile);
        if (!deployment) {
            throw new Error(`rollups deployment '${args.deploymentFile}' not found`);
        }
        return deployment;
    }
    else {
        const network = networks_1.networks[chainId];
        if (!network) {
            throw new Error(`unsupported chain ${chainId}`);
        }
        if (network.name === "localhost") {
            const contracts = (0, utils_1.readAllContractsFromDir)("../deployments/localhost", "../common-contracts/deployments/localhost");
            const deployment = { chainId: chainId.toString(), name: "localhost", contracts: contracts };
            return deployment;
        }
        const deployment = require(`@cartesi/rollups/export/abi/${network.name}.json`);
        if (!deployment) {
            throw new Error(`rollups not deployed to network ${network.name}`);
        }
        return deployment;
    }
};
/**
 * Connect to instance of Rollups application
 * @param chainId number of chain id of connected network
 * @param provider provider or signer of connected network
 * @param args args for connection logic
 * @returns Connected rollups contracts
 */
const rollups = async (chainId, provider, args) => {
    const address = args.address ||
        (0, utils_1.readAddressFromFile)(args.addressFile) ||
        readDApp(args.dapp, chainId);
    if (!address) {
        throw new Error("unable to resolve DApp address");
    }
    const deployment = readDeployment(chainId, args);
    const InputBox = deployment.contracts["InputBox"];
    const ERC20Portal = deployment.contracts["ERC20Portal"];
    const ERC721Portal = deployment.contracts["ERC721Portal"];
    // connect to contracts
    const inputContract = rollups_1.IInputBox__factory.connect(InputBox.address, provider);
    const outputContract = rollups_1.CartesiDApp__factory.connect(address, provider);
    const erc20Portal = rollups_1.IERC20Portal__factory.connect(ERC20Portal.address, provider);
    const erc721Portal = rollups_1.IERC721Portal__factory.connect(ERC721Portal.address, provider);
    return {
        dapp: address,
        inputContract,
        outputContract,
        erc20Portal,
        erc721Portal,
        deployment
    };
};
exports.rollups = rollups;
