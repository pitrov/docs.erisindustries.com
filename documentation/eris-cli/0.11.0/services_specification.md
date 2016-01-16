---

layout:     documentation
title:      "Documentation | eris:cli | Services Specification"

---

# Services Specification

Services are defined in **service definition files**. These reside on the host in `~/.eris/services`.

Service definition files may be formatted in any of the following formats:

* `json`
* `toml` (default)
* `yaml`

eris will marshal the following fields from service definition files:

```go
// name of the service
Name string `json:"name" yaml:"name" toml:"name"`
// id of the service
ServiceID string `mapstructure:"service_id,omitempty" json:"service_id,omitempty" yaml:"service_id,omitempty" toml:"service_id,omitempty"`
// a chain which must be started prior to this service starting. can take a `$chain` string
// which would then be passed in via a command line flag
Chain string `json:"chain,omitempty" yaml:"chain,omitempty" toml:"chain,omitempty"`

Service     *Service     `json:"service" yaml:"service" toml:"service"`
Dependencies *Dependencies `mapstructure:"dependencies" json:"dependencies,omitempty", yaml:"dependencies,omitempty" toml:"dependencies,omitempty"`
```

```go
type Dependenciesstruct {
	Chains   []string `json:"chains,omitempty" yaml:"chains,omitempty" toml:"chains,omitempty"`
	Services []string `json:"services,omitempty" yaml:"services,omitempty" toml:"services,omitempty"`
}
```

```go
// name of the service
Name string `json:"name" yaml:"name" toml:"name"`
// docker image used by the service
Image string `json:"image,omitempty" yaml:"image,omitempty" toml:"image,omitempty"`
// whether eris should automagically handle a data container for this service
AutoData bool `json:"data_container" yaml:"data_container" toml:"data_container"`
// maps directly to docker cmd
Command string `json:"command,omitempty" yaml:"command,omitempty" toml:"command,omitempty"`
// maps directly to docker links
Links []string `mapstructure:"links" json:"links,omitempty" yaml:"links,omitempty" toml:"links,omitempty"`
// maps directly to docker ports
Ports []string `mapstructure:"ports" json:"ports,omitempty" yaml:"ports,omitempty" toml:"ports,omitempty"`
// maps directly do docker expose
Expose []string `mapstructure:"expose" json:"expose,omitempty" yaml:"expose,omitempty" toml:"expose,omitempty"`
// maps directly to docker volumes
Volumes []string `mapstructure:"volumes" json:"volumes,omitempty" yaml:"volumes,omitempty" toml:"volumes,omitempty"`
// maps directly to docker volumes-from
VolumesFrom []string `mapstructure:"volumes_from" json:"volumes_from,omitempty" yaml:"volumes_from,omitempty" toml:"volumes_from,omitempty"`
// maps directly to docker environment
Environment []string `json:"environment,omitempty" yaml:"environment,omitempty" toml:"environment,omitempty"`
// maps directly to docker env-file
EnvFile []string `mapstructure:"env_file" json:"env_file,omitempty" yaml:"env_file,omitempty" toml:"env_file,omitempty"`
// maps directly to docker net
Net string `json:"net,omitempty" yaml:"net,omitempty" toml:"net,omitempty"`
// maps directly to docker PID
PID string `json:"pid,omitempty" yaml:"pid,omitempty" toml:"pid,omitempty"`
// maps directly to docker DNS
DNS []string `mapstructure:"dns" json:"dns,omitempty" yaml:"dns,omitempty" toml:"dns,omitempty"`
// maps directly to docker DNS-search
DNSSearch []string `mapstructure:"dns_search" json:"dns_search,omitempty" yaml:"dns_search,omitempty" toml:"dns_search,omitempty"`
// maps directly to docker workdir
WorkDir string `mapstructure:"work_dir" json:"work_dir,omitempty" yaml:"work_dir,omitempty" toml:"work_dir,omitempty"`
// maps directly to docker entrypoint
EntryPoint string `mapstructure:"entry_point" json:"entry_point,omitempty" yaml:"entry_point,omitempty" toml:"entry_point,omitempty"`
// maps directly to docker hostname
HostName string `mapstructure:"host_name" json:"host_name,omitempty" yaml:"host_name,omitempty" toml:"host_name,omitempty"`
// maps directly to docker domainname
DomainName string `mapstructure:"domain_name" json:"domain_name,omitempty" yaml:"domain_name,omitempty" toml:"domain_name,omitempty"`
// maps directly to docker username
User string `json:"user,omitempty" yaml:"user,omitempty" toml:"user,omitempty"`
// maps directly to docker cpu_shares
CPUShares int64 `mapstructure:"cpu_shares" json:"cpu_shares,omitempty,omitzero" yaml:"cpu_shares,omitempty" toml:"cpu_shares,omitempty,omitzero"`
// maps directly to docker mem_limit
MemLimit int64 `mapstructure:"mem_limit" json:"memory,omitempty,omitzero" yaml:"memory,omitempty" toml:"memory,omitempty,omitzero"`
```

## Service Dependencies

Service dependencies are started by eris prior to the service itself starting.


## Linking to Chains

Linking to chains is done in one of two ways. For the CLI, you will give `eris services start` a `--chain` flag with the name of the chain you are wanting to start along with the services. Chains will be started prior to any services booting to make sure they are available to the linked service.

Chains can also be linked via the `chain` setting in the service definition file. This setting can take **either** a named chain, **or** a `$chain` **variable**. If you use the `$chain` variable then the linked chain will be either the flag given (which will take precedence), or the currently checked out chain. If there is no chain checked out and there is no chain identified by a flag, the command will fail.

## Linking to Other Services

In the service dependency section you will give the string in the following format `SERVICENAME:DOCKERNAME:CONNECTIONTYPE` where the following applies:

* `SERVICENAME` would be the name of the eris service you want to create a link to.
* `DOCKERNAME` would be what we tell docker the name is (usually this will be blank).
* `CONNECTIONTYPE` is the type of connection you want to make to the dependency service:
  * `a` (default) will create a docker link to the container and mount the container's volumes
  * `v` will mount the container's volumes
  * `l` will link to the container
  * `n` will do neither of the above

