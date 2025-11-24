import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { escape } from "querystring";
import { StringArrayName } from "./StringArrayName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        
    }

    public asString(delimiter: string = this.delimiter): string {
        if(delimiter.length>1){
            throw new Error("Die des delimeters darf max 1 sein");
        }

        if(this.delimiter != delimiter){
            let result: string = this.name.replaceAll(this.delimiter, delimiter);
            return result;
        }
        return this.name;
    }

    public asDataString(): string {
        let dataString: string = "";
        if(this.name.includes(ESCAPE_CHARACTER)){
            dataString = this.name.replaceAll(ESCAPE_CHARACTER, "\\\\");
        }
        return dataString;
    }


    public getNoComponents(): number {
        let delimeter = this.getDelimiterCharacter();
        let count = this.noComponents;

        if(this.name.includes(delimeter)){
            const splittedName: string[] = this.name.split(delimeter);
            for(let i: number = 0; i<splittedName.length; i++){
                let component = splittedName[i];
                if(component.includes(ESCAPE_CHARACTER)){
                    continue; 
                }
                count++;
            }
        } //ein Element "os.css.fau.de" wenn delimeter != "."
        else{
            if(this.name.length > 0){
                return 1;
            }
        }
        return count;
        
    }

    public getComponent(i: number): string {
        if (i >= this.getNoComponents()){
            throw new Error("Gewünschte Component gibts nicht");
        }
        else if (i == 0 && this.getNoComponents() == 1){
            return this.name;
        }

        const stringArray:string[] = this.returnStringArray();
        return stringArray[i];

    }

    public returnStringArray(): string[]{
        let delimeter = this.getDelimiterCharacter();
        let pattern = ESCAPE_CHARACTER + this.delimiter;
        const splittedName: string[] = this.name.split(delimeter);
        
        if(this.name.includes(pattern)){
            const newSplittedNameArray: string[] = [];
            let newComponent: string;
            let index: number = 0;
            let len: number = splittedName.length;
            while(index<len){
                let component:string = splittedName[index];
                if(component.includes(ESCAPE_CHARACTER)){
                    if(index+1!=len){ //stellt sicher, dass nicht letzte Element ist
                        let nextComponent:string = splittedName[index+1];
                        newComponent = component + this.delimiter + nextComponent;
                        component = newComponent;
                        //newSplittedNameArray.push(newComponent);
                        index++;
                    }
                }
                newSplittedNameArray.push(component);
                index++;
            }
            return newSplittedNameArray;
        }
        else{
            return splittedName;
        }
    }

    public setComponent(i: number, c: string) {
        if(i>=this.getNoComponents()){
            throw new Error("Gewüschte Komponent existiert nicht, daher kann nicht ersetz werden");
        }
        const stringArray: string[] = this.returnStringArray();
        stringArray[i] = c;
        let stringName: string = "";
        for(let i:number = 0; i<stringArray.length-1; i++){
            stringName+=stringArray[i]+this.delimiter;
        }
        stringName+=stringArray[stringArray.length-1];
        this.name = stringName;
    }

    public insert(i: number, c: string) {
        if(i>this.getNoComponents()){
            throw new Error(`Es gibt nur ${this.getNoComponents()} Komponente. Du darfst nicht inserten`);
        }
        const stringArray:string[] = this.returnStringArray();
        stringArray.splice(i, 0, c);
        let stringName: string = "";

        for(let i:number = 0; i<stringArray.length-1; i++){
            stringName+=stringArray[i]+this.delimiter;
        }

        stringName+=stringArray[stringArray.length-1];
        this.name = stringName;
    }

    public append(c: string) {
        if(c == " "){
            throw new Error("Leer Komponen wird nicht hinzugefügt");
        }
        this.name = this.name + this.delimiter + c;
    }

    public remove(i: number) {
        if(i>this.getNoComponents()){
            throw new Error("Dies Komponent gibt es überhaupt nicht");
        }
        const stringArray:string[] = this.returnStringArray();
        stringArray.splice(i, 1);

        if(stringArray.length == 0){
            this.name = "";
            return this.name;
        }

        let stringName: string = "";

        for(let i:number = 0; i<stringArray.length-1; i++){
            stringName+=stringArray[i]+this.delimiter;
        }

        stringName+=stringArray[stringArray.length-1];
        this.name = stringName;
    }
    

    public concat(other: Name): void {
        const len = other.getNoComponents();
        let otherName:string = "";
        for(let i: number = 0; i < len; i++){
            let compenent = other.getComponent(i);
            otherName += other.getDelimiterCharacter() + compenent;
        }
        this.name += otherName;
    }

}

let stringName = new StringName("oss#fau#de", "#");
let stringNameCopy = stringName.clone();
//console.log(stringName.getHashCode()===stringNameCopy.getHashCode())
let stringArrayName = new StringArrayName(["oss", "fau", "de"], "#")
console.log(stringName.isEqual(stringArrayName))
console.log(stringName.getHashCode()===stringArrayName.getHashCode())
//stringName.concat(stringArrayName);
//console.log(stringName.asString());
