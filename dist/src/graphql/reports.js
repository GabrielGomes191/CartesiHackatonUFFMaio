"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReport = exports.getReports = void 0;
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
// define a type predicate to filter out reports
const isPartialReportEdge = (n) => n !== null;
/**
 * Queries a GraphQL server for reports based on input keys
 * @param url URL of the GraphQL server
 * @param input input identification keys
 * @returns List of reports, returned as PartialReport objects
 */
const getReports = async (url, inputIndex) => {
    var _a, _b;
    // create GraphQL client to reader server
    const client = (0, core_1.createClient)({ url, exchanges: core_1.defaultExchanges, fetch: cross_fetch_1.default });
    // query the GraphQL server for reports corresponding to the input index
    console.log(`querying ${url} for reports of input index "${inputIndex}"...`);
    if (inputIndex !== undefined) {
        // list reports querying by input
        const { data, error } = await client
            .query(graphql_1.ReportsByInputDocument, {
            inputIndex: inputIndex,
        })
            .toPromise();
        if ((_b = (_a = data === null || data === void 0 ? void 0 : data.input) === null || _a === void 0 ? void 0 : _a.reports) === null || _b === void 0 ? void 0 : _b.edges) {
            return data.input.reports.edges
                .filter(isPartialReportEdge)
                .map((e) => e.node);
        }
        else {
            return [];
        }
    }
    else {
        // list reports using top-level query
        const { data, error } = await client
            .query(graphql_1.ReportsDocument, {})
            .toPromise();
        if (data === null || data === void 0 ? void 0 : data.reports) {
            return data.reports.edges
                .filter(isPartialReportEdge)
                .map((e) => e.node);
        }
        else {
            return [];
        }
    }
};
exports.getReports = getReports;
/**
 * Queries a GraphQL server looking for a specific report
 * @param url URL of the GraphQL server
 * @param reportIndex report index
 * @param inputIndex input index
 * @returns The corresponding report, returned as a full Report object
 */
const getReport = async (url, reportIndex, inputIndex) => {
    // create GraphQL client to reader server
    const client = (0, core_1.createClient)({ url, exchanges: core_1.defaultExchanges, fetch: cross_fetch_1.default });
    // query the GraphQL server for the report
    console.log(`querying ${url} for report with index "${reportIndex}" from input "${inputIndex}"...`);
    const { data, error } = await client
        .query(graphql_1.ReportDocument, { reportIndex, inputIndex })
        .toPromise();
    if (data === null || data === void 0 ? void 0 : data.report) {
        return data.report;
    }
    else {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.getReport = getReport;
