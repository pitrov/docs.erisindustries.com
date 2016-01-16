---

layout:     documentation
title:      "Documentation | eris:cli | eris actions add"

---

# eris actions add

Adds an action to Eris.

## Synopsis

Actions must be an array of executable commands which will be
called according to the machine definition included in
eris config. Actions may be stored in JSON, TOML, or YAML.
Globally accessible actions are stored in the actions
directory of the eris tree. Project accessible actions
are stored in a directory pointed to by the actions field
of the currently checked out project.

```bash
eris actions add [name] [action-definition-file]
```

## Options

```
  -h, --help=false: help for add
```

## See Also

* [eris actions](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_actions/)	 - Manage and Perform Structured Actions.

## Specifications

* [Actions Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_definitions_spec/)
* [Config Definition Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/config_definition_spec/)
* [Projects Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/projects_definitions_spec/)
* [Remotes Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/remotes_definitions_spec/)
* [Services Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_definitions_spec/)

