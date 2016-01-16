---

layout:     content
title:      "Explainer | Permissioned Blockchains"
excerpt:    "What is a Permissioned Blockchain and why are these automated data management systems so cool?"

---

# What is a Permissioned Blockchain Network?

The "DNA" of a permissioned blockchain network is no different than the "DNA" of an unpermissioned blockchain network. With the exception of one gene that has been mutated.

Properly permissioned blockchain networks differ from unpermissioned blockchain networks solely based on the presence (or absence) of an access control layer built into the blockchain clients.

The first primary difference between a properly conceived permissioned blockchain network and an unpermissioned blockchain network is whether the participants in the network have an ability to restrict who can participate in the consensus mechanism of the blockchain's network.

Permissioned blockchain networks allow the network to appoint a group of participants in the network who are given the express authority to provide the validation of blocks of transactions. Or, to participate in the consensus mechanism.

The second primary difference between a properly conceived permissioned blockchain network and an unpermissioned blockchain network is whether the participants in the network have an ability to restrict who can create [smart contracts](../smart_contracts/) (if the blockchain client is [logic optimized](../blockchains/)) and/or transact on the blockchain network.

Together, at Eris Industries, we call these **capabilities based permissions**.

# The Benefits of Permissioned Blockchain Networks

To understand the benefits of permissioned blockchain networks to their participants, we must consider the relative advantages which they have *vis a vis* their unpermissioned cousins.

We must also consider the relative advantages which permissioned blockchain networks have *vis a vis* their cousins on the other side of the spectrum: hub and spoke distributed databases.

## Permissioned Blockchain Networks are More Performant Than Unpermissioned Blockchain Networks

Blockchain networks in general are not very performant. But one can get *better* performance from a single blockchain network by limiting what that network is actually trying to manage. In any blockchain network, all the full nodes on the network perform all of the computation redundantly rather than in a segregated (traditional parallel computing) fashion.

So, when one is running a full node on a public blockchain network one is performing all of the computation for all of the applications running on the entire network. Should that single blockchain network explode in popularity, this will be a ton of computing power you would devote to managing the computational effort for *not* the application you are trying to use.

Now for many, that is exactly the point, that all the applications are being ran by all of the full nodes. And it definitely makes sense for some applications. Yet, it doesn't make sense for every application. Particularly those applications which are enterprise in nature and need to have increased performance.

Permissioned blockchain networks do not abrogate the requirement that every full node on the network perform all of the computation for all of the network. Effectively these networks are breaking the computation requirements for a given meta-network into segments which only apply to that particular application.

A permissioned blockchain network will be more performant than an unpermissioned blockchain network for a *given* application because each node will only need to perform the computation necessary to support that *given* application, but it will also be significantly slower than scripting languages and hub and spoke databases.

## Governance Over A Permissioned Blockchain Network is Clearly Defined

Unpermissioned blockchain networks are public spaces and as such have all the challenges of public goods governance when it comes to ensuring the networks evolution via updates to its rulebook or mechanisms of interaction. As a consequence, innovation is slow to be adopted by these networks; and their security and consensus models have challenges evolving.

Enterprises which are seeking to put in place business process automation in consortium's need a network that is capable of moving in different directions and that can be optimized for different ideas than a public network would likely be optimized to achieve.

Permissioned blockchain networks allow for transparent governance *within* the consortium only. While this, at times, can be a challenge, it is certainly less of a challenge to ensure evolution of the network in question than where the network was unpermissioned and subject to public goods governance challenges.

In this sense, permissioned blockchain networks can be used iteratively to accomplish very specific business problems and optimized to achieve those solutions rather than having to be built for only the lowest common denominator.

The end result is that it is easier to marry the specific business challenges and governance over business processes to the data management solution used by the network.

## Permissioned Blockchains' Are More Cost Effective

Public blockchain networks are costly to deal with for a simple reason: spam control. Public blokchain networks of logic optimized blockchain clients (e.g., the Ethereum network) has a pricing structure which is linked to computation operations.

So every time a contract needs to go into a loop, users of that contract must pay to run that loop. How much users are required to pay will be determined by how many times the contract must iterate through the loop. The more times through the loop, the more computational operations will be required, and the more money must be spent.

What happens on such a network if users do not send enough money to a contract when they interact with it? That transaction does not happen. Plain and simple. There is a valid reason for why these networks have such rules: if a contract has an infinite loop in it and they did not have a pay-per-computing-operation mechanism a single contract could seize up the entire network by throwing all of the full nodes into an infinite loop.

Controlling this attack vector on a permissioned blockchain network can happen in a very different manner than *having* to rely on market and pricing dynamics.

# Security for Permissioned Blockchain Networks

There is a fallacy heard now and again that permissioned blockchain networks are significantly less secure than unpermissioned blockchain networks which have an economic incentive to "mine" and protect the integrity of data. When people say that permissioned blockchain networks don't have the same level of security as unpermissioned blockchain networks sometimes they are equating blockchain networks ​_without_​ permissioning systems to "permissioned" blockchain networks.

