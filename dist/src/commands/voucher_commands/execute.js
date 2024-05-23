"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.command = void 0;
const vouchers_1 = require("../../graphql/vouchers");
const connect_1 = require("../../connect");
const rollups_1 = require("../../rollups");
const rollups_2 = require("@cartesi/rollups");
exports.command = "execute";
exports.describe = "Execute voucher given its input index and its index";
const DEFAULT_URL = "http://localhost:4000/graphql";
const builder = (yargs) => {
    // args regarding connecting to provider
    const connectArgs = (0, connect_1.builder)(yargs, true);
    // args regarding connecting to rollups
    const rollupsArgs = (0, rollups_1.builder)(connectArgs);
    // this command args
    return rollupsArgs
        .option("url", {
        describe: "Reader URL",
        type: "string",
        default: DEFAULT_URL,
    })
        .option("index", {
        describe: "Voucher index within its associated Input",
        type: "number",
        requiresArg: true,
    })
        .option("input", {
        describe: "Input index",
        type: "number",
        requiresArg: true,
    });
};
exports.builder = builder;
const handler = async (args) => {
    var _a, _b, _c;
    const { url, index, input, rpc, mnemonic, accountIndex } = args;
    // wait for vouchers to appear in reader
    console.log(`retrieving voucher "${index}" from input "${input}" along with proof`);
    const voucher = await (0, vouchers_1.getVoucher)(url, index, input);
    if (!voucher.proof) {
        console.log(`voucher "${index}" from input "${input}" has no associated proof yet`);
        return;
    }
    // connect to provider
    console.log(`connecting to ${rpc}`);
    const { provider, signer } = (0, connect_1.connect)(rpc, mnemonic, accountIndex);
    const network = await provider.getNetwork();
    console.log(`connected to chain ${network.chainId}`);
    // connect to rollups,
    const { outputContract } = await (0, rollups_1.rollups)(network.chainId, signer || provider, args);
    const signerAddress = await outputContract.signer.getAddress();
    console.log(`using account "${signerAddress}"`);
    // send transaction to validate voucher
    console.log(`executing voucher "${index}" from input "${input}"`);
    try {
        const tx = await outputContract.executeVoucher(voucher.destination, voucher.payload, voucher.proof);
        const receipt = await tx.wait();
        console.log(`voucher executed! (tx="${tx.hash}")`);
        if (receipt.events) {
            console.log(`resulting events: ${JSON.stringify(receipt.events)}`);
        }
    }
    catch (e) {
        let error = e;
        // if error is a custom revert object, we need to parse it given its "data" field
        // note: custom revert error declaration may be in one of several contracts
        const errorData = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.data;
        try {
            error = outputContract.interface.parseError(errorData).name;
        }
        catch (e) {
            try {
                const libOutputValidation = rollups_2.LibOutputValidation__factory.connect(outputContract.address, outputContract.signer);
                error =
                    libOutputValidation.interface.parseError(errorData).name;
            }
            catch (e) {
                try {
                    const history = rollups_2.History__factory.connect(outputContract.address, outputContract.signer);
                    error = history.interface.parseError(errorData).name;
                }
                catch (e) { }
            }
        }
        console.log(`COULD NOT EXECUTE VOUCHER: ${JSON.stringify(error)}`);
    }
};
exports.handler = handler;
