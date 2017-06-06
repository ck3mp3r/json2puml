/* @flow */
import Handlebars from "handlebars";

export default class DomainPuml {
    template: Function;

    constructor(template: string) {
        this.template = Handlebars.compile(template);
    }

    render(model: Object) {
        return this.template(model);
    }
}
