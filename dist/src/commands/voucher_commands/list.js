"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.command = void 0;
const vouchers_1 = require("../../graphql/vouchers");
const utils_1 = require("../utils");
exports.command = "list";
exports.describe = "List vouchers of an input";
const DEFAULT_URL = "http://localhost:4000/graphql";
const builder = (yargs) => {
    return yargs
        .option("url", {
        describe: "Reader URL",
        type: "string",
        default: DEFAULT_URL,
    })
        .option("input", {
        describe: "Input index",
        type: "number",
    });
};
exports.builder = builder;
const handler = async (args) => {
    const { url, input } = args;
    // wait for vouchers to appear in reader
    const vouchers = await (0, vouchers_1.getVouchers)(url, input);
    // gathers outputs to print based on the retrieved vouchers
    // - sorts vouchers because the query is not sortable
    // - decodes the hex payload as an UTF-8 string, if possible
    // - prints only destination, payload and indices for epoch, input and voucher
    const outputs = vouchers
        .sort((a, b) => {
        // sort by input index and then by notice index
        const inputResult = a.input.index - b.input.index;
        if (inputResult != 0) {
            return inputResult;
        }
        else {
            return a.index - b.index;
        }
    })
        .map((v) => {
        const output = {};
        output.index = v.index;
        output.input = v.input.index;
        output.destination = v.destination;
        output.payload = (0, utils_1.hex2str)(v.payload);
        return output;
    });
    console.log(JSON.stringify(outputs));
};
exports.handler = handler;
