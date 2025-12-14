import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    private readonly components: readonly string[];

    constructor(source: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        if(source.length === 0){
            this.components = [];
        }
        if(source.includes(delimiter)){
            this.components = source.split(delimiter);
        }else{
            this.components = [source];
        }
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        return this.components[i];
    }

    withComponent(i: number, c: string): Name {
        const copy = [...this.components];
        copy[i] = c;
        return new StringName(copy.join(this.delimiter), this.delimiter);
    }

    withInserted(i: number, c: string): Name {
        const copy = [...this.components];
        copy.splice(i, 0, c);
        return new StringName(copy.join(this.delimiter), this.delimiter);
    }

    withAppended(c: string): Name {
        const copy = [...this.components];
        return new StringName([copy, c].join(this.delimiter),this.delimiter);
    }

    without(i: number): Name {
        const copy = [...this.components];
        copy.splice(i, 1);
        return new StringName(copy.join(this.delimiter), this.delimiter);
    }

    concat(other: Name): Name {
        const copy = [...this.components];
        for (let i = 0; i < other.getNoComponents(); i++) {
            copy.push(other.getComponent(i));
        }
        return new StringName(copy.join(this.delimiter), this.delimiter);
    }

    asString(delimiter: string = this.delimiter): string {
        const copy = [...this.components];
        return copy.join(delimiter);
    }

    asDataString(): string {
        const compLen: number = this.getNoComponents();
        const maskedComponents: string[] = [];

        for (let i = 0; i < compLen; i++) {
            const currentComponent = this.getComponent(i);
            let maskedComponent = "";

            for (let j = 0; j < currentComponent.length; j++) {
                const char = currentComponent[j];
                if (char === DEFAULT_DELIMITER) {
                    maskedComponent += `${ESCAPE_CHARACTER}${char}`;
                } else if (char === ESCAPE_CHARACTER) {
                    maskedComponent += '\\\\';
                } else {
                    maskedComponent += char;
                }
            }

            maskedComponents.push(maskedComponent);
        }

        const stringResult = maskedComponents.join(this.delimiter);
        return stringResult;
    }
}
