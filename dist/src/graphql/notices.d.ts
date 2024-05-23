import { Notice, Input } from "../../generated-src/graphql";
export declare type PartialInput = Pick<Input, "index">;
export declare type PartialNotice = Pick<Notice, "__typename" | "index" | "payload"> & {
    input: PartialInput;
};
export declare type PartialNoticeEdge = {
    node: PartialNotice;
};
/**
 * Queries a GraphQL server for notices based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns List of notices, returned as PartialNotice objects
 */
export declare const getNotices: (url: string, inputIndex?: number) => Promise<PartialNotice[]>;
/**
 * Queries a GraphQL server looking for a specific notice
 * @param url URL of the GraphQL server
 * @param noticeIndex notice index
 * @param inputIndex input index
 * @returns The corresponding notice, returned as a full Notice object
 */
export declare const getNotice: (url: string, noticeIndex: number, inputIndex: number) => Promise<Notice>;
