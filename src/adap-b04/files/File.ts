import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertMayOpen();
        this.state = FileState.OPEN
    }

    public read(noBytes: number): Int8Array {
        this.assertMayRead();
        return new Int8Array();
    }

    public close(): void {
        this.assertMayClose();
        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertMayOpen() {
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.OPEN, "cannot open an already open file"
        );
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.DELETED, "cannot open a deleted file."
        );
    }

    protected assertMayRead() {
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.CLOSED,"cannot read from a closed file"
        );
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.DELETED,"cannot read from a deleted file"
        );
    }

    protected assertMayClose() {
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.CLOSED, "cannot close a closed file."
        );
        InvalidStateException.assert(
            this.doGetFileState() !== FileState.DELETED,"cannot close a deleted file."
        );
    }


}

