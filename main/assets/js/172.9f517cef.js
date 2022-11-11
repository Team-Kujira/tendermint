(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{780:function(e,t,n){"use strict";n.r(t);var o=n(1),s=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"rfc-25-support-application-defined-transaction-storage-app-side-mempools"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rfc-25-support-application-defined-transaction-storage-app-side-mempools"}},[e._v("#")]),e._v(" RFC 25: Support Application Defined Transaction Storage (app-side mempools)")]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("Aug 17, 2022: initial draft (@williambanfield)")]),e._v(" "),n("li",[e._v("Aug 19, 2022: updated draft (@williambanfield)")])]),e._v(" "),n("h2",{attrs:{id:"abstract"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),n("p",[e._v("With the release of ABCI++, specifically the "),n("code",[e._v("PrepareProposal")]),e._v(" call, the utility\nof the Tendermint mempool becomes much less clear. This RFC discusses possible\nchanges that should be considered to Tendermint to better support applications\nthat intend to use "),n("code",[e._v("PrepareProposal")]),e._v(" to implement much more powerful transaction\nordering and filtering functionality than Tendermint can provide. It proposes\nscoping down the responsibilities of Tendermint to suit this new use case.")]),e._v(" "),n("h2",{attrs:{id:"background"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),n("p",[e._v("Tendermint currently ships with a data structure it calls the\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/c8302c5fcb7f1ffafdefc5014a26047df1d27c99/mempool/mempool.go#L30",target:"_blank",rel:"noopener noreferrer"}},[e._v("mempool"),n("OutboundLink")],1),e._v(". The mempool's primary function is to store pending\nvalid transactions. Tendermint uses the contents of the mempool in two main\nways: 1) to gossip these pending transactions to other nodes on a Tendermint\nnetwork and 2) to select transactions to be included in a proposed block. Before\nABCI++, when proposing a block Tendermint selects the next set of transactions\nfrom the mempool that fit within block and proposes them.")]),e._v(" "),n("p",[e._v("There are a few issues with this data structure. These include issues of how\ntransaction validity is defined, how transactions should be ordered and selected\nfor inclusion in the next block, and when a transaction should start or stop\nbeing gossiped. The creation of "),n("code",[e._v("PrepareProposal")]),e._v(" in ABCI++ adds the additional\nissue of unclear ownership over which entity, Tendermint or the ABCI\napplication, is responsible for selecting the transactions to be included in\na proposed block.")]),e._v(" "),n("p",[e._v("None of these issues of validity, ordering, and gossiping having simple,\none-size fits all solutions. Different applications will have different\npreferences and needs for each of them. The current Tendermint mempool attempts\nto strike a balance but is quite prescriptive about these questions. We can\nbetter support a varied range of applications by simplifying the current mempool\nand by reducing and clarifying its scope of responsibilities.")]),e._v(" "),n("h2",{attrs:{id:"discussion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#discussion"}},[e._v("#")]),e._v(" Discussion")]),e._v(" "),n("h3",{attrs:{id:"the-mempool-is-a-leaky-abstraction-and-handles-too-many-concerns"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#the-mempool-is-a-leaky-abstraction-and-handles-too-many-concerns"}},[e._v("#")]),e._v(" The mempool is a leaky abstraction and handles too many concerns")]),e._v(" "),n("p",[e._v("The current mempool is a leaky abstraction. Presently, Tendermint's mempool keeps\ntrack of a multitude of details that primarily service concerns of the application.")]),e._v(" "),n("h4",{attrs:{id:"gas"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#gas"}},[e._v("#")]),e._v(" Gas")]),e._v(" "),n("p",[e._v("The mempool keeps track of Gas, a proxy for how computationally expensive it\nwill be to execute a transaction. As discussed in "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/2313f358003d0c4d9d0e7705b4632d819dfb0d92/docs/rfc/rfc-011-delete-gas.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC-011"),n("OutboundLink")],1),e._v(", this metadata is\nnot a concern of Tendermint's. Tendermint does not execute transactions. This\ndata is stored within Tendermint's mempool along with the maximum gas the application\nwill permit to be used in a block so that Tendermint's mempool can enforce\ntransaction validity using it: transactions that exceed the configured maximum\nare rejected from the mempool. How much 'Gas' a transaction consumes and if that\nprecludes it from execution by the application is a validity condition imposed\nby the application, not Tendermint. It is an application abstraction that leaks\ninto the Tendermint mempool.")]),e._v(" "),n("h4",{attrs:{id:"sender"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sender"}},[e._v("#")]),e._v(" Sender")]),e._v(" "),n("p",[e._v("The Tendermint mempool stores a "),n("code",[e._v("sender")]),e._v(" string metadata for each transaction\nit receives. The mempool only stores one transaction per sender at any time.\nThe "),n("code",[e._v("sender")]),e._v(" metadata is populated by the application during "),n("code",[e._v("CheckTx")]),e._v(".\n"),n("code",[e._v("Sender")]),e._v(" uniqueness is enforced separately on each node's mempool. Nothing\nprevents multiple transactions with the same "),n("code",[e._v("sender")]),e._v(" from existing in separate\nmempools on the network.")]),e._v(" "),n("p",[e._v("While multiple transactions from the same sender on a network is a shortcoming\nof the "),n("code",[e._v("sender")]),e._v(" abstraction, the issue posed by sender to the mempool is that\n"),n("code",[e._v("sender")]),e._v(" uniqueness is a condition of transaction validity that is otherwise\nmeaningless to Tendermint. The "),n("code",[e._v("sender")]),e._v(" field allows the application to\ninfluence which transactions Tendermint will include next in a block. However,\nwith the advent of "),n("code",[e._v("PrepareProposal")]),e._v(", the application can select directly and\nthis "),n("code",[e._v("sender")]),e._v(" field is of marginal benefit. Additionally, applications require\nmuch more expressive validity conditions than just "),n("code",[e._v("sender")]),e._v(" uniqueness.")]),e._v(" "),n("h4",{attrs:{id:"adding-additional-semantics-to-the-mempool"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#adding-additional-semantics-to-the-mempool"}},[e._v("#")]),e._v(" Adding additional semantics to the mempool")]),e._v(" "),n("p",[e._v("The Tendermint mempool is relied upon by every ABCI application. Changing its\ncode to incorporate new features or update its behavior affects all of\nTendermint's downstream consumers. New applications frequently need ways of\nsorting pending transactions and imposing transaction validity conditions. This\ndata structure cannot change quickly to meet the shifting needs of new\nconsumers while also maintaining a stable API for the applications that are\nalready successfully running on top of Tendermint. New strategies for sorting\nand validating pending transactions would be best implemented outside of\nTendermint, where creating new semantics does not risk disrupting the existing\nusers.")]),e._v(" "),n("h3",{attrs:{id:"tendermint-s-scope-of-responsibility"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tendermint-s-scope-of-responsibility"}},[e._v("#")]),e._v(" Tendermint's scope of responsibility")]),e._v(" "),n("h4",{attrs:{id:"what-should-tendermint-be-responsible-for"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#what-should-tendermint-be-responsible-for"}},[e._v("#")]),e._v(" What should Tendermint be responsible for?")]),e._v(" "),n("p",[e._v("Tendermint's responsibilities should be as narrowly scoped as possible to allow\nthe code base to be useful for many developers and maintainable by the core\nteam.")]),e._v(" "),n("p",[e._v("The Tendermint node maintains a P2P network over which pending transactions,\nproposed blocks, votes and other messages are sent. Tendermint, using these\nmessages, comes to consensus on the proposed blocks and delivers their contents\nto the application in an orderly fashion.")]),e._v(" "),n("p",[e._v("In this description of Tendermint, its only responsibility, in terms of pending\ntransactions, is to "),n("em",[e._v("gossip")]),e._v(" them over its P2P network. Any additional logic\nsurrounding validity, ordering etc. requires an understanding of the meaning of\nthe transaction that Tendermint does not and "),n("em",[e._v("should not")]),e._v(" have.")]),e._v(" "),n("h4",{attrs:{id:"what-should-the-application-be-responsible-for"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#what-should-the-application-be-responsible-for"}},[e._v("#")]),e._v(" What should the application be responsible for?")]),e._v(" "),n("p",[e._v("Transaction contents have semantic meaning to the ABCI application. Pending\ntransactions are valid and have execution priority in relationship to the\ncurrent state of application. While Tendermint is clearly responsible for the\naction of gossiping the transaction, it cannot decide when to start or stop\ngossiping any given transaction. While only valid transactions should be\ngossiped, as stated, it cannot appropriately make decisions about transaction\nvalidity beyond simple heuristics. The application therefore should be\nresponsible for defining pending transaction validity, determining when to start\nor stop gossiping a transaction, and for selecting which transaction should be\ncontained within a block.")]),e._v(" "),n("h3",{attrs:{id:"how-can-tendermint-best-be-designed-for-this-responsibility"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#how-can-tendermint-best-be-designed-for-this-responsibility"}},[e._v("#")]),e._v(" How can Tendermint best be designed for this responsibility?")]),e._v(" "),n("p",[e._v("With the understanding that Tendermint's responsibility is to gossip the set of\ntransactions that the application currently considers valid and high priority,\nwe can update its API and data structures accordingly. With the creation of\n"),n("code",[e._v("PrepareProposal")]),e._v(", the mempool may be able to drop its responsibility to select\ntransactions for a block; It can be primarily responsible for gossiping and\nnothing else.")]),e._v(" "),n("h4",{attrs:{id:"goodbye-mempool-hello-gossiplist"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#goodbye-mempool-hello-gossiplist"}},[e._v("#")]),e._v(" Goodbye mempool, hello GossipList")]),e._v(" "),n("p",[e._v("The mempool contains many structures to retain, order, and select the set of\ntransactions to gossip and to propose. These mempool structures could be\ncompletely replaced with a single list that allows Tendermint to fulfill the\npreviously stated responsibility. This proposed list, the "),n("code",[e._v("GossipList")]),e._v(", would\nsimply contain the set of transactions that Tendermint is responsible for\ngossiping at the moment. This "),n("code",[e._v("GossipList")]),e._v(" would be updated by the application\nat a set of defined junctures and Tendermint would never add to it or remove\nfrom it without input from the application. Tendermint would impose "),n("em",[e._v("no")]),e._v("\nvalidity constraints on the contents of this list and would not attempt to\nremove items unless instructed to.")]),e._v(" "),n("h3",{attrs:{id:"mock-api-of-the-gossiplist"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mock-api-of-the-gossiplist"}},[e._v("#")]),e._v(" Mock API of the GossipList")]),e._v(" "),n("p",[e._v("Outlined below is a proposed API for this data structure. These calls would be\nadded to the ABCI API and would come to replace the current "),n("code",[e._v("CheckTx")]),e._v(" call.")]),e._v(" "),n("h4",{attrs:{id:"offerpendingtransaction"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#offerpendingtransaction"}},[e._v("#")]),e._v(" "),n("code",[e._v("OfferPendingTransaction")])]),e._v(" "),n("p",[n("code",[e._v("OfferPendingTransaction")]),e._v(" replaces the "),n("code",[e._v("CheckTx")]),e._v(" call that is invoked when\nTendermint receives a submitted or gossiped transaction. The "),n("code",[e._v("GossipList")]),e._v(" will\ninvoke "),n("code",[e._v("OfferPendingTransaction")]),e._v(" on "),n("em",[e._v("every")]),e._v(" transaction sent to Tendermint that\ndoes not match one of the transactions already in the "),n("code",[e._v("GossipList")]),e._v(". The mempool\ncurrently drops gossiped transactions before "),n("code",[e._v("CheckTx")]),e._v(" is called if the\ntransaction is considered invalid for a Tendermint-defined reason such as\ninclusion in the mempool 'cache' or it overflows the max transaction size.")]),e._v(" "),n("p",[e._v("The application can indicate if the transaction should be added to the\n"),n("code",[e._v("GossipList")]),e._v(" via "),n("code",[e._v("ResponseOfferPendingTransaction")]),e._v("'s "),n("code",[e._v("GossipStatus")]),e._v(" field. If\nthe "),n("code",[e._v("GossipList")]),e._v(" is full, the application must list a transaction to remove from\n"),n("code",[e._v("GossipList")]),e._v(", otherwise the transaction will not be added. In this way,\na transaction will "),n("em",[e._v("never")]),e._v(" leave the list unless the application removes it from\nthe list explicitly.")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"bWVzc2FnZSBSZXF1ZXN0T2ZmZXJQZW5kaW5nVHJhbnNhY3Rpb24gewogIGJ5dGVzICB0eCA9IDE7CiAgaW50NjQgZ29zc2lwX2xpc3RfbWF4X3NpemUgPSAyOwogIGludDY0IGdvc3NpcF9saXN0X2N1cnJlbnRfc2l6ZSA9IDM7Cn0KCm1lc3NhZ2UgUmVzcG9uc2VPZmZlclBlbmRpbmdUcmFuc2FjdGlvbiB7CiAgR29zc2lwU3RhdHVzICBnb3NzaXBfc3RhdHVzID0gMTsKICBlbnVtIEdvc3NpcFN0YXR1cyB7CiAgICBVTktOT1dOICA9IDA7CiAgICBHT1NTSVAgPSAxOwogICAgTk9fR09TU0lQID0gMjsKICB9CiAgcmVwZWF0ZWQgYnl0ZXMgcmVtb3ZhbHMgPTIKfQo="}}),e._v(" "),n("h4",{attrs:{id:"updatetransactiongossiplist"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#updatetransactiongossiplist"}},[e._v("#")]),e._v(" "),n("code",[e._v("UpdateTransactionGossipList")])]),e._v(" "),n("p",[n("code",[e._v("UpdateTransactionGossipList")]),e._v(" would be a simple method that allows the\napplication to exactly set the contents of the "),n("code",[e._v("GossipList")]),e._v(". Tendermint would\ncall "),n("code",[e._v("UpdateTransactionGossipList")]),e._v(" on the application, which would respond with\nthe list of all transactions to gossip. The contents of the "),n("code",[e._v("GossipList")]),e._v(" would\nbe completely replaced with the contents provided by the application in\n"),n("code",[e._v("UpdateTransactionGossipList")]),e._v(".")]),e._v(" "),n("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"bWVzc2FnZSBVcGRhdGVUcmFuc2FjdGlvbkdvc3NpcExpc3RSZXF1ZXN0IHsKICBpbnQ2NCBtYXhfc2l6ZSA9IDE7IC8vIGFwcGxpY2F0aW9uIGNhbm5vdCBwcm92aWRlIG1vcmUgdGhhbiBgbWF4X3NpemVgIHRyYW5zYWN0aW9ucy4KfQoKbWVzc2FnZSBVcGRhdGVUcmFuc2FjdGlvbkdvc3NpcExpc3RSZXNwb25zZSB7CiAgcmVwZWF0ZWQgYnl0ZXMgPSAxOwp9Cg=="}}),e._v(" "),n("p",[e._v("This new "),n("code",[e._v("ABCI")]),e._v(" method would serve multiple functions. First, it would replace\nthe re-"),n("code",[e._v("CheckTx")]),e._v(" calls made by Tendermint after each block is committed. After\neach block is committed, Tendermint currently passes the entire contents of the\nmempool to the application one-by-one via "),n("code",[e._v("CheckTx")]),e._v(" calls with "),n("code",[e._v("CheckTxType")]),e._v(" set\nto "),n("code",[e._v("RECHECK")]),e._v(". The application, in this way, can then inspect the entire mempool\nand remove any transactions that became invalid as a result of the most recent\nblock being committed.")]),e._v(" "),n("p",[n("code",[e._v("UpdateTransactionGossipList")]),e._v(" would completely replace this set of re-"),n("code",[e._v("CheckTx")]),e._v("\ncalls. After each block is committed, Tendermint would call\n"),n("code",[e._v("UpdateTransactionGossipList")]),e._v(" and the application would be responsible for\nexactly providing the set of transactions for Tendermint to maintain. The IPC\noverhead here would be roughly equivalent to the re-"),n("code",[e._v("CheckTx")]),e._v(" overhead, as the\nentire contents of the gossip structure is communicated, but, in the\n"),n("code",[e._v("UpdateTransactionGossipList")]),e._v(" call, the application sends transactions instead\nof Tendermint.")]),e._v(" "),n("p",[e._v("This new method would "),n("em",[e._v("also")]),e._v(" replace the mempool's "),n("code",[e._v("Update")]),e._v(" API. The "),n("code",[e._v("Update")]),e._v("\nmethod on the mempool receives the list of transactions that were just executed\nas part of the most recent height and removes them from the mempool. The\n"),n("code",[e._v("GossipList")]),e._v(" would have no such method and instead, the application would become\nresponsible for setting the contents after each block via\n"),n("code",[e._v("UpdateTransactionGossipList")]),e._v(". This gives the application more control over when\nto start and stop gossiping transactions than it has at the moment. In this\ncall, the application can completely replace the "),n("code",[e._v("GossipList")]),e._v(".")]),e._v(" "),n("p",[e._v("This also complements the "),n("code",[e._v("PrepareProposal")]),e._v(" call nicely, because a transaction\nintroduced via "),n("code",[e._v("PrepareProposal")]),e._v(" may be semantically equivalent to a transaction\npresent in Tendermint's mempool in a way that Tendermint cannot detect. The\nmempool "),n("code",[e._v("Update")]),e._v(" call only compares transaction hashes,\n"),n("code",[e._v("UpdateTransactionGossipList")]),e._v(" allows the application to easily compare on\ntransaction contents as well.")]),e._v(" "),n("p",[e._v("As a nice benefit, it also allows the application to easily continue gossiping\nof a transaction that was just executed in the block. Applications may wish to\nexecute the same transaction multiple times, which the mempool "),n("code",[e._v("Update")]),e._v(" call\nmakes very cumbersome by clearing transactions that have the same contents of\nthose that were just executed.")]),e._v(" "),n("h3",{attrs:{id:"tendermint-startup"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tendermint-startup"}},[e._v("#")]),e._v(" Tendermint startup")]),e._v(" "),n("p",[e._v("On Tendermint startup, the "),n("code",[e._v("GossipList")]),e._v(" would be completely empty. It does not\npersist transactions and is an in-memory only data structure. To populate the\n"),n("code",[e._v("GossipList")]),e._v(" on startup, Tendermint will issue an "),n("code",[e._v("UpdateTransactionGossipList")]),e._v("\ncall to the application to request the application provide it with a list of\ntransactions to fill the gossip list.")]),e._v(" "),n("h3",{attrs:{id:"additional-benefits-of-this-api"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#additional-benefits-of-this-api"}},[e._v("#")]),e._v(" Additional benefits of this API")]),e._v(" "),n("h4",{attrs:{id:"no-more-confusing-mempool-cache"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#no-more-confusing-mempool-cache"}},[e._v("#")]),e._v(" No more confusing mempool cache")]),e._v(" "),n("p",[e._v("The current Tendermint mempool stores a "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/7723",target:"_blank",rel:"noopener noreferrer"}},[e._v("cache"),n("OutboundLink")],1),e._v(" of transaction\nhashes that should not be accepted into the mempool. When a transaction is sent\nto the mempool but is present in the cache the transaction is dropped without\never being sent to the application via "),n("code",[e._v("CheckTx")]),e._v(". This cache is intended to help\nthe application guard against receiving the same invalid transaction over and\nover. However, this means that presence or absence from the mempool cache\nbecomes a condition of validity for pending transactions.")]),e._v(" "),n("p",[e._v("Being placed in this cache has serious consequences for a proposed transaction,\nbut the rules for when a transaction should be placed in this cache are unclear.\nSo unclear in fact, that conditions for when to include a transaction in this\ncache have been completely reversed by different commits\n("),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/pull/233",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),n("OutboundLink")],1),e._v(","),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/2855",target:"_blank",rel:"noopener noreferrer"}},[e._v("2"),n("OutboundLink")],1),e._v(") on the Tendermint\nproject. Additional github issues have noted that it's very ambiguous as to\n"),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/7723",target:"_blank",rel:"noopener noreferrer"}},[e._v("when the cache should be cleared"),n("OutboundLink")],1),e._v(" and whether or not the\ncache should allow "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/458",target:"_blank",rel:"noopener noreferrer"}},[e._v("previously invalid transactions"),n("OutboundLink")],1),e._v(" to later\nbecome valid. There is no one-size-fits all solution to these problems.\nDifferent applications need very different behavior, so this should ultimately\nnot be the responsibility of Tendermint. Implementing the "),n("code",[e._v("GossipList")]),e._v(" clears\nTendermint of this responsibility.")]),e._v(" "),n("h4",{attrs:{id:"improved-guarantees-about-the-set-of-transactions-being-gossiped"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#improved-guarantees-about-the-set-of-transactions-being-gossiped"}},[e._v("#")]),e._v(" Improved guarantees about the set of transactions being gossiped")]),e._v(" "),n("p",[e._v("As discussed in the "),n("a",{attrs:{href:"#mock-api-of-the-gossiplist"}},[e._v("Mock API")]),e._v(" section, the\n"),n("code",[e._v("GossipList")]),e._v(" only adds and removes or replaces transactions in the "),n("code",[e._v("GossipList")]),e._v("\nwhen the application says to. Under this design, the contents of this list are\nnever ambiguous. The list contains exactly what the application most recently\ntold Tendermint to gossip, nothing more nothing less.")]),e._v(" "),n("h3",{attrs:{id:"additional-considerations"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#additional-considerations"}},[e._v("#")]),e._v(" Additional considerations")]),e._v(" "),n("p",[e._v("This document leaves a few aspects unconsidered that should be understood before\nfuture designs are made in this area:")]),e._v(" "),n("ol",[n("li",[e._v("Impact of duplicating transactions in both the "),n("code",[e._v("GossipList")]),e._v(" and within the\napplication.")]),e._v(" "),n("li",[e._v("Transition plan and feasibility of migrating applications to the new API.")])]),e._v(" "),n("h2",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")])],1)}),[],!1,null,null,null);t.default=s.exports}}]);