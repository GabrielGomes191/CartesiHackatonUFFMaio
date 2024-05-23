import { Argv } from "yargs";
import { Args as ConnectArgs } from "../../connect";
import { Args as RollupsArgs } from "../../rollups";
interface Args extends ConnectArgs, RollupsArgs {
    url: string;
    index: number;
    input: number;
}
export declare const command = "validate";
export declare const describe = "Validate notice given its id";
export declare const builder: (yargs: Argv) => Argv<RollupsArgs & ConnectArgs & {
    url: string;
} & {
    index: number | undefined;
} & {
    input: number | undefined;
}>;
export declare const handler: (args: Args) => Promise<void>;
export {};
