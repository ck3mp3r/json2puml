@startuml
{{#each entities}}
class "{{name}}" as {{name}} {
    .. Properties ..
    {{#each properties}}
    {{@key}}: {{type}}
    {{/each}}
}
{{/each}}
{{#each entities}}
{{#each refs}}
{{this}} -- {{../name}}
{{/each}}
{{/each}}
@enduml
