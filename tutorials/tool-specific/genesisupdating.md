---

layout: docs
title: "Tutorials | Updating Genesis Files"

---

All eris:db use a genesis.json to get started. The genesis.json tells eris:db:

* what the initial distribution of tokens is
* what the initial accounts and their permissions are
* what the global permissions of the chain itself are
* how many and who the initial validator set are

When we need to make changes to a chain and keep the chain around, the mint-client tools and eris:pm allow us to take the appropriate actions to update things.

When we need to make changes to a chain that we are using for building things (namely, when we don't need to keep the chain around), then we often perform the following sequence to update our chains.

# Step 1: Remove the Old Chain

```
eris chains rm -x idiaminchain
```

Note, that we used the `-x` flag here (or, if you prefer the longhand `--data`). This will remove the "service" container of the chain (namely the eris:db "thing that goes") along with the "data" container of the chain (namely the "stuff I want to keep").

# Step 2: Edit the genesis.json

How one does this depends on how one started the chain. If one started the chain by only using the default genesis.json, which happens when one does not do `eris chains start XXXXX --dir YYYYYYY` but rather does `eris chains start XXXXXXX` (without the `--dir`) flag, then you should edit the following file: `~/.eris/chains/default/genesis.json`. If one started the chain with the `--dir` flag, then you would edit the `genesis.json` in the directory.

# Step 3: Turn the New Chain On

```
eris chains new idiaminchain
```

or

```
eris chains new idiaminchain --dir idiaminchain
```

or whatever command you used before. **N.B.**, we used `new` here rather than start. That is because we want to copy the reformulated genesis.json into the data container and ready for the service container to use when it starts again.