
The eris stack has undergone many changes in the past six months. When I joined eris in July, the old stack was just about deprecated, docker had recently been embraced full tilt, and our blockchain orchestration tool was a couple months away from the 0.10.0 release. While making incremental contributions to eris-cli and fighting docker, I was also learning to stitch together our various tools natively. The process, albeit daunting (compared, say, to building a simple web app), is fairly straightforward once layed out clearly. This post is intended to first provide a high level overview followed by a detailed explanation of how the eris stack is organized. Modularity is a strong focus, thanks in no small part to docker. I'll be focusing on how the tools fit together, rather than any of their specific commands or how to use them (hmm, not so). The complicated task of orchestrating all the various requirements for a smart-contract-focused blockchain is exactly why we went all-in on docker despite various ongoing pain points. We like to think of eris:cli() as "docker for blockchains".

(more blurb on docker...modularity?)

Let's get started! Figure 1 shows the relationship between all the tools in the eris stack. Before docker, each had to be installed individually (`git clone` followed by `go install` a handful of times...yuk). Docker also provides the ability to seamlessly link the containers, so that the individual processes can talk to each other. When deploying many nodes, this is known as service discovery and greatly facilitates large-scale deployments. More on that later. At any rate, there are several considerations for thinking about the mechanics of your chain as an application. The first three suffice if your goal is writing and testing smart contracts. The rest are for building a useable application at scale. 

# Blockchain Checklist.

1. It all starts with your keys. 
This is crypto, remember? Key management is an inherently complex process and is something that should be given serious thought. It's getting easier overall (e.g. keybase), but at the moment there's still quite a bit of work required. A key needs to be generated and secured _for each participant_ in your blockchain. There's not much one can do on a blockchain without a validator or participant who can't sign transactions. This is a fundamentally different approach for web services compared to login/password. If you're gonna be blockchaining, do try to really understand how keys work and are used. Our key signing daemon ([eris:keys](link), usually run in a docker container, provides the basic functionality for getting started with development. As with all the tools in our stack, this key daemon can be swapped out for any other compatible cryptographic key tool. In fact, we anticipate moving to PGP in the future. 

2. Roll a chain.
Blockchains have a few key properties: validators (specified in the all important genesis file or updated on the fly), a consensus engine (the mechanism for updating state), and a virtual machine (for the smarmot contracts). Our current design is opinated and uses Tendermint(which link?) as the consensus engine and a fork of the [Ethereum Virtual Machine](which link?). Both the consensus engine and virtual machine are, again, modules that can be swapped in and out as need by. Currently, they are packaged together as eris:db(ilink). The docker image used to run eris:db also contains mint-client(link), a tool used in conjunction with tendermint. An eth-client(link) is also available if you'd rather be rolling an ethereum chain.

3. Deploy contracts.
Write solidity contracts. Compile 'em. Send 'em to the chain. We provide [hosted compilers](compilers.erisindustries.com) which uses the [lllc-server](link), and as you would expect, swapping in your own compiler is as easy as flag with eris:pm(), our contract deployement tool which simplifies a handful of steps (see __ part of the diagram). The abi(link) is used for formatting compiled solidity code. More on that below.

4. Write you app (Dapp). We call them services. A handful are already built for you. Some of them are used internally, for example, IPFS(), to provide a data lake for applications (the `eris files command`). The mindy(link) testnet(pinkpenguin.interblock.io:46657) has been running for many months now and works fairly well for sub-domain name registry. The toadserver() integrates each mindy, IPFS, and the chain [name registry feature](link) to serve as a download server, soon to be replacing github as part of the `eris init` sequence. Services glue together other services, and can often be added to you application with just a few lines of code.

5. Deploy to the cloud.
This process will use docker-machine() and, eventually, docker-swarm(). The command `eris remotes` is currently a work in progress and not yet available. 

6. Voila! Your app is ready for users. Of course, you'll want to build a user interface, likely at the javascript layer. To simplify that process, we have a javasript libraries for both eris:db.js(link) and eris:contracts.js(link).

Above, we've highltighted the relevant repositories currently maintained as part of the Eris stack. So where should you even start? Next, we'll walk through _one_ approach - the one I consider most intuitive for thinking about the design of you chain/application - though in practice you can probably start anywhere. This is how I do it when testing or implementing the toadserver. 

##links to repos above, links to tutorials/explain/spec below.


# The development lifecycle

