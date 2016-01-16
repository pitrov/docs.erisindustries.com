---

layout:      content
title:       "Documentation | eris:db Permissions"

---

eris:db is a blockchain client which runs on permissionable blockchain networks.

In eris:db use a **capabilities base permissioning system** which means that certain key-pairs (which will be owned by users who have organizations and roles) are capable of performing certain functions within the blockchain network. In other words, different users have different capabilities.

To see more about how we typically design permission bundles for proofs of concept you can see [this deck](http://www.slideshare.net/CaseyKuhlman/eris-industries-typical-account-types).

The permissioning system gives users of eris:db an ability to established modifiable over time permissions for certain users. In eris:db these are the permissions which can be set to true or false on either a key-pair basis or on a global basis.

# `send` Permissions

This permission gives the permissioned users an ability to send transactions on the eris:db network. Almost all users of the network will typically be given this permission.

# `call` Permissions

This permission gives the permissioned users an ability to `call` contracts (which are usually used to get information from accessor functions built into contracts) on the eris:db network. Almost all users of the network will typically be given this permission.

# `name` Permission

This permission gives the permissioned users an ability to add entries into eris:db's built in NameRegistry native contracts. Typically, robots and other similar users will be given this permission.

# `create_contract` Permissions

This permission gives the permissioned users an ability to create smart contracts within the eris:db network. Typically, developers within an organization or within each organization of a consortium will typically be given this permission.

# `create_account` Permissions

This permission gives the permissioned users an ability to create new accounts within the eris:db network. It depends on the design and goals of the smart contract network for how this permission would be distributed in that there is not a typical pattern we've seen develop with respect to this permission.

# `bond` Permission

This permission gives the permissioned users an ability to send a bonding transaction which is necessary to add them to the validator pool. Typically a few nodes owned by each organization of a consortium, or various business units within a single organization would be given these permissions (it is usually cloud instances or long running containers within data centers who will be most likely validators).

# `add_role` Permission

eris:db accounts have an array of strings called `roles` which are a tagging feature for accounts. These can be referenced by EVM contracts as well as native contracts. We find this roles capacity important for more complex scenarios of blockchain-ing. This permission gives the permissioned users an ability to add roles to accounts within the eris:db network. Typically, administrators and/or smart contracts would be given this permission.

# `has_role` Permission

This permission gives the permissioned users an ability to query the roles of other accounts. Typically, almost all users of the network will typically be given this permission.

# `rm_role` Permission

This permission gives the permissioned users an ability to remove the roles of other acocunts within the eris:db network. Typically, administrators and/or smart contracts would be given this permission.

# `set_base` Permission

This permission gives the permissioned users an ability to change the permissions of other accounts on the eris:db network. Typically, only a few senior administrators within an organization (or each organization of a consortium) will typically be given this permission.

# `unset_base` Permission

This permission gives the permissioned users an ability to change the permissions of other accounts on the eris:db network back to the network's default. Typically, only a few senior administraators within an organization (or each organization of a consortium) will typically be given this permission.

# `has_base` Permission

This permission gives the permissioned users an ability to query the permissions of other accounts on the eris:db network. We do not see a typical pattern emerging yet around this permission.

# `set_global` Permission

This permission gives the permissioned users an ability to set the global parameters of the eris:db network. Only a few senior administrators within an organization (or each organization of a consortium) will typically be given this permission.

# `root` Permissions

Full and unfettered access to the eris:db blockchain network's actions. Only a few senior administrator within an organization (or each organization of a consortium) will typically be given this permission.
