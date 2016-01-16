---

layout:     documentation
title:      "Documentation | eris:cli | eris projects"

---

# eris projects

Start, Stop, and Manage Projects or Applications.

## Synopsis

Start, stop, and manage projects or applications.

Within the Eris platform, projects are a bundle of services,
and actions which are configured to run in a specific manner.
Projects may be defined either by a package.json file in the
root of an application's directory or via a docker-compose.yml
file in the root of an application's directory. Projects are
given a human readable name so that Eris can checkout and
operate the application or project.

```bash
eris projects
```

## Options

```
  -h, --help=false: help for projects
```

## Subcommands

* [eris projects actions](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_actions/)	 - List actions for a project.
* [eris projects add](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_add/)	 - Add a project to Eris.
* [eris projects checkout](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_checkout/)	 - Checkout a project registered with Eris.
* [eris projects clean](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_clean/)	 - Clean a project's data from the machine.
* [eris projects config](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_config/)	 - Configure projects registered with Eris.
* [eris projects get](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_get/)	 - Get a project from Github or IPFS.
* [eris projects install](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_install/)	 - Install a project's dependencies.
* [eris projects kill](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_kill/)	 - Stop a running project.
* [eris projects ls](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_ls/)	 - List projects registered with Eris.
* [eris projects new](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_new/)	 - Create a new project definition file.
* [eris projects redefine](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_redefine/)	 - Change a project's definition file.
* [eris projects rename](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_rename/)	 - Rename a project registered with Eris.
* [eris projects rm](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_rm/)	 - Remove a project registered with Eris.
* [eris projects services](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_services/)	 - List services for a project.
* [eris projects start](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris_projects_start/)	 - Start a project registered with Eris.

## See Also

* [eris](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/eris/)	 - The Blockchain Application Platform

## Specifications

* [Actions Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/actions_definitions_spec/)
* [Config Definition Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/config_definition_spec/)
* [Projects Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/projects_definitions_spec/)
* [Remotes Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/remotes_definitions_spec/)
* [Services Definitions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.10.3/services_definitions_spec/)