We start with the genesis file. The sets up your chain and contains approved validators, their initial coin distribution*, any permissions, roles, or names can be assigned to them. Maybe you want 5, maybe you want 100. See [this tutorial](link) for more info on generating a genesis file and chainmaking. Of course, since you'll need the public keys of everyone you'd like included, a key pair will need to be generated for each participant/validator. Either you do this all yourself and distribute the keys or ask each user to generate a pair themselves and provide the pubkey. You could also try the [Blocklab tool](http://blocklab.levvel.io/). Each have pros and cons that need to be carefully thought through. At any rate, it is always possible to update the validator set with a bond/unbond transaction, or, if they misbehave, their security deposit (bond) can be slashed: validator they are no longer. 

It's time to start bringing nodes online. The master node starts up and peers can join like so: a seed of the master node's IP:port is added to their configuration file used in the `eris chains new` sequence. So long as the peer coming online has a key that 1) can sign (via the key daemon) and 2) is included in the genesis file, then it'll join the network. Once >2/3 of known validators join, the chain will begin validating transactions (i.e., updating state, "mining", producing blocks etc). If the chain drops below 2/3 validators, it will halt. (something about PoS ?/ fork-choice?). The status and health of a chain can be monitored easily through various means such as the `mintinfo` command from mint-client, the js library (port 1337), or pure http endpoints (port 46657) (better examples?). The `chains` command for eris-cli is designed to handle all operations for one or more chains. With your chain running, you can send transactions (`mintx send`) and deploy contracts (`eris-pm`). At the tool level, these would primarily be used by chain admins whereas developers (wc?) for a user-facing application would likely be working at the javascript layer for sending transactions and deploying contracts. 

Now you need an application. Before we get into some design considerations for an app, let's dissect the process of sending transactions and deploying contracts. At the end of the day, the latter is the former but includes compiled byte code as part of the transaction (abi in diagram). The specific requirements for sending a transaction are documented here(link). Provided these are met, the `mintx` command will first craft a transaction and, if specified, sign and broadcast it to the designated chain. Again, since the key signing that transaction must be available to the daemon, docker simplifies this logitics challenge, especially for updates (but not always...!). So that's pretty easy but it's no bitcoin wallet in terms of simplicity. Now let's deploy a contract. For writing smart contracts, see (here, here, and here). Ok, you've got a simple contractand would like to deploy it. The first step takes the solidity code and compiles it (no different than C/go ... ?) into bytecode. This bytecode will be used as the raw input for `mintx` of the contracts you're deploying. As (after?, before?) the transaction is crafted by, the abi formats this bytecode into (_____?) that the EVM can read/interpret. Now your contract is on the chain and can be called with `mintx call` or (js function..?). This process of: solidity -> lllc-server -> mintx -> abi -> sign -> deployed is greatly simplified by eris:pm; see the contract deploying tutorial [here](). In essence, you write a contract, specify a few parameters in a .yaml file then vrooom `eris contracts deploy`.

So a transaction hits the chain, then what? For details of the tendermint consensus, see [here](). Roughly, the transaction will be proposed and the validators will vote on whether or not to accept it in the next block. Voting happens in a round robin manner (...more details?). In an upcoming refactor of eris:db and tendermint, the consensus engine will be its own module which talks to the eris:db application layer over tmsp(link), This will make experimentation with other consensus engines much simpler (Casper anyone?!). Indeed, it is already possible to roll an eth chain and play on it with the eth-client(tutorial??). So we've got three ways to deploy contracts and send transactions (note the latter can also be conveniently accomplished via eris-pm), 1) from scratch using the low(est)-level tool (mintx), 2) with eris-pm and, 3) the js libraries. The way in which certain contracts are deployed and by whom at these different levels should be considered for you application.

Time to build your service (app). But wait. What is eris-cli anyways, and why would you want to use it? How will help it operate your blockchain application? As previously mentioned, it's an orchestration tool. Everything we've discussed so far _can_ be done natively (i.e., without docker); this requires stitching together the various tools (see, e.g., eris by curl). `eris` makes it easy(er) to co-ordinate all the things you need to roll a smart-contract ready chain with an application. (something soemthing docker is awesome). With that in mind, our goal is to build and define a service that, when started, links up to the existing chain _and any other services that are required_ for the application to run smoothly. Once your service is built (write a bunch of code, basically), all it needs is a service definition file (link to spec) which simplifies the `docker run` process. This of course assumes you've written a Dockerfile(link) and made an image(link). 

The last tricky part, now that we have a defined service, is to deploy it to the cloud with >1 node/validator. Here again, docker shines, this time as a machine. The `eris` tool has a global flag `--machine` which can be used to specify another docker daemon (on any number of other hosts) upon which to execute a command. Note: these docker machine will have been pre-created. See [here](chain deploy tut) for how to deploy many nodes. The beauty of this feature is that the files needed for these deployments need only be on the host, and, of course, you only need install `eris` once. Staying with the theme of orchestration, the upcoming command `remotes` will greatly simplify this deployment process. 

There you have it. From A to Blockchains, this is how you get rolling with the marmots. Want a tutorial that we haven't provided? Let us know(link to our to-be-open-sourced-doc-repo where people can open issues when docs/tuts are broken and also do PRs)
