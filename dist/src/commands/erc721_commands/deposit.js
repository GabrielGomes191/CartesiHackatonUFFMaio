"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.command = void 0;
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
const rollups_1 = require("@cartesi/rollups");
const connect_1 = require("../../connect");
const rollups_2 = require("../../rollups");
const util_1 = require("../util");
const safeTransferFrom = "safeTransferFrom(address,address,uint256)";
exports.command = "deposit";
exports.describe = "Deposit ERC-721 tokens to a DApp";
const builder = (yargs) => {
    const connectArgs = (0, connect_1.builder)(yargs, true);
    const rollupsArgs = (0, rollups_2.builder)(connectArgs);
    return rollupsArgs
        .option("erc721", {
        describe: "ERC-721 contract address",
        type: "string",
    })
        .option("tokenId", {
        demandOption: true,
        type: "string",
        describe: "The ID of the token being transfered",
    });
};
exports.builder = builder;
const handler = async (args) => {
    var _a;
    const { rpc, mnemonic, accountIndex, erc721, tokenId } = args;
    // connect to provider
    console.log(`connecting to ${rpc}`);
    const { provider, signer } = (0, connect_1.connect)(rpc, mnemonic, accountIndex);
    const network = await provider.getNetwork();
    console.log(`connected to chain ${network.chainId}`);
    // connect to rollups
    const { dapp, inputContract, erc721Portal, deployment } = await (0, rollups_2.rollups)(network.chainId, signer || provider, args);
    console.log(`depositing token ${tokenId}...`);
    // get ERC-721 contract address
    const erc721address = erc721 !== null && erc721 !== void 0 ? erc721 : (_a = deployment === null || deployment === void 0 ? void 0 : deployment.contracts["SimpleERC721"]) === null || _a === void 0 ? void 0 : _a.address;
    if (!erc721address) {
        throw new Error(`cannot resolve ERC-721 address for chain ${network.chainId}`);
    }
    console.log(`using ERC-721 token contract at "${erc721address}"`);
    const erc721Contract = rollups_1.IERC721__factory.connect(erc721address, erc721Portal.signer);
    // send safeTransferFrom transaction
    const senderAddress = await erc721Portal.signer.getAddress();
    console.log(`using account "${senderAddress}"`);
    //Set the ERC721Portal as the new controller
    const approve = await erc721Contract.approve(erc721Portal.address, tokenId);
    await approve.wait();
    //Deposit token through portal
    const tx = await erc721Portal.depositERC721Token(erc721address, dapp, tokenId, "0x", "0x");
    console.log(`transaction: ${tx.hash}`);
    console.log("waiting for confirmation...");
    // print receipt info
    const receipt = await tx.wait();
    // find added input information from transaction receipt
    const inputAddedInfo = (0, util_1.findInputAddedInfo)(receipt, inputContract);
    console.log(`deposit successfully executed as input ${inputAddedInfo.input_index}`);
};
exports.handler = handler;
