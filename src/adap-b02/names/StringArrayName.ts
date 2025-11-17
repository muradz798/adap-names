import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if(source.length == 0){
            throw new Error("Kein Kompenent eingegeben");
        }
        if(delimiter != undefined){
            this.delimiter = delimiter;
        }

        this.components = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        if(delimiter.length > 1){
            throw new Error("The delimiter character must be a single character");
        }

        const compLen: number = this.getNoComponents();
        let stringResult:string;
        if(compLen>1){
            stringResult = this.components.join(delimiter);
            return stringResult;
        }
        stringResult = this.components[compLen-1]; //hat nur ein Element 
        return stringResult;
    }

    public asDataString(): string {
        const compLen: number = this.getNoComponents();
        let currentCompenent:string;
        let stringResult: string;

        for(let i:number = 0; i<compLen; i++){
            currentCompenent = this.getComponent(i);
            if(currentCompenent.includes(DEFAULT_DELIMITER) || currentCompenent.includes(ESCAPE_CHARACTER)){
                let maskedComponent: string = "";
                for(let j:number = 0; j<currentCompenent.length; j++){
                    if(currentCompenent[j] == DEFAULT_DELIMITER){
                        maskedComponent += `${ESCAPE_CHARACTER}${currentCompenent[j]}`;
                    }
                    else if (currentCompenent[j] == ESCAPE_CHARACTER){
                        maskedComponent += '\\\\';
                    }
                    else{
                        maskedComponent += currentCompenent[j];
                    }
                }
                this.setComponent(i, maskedComponent);
            }   
        }
        stringResult = this.components.join(this.delimiter)
        return stringResult;
        //throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        if(this.delimiter.length > 1){
            throw new Error("neThe delimiter character must be a single character");
        }
        return this.delimiter;
        
    }

    public isEmpty(): boolean {
        if(this.getNoComponents() == 0){
            return true;
        }
        return false;
        //throw new Error("needs implementation or deletion");
    }

    public getNoComponents(): number {
        return this.components.length;
        //throw new Error("needs implementation or deletion");
    }

    public getComponent(i: number): string {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Komponent existiert nicht");
        }
        return this.components[i]
    }

    public setComponent(i: number, c: string): void {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Komponent existiert nicht");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Sie können nicht zu dieser Position irgendwas hinzufügen");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        if(c.length == 0){
            throw new Error("String darf nicht leer sein");
        }
        this.components.push(c);
    }

    public remove(i: number): void {
        if(i>=this.components.length){
            throw new Error(`Die gewünschte Komponente darf nicht gelöscht werden, da es nur ${this.components.length} Komponente existieren`);
        }
        delete this.components[i]
    }

    public concat(other: Name): void {
        const len = other.getNoComponents();
        for(let i: number = 0; i < len; i++){
            let compenent = other.getComponent(i);
            this.components.push(compenent);
        }
        //throw new Error("needs implementation or deletion");
    }

}