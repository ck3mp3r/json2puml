/* @flow */
import winston from "winston";
import DomainEntity from "./entity";
export default class DomainParser {
    model: any;
    nameHandler: Function;
    entities: Object;
    refs: Set<string>;

    constructor(model: any, nameHandler: Function) {
        this.model = model;
        this.nameHandler = nameHandler;
        this.entities = {};
        this.refs = new Set();
    }

    parse() {
        this._parseEntity("root", this.model, "");
        return { entities: this.entities, refs: [...this.refs] };
    }

    _parseEntity(key: string, entity: any, parent: string) {
        if (entity === null) {
            winston.warn("null value for: " + key);
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

        let old = Reflect.get(this.entities, name);
        let refs = old ? old.refs : [];
        if (name !== "" && parent !== "") {
            let ref = name + " -- " + parent;
            this.refs.add(ref);
        }
        let newEntity = new DomainEntity(
            name,
            type,
            properties,
            parent ? [...refs, parent] : []
        );

        Reflect.set(this.entities, name, { ...old, ...newEntity });
        return newEntity;
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
