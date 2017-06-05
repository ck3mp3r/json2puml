/* @flow */

export default class DomainParser {
    model: any;
    entities: [];
    constructor(model: any) {
        this.model = model;
    }
    parse() {
        this._parseEntity(this.model);
    }
    _parseEntity(entity: any) {
        switch (typeof entity) {
            case "object":
                this._parseObject(entity);
                break;
            case Array:
                this._parseArray(entity);
                break;
            default:
                console.log("Unhandled type: " + typeof entity);
        }
    }
    _parseObject(entity: Object) {
        console.log("parsing object");
    }
    _parseArray(entity: Array<mixed>) {
        console.log("parsing array");
    }
}
