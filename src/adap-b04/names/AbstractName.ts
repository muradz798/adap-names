import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {IllegalArgumentException} from "../common/IllegalArgumentException"
import {InvalidStateException} from "../common/InvalidStateException"
import {MethodFailedException} from "../common/MethodFailedException"

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        //throw new Error("needs implementation or deletion");
    }

    public clone(): Name {
        const cloned = new (this.constructor as { new(...args: any[]): Name })();
        Object.assign(cloned, this);
        return cloned;
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
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
        let hash = 0;
        for (let i = 0; i < this.getNoComponents(); i++) {
            const comp = this.getComponent(i);
            for (let j = 0; j < comp.length; j++) {
                hash = (hash * 31 + comp.charCodeAt(j)) | 0;
            }
        }
        return hash;
    }

    public isEmpty(): boolean {
        if(this.getNoComponents() == 0){
            return true;
        }
        return false;
        //throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        if(this.delimiter.length > 1){
            throw new Error("neThe delimiter character must be a single character");
        }
        
        return this.delimiter;
        
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

    protected assertIsValidDelimeterAsPrecondition(c: string): void{
        IllegalArgumentException.assert(c.length===1, "The delimiter character must be a single character");
    }

    protected assertIsValidElementAsPrecondition(c:string){
        IllegalArgumentException.assert(c.length>=1, "Du hast kein Komponent eingegeben");
    }

    protected assertIsValidIndexAsPrecondition(i:number, noComponents:number){
        IllegalArgumentException.assert(i<noComponents, "Eingegebener Komponent-index überschreitet die Gesamtanzahl")
    }

    protected assertIsValidStringAsPostcondition(s: string, d:string){
        MethodFailedException.assert(s.includes(d), "String muss Delimeter enthalten");
    }

    protected assertIsValidNoComponentsAsPostcondition(noComponents: number){
        MethodFailedException.assert(noComponents>0, "Name muss mindestens ein Komponent haben");
    }
    
    protected assertClassInvariant(d:string, noComponents:number){
        InvalidStateException.assert((d.length === 1 || noComponents > 0), "Invalid State");
    }

}