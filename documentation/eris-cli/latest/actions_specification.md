---

layout:     documentation
title:      "Documentation | eris:cli | Actions Specification"

---

# Actions Specification

Actions are defined in **action definition files**. These reside on the host in `~/.eris/actions`.

Action definition files may be formatted in any of the following formats:

* `json`
* `toml` (default)
* `yaml`

eris will marshal the following fields from action definition files:

```go
// name of the action
Name        string            `json:"name" yaml:"name" toml:"name"`
// an array of strings listing the services which eris should start prior
// to running the steps required for the action
Dependencies []string          `json:"dependencies" yaml:"dependencies" toml:"dependencies"`
// a chain which should be started by eris prior to running the steps
// required for the action. can take a `$chain` string which would then
// be passed in via a command line flag
Chain       string            `json:"chain" yaml:"chain" toml:"chain"`
// an array of strings which should be ran in a sequence of subshells
Steps       []string          `json:"steps" yaml:"steps" toml:"steps"`
// environment variables to give the subshells
Environment map[string]string `json:"environment" yaml:"environment" toml:"environment"`
```

## Steps

Steps are a series of commands given to a sequence of subshells.

Steps are ran in sequential order as contained within the Steps array.

Steps have access to the following variables:

* named variables -- variables added to the steps using the `$hello` syntax will be string-replaced by giving the command line the an argument such as the following `eris actions do XXXXX hello:WORLD`.
* arguments -- any arguments which are added to the `eris actions do XXXXX` command (which do not contain a `:`) will be available to the steps using the `$1`, `$2`, `$3` notation. These will be string-replaced prior to the shell executing
* environment -- any environment variables defined in the action definition file will be available to any of the steps.
* `$prev` -- each step in the sequence will store its **entire** output as a string variable which will be made available to the command directly following using the `$prev` notation. The `$prev` variable will not be string-replaced prior to execution of the step but will actually be set as an exported variable to the subshell in which the step in question executes.

Steps have access to all the commands which the user operating the `eris` tool has. In other words, it operates on the host environment. Of course actions can be layered with one action able to call another. Any of the eris commands are available to actions because it simply executes as subshells on the host where the eris tool resides.
