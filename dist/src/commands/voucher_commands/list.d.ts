import { Argv } from "yargs";
interface Args {
    url: string;
    input?: number;
}
export declare const command = "list";
export declare const describe = "List vouchers of an input";
export declare const builder: (yargs: Argv) => Argv<{
    url: string;
} & {
    input: number | undefined;
}>;
export declare const handler: (args: Args) => Promise<void>;
export {};
