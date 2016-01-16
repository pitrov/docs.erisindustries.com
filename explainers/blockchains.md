---

layout:     content
title:      "Explainer | Blockchains"
excerpt:    "What is a Blockchain and why are these automated data management systems so cool?"

---

# What is a Blockchain?

Blockchains have their origins in cryptocurrency platforms, in particular bitcoin, where they represent historical records of verifiable monetary stake. They were designed in the first place to solve the double spending problem, that is, to establish consensus in a decentralized network over who owns what and what has already been spent.

Blockchains are authenticated records of the history of a network's activity distributed among the users of the blockchain all around the globe. A blockchain enables secure storage of arbitrary information -- in some cases, a token balance; in other systems more complex information -- within the network simply by securing a set of private keys.

Modern blockchain designs are capable of storing arbitrary data and establishing permissions to modify that data through self-administering and self-executing scripts which are performed by a distributed virtual machine.These scripts are known as [smart contracts](../smart_contracts/), and they allow platform operators to define complex and fully customisable rules which govern the blockchain’s interaction with its users.

> Blockchains are neat because they take the old concept of commits, tx logs, and replication in database architecture and replace it with an integrated system of authenticated state transitions.

> That's valuable ... for all kinds of things, like transparency and auditing and accountability and so on. Blockchains make auditing and verification easy.... [F]or a next generation smart government and auditable economy, that's going to matter.

[Reference](https://www.reddit.com/r/erisindustries/comments/2pt3ag/decentralisation_for_its_own_sake_good_for_some/cmzthwe)

# Characteristics of Blockchains

A _blockchain network_ is a software network comprised of a set of users running a _blockchain client_.

All of the blockchain clients in a given blockchain network are connected together so that they are collectively building and also interacting with a single authoritative ledger.

As such when we discuss the characteristics of a "blockchain" we are really discussing three different things:

1. What are the characteristics of a Blockchain Network?
2. What are the characteristics of a Blockchain Client?
3. What is a blockchain ledger?

Throughout this explainer, we will attempt to be precise as to which of these we are speaking to.

Area (3) is not very interesting frankly. Blockchain ledgers are simply a record of transactions which have been broken into blocks and linked together using cryptographic digital signatures. It is the blockchain network and blockchain clients which are much more interesting.

There are three areas where both blockchain networks and blockchain clients stand out from their brethern data and process management solutions available to organizations:

* Blockchain clients and networks validate everything (great for compliance and auditors; not so great for fraudsters)
* Blockchain clients are highly independent (and thereby fault tolerant)
* Blockchain clients and networks are automated

Lets look at some of these characteristics.

## Validation Within a Blockchain Network and Blockchain Clients

*A blockchain network carries out its functions automatically, through a process which is historically called "mining” or "forging," but which we at Eris Industries simply call **validating**.*

This process generally involves bundling the transactions which have come into the system during an established time, along with other parameters into a **block** of transactions and other data which is then placed into the **chain** of blocks.

Blockchain clients allow nodes on the network to have cryptographic verifiability over the data and state changes entered into the network out of the box. This level of verifiability **can be added** to a non-blockchain based database back end. The difference being whether the cryptographic certainty is a first class citizen of the network or whether it is an addon is likely irrelevant for many applications.

With respect to this "difference" there is likely no huge benefit which blockchain networks can provide that a properly constructed hub and spoke database architecture cannot provide *outside* of a convenience and ease of use function.

While blockchain networks present their own operational challenges to organizations seeking to use them, one thing they are extraordinarily good at is abstracting away digital signing algorithms, state changes, and the cryptographic verification of those into a coherent client for users.

Most modern databases store the world state of the data and keep the logs of transactions with the database as a separate "thing". Blockchain clients, on the other hand, build the world state of the data from the blocks of authenticated transactions that are "chained" together over time.

Thus it is always immediately possible to tell if something is valid, as it must have come from a valid history, and everyone agrees completely on the sequence of valid history.

## Independence of Nodes Within a Blockchain Network

*A blockchain network operates as a distributed data store, meaning there is no single master node within the network; rather, every node is an equal peer.*

Every node in a blockchain network "assembles" its view of **what the data is** by ensuring that it has the full, and agreed set of transactions and applying those transactions as state transfer functions over the previous state of the data. In a hub and spoke architecture, the nodes within the network (usually) receive data updates from the hub rather than independently assembling what the world state of the data is via receiving the transactions and assembling the state locally.

This is roughly analogous to the difference between being told a fact in a class and performing a mathematical proof in class based on assumptions provided by a teacher. One only requires acceptance by the "receiver" while the other requires effort by the "assembler".

The fundamental difference architecturally is, essentially, the "freedom" which the various nodes on the network have to tell clients which are hooked into them **what the data is**. This "freedom" is what blockchain-ers are (sometimes) talking about when the speak to the "decentralization" benefits of the blockchain client in question.

## Automation Within a Blockchain Network and Blockchain Clients

*A blockchain network validates data-driven transactions while also preventing the incorporation of unauthorised transactions.*

Blockchains are (currently) non-shardable. This is a very important difference between blockchain and hub and spoke database architecture. There are theoretical options for addressing shardability, but it must be noted that currently these are theoretical in nature.

The practical effect of this non-shardability is that every full node on the network must individually perform the entirety of the computing effort required for the entire of the network. Redundantly, in order to check each other's work.

While this may seem like overkill, it should be noted that it is *significantly* easier to run blockchain clients in a "cloud-y" manner than it is hub and spoke databases. Hub and spoke databases scale vertically due to their design; on the other hand blockchain networks scale horizontally due to their design -- which exactly how "cloud-y" applications are meant to scale.

If you need the data management solution to be easily spun up and distributed amongst nodes which are not fully integrated into infrastructure of the data management solution then a blockchain architecture is likely an appealing data management solution.

The fundamental difference architecturally is, essentially, that blockchain networks are going to be significantly more constrained in the amount of transaction processing they are able to perform because blockchain clients are built to be independently redundant with respect to the data management functions; whereas hub and spoke databases can be built to operate using truly parallel computation.

# Benefits of Blockchain Technology

What we have when abstracting a blockchain network to a certain level is a distributed, self-authenticating, time-stamped store of data. Indeed, the core design of a blockchain client is an elegant way in which to overcome many challenges in distributed systems.

## Resilient Data Management System

Blockchain clients allow for the development of distributed systems which do not rely on what traditional databases call 'master-slave' clusters. This drastically increases the resiliency of blockchain networks as a data management solution.

In a blockchain network, there is not even a notion of master-slave relationships between the nodes in the cluster. Instead, blockchain networks utilize the idea of peer nodes and consensus models to resolve the current world state of the data.

This allows for a fluid membership to the "truth creating" consortium of computers which in turn increases fault tolerance and resiliency. Breaking the data-driven transactions into blocks allows the consensus of the database to be negotiated in a reasonable manner rather than on a per-transaction basis.

## Increased Verifiability

In addition, blockchain networks allow for transactional certainty. Traditional databases store the current world state of the data, and if they are programmed to do so, have additional entries covering previous transactions within the data store. In addition, traditional databases are also able to maintain logs of the history of the interactions.

Blockchain networks are designed differently in that the logs of the transactions with the data set are used to formulate the world state of the data. The use of cryptographic authentication of time-stamped blocks of transactions allows the entire network the benefit of certainty of the entire transactional history.

The general blockchain design not only requires that the transactional history of the data store is captured, but that it is cryptographically certain once there is sufficient consensus within the network.

In other words, in a blockchain network if we know the state of the data at the genesis of the blockchain and we accept the state of the date at `time.Now()` we can be assured that there is one and only one way in which to get from the original state to the current state.

# Types of Blockchain Clients

Blockchain clients generally fall into one of four quadrants. These quadrants vary based on two axes:

1. Is the blockchain network permissionable?
2. Is the blockchain client optimized to do X?

{% image blockchain-quadrant.png %}

## The Optimization Spectrum

On the lower half of the quadrant are blockchain clients which give application developers a clear and efficient way to verifiably track title transfers in a distributed environment.

Whether these blockchain clients are permissioned or unpermissioned, they are a good fit for application developers seeking to build transfer mechanisms, clearing and settlement, and provenance applications.

In other words, they're really interesting property auditors. These blockchain clients -- to some extent or another depending on the client in question -- do provide some limited logic capabilities (bitcoin's reference client, famously, has its multi-signature capacity which operates in a similar area to logic). However, they have been optimized to track movement of title over "property" from one node on the network to another.

