import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected readonly delimiter: string;

    protected constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEqual(other: Name): boolean {
        if (!(other instanceof AbstractName)){
            return false;
        } 

        if (this.getNoComponents() !== other.getNoComponents()){
            return false;
        } 

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)){
                return false;
            } 
        }

        return true;

    }

    public getHashCode(): number {
        let hash = 1;
        for (let i = 0; i < this.getNoComponents(); i++) {
            for (const c of this.getComponent(i)) {
                hash = 31 * hash + c.charCodeAt(0);
            }
        }
        return hash;
    }


    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;

    abstract withComponent(i: number, c: string): Name;
    abstract withInserted(i: number, c: string): Name;
    abstract withAppended(c: string): Name;
    abstract without(i: number): Name;
    abstract concat(other: Name): Name;

    abstract asString(delimiter?: string): string;
    abstract asDataString(): string;
}
