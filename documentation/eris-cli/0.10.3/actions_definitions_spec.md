---

layout:     documentation
title:      "Documentation | eris:cli | Actions Definitions Specification"

---

# Action Definition Files Specification

Action definitions are kept in JSON, TOML, or YAML formatting. All files which are validly formatted and within the `~/.eris/actions` directory will be made available globally across all projects registered with `eris`. In addition, [project definition files](project_definition_files) may contain an `actions` field which should point to a valid directory (usually the `./actions` folder of the application) containing action definition files. When a project has been `checked out` then the actions for that project are **brought into scope** and may be used by `eris`.

`eris` will read four fields from action definition files. More fields may be present, and none of the read fields are required.

## Fields

`maintainer` -- Maintainer **must** contain a string value. Usually this will be an identifier of the maintainer of the action (usually name and email).

`uri` -- URI **must** contain a string value. The universal resource indicator where others may find this action definition file (this may be an IPFS entry, a field in `etcb` or a repository online).

`name` -- Name **must** contain a string value. The action's name which will be recommended upon installation.

`action` -- Action **must** contain an array value. The action field contains the sequence of steps which are to be performed in order to facilitate (`do`) the desired action.

All steps will be performed within the same subshell which will be started with the global environment variables mandated in the `eris config` and, if a project is checked out, the project environment variables mandated in the project definition file. Although action steps are executed within a subshell, they will be ran by the same user and group which calls the parent `eris actions do NAME` command.

Actions are structured to be an efficient way to establish seqences of plumbing commands which are often strung together to make higher level functionality. As such **no special security** considerations are taken into account by the `eris actions` functionality.