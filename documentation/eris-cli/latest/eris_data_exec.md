---

layout:     documentation
title:      "Documentation | eris:cli | eris data exec"

---

# eris data exec

Run a command or interactive shell in a data container

## Synopsis

Run a command or interactive shell in a container with
volumes-from the data container.

Exec can be used to run a single one off command to interact
with the data. Use it for things like ls.

If you want to pass flags into the command that is run in the
data container, please surround the command you want to pass
in with double quotes. Use it like this: "ls -la".

Exec instances run as the Eris user.

Exec can also be used as an interactive shell. When put in
this mode, you can "get inside of" your containers. You will
have root access to a throwaway container which has the volumes
of the data container mounted to it.

```bash
eris data exec
```

## Examples

```bash
$ eris data exec name ls /home/eris/.eris -- will list the eris dir
$ eris data exec name "ls -la /home/eris/.eris" -- will pass flags to the ls command
$ eris data exec --interactive name -- will start interactive console
```

## Options

```
  -i, --interactive[=false]: interactive shell
```

## Options inherited from parent commands

```
  -d, --debug[=false]: debug level output
  -m, --machine="eris": machine name for docker-machine that is running VM
  -n, --num=1: container number
  -v, --verbose[=false]: verbose output
```

## See Also

* [eris data](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/eris_data/)	 - Manage data containers for your application.

## Specifications

* [Actions Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/actions_specification/)
* [Chains Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/chains_specification/)
* [Contracts Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/contracts_specification/)
* [Motivation](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/motivation/)
* [Services Specification](https://docs.erisindustries.com/documentation/eris-cli/0.11.0/services_specification/)

