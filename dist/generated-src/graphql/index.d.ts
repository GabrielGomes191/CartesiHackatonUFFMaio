import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigInt: any;
};
/** Request submitted to the application to advance its state */
export declare type Input = {
    __typename?: 'Input';
    /** Number of the base layer block in which the input was recorded */
    blockNumber: Scalars['BigInt'];
    /** Input index starting from genesis */
    index: Scalars['Int'];
    /** Address responsible for submitting the input */
    msgSender: Scalars['String'];
    /** Get notice from this particular input given the notice's index */
    notice: Notice;
    /** Get notices from this particular input with support for pagination */
    notices: NoticeConnection;
    /** Input payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String'];
    /** Get report from this particular input given the report's index */
    report: Report;
    /** Get reports from this particular input with support for pagination */
    reports: ReportConnection;
    /** Timestamp associated with the input submission, as defined by the base layer's block in which it was recorded */
    timestamp: Scalars['BigInt'];
    /** Get voucher from this particular input given the voucher's index */
    voucher: Voucher;
    /** Get vouchers from this particular input with support for pagination */
    vouchers: VoucherConnection;
};
/** Request submitted to the application to advance its state */
export declare type InputNoticeArgs = {
    index: Scalars['Int'];
};
/** Request submitted to the application to advance its state */
export declare type InputNoticesArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Request submitted to the application to advance its state */
export declare type InputReportArgs = {
    index: Scalars['Int'];
};
/** Request submitted to the application to advance its state */
export declare type InputReportsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Request submitted to the application to advance its state */
export declare type InputVoucherArgs = {
    index: Scalars['Int'];
};
/** Request submitted to the application to advance its state */
export declare type InputVouchersArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Pagination result */
export declare type InputConnection = {
    __typename?: 'InputConnection';
    /** Pagination entries returned for the current page */
    edges: Array<InputEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int'];
};
/** Pagination entry */
export declare type InputEdge = {
    __typename?: 'InputEdge';
    /** Pagination cursor */
    cursor: Scalars['String'];
    /** Node instance */
    node: Input;
};
/** Filter object to restrict results depending on input properties */
export declare type InputFilter = {
    /** Filter only inputs with index greater than a given value */
    indexGreaterThan?: InputMaybe<Scalars['Int']>;
    /** Filter only inputs with index lower than a given value */
    indexLowerThan?: InputMaybe<Scalars['Int']>;
};
/** Informational statement that can be validated in the base layer blockchain */
export declare type Notice = {
    __typename?: 'Notice';
    /** Notice index within the context of the input that produced it */
    index: Scalars['Int'];
    /** Input whose processing produced the notice */
    input: Input;
    /** Notice data as a payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String'];
    /** Proof object that allows this notice to be validated by the base layer blockchain */
    proof?: Maybe<Proof>;
};
/** Pagination result */
export declare type NoticeConnection = {
    __typename?: 'NoticeConnection';
    /** Pagination entries returned for the current page */
    edges: Array<NoticeEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int'];
};
/** Pagination entry */
export declare type NoticeEdge = {
    __typename?: 'NoticeEdge';
    /** Pagination cursor */
    cursor: Scalars['String'];
    /** Node instance */
    node: Notice;
};
/** Validity proof for an output */
export declare type OutputValidityProof = {
    __typename?: 'OutputValidityProof';
    /** Local input index within the context of the related epoch */
    inputIndexWithinEpoch: Scalars['Int'];
    /** Hash of the machine state claimed for the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    machineStateHash: Scalars['String'];
    /** Merkle root of all notice hashes of the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    noticesEpochRootHash: Scalars['String'];
    /** Proof that this output hash is in the output-hashes merkle tree. This array of siblings is bottom-up ordered (from the leaf to the root). Each hash is given in Ethereum hex binary format (32 bytes), starting with '0x'. */
    outputHashInOutputHashesSiblings: Array<Scalars['String']>;
    /** Proof that this output-hashes root hash is in epoch's output merkle tree. This array of siblings is bottom-up ordered (from the leaf to the root). Each hash is given in Ethereum hex binary format (32 bytes), starting with '0x'. */
    outputHashesInEpochSiblings: Array<Scalars['String']>;
    /** Merkle root of all output hashes of the related input, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    outputHashesRootHash: Scalars['String'];
    /** Output index within the context of the input that produced it */
    outputIndexWithinInput: Scalars['Int'];
    /** Merkle root of all voucher hashes of the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    vouchersEpochRootHash: Scalars['String'];
};
/** Page metadata for the cursor-based Connection pagination pattern */
export declare type PageInfo = {
    __typename?: 'PageInfo';
    /** Cursor pointing to the last entry of the page */
    endCursor?: Maybe<Scalars['String']>;
    /** Indicates if there are additional entries after the end curs */
    hasNextPage: Scalars['Boolean'];
    /** Indicates if there are additional entries before the start curs */
    hasPreviousPage: Scalars['Boolean'];
    /** Cursor pointing to the first entry of the page */
    startCursor?: Maybe<Scalars['String']>;
};
/** Data that can be used as proof to validate notices and execute vouchers on the base layer blockchain */
export declare type Proof = {
    __typename?: 'Proof';
    /** Data that allows the validity proof to be contextualized within submitted claims, given as a payload in Ethereum hex binary format, starting with '0x' */
    context: Scalars['String'];
    /** Validity proof for an output */
    validity: OutputValidityProof;
};
/** Top level queries */
export declare type Query = {
    __typename?: 'Query';
    /** Get input based on its identifier */
    input: Input;
    /** Get inputs with support for pagination */
    inputs: InputConnection;
    /** Get notice based on its index */
    notice: Notice;
    /** Get notices with support for pagination */
    notices: NoticeConnection;
    /** Get report based on its index */
    report: Report;
    /** Get reports with support for pagination */
    reports: ReportConnection;
    /** Get voucher based on its index */
    voucher: Voucher;
    /** Get vouchers with support for pagination */
    vouchers: VoucherConnection;
};
/** Top level queries */
export declare type QueryInputArgs = {
    index: Scalars['Int'];
};
/** Top level queries */
export declare type QueryInputsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<InputFilter>;
};
/** Top level queries */
export declare type QueryNoticeArgs = {
    inputIndex: Scalars['Int'];
    noticeIndex: Scalars['Int'];
};
/** Top level queries */
export declare type QueryNoticesArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Top level queries */
export declare type QueryReportArgs = {
    inputIndex: Scalars['Int'];
    reportIndex: Scalars['Int'];
};
/** Top level queries */
export declare type QueryReportsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Top level queries */
export declare type QueryVoucherArgs = {
    inputIndex: Scalars['Int'];
    voucherIndex: Scalars['Int'];
};
/** Top level queries */
export declare type QueryVouchersArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
/** Application log or diagnostic information */
export declare type Report = {
    __typename?: 'Report';
    /** Report index within the context of the input that produced it */
    index: Scalars['Int'];
    /** Input whose processing produced the report */
    input: Input;
    /** Report data as a payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String'];
};
/** Pagination result */
export declare type ReportConnection = {
    __typename?: 'ReportConnection';
    /** Pagination entries returned for the current page */
    edges: Array<ReportEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int'];
};
/** Pagination entry */
export declare type ReportEdge = {
    __typename?: 'ReportEdge';
    /** Pagination cursor */
    cursor: Scalars['String'];
    /** Node instance */
    node: Report;
};
/** Representation of a transaction that can be carried out on the base layer blockchain, such as a transfer of assets */
export declare type Voucher = {
    __typename?: 'Voucher';
    /** Transaction destination address in Ethereum hex binary format (20 bytes), starting with '0x' */
    destination: Scalars['String'];
    /** Voucher index within the context of the input that produced it */
    index: Scalars['Int'];
    /** Input whose processing produced the voucher */
    input: Input;
    /** Transaction payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String'];
    /** Proof object that allows this voucher to be validated and executed on the base layer blockchain */
    proof?: Maybe<Proof>;
};
/** Pagination result */
export declare type VoucherConnection = {
    __typename?: 'VoucherConnection';
    /** Pagination entries returned for the current page */
    edges: Array<VoucherEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int'];
};
/** Pagination entry */
export declare type VoucherEdge = {
    __typename?: 'VoucherEdge';
    /** Pagination cursor */
    cursor: Scalars['String'];
    /** Node instance */
    node: Voucher;
};
export declare type NoticeQueryVariables = Exact<{
    noticeIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>;
export declare type NoticeQuery = {
    __typename?: 'Query';
    notice: {
        __typename?: 'Notice';
        index: number;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
        };
        proof?: {
            __typename?: 'Proof';
            context: string;
            validity: {
                __typename?: 'OutputValidityProof';
                inputIndexWithinEpoch: number;
                outputIndexWithinInput: number;
                outputHashesRootHash: string;
                vouchersEpochRootHash: string;
                noticesEpochRootHash: string;
                machineStateHash: string;
                outputHashInOutputHashesSiblings: Array<string>;
                outputHashesInEpochSiblings: Array<string>;
            };
        } | null;
    };
};
export declare type NoticesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type NoticesQuery = {
    __typename?: 'Query';
    notices: {
        __typename?: 'NoticeConnection';
        edges: Array<{
            __typename?: 'NoticeEdge';
            node: {
                __typename?: 'Notice';
                index: number;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                };
            };
        }>;
    };
};
export declare type NoticesByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int'];
}>;
export declare type NoticesByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        notices: {
            __typename?: 'NoticeConnection';
            edges: Array<{
                __typename?: 'NoticeEdge';
                node: {
                    __typename?: 'Notice';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
    };
};
export declare type VoucherQueryVariables = Exact<{
    voucherIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>;
export declare type VoucherQuery = {
    __typename?: 'Query';
    voucher: {
        __typename?: 'Voucher';
        index: number;
        destination: string;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
        };
        proof?: {
            __typename?: 'Proof';
            context: string;
            validity: {
                __typename?: 'OutputValidityProof';
                inputIndexWithinEpoch: number;
                outputIndexWithinInput: number;
                outputHashesRootHash: string;
                vouchersEpochRootHash: string;
                noticesEpochRootHash: string;
                machineStateHash: string;
                outputHashInOutputHashesSiblings: Array<string>;
                outputHashesInEpochSiblings: Array<string>;
            };
        } | null;
    };
};
export declare type VouchersQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type VouchersQuery = {
    __typename?: 'Query';
    vouchers: {
        __typename?: 'VoucherConnection';
        edges: Array<{
            __typename?: 'VoucherEdge';
            node: {
                __typename?: 'Voucher';
                index: number;
                destination: string;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                };
            };
        }>;
    };
};
export declare type VouchersByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int'];
}>;
export declare type VouchersByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        vouchers: {
            __typename?: 'VoucherConnection';
            edges: Array<{
                __typename?: 'VoucherEdge';
                node: {
                    __typename?: 'Voucher';
                    index: number;
                    destination: string;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
    };
};
export declare type ReportQueryVariables = Exact<{
    reportIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>;
export declare type ReportQuery = {
    __typename?: 'Query';
    report: {
        __typename?: 'Report';
        index: number;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
        };
    };
};
export declare type ReportsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type ReportsQuery = {
    __typename?: 'Query';
    reports: {
        __typename?: 'ReportConnection';
        edges: Array<{
            __typename?: 'ReportEdge';
            node: {
                __typename?: 'Report';
                index: number;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                };
            };
        }>;
    };
};
export declare type ReportsByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int'];
}>;
export declare type ReportsByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        reports: {
            __typename?: 'ReportConnection';
            edges: Array<{
                __typename?: 'ReportEdge';
                node: {
                    __typename?: 'Report';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
    };
};
export declare const NoticeDocument: DocumentNode<NoticeQuery, Exact<{
    noticeIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>>;
export declare const NoticesDocument: DocumentNode<NoticesQuery, Exact<{
    [key: string]: never;
}>>;
export declare const NoticesByInputDocument: DocumentNode<NoticesByInputQuery, Exact<{
    inputIndex: Scalars['Int'];
}>>;
export declare const VoucherDocument: DocumentNode<VoucherQuery, Exact<{
    voucherIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>>;
export declare const VouchersDocument: DocumentNode<VouchersQuery, Exact<{
    [key: string]: never;
}>>;
export declare const VouchersByInputDocument: DocumentNode<VouchersByInputQuery, Exact<{
    inputIndex: Scalars['Int'];
}>>;
export declare const ReportDocument: DocumentNode<ReportQuery, Exact<{
    reportIndex: Scalars['Int'];
    inputIndex: Scalars['Int'];
}>>;
export declare const ReportsDocument: DocumentNode<ReportsQuery, Exact<{
    [key: string]: never;
}>>;
export declare const ReportsByInputDocument: DocumentNode<ReportsByInputQuery, Exact<{
    inputIndex: Scalars['Int'];
}>>;