On the upper half of the quadrant are blockchain clients which give application developers a clear and efficient way to verifiably track business and governance process logic in a distributed environment.

Whether these blockchain clients are permissioned or unpermissioned, they are a good fit for application developers seeking to build complicated business process automation applications.

In other words, they're really interesting process auditors. Similarly to transaction optimized blockchain clients, they have capabilities of supporting verifiable title transfers, but they have really been optimized to run arbitrary business logic.

## The Permissioned Spectrum

On the left half of the quandrant are unpermissioned blockchain networks. These networks are formulated by a set of blockchain clients which have been programmed with the unpermissioned blockchain network's rule book.

These blockchain networks lack an access control layer and as such handle anti-spam and consensus via purely economic mechanisms.

We may not like to have to pay a bank a fee to update our address in their database, but if our bank operates using an unpermissioned blockchain network that's basically what we'd have to do in order to overcome the necessary anti-spam protections (and other protections) which have been put in place to protect these networks.

These blockchain networks are the best solution for censorship resistance. If someone needs data to exist forever in a rock solid vault of math, then unpermissioned blockchain networks are the place for that data.

Unpermissioned blockchain networks also have public governance mechanisms, and have been designed to provide the data management backbone for a variety of applications. That means that they were probably not well suited for any one type of application. Depending on what application one is seeking to build this may be a benefit or a detriment.

On the right half of the quandrant are permissioned blockchain networks. These networks are formulated by a set of blockchain clients which have been programmed with the permissioned blockchain network's rule book.

Properly permissionable blockchain networks are usually based on the capabilities of nodes on the network which can be made fully public, or use whitelisting to control.

Permissionable blockchain networks are not susceptible to external attack by unknown actors because the blockchain clients participating in the network will reject blocks from not-whitelisted nodes (if the blockchain client is running in "permissioned" mode for a particular blockchain network in question).

These networks also have performance advantages over public blockchain networks because they are only dealing with the functionality required for that network rather than all the functionality for a larger, unpermissioned network load.

For more information, please see our [explainer on permissionable blockchains](../permissioned_blockchains).
