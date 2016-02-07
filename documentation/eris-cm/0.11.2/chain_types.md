---

layout:     documentation
title:      "Documentation | eris:chain_manager | Chain Types"

---

# Default eris chains Chain Types

In order to reduce the complexity of dealing with permissioning
of chains, eris chains uses the concept of chain_types. Chain Types are
bundles of [account_types](../account_types). They define the number of
each account type which is required to make the given chain_type.

In the future as we continue to add more optionality to eris chains at
the consensus engine and application levels of the eris chain more
functionality will be added to chain types.


# The simplechain Chain Type

A simple chain type will build a single node chain. This chain type is useful
for quick and easy prototyping. It should not be used for anything more than
the most simple prototyping as it only has one node and the keys to that node
could get lost or compromised and the chain would thereafter become useless.


## Number of Account Types for Chain Type: simplechain


Validator:000
Full:001
Developer:000
Participant:000
Root:000