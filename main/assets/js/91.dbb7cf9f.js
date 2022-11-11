(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{690:function(e,t,a){"use strict";a.r(t);var n=a(1),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-014-secp256k1-signature-malleability"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-014-secp256k1-signature-malleability"}},[e._v("#")]),e._v(" ADR 014: Secp256k1 Signature Malleability")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("Secp256k1 has two layers of malleability.\nThe signer has a random nonce, and thus can produce many different valid signatures.\nThis ADR is not concerned with that.\nThe second layer of malleability basically allows one who is given a signature\nto produce exactly one more valid signature for the same message from the same public key.\n(They don't even have to know the message!)\nThe math behind this will be explained in the subsequent section.")]),e._v(" "),a("p",[e._v("Note that in many downstream applications, signatures will appear in a transaction, and therefore in the tx hash.\nThis means that if someone broadcasts a transaction with secp256k1 signature, the signature can be altered into the other form by anyone in the p2p network.\nThus the tx hash will change, and this altered tx hash may be committed instead.\nThis breaks the assumption that you can broadcast a valid transaction and just wait for its hash to be included on chain.\nOne example is if you are broadcasting a tx in cosmos,\nand you wait for it to appear on chain before incrementing your sequence number.\nYou may never increment your sequence number if a different tx hash got committed.\nRemoving this second layer of signature malleability concerns could ease downstream development.")]),e._v(" "),a("h3",{attrs:{id:"ecdsa-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ecdsa-context"}},[e._v("#")]),e._v(" ECDSA context")]),e._v(" "),a("p",[e._v("Secp256k1 is ECDSA over a particular curve.\nThe signature is of the form "),a("code",[e._v("(r, s)")]),e._v(", where "),a("code",[e._v("s")]),e._v(" is a field element.\n(The particular field is the "),a("code",[e._v("Z_n")]),e._v(", where the elliptic curve has order "),a("code",[e._v("n")]),e._v(")\nHowever "),a("code",[e._v("(r, -s)")]),e._v(" is also another valid solution.\nNote that anyone can negate a group element, and therefore can get this second signature.")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[e._v("We can just distinguish a canonical form for the ECDSA signatures.\nThen we require that all ECDSA signatures be in the form which we defined as canonical.\nWe reject signatures in non-canonical form.")]),e._v(" "),a("p",[e._v("A canonical form is rather easy to define and check.\nIt would just be the smaller of the two values for "),a("code",[e._v("s")]),e._v(", defined lexicographically.\nThis is a simple check, instead of checking if "),a("code",[e._v("s < n")]),e._v(", instead check "),a("code",[e._v("s <= (n - 1)/2")]),e._v(".\nAn example of another cryptosystem using this\nis the parity definition here https://github.com/zkcrypto/pairing/pull/30#issuecomment-372910663.")]),e._v(" "),a("p",[e._v("This is the same solution Ethereum has chosen for solving secp malleability.")]),e._v(" "),a("h2",{attrs:{id:"proposed-implementation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#proposed-implementation"}},[e._v("#")]),e._v(" Proposed Implementation")]),e._v(" "),a("p",[e._v("Fork https://github.com/btcsuite/btcd, and just update the "),a("a",{attrs:{href:"https://github.com/btcsuite/btcd/blob/11fcd83963ab0ecd1b84b429b1efc1d2cdc6d5c5/btcec/signature.go#L195",target:"_blank",rel:"noopener noreferrer"}},[e._v("parse sig method"),a("OutboundLink")],1),e._v(" and serialize functions to enforce our canonical form.")]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Implemented")]),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[e._v("Lets us maintain the ability to expect a tx hash to appear in the blockchain.")])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("ul",[a("li",[e._v("More work in all future implementations (Though this is a very simple check)")]),e._v(" "),a("li",[e._v("Requires us to maintain another fork")])]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")])])}),[],!1,null,null,null);t.default=s.exports}}]);