/* @flow */
import Handlebars from "handlebars";

export default class DomainPuml {
    template: Function;

    constructor(template: string) {
        this.template = Handlebars.compile(template);
    }

    render(model: Object) {
        return this.template(this._parseModel(model));
    }

    _parseModel(model: Object) {
        let refs = new Set();
        Reflect.ownKeys(model).map(i => {
            let entity = Reflect.get(model, i);
            entity.refs.map(j => {
                refs.add(j + " -- " + entity.name);
            });
        });
        return { entities: model, refs: [...refs] };
    }
}