These are very different things indeed. A blockchain network which does not have an access control layer baked in as a first class citizen of its clients is a very different animal than a blockchain network which is able to expressly whitelists those that are able to participate in various network tasks such as validation, contract creation, and the like. An adversary which is able to get into the VPN (assuming this was the architecture for claiming the network was "permissioned") and connect into the blockchain network could potentially attack the network using increased mining capacity.

For the rest of this explainer we'll be talking about blockchain networks made up of blockchain client's who have an access control layer baked in as a first class citizen.

## Securing Unpermissioned Blockchain Networks

Unpermissioned blockchain networks such as bitcoin use distributed computing power to process and verify transactions broadcast upon them. The network, being aware of the history of all transactions, engages in a process of continual, automated database management and transaction verification through the voluntary provision of computing power, in a process which many blockchainers call “mining”, but we call "**validating**".

Providers of this computing power -- known as “miners” or "validators" -- solve complex computational problems, which (in the case of mining) is done in exchange for the reward of cryptographic tokens (such as bitcoins) which the network hopes will become valuable over time due to their scarcity and/or their usability. This provides an incentive to continue securing the network, although there are certain risks -- such as inter-miner collusion to incorporate false transactions into the blockchain -- that the model also presents.

The security model of public blockchain networks is not the overall amount of computing power as many suspect. Rather the security model is based on the non-predictive distribution of power over block creation among nodes unlikely to collude​.

In other words the security model for unpermissioned blockchain networks ​is​ the relative distribution of the pie slices rather than the overall size of the pie.

The overall size of the pie *does* provide a barrier to entry and also a barrier to quickly acquiring a sufficiency of the non-predictive distribution of power over block creation.

## Securing Permissioned Blockchain Networks

The security model for permissioned blockchain networks is very similar, namely it is the non-predictive distribution of power over block creation among nodes unlikely to collude.

Only, in a permissioned blockchain network the barrier to entry, and/or barrier to control, are provided either out of band by a previous or emergent agreement; added to the genesis block of the blockchain network and/or updated over time as different evolutions of the network become necessary.

A possible attack vector at this point for overtaking a permissioned blockchain is thieving (or brute forcing) of 2/3rds of the private keys for the validator set. This attack vector is **extremely unlikely** it must be reinforced, however it is mathematically possible.

# The Issue of Trust

Many of the advantages and disadvantages of blockchain architecture stem from the idea that nodes on the network are not necessarily trustworthy. Most blockchains are designed to withstand untrustworthy nodes within the network via their consensus mechanism. This design parameter, however, begets some limitations.

The idea which many blockchain advocates take from the consensus protocol is the idea of extended trustlessness to an ever wider range of the overall application, of which the blockchain is providing one piece. While the idea of increased certainty and verifiability is, indeed, appealing, the idea of moving to a fully trustless environment presents many challenges.

## Examining Trustlessness

"Trustless" is largely a misnomer -- and too much of it is not necessarily a good thing. Even the most ardent advocate of Bitcoin, the most prominent "trustless" network, will extend trust regularly to a certain extent, whether to the banks and payment processors which process their fiat currency transactions when they purchase Bitcoin, to the manufacturers of their computers and operating systems on which they run the Bitcoin client, and to the Bitcoin Core developers themselves.

Further, it is not necessarily always the case that trust is a pain point for consumers. When dealing with a bank, for example, consumers trust that deposits or funds held on account are safely kept; where these are not, other mechanisms such as insurance or deposit guarantees are available to secure them. When using web-based applications such as social networks and e-mail, consumers rely on the provider of those services to back up and secure their data.

Indeed, if trust *vis-a-vis* data and financial services providers were truly a vexing pain point for most consumers, there would be a rush of hosting providers for ownCloud and email-in-a-box solutions along with a drastic increase in transactional volume of non-fiat currency. While we see limited upticks in adoption some of those systems, there is by no means a rush.

Finally, "trustlessness" ignores the fact that in commerce, mistakes are made and a degree of human discretion is usually required to remedy these mistakes. Mechanisms that run completely automously and which cannot be broken **also cannot be fixed**. It is not as if trustworthiness is a new problem. Entire industries have been developed to handle the boundaries and rules of various points along the the trust-to-trustlessness spectrum -- not the least of which is the legal system, which operates as a potent safeguard for consumers and commercial entities alike.

For the vast majority of commercial entities, legal norms provide a material constraining mechanism which bounds the actions which that entity can take. While there are indeed challenges which remain to broaden access to justice, and while we feel that things do need to improve, it does not follow that one should throw out hundreds of years of legal and commercial norms simply because we now have elliptic curve cryptography and cryptoeconomics.

## From Trustless to Verifiable

While trustlessness is a tricky subject commercially for all the reasons discussed above, increasing the verifiability of data-driven interactions is a goal which all entities and organizations -- whether commercial, corporate, not-for-profit, or individual -- can benefit from. This is why, at Eris, we prefer to focus on **increasing verifiability** within distributed systems rather than engaging in largely philosophical debates about the quantum of trust.

When it comes to increasing verifiability for all parties to a given data-driven interaction, there are few technologies currently invented which match blockchains.

For more on verifiable [business process automation between stakeholders](../smart_contracts) please see our smart contracts explainer.