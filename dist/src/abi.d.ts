export declare type Contract = {
    address: string;
    abi: any;
};
export declare type Deployment = {
    name: string;
    chainId: string;
    contracts: Record<string, Contract>;
};
