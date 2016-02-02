---

layout:     documentation
title:      "Documentation | eris:chain_manager | Account Types"

---

# Default eris chains Account Types

In order to reduce the complexity of dealing with permissioning
of chains, eris chains uses the concept of account_types. Account Types are
simple default bundles of permissions, tokens, and names which are used
as an abstraction when building eris chains so as to reduce the complexity
of that process.

This document contains the default account types which are used by
eris chains make when creating the necessary files for a new chain. Users
have an ability to add additional account_types which will be needed for
their purposes in a very easy manner.

The defaults provided by eris:chain_manager should be thought of as simply
that, defaults, rather than as restrictive ("we only get these") manner.


# The Developer Account Type

Users who have a key which is registered with developer privileges can send
tokens; call contracts; create contracts; create accounts; use the name registry;
and modify account's roles.


## Typical Users of this Account Type: Developer

Generally the development team seeking to build the application on top of the
given chain would be within the group. If this is a multi organizational
chain then developers from each of the stakeholders should generally be registered
within this group, although that design is up to you.


# The Full Account Type

Users who have a key which is registered with root privileges can do everything
on the chain. They have all of the permissions possible. These users are also
bonded at the genesis time, so these should be used only for simple chains with
a few nodes who will be on during the prototyping session.


## Typical Users of this Account Type: Full

If you are making a small chain just to play around then usually you would
give all of the accounts needed for your experiment full accounts.

If you are making a more complex chain, don't use this account type.


# The Participant Account Type

Users who have a key which is registered with participant privileges can send
tokes; call contracts; and use the name registry


## Typical Users of this Account Type: Participant

Generally the number of participants in your chain who do not need elevated
privileges should be given these keys.

Usually this group will have the most number of keys of all of the groups.


# The Root Account Type

Users who have a key which is registered with root privileges can do everything
on the chain. They have all of the permissions possible.


## Typical Users of this Account Type: Root

If you are making a small chain just to play around then usually you would
give all of the accounts needed for your experiment root privileges (unless you
were testing different) privilege types.

If you are making a more complex chain, then you would usually have a few
keys which have registered root permissions and as such will act in a capacity
similar to a network administrator in other data management situations.


# The Validator Account Type

Users who have a key which is registered with validator privileges can
only post a bond and begin validating the chain. This is the only privilege
this account group gets.


## Typical Users of this Account Type: Validator

Generally the marmots recommend that you put your validator nodes onto a cloud
(IaaS) provider so that they will be always running.

We also recommend that if you are in a multi organizational chain then you would
have some separation of the validators to be ran by the different organizations
in the system.
