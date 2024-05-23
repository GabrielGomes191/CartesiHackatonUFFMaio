"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoucher = exports.getVouchers = void 0;
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
const core_1 = require("@urql/core");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const graphql_1 = require("../../generated-src/graphql");
// define a type predicate to filter out vouchers
const isPartialVoucherEdge = (n) => n !== null;
/**
 * Queries a GraphQL server for vouchers based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns List of vouchers, returned as PartialVoucher objects
 */
const getVouchers = async (url, inputIndex) => {
    var _a, _b, _c;
    // create GraphQL client to reader server
    const client = (0, core_1.createClient)({ url, exchanges: core_1.defaultExchanges, fetch: cross_fetch_1.default });
    // query the GraphQL server for vouchers corresponding to the input index
    console.log(`querying ${url} for vouchers of input index "${inputIndex}"...`);
    if (inputIndex !== undefined) {
        // list vouchers querying by input
        const { data, error } = await client
            .query(graphql_1.VouchersByInputDocument, {
            inputIndex: inputIndex,
        })
            .toPromise();
        if ((_b = (_a = data === null || data === void 0 ? void 0 : data.input) === null || _a === void 0 ? void 0 : _a.vouchers) === null || _b === void 0 ? void 0 : _b.edges) {
            return data.input.vouchers.edges
                .filter(isPartialVoucherEdge)
                .map((e) => e.node);
        }
        else {
            return [];
        }
    }
    else {
        // list vouchers using top-level query
        const { data, error } = await client
            .query(graphql_1.VouchersDocument, {})
            .toPromise();
        if ((_c = data === null || data === void 0 ? void 0 : data.vouchers) === null || _c === void 0 ? void 0 : _c.edges) {
            return data.vouchers.edges
                .filter(isPartialVoucherEdge)
                .map((e) => e.node);
        }
        else {
            return [];
        }
    }
};
exports.getVouchers = getVouchers;
/**
 * Queries a GraphQL server looking for a specific voucher
 * @param url URL of the GraphQL server
 * @param noticeIndex notice index
 * @param inputIndex input index
 * @returns The corresponding voucher, returned as a full Voucher object
 */
const getVoucher = async (url, voucherIndex, inputIndex) => {
    // create GraphQL client to reader server
    const client = (0, core_1.createClient)({ url, exchanges: core_1.defaultExchanges, fetch: cross_fetch_1.default });
    // query the GraphQL server for the voucher
    console.log(`querying ${url} for voucher with index "${voucherIndex}" from input "${inputIndex}"...`);
    const { data, error } = await client
        .query(graphql_1.VoucherDocument, { voucherIndex, inputIndex })
        .toPromise();
    if (data === null || data === void 0 ? void 0 : data.voucher) {
        return data.voucher;
    }
    else {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.getVoucher = getVoucher;
