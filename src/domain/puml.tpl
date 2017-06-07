@startuml
{{#each entities}}
class "{{name}}" as {{name}} {
    .. Properties ..
    {{#each properties}}
    {{@key}}: {{type}}
    {{/each}}
}
{{/each}}
{{#each refs}}
{{.}}
{{/each}}
@enduml
