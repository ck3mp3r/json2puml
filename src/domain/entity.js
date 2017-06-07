/* @flow */

export default class DomainEntity {
    name: string;
    type: string;
    properties: Object;
    refs: Array<string>;
    constructor(
        name: string,
        type: string,
        properties: Object = {},
        refs: Array<string> = []
    ) {
        this.name = name;
        this.type = type;
        this.refs = refs;
        this.properties = properties;
    }
}
