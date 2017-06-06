/* @flow */
import DomainEntity from "./entity";
export default class DomainParser {
    model: any;
    nameHandler: Function;
    entities: Object;

    constructor(model: any, nameHandler: Function) {
        this.model = model;
        this.nameHandler = nameHandler;
        this.entities = {};
    }

    parse() {
        this._parseEntity("root", this.model, "");
        return { entities: this.entities };
    }

    _parseEntity(key: string, entity: any, parent: string) {
        if (entity === null) {
            console.warn("null value for: " + key);
            return null;
        }
        switch (typeof entity) {
            case "object":
                return entity instanceof Array
                    ? this._parseArray(key, entity, parent)
                    : this._parseObject(key, entity, parent);

            case "number":
                return this._parseNumber(key, entity);

            case "string":
                return this._parseString(key, entity);

            default:
                console.warn("Unhandled type: " + typeof entity);
        }
    }

    _parseObject(key: string, entity: Object, parent: string) {
        const type = "object";
        const name = this.nameHandler(
            key.charAt(0).toUpperCase() + key.slice(1)
        );

        const properties = {};

        Reflect.ownKeys(entity).map(key =>
            Reflect.set(
                properties,
                key,
                this._parseEntity(key, Reflect.get(entity, key), name)
            )
        );

        let de = new DomainEntity(
            name,
            type,
            properties,
            parent ? [parent] : []
        );

        let old = Reflect.get(this.entities, name);

        Reflect.set(this.entities, name, { ...old, ...de });
        return de;
    }

    _parseArray(key: string, entity: Array<mixed>, parent: string) {
        entity.map(entry => this._parseEntity(key, entry, parent));
        return new DomainEntity(key, "array");
    }

    _parseNumber(key: string, entity: Number) {
        return new DomainEntity(this.nameHandler(key), "number");
    }

    _parseString(key: string, entity: String) {
        return new DomainEntity(this.nameHandler(key), "string");
    }
}
