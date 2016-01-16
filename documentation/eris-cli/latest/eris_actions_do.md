---

layout:     documentation
title:      "Documentation | eris:cli | eris actions do"

---

# eris actions do

Perform an action.

## Synopsis

Perform an action according to the action definition file.

Actions are used to perform functions which are a
semi-scriptable series of steps. These are general
helper functions.

Actions are a series of commands passed to a series of
*individual* subshells. These actions can take a series
of arguments.

Arguments passed into the shells via the command line
(extra arguments which do not match the name) will be
available to the command steps as $1, $2, $3, etc.

In addition, variables will be populated within the
subshell according to the key:val syntax within the
command line.

The shells will be passed the host's environment as
well as any additional env vars added to the action
definition file.

```bash
eris actions do NAME
```

## Examples

```bash
$ eris actions do dns register -- will run the ~/.eris/actions/dns_register action def file
$ eris actions do dns register name:cutemarm ip:111.111.111.111 -- will populate $name and $ip
$ eris actions do dns register cutemarm 111.111.111.111 -- will populate $1 and $2
```

## Options

```
  -c, --chain="": run action against a particular chain
  -q, --quiet[=false]: suppress action output
  -s, --services=[]: comma separated list of services to start
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris actions](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_actions/)	 - Manage and perform structured actions.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

