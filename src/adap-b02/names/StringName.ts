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
        const components = this.name.split(this.delimiter);
        const maskedComponents = components.map((comp) => {
            let masked = "";
            for (let ch of comp) {
                if (ch === DEFAULT_DELIMITER) {
                    masked += ESCAPE_CHARACTER + ch;
                } else if (ch === ESCAPE_CHARACTER) {
                    masked += ESCAPE_CHARACTER + ESCAPE_CHARACTER;
                } else {
                    masked += ch;
                }
            }
            return masked;
        });
        return maskedComponents.join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getNoComponents(): number {
        if (this.name === "") return 0;
        return this.name.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Komponente existiert nicht");
        }
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Komponente existiert nicht");
        }
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i > components.length) {
            throw new Error("Ungültige Insert-Position");
        }
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    public append(c: string): void {
        if (c.length === 0) {
            throw new Error("String darf nicht leer sein");
        }
        const components = this.name.split(this.delimiter);
        components.push(c);
        this.name = components.join(this.delimiter);
    }

    public remove(i: number): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Komponente existiert nicht");
        }
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    public concat(other: Name): void {
        const components = this.name.split(this.delimiter);
        for (let j = 0; j < other.getNoComponents(); j++) {
            components.push(other.getComponent(j));
        }
        this.name = components.join(this.delimiter);
    }
}