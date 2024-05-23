import { Report, Input } from "../../generated-src/graphql";
export declare type PartialInput = Pick<Input, "index">;
export declare type PartialReport = Pick<Report, "__typename" | "index" | "payload"> & {
    input: PartialInput;
};
export declare type PartialReportEdge = {
    node: PartialReport;
};
/**
 * Queries a GraphQL server for reports based on input keys
 * @param url URL of the GraphQL server
 * @param input input identification keys
 * @returns List of reports, returned as PartialReport objects
 */
export declare const getReports: (url: string, inputIndex?: number) => Promise<PartialReport[]>;
/**
 * Queries a GraphQL server looking for a specific report
 * @param url URL of the GraphQL server
 * @param reportIndex report index
 * @param inputIndex input index
 * @returns The corresponding report, returned as a full Report object
 */
export declare const getReport: (url: string, reportIndex: number, inputIndex: number) => Promise<Report>;
