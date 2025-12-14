import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";


export class StringArrayName extends AbstractName {

    private readonly components: readonly string[];

    constructor(components: readonly string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.components = [...components];
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
        return new StringArrayName(copy, this.delimiter);
    }

    withInserted(i: number, c: string): Name {
        const copy = [...this.components];
        copy.splice(i, 0, c);
        return new StringArrayName(copy, this.delimiter);
    }

    withAppended(c: string): Name {
        return new StringArrayName([...this.components, c], this.delimiter);
    }

    without(i: number): Name {
        const copy = [...this.components];
        copy.splice(i, 1);
        return new StringArrayName(copy, this.delimiter);
    }

    concat(other: Name): Name {
        const result = [...this.components];
        for (let i = 0; i < other.getNoComponents(); i++) {
            result.push(other.getComponent(i));
        }
        return new StringArrayName(result, this.delimiter);
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
