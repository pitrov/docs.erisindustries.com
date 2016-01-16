---

layout:     documentation
title:      "Documentation | eris:cli | Motivation"

---

# Why?

Blockchain applications are a nightmare. They really are. As currently implemented blockchain-backed applications are almost always structured in one of two ways:

1. They treat the blockchain as a simple microservice and run it alongside a "normal" webApplication stack.
2. They completely buy into a single blockchain and its ecosystem which will wrap you in a warm hug of "we've got everything you need right here".

But we have always thought there was a better way.

# Eris: The Background

At Eris our approach to blockchain technologies is that blockchains, but really more interestingly and importantly, smart contract networks (which just so happen to currently reside on blockchains), are an immensely helpful tool.

When used appropriately.

Here is a brief overview of our experiences designing, building, running, and distributing our own distributed applications with smart contract backbones.

## Take 1: The Original Eris

In the summer of 2014 when we built a reddit-like application on a smart contract backbone we built on a simple fork of eth's POC5 testnet, connected it to bittorrent, added in some pretty interesting smart contracts, and built a bunch of ruby glue to hold the thing together into an application built to provide users with a serverless application that had a view layer harmonized across nodes and where the data and processes were built across different and distinct distributed platform building blocks. Folks wanted to tinker with this concept. Some from a technical perspective. Some from a social perspective.

Whoever wanted to play with the damn thing, though, had to:

1. make sure ruby was installed locally
2. download poc5 c++ ethereum.
3. change some values in the c++ client so it would connect do a different peer server
4. get that installed for their platform.
5. (linux only) make sure that transmission was setup in the right way.
6. make sure git installed locally.
7. clone a repo.
8. turn on the client.
9. mine some fake ether.
10. go through a contract based registration process.
11. pray.

Needless to say, this was not a winning user experience.

Yet it was also a bit magical. We were building smart contracts which mediated content publishing. At the time we called it `contract controlled content dissemination` or (`c3d`). And all the content was served on a peer to peer basis.

Exciting stuff! When the damn thing ran.

## Take 2: The 0.9 Stack

In the winter of 2015 when we built a youtube-like application on a smart contract backbone we built on a very complicated and divergent fork of eth's POC8 goclient with smart contract technology embedded in the genesis block providing a permissions layer for an ethereum style POW blockchain, connected it to IPFS and built a sophisticated go wrapper we called `decerver` which had scripting capabilities and provided a much more rich, while also much more robust middle layer than the Ruby glue we originally used to tie together early eth and transmission. Also IPFS, FTW! Again folks wanted to tinker with this idea.

But whoever wanted to play with the damn thing, had to:

1. make sure go was installed locally
2. go get decerver
3. go get ipfs
4. run a start up script
5. type their username into the screen (if they hadn't registered their key)
6. pray.

We were getting better. Still we had edge cases and some other challenges with getting everything just right for users.

Again, not so bad, but what if someone wanted to take the application and deploy it to ethereum and use bittorrent_sync rather than IPFS? It would have been doable with a very few lines of code actually.

Yet, we could not help but wonder what kind of user experience would it be for the distributed application ecosystem if some users were on ethereum/bittorent sync application and others were on ethereum/eth-swarm application and others were on decerver/IPFS application.

How many binaries can even superusers with dev experience be expected to compile? Bloody nightmare.

It has been this journey which has led us directly to the many design and implementation details behind the first thing we've actually felt comfortable naming:

```
eris
```

# Eris: The Philosophy

We have learned along this arc that blockchain-backed applications are hard. They're hard to develop against. They're hard to work *on*. They're hard to explain. And that's probably (a part of) why very few folks are using blockchains nearly as much as they *could*.

(**N.B.**, This README does not presume to question your motives for being interested in a very interesting piece of technology; that nuanced dialog is better left for twitter.)

We have learned that its doable. It is doable to provide *something like* a web application experience with a completely distributed backend relying on smart contract and distributed data lake technologies.

We have learned that smart contracts are straight up legit. Verifiable, automate-able, distributed process.

We have learned that there are tons of great ideas out there. That tons of folks are working on incredibly interesting things. As such, we have learned the benefits (and reaped some of the costs) which come with a corporate philosophy that does not presume to establish which blockchain or which distributed file storage system or which peer to peer message system or any other system is right for **your** application.

We have learned that *application developers should have some choice* if the distributed application ecosystem is to blossom.

* Choice in crafting the set of technologies which is right for their distributed application.
* Choice in crafting which pieces of the application need to go in which data storage, data organization, and/or data dissemination facilities (which is what an application frontend -- no matter the backend -- needs).
* Choice in where and how users are able to interact with their applications in a participatory manner which allows users (particularly superusers) to help application developers share the cost of scaling their application.

We have learned that application superusers wanting to participate in the data storage, organization and/or dissemination of the application *need a sane way to run distributed applications* and perhaps even more importantly than a sane way to run blockchain-backed applications a sane way to install and try out such applications.

**No matter the blockchain**.

These are the lessons which underpin the design of the `eris` tool.