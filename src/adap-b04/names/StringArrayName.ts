import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }


    public asString(delimiter: string = this.delimiter): string {
        this.assertIsValidDelimeterAsPrecondition(delimiter);

        let compLen: number = this.getNoComponents();
        let stringResult:string;
        if(compLen>1){
            stringResult = this.components.join(delimiter);
        }
        else{
            stringResult = this.components[compLen-1]; //hat nur ein Element 
        }
        
        this.assertIsValidStringAsPostcondition(stringResult, delimiter);
        this.assertClassInvariant(delimiter, compLen);
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
        this.assertClassInvariant(this.delimiter, compLen);
        return stringResult;
    }


    public getNoComponents(): number {
        let count: number = this.components.length;
        this.assertIsValidNoComponentsAsPostcondition(count);
        this.assertClassInvariant(this.delimiter, count);
        return count;
    }

    public getComponent(i: number): string {
        const compLen = this.getNoComponents();
        this.assertIsValidIndexAsPrecondition(i, compLen);
        this.assertClassInvariant(this.delimiter, compLen);
        return this.components[i]
    }

    public setComponent(i: number, c: string): void {
        let compLen = this.getNoComponents();
        this.assertIsValidIndexAsPrecondition(i, compLen);
        this.assertIsValidElementAsPrecondition(c);
        this.components[i] = c;
        this.assertClassInvariant(this.delimiter, compLen);
    }

    public insert(i: number, c: string): void {
        let compLen = this.getNoComponents();
        this.assertIsValidIndexAsPrecondition(i, compLen);
        this.assertIsValidElementAsPrecondition(c);
        this.components.splice(i, 0, c);
        compLen = this.getNoComponents();
        this.assertClassInvariant(this.delimiter, compLen);
    }

    public append(c: string): void {
        this.assertIsValidElementAsPrecondition(c);
        this.components.push(c);
        let compLen = this.getNoComponents();
        this.assertClassInvariant(this.delimiter, compLen);
    }

    public remove(i: number): void {
        let compLen = this.getNoComponents();
        this.assertIsValidIndexAsPrecondition(i, compLen);
        this.components.splice(i, 1);
        compLen = this.getNoComponents();
        this.assertClassInvariant(this.delimiter, compLen);
    }

    public concat(other: Name): void {
        const len = other.getNoComponents();
        for(let i: number = 0; i < len; i++){
            let compenent = other.getComponent(i);
            this.components.push(compenent);
        }
    }
}

