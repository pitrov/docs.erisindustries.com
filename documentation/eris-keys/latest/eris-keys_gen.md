---

layout:     documentation
title:      "Documentation | eris:keys | eris-keys gen"

---

# eris-keys gen

Generate a key

## Synopsis

Generates a key using (insert crypto pkgs used)

```bash
eris-keys gen
```

## Options

```
  -h, --help[=false]: help for gen
      --no-pass[=false]: don't use a password for this key
  -t, --type="ed25519,ripemd160": specify the type of key to create. Supports 'secp256k1,sha3' (ethereum),  'secp256k1,ripemd160sha2' (bitcoin), 'ed25519,ripemd160' (tendermint)
```

## Options inherited from parent commands

```
      --addr="": address of key to use
      --dir="/home/ubuntu/.eris/keys": specify the location of the directory containing key files
      --host="localhost": set the host for talking to the key daemon
  -l, --log=0: specify the location of the directory containing key files
      --name="": name of key to use
      --port="4767": set the port for key daemon to listen on
```

## See Also

* [eris-keys](https://docs.erisindustries.com/documentation/eris-keys/latest/eris-keys/)	 - Generate and manage keys for producing signatures

## Specifications


