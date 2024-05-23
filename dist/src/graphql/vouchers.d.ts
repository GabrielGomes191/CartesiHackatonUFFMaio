import { Voucher, Input } from "../../generated-src/graphql";
export declare type PartialInput = Pick<Input, "index">;
export declare type PartialVoucher = Pick<Voucher, "__typename" | "index" | "destination" | "payload"> & {
    input: PartialInput;
};
export declare type PartialVoucherEdge = {
    node: PartialVoucher;
};
/**
 * Queries a GraphQL server for vouchers based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns List of vouchers, returned as PartialVoucher objects
 */
export declare const getVouchers: (url: string, inputIndex?: number) => Promise<PartialVoucher[]>;
/**
 * Queries a GraphQL server looking for a specific voucher
 * @param url URL of the GraphQL server
 * @param noticeIndex notice index
 * @param inputIndex input index
 * @returns The corresponding voucher, returned as a full Voucher object
 */
export declare const getVoucher: (url: string, voucherIndex: number, inputIndex: number) => Promise<Voucher>;
