"use strict";
const WPILOGShared_1 = Object.freeze({
    HEADER_STRING: "WPILOG",
    HEADER_VERSION: 0x0100,
    CONTROL_ENTRY: 0,
    CONTROL_START: 0,
    CONTROL_FINISH: 1,
    CONTROL_SET_METADATA: 2,
    TEXT_DECODER: new TextDecoder("UTF-8")
});
/** A record in the data log. May represent either a control record or a data record. */
class WPILOGDecoderRecord {
    /**
     * Creates a new WPILOGDecoderRecord.
     * @param entry The entry ID
     * @param timestamp The timestamp in microseconds
     * @param data The payload data
     */
    constructor(entry, timestamp, data) {
        this.entry = entry;
        this.timestamp = timestamp;
        this.data = data;
        this.dataView = new DataView(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
    }
    /** Gets the entry ID. */
    getEntry() {
        return this.entry;
    }
    /** Gets the record timestamp. */
    getTimestamp() {
        return this.timestamp;
    }
    /** Returns true if the record is a start control record. */
    isControl() {
        return this.entry === WPILOGShared_1.CONTROL_ENTRY;
    }
    /** Returns the type of the control record. */
    getControlType() {
        return this.data[0];
    }
    getDataLen() {
        return this.data.length;
    }
    /** Returns true if the record is a start control record. */
    isStart() {
        return this.isControl() && this.data.length >= 17 && this.getControlType() === WPILOGShared_1.CONTROL_START;
    }
    /** Returns true if the record is a finish control record. */
    isFinish() {
        return this.isControl() && this.data.length === 5 && this.getControlType() === WPILOGShared_1.CONTROL_FINISH;
    }
    /** Returns true if the record is a set metadata control record. */
    isSetMetadata() {
        return this.isControl() && this.data.length >= 9 && this.getControlType() === WPILOGShared_1.CONTROL_SET_METADATA;
    }
    /** Decodes a start control record. */
    getStartData() {
        if (!this.isStart())
            throw "Not a start control record";
        let stringResult;
        let entry = this.dataView.getUint32(1, true);
        stringResult = this.readInnerString(5);
        let name = stringResult.string;
        stringResult = this.readInnerString(stringResult.position);
        let type = stringResult.string;
        let metadata = this.readInnerString(stringResult.position).string;
        return {
            entry: entry,
            name: name,
            type: type,
            metadata: metadata
        };
    }
    /** Decodes a finish control record. */
    getFinishEntry() {
        if (!this.isFinish())
            throw "Not a finish control record";
        return this.dataView.getUint32(1, true);
    }
    /** Decodes a set metadata control record. */
    getSetMetadataData() {
        if (!this.isSetMetadata())
            throw "Not a set metadata control record";
        return {
            entry: this.dataView.getUint32(1, true),
            metadata: this.readInnerString(5).string
        };
    }
    /** Gets the raw data. */
    getRaw() {
        return new Uint8Array(this.data.buffer.slice(this.data.byteOffset, this.data.byteOffset + this.data.byteLength));
    }
    /** Decodes a data record as a boolean. */
    getBoolean() {
        if (this.data.length !== 1)
            throw "Not a boolean";
        return this.data[0] !== 0;
    }
    /** Decodes a data record as an integer. */
    getInteger() {
        if (this.data.length !== 8)
            throw "Not an integer";
        return Number(this.dataView.getBigInt64(0, true));
    }
    /** Decodes a data record as a float. */
    getFloat() {
        if (this.data.length !== 4)
            throw "Not a float";
        return this.dataView.getFloat32(0, true);
    }
    /** Decodes a data record as a double. */
    getDouble() {
        if (this.data.length !== 8)
            throw "Not a double";
        return this.dataView.getFloat64(0, true);
    }
    /** Decodes a data record as a string. */
    getString() {
        return WPILOGShared_1.TEXT_DECODER.decode(this.data);
    }
    /** Decodes a data record as a boolean array. */
    getBooleanArray() {
        let array = [];
        this.data.forEach((x) => {
            array.push(x !== 0);
        });
        return array;
    }
    /** Decodes a data record as an integer array. */
    getIntegerArray() {
        if (this.data.length % 8 !== 0)
            throw "Not an integer array";
        let array = [];
        for (let position = 0; position < this.data.length; position += 8) {
            array.push(Number(this.dataView.getBigInt64(position, true)));
        }
        return array;
    }
    /** Decodes a data record as a float array. */
    getFloatArray() {
        if (this.data.length % 4 !== 0)
            throw "Not a float array";
        let array = [];
        for (let position = 0; position < this.data.length; position += 4) {
            array.push(this.dataView.getFloat32(position, true));
        }
        return array;
    }
    /** Decodes a data record as a double array. */
    getDoubleArray() {
        if (this.data.length % 8 !== 0) {
            return false;
            //throw "Not a double array";
        }
        let array = [];
        for (let position = 0; position < this.data.length; position += 8) {
            array.push(this.dataView.getFloat64(position, true));
        }
        return array;
    }
    /** Decodes a data record as a string array. */
    getStringArray() {
        let size = this.dataView.getUint32(0, true);
        if (size > (this.data.length - 4) / 4)
            throw "Not a string array";
        let array = [];
        let position = 4;
        for (let i = 0; i < size; i++) {
            let stringResult = this.readInnerString(position);
            array.push(stringResult.string);
            position = stringResult.position;
        }
        return array;
    }
    /** Reads a string encoded with its length. */
    readInnerString(position) {
        let size = this.dataView.getUint32(position, true);
        let end = position + 4 + size;
        if (end > this.data.length)
            throw "Invalid string size";
        return {
            string: WPILOGShared_1.TEXT_DECODER.decode(this.data.subarray(position + 4, end)),
            position: end
        };
    }
}
/** WPILOG decoder. */
class WPILOGDecoder {
    constructor(data) {
        this.data = data;
        this.dataView = new DataView(data.buffer);
    }
    /** Returns true if the data log is valid (e.g. has a valid header). */
    isValid() {
        return (this.data.length >= 12 &&
            WPILOGShared_1.TEXT_DECODER.decode(this.data.subarray(0, 6)) === WPILOGShared_1.HEADER_STRING &&
            this.getVersion() === WPILOGShared_1.HEADER_VERSION);
    }
    /**
     * Gets the data log version. Returns 0 if data log is invalid.
     *
     * @return Version number; most significant byte is major,
     * least significant is minor (so version 1.0 will be 0x0100).
     * */
    getVersion() {
        if (this.data.length < 12)
            return 0;
        return this.dataView.getUint16(6, true);
    }
    /** Gets the extra header data. */
    getExtraHeader() {
        if (this.data.length < 12)
            return "";
        let size = this.dataView.getUint32(8, true);
        return WPILOGShared_1.TEXT_DECODER.decode(this.data.subarray(12, 12 + size));
    }
    /** Reads an integer with an arbitrary length (up to signed int64). */
    readVariableInteger(position, length) {
        let value = BigInt(0);
        for (let i = 0; i < Math.min(8, length); i++) {
            let byte = this.data[position + i];
            if (i === 7) {
                // Last byte, apply sign
                if ((byte & (1 << 7)) !== 0) {
                    value = value - (BigInt(1) << BigInt(63));
                }
                byte &= ~(1 << 7);
            }
            value |= BigInt(byte) << BigInt(i * 8);
        }
        return Number(value);
    }
    /** Runs the specified function for each record in the log. */
    forEach(callback) {
        if (!this.isValid())
            throw "Log is not valid";
        let extraHeaderSize = this.dataView.getUint32(8, true);
        let position = 12 + extraHeaderSize;
        while (true) {
            if (this.data.length < position + 4)
                break;
            let entryLength = (this.data[position] & 0x3) + 1;
            let sizeLength = ((this.data[position] >> 2) & 0x3) + 1;
            let timestampLength = ((this.data[position] >> 4) & 0x7) + 1;
            let headerLength = 1 + entryLength + sizeLength + timestampLength;
            if (this.data.length < position + headerLength)
                break;
            let entry = this.readVariableInteger(position + 1, entryLength);
            let size = this.readVariableInteger(position + 1 + entryLength, sizeLength);
            let timestamp = this.readVariableInteger(position + 1 + entryLength + sizeLength, timestampLength);
            if (this.data.length < position + headerLength + size || entry < 0 || size < 0)
                break;
            let newPosition = position + headerLength + size;
            callback(new WPILOGDecoderRecord(entry, timestamp, this.data.subarray(position + headerLength, position + headerLength + size)), newPosition);
            position = newPosition;
        }
    }
}
