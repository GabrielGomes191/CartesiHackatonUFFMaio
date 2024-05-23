"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.getInputKeys = exports.builder = exports.describe = exports.command = void 0;
const ethers_1 = require("ethers");
const connect_1 = require("../../connect");
const rollups_1 = require("../../rollups");
exports.command = "send";
exports.describe = "Send string input to DApp";
const builder = (yargs) => {
    // args regarding connecting to provider
    const connectArgs = (0, connect_1.builder)(yargs, true);
    // args regarding connecting to rollups
    const rollupsArgs = (0, rollups_1.builder)(connectArgs);
    // this command args
    return rollupsArgs.option("payload", {
        describe: "Input payload to send",
        type: "string",
        demandOption: true,
    });
};
exports.builder = builder;
/**
 * Retrieve InputKeys from an InputAddedEvent
 * @param receipt Blockchain transaction receipt
 * @returns input identification keys
 */
const getInputKeys = (receipt) => {
    var _a;
    // get InputAddedEvent from transaction receipt
    const event = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.find((e) => e.event === "InputAdded");
    if (!event) {
        throw new Error(`InputAdded event not found in receipt of transaction ${receipt.transactionHash}`);
    }
    const inputAdded = event;
    return {
        input_index: inputAdded.args.inputIndex.toNumber(),
    };
};
exports.getInputKeys = getInputKeys;
const handler = async (args) => {
    const { rpc, payload, mnemonic, accountIndex } = args;
    // connect to provider
    console.log(`connecting to ${rpc}`);
    const { provider, signer } = (0, connect_1.connect)(rpc, mnemonic, accountIndex);
    const network = await provider.getNetwork();
    console.log(`connected to chain ${network.chainId}`);
    // connect to rollups,
    const { dapp, inputContract } = await (0, rollups_1.rollups)(network.chainId, signer || provider, args);
    const signerAddress = await inputContract.signer.getAddress();
    console.log(`using account "${signerAddress}"`);
    // use message from command line option, or from user prompt
    console.log(`sending "${payload}"`);
    // convert string to input bytes (if it's not already bytes-like)
    const inputBytes = ethers_1.ethers.utils.isBytesLike(payload)
        ? payload
        : ethers_1.ethers.utils.toUtf8Bytes(payload);
    // send transaction
    const tx = await inputContract.addInput(dapp, inputBytes);
    console.log(`transaction: ${tx.hash}`);
    console.log("waiting for confirmation...");
    const receipt = await tx.wait(1);
    // find reference to notice from transaction receipt
    const inputKeys = (0, exports.getInputKeys)(receipt);
    console.log(`input ${inputKeys.input_index} added`);
};
exports.handler = handler;
