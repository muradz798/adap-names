import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if(source.length == 0){
            throw new Error("Kein String eingegeben");
        }
        if(delimiter != undefined){
            this.delimiter = delimiter;
        }

        this.name = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        let newString: string;
        if(delimiter.length > 1){
            throw new Error("The delimiter character must be a single character");
        }
        if(delimiter != this.delimiter){
            newString = this.name; 
            newString.replace(this.delimiter, delimiter);
            return newString;
        }
        return this.name;
    }

    public asDataString(): string {
        if(this.name.includes(ESCAPE_CHARACTER)){
            for(let i: number = 0; i<this.name.length; i++){

            } 
        }
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        if(this.getNoComponents() == 0){
            return true;
        }
        return false;
        //throw new Error("needs implementation or deletion");
    }

    public getNoComponents(): number {
        if(this.name == ""){
            return 0;
        }
        return 1;
        //throw new Error("needs implementation or deletion");
    }

    public getComponent(x: number): string {
        if(this.isEmpty()){
            throw new Error("String ist leer");
        }
        return this.name[x];
    }

    public setComponent(n: number, c: string): void {
        if(this.isEmpty()){
            throw new Error("String ist leer");
        }
        else if(n>=this.name.length){
            throw new Error("Komponent existiert nicht");
        }

        let newString: string = "";
        for(let i:number = 0; i<this.name.length; i++){
            if(i == n){
                newString += c;
            }
            newString+=this.name[i];
        }

        this.name = newString; //überschreiben
    }

    public insert(n: number, c: string): void {
        const nameArray: string[] = this.name.split(this.delimiter);
        let len:number = nameArray.length;
        
        for(let i:number = 0; i<len; i++){

        }
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(n: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}