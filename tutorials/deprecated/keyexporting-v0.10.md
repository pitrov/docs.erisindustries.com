---

layout: content
title: "Tutorials | Working With Eris Keys"

---

Unless you have a different configuration than our standard, admittedly opinionated, pathway then you will be running the eris-keys signing server inside of a container. This means that you need to be able to import and export your keys.

**Note** -- This is a reminder to treat Docker containers as ephemeral. Even with data containers, you do not want to keep important things inside a container without backups. Just as you would not keep any other important files in one location without a backup.

# Generating Keys

To generate a key:

```
eris keys gen
```

That will create a **non safe** (but easy for development) key.

# Exporting Keys

Exporting all of the keys to the host is quite easy.

```bash
eris data export keys
ls ~/.eris/data/keys/keys/data
```

What is happening here with the `eris data export` command? Well the command takes whatever is in the `~/.eris` directory within the keys' data container and it dumps it onto the host in the location `~/.eris/data/NAME` since the name of the exported data container is keys it dumps everything from the `~/.eris` directory within keys to `~/.eris/data/keys` on the host.

By default, eris-keys puts all of its key data into `~/.eris/keys/data`. So that is where the rest of the path comes from.

Now what we want to do is to back these up so they are in the proper location on the host.

```bash
mv ~/.eris/data/keys/keys/data/* ~/.eris/keys/data/.
```

That's it. Now they are in the right position on your host; namely: `~/.eris/keys/data`. Now to import keys we do the reverse.

# Importing Keys

First things first, we need to make sure that we have the right directory within the data sub-directory of your `~/.eris` directory.

```bash
mkdir --parents ~/.eris/data/keys/keys/data
```

Now, we're going to copy over the keys from their "normal" location on the host to the correct location for importing to a data container.

```bash
cp --recursive ~/.eris/keys/data/* ~/.eris/data/keys/keys/data
```

Finally, we import the keys into the data container.

```bash
eris data import keys
```

That's it! Now you're all set up.