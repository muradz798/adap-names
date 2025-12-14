import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

export interface Name extends Printable, Equality {

    isEmpty(): boolean;

    getNoComponents(): number;

    getComponent(i: number): string;

    withComponent(i: number, c: string): Name;

    withInserted(i: number, c: string): Name;

    withAppended(c: string): Name;

    without(i: number): Name;

    concat(other: Name): Name;
}
