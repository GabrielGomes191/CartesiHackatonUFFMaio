"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
const expect = chai_1.default.expect;
const utils_1 = require("../src/utils");
describe("Frontend Console tests", () => {
    it("should load deployments at specific dir", async () => {
        const contracts = (0, utils_1.readAllContractsFromDir)("./tests/resources/deployments");
        expect(Object.keys(contracts).length).to.eq(4);
    });
});
