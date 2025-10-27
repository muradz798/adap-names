export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        if(other.length == 0){
            throw new Error("Kein Kompenent eingegeben");
        }
        if(delimiter != undefined){
            this.delimiter = delimiter;
        }

        this.components = other

        
        //throw new Error("needs implementation or deletion");
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     * @methodtype conversion-method
     */
    public asString(delimiter: string = this.delimiter): string {
        const compLen: number = this.getNoComponents();
        let stringResult:string;
        if(compLen>1){
            stringResult = this.components.join(this.delimiter);
            return stringResult;
        }
        stringResult = this.components[compLen-1]; //hat nur ein Element 
        return stringResult;
        
        //throw new Error("needs implementation or deletion");
    }

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     * @methodtype conversion-method
    */
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


    /** @methodtype get-method */
    public getComponent(i: number): string {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Komponent existiert nicht");
        }
        return this.components[i]
    }

    
    /** Expects that new Name component c is properly masked 
     * @methodtype set-method
    */
    public setComponent(i: number, c: string): void {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Komponent existiert nicht");
        }
        this.components[i] = c;
    }
     
    /** Returns number of components in Name instance 
     * @methodtype get-method
    */
    public getNoComponents(): number {
        return this.components.length;
        // throw new Error("needs implementation or deletion");
    }


    /** Expects that new Name component c is properly masked 
     * @methodtype set-method
    */
    public insert(i: number, c: string): void {
        const compLen = this.getNoComponents();
        if(i>compLen){
            throw new Error("Sie können nicht zu dieser Position irgendwas hinzufügen");
        }
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked 
     * @methodtype command-method
    */
    public append(c: string): void {
        this.components.push(c)
        //throw new Error("needs implementation or deletion");
    }

    /** @methodtype command-method */
    public remove(i: number): void {
        if(i>=this.components.length){
            throw new Error(`Die gewünschte Komponente darf nicht gelöscht werden, da es nur ${this.components.length} Komponente existieren`);
        }
        delete this.components[i]
    }

}

//Objekt erstellen 
const name = new Name(["a.b.l.t....", "m\\l.z", "c.d"], "/");
console.log(name.asDataString());