(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{721:function(e,t,o){"use strict";o.r(t);var a=o(1),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"adr-054-crypto-encoding-part-2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adr-054-crypto-encoding-part-2"}},[e._v("#")]),e._v(" ADR 054: Crypto encoding (part 2)")]),e._v(" "),o("h2",{attrs:{id:"changelog"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),o("p",[e._v("2020-2-27: Created\n2020-4-16: Update")]),e._v(" "),o("h2",{attrs:{id:"context"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),o("p",[e._v("Amino has been a pain point of many users in the ecosystem. While Tendermint does not suffer greatly from the performance degradation introduced by amino, we are making an effort in moving the encoding format to a widely adopted format, "),o("a",{attrs:{href:"https://developers.google.com/protocol-buffers",target:"_blank",rel:"noopener noreferrer"}},[e._v("Protocol Buffers"),o("OutboundLink")],1),e._v(". With this migration a new standard is needed for the encoding of keys. This will cause ecosystem wide breaking changes.")]),e._v(" "),o("p",[e._v("Currently amino encodes keys as "),o("code",[e._v("<PrefixBytes> <Length> <ByteArray>")]),e._v(".")]),e._v(" "),o("h2",{attrs:{id:"decision"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),o("p",[e._v("Previously Tendermint defined all the key types for use in Tendermint and the Cosmos-SDK. Going forward the Cosmos-SDK will define its own protobuf type for keys. This will allow Tendermint to only define the keys that are being used in the codebase (ed25519).\nThere is the the opportunity to only define the usage of ed25519 ("),o("code",[e._v("bytes")]),e._v(") and not have it be a "),o("code",[e._v("oneof")]),e._v(", but this would mean that the "),o("code",[e._v("oneof")]),e._v(" work is only being postponed to a later date. When using the "),o("code",[e._v("oneof")]),e._v(" protobuf type we will have to manually switch over the possible key types and then pass them to the interface which is needed.")]),e._v(" "),o("p",[e._v("The approach that will be taken to minimize headaches for users is one where all encoding of keys will shift to protobuf and where amino encoding is relied on, there will be custom marshal and unmarshal functions.")]),e._v(" "),o("p",[e._v("Protobuf messages:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"bWVzc2FnZSBQdWJLZXkgewogIG9uZW9mIGtleSB7CiAgICBieXRlcyBlZDI1NTE5ID0gMTsKICB9CgptZXNzYWdlIFByaXZLZXkgewogIG9uZW9mIHN1bSB7CiAgICBieXRlcyBlZDI1NTE5ID0gMTsKICB9Cn0K"}}),e._v(" "),o("blockquote",[o("p",[e._v("Note: The places where backwards compatibility is needed is still unclear.")])]),e._v(" "),o("p",[e._v("All modules currently do not rely on amino encoded bytes and keys are not amino encoded for genesis, therefore a hardfork upgrade is what will be needed to adopt these changes.")]),e._v(" "),o("p",[e._v("This work will be broken out into a few PRs, this work will be merged into a proto-breakage branch, all PRs will be reviewed prior to being merged:")]),e._v(" "),o("ol",[o("li",[e._v("Encoding of keys to protobuf and protobuf messages")]),e._v(" "),o("li",[e._v("Move Tendermint types to protobuf, mainly the ones that are being encoded.")]),e._v(" "),o("li",[e._v("Go one by one through the reactors and transition amino encoded messages to protobuf.")]),e._v(" "),o("li",[e._v("Test with cosmos-sdk and/or testnets repo.")])]),e._v(" "),o("h2",{attrs:{id:"status"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),o("p",[e._v("Implemented")]),e._v(" "),o("h2",{attrs:{id:"consequences"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),o("ul",[o("li",[e._v("Move keys to protobuf encoding, where backwards compatibility is needed, amino marshal and unmarshal functions will be used.")])]),e._v(" "),o("h3",{attrs:{id:"positive"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),o("ul",[o("li",[e._v("Protocol Buffer encoding will not change going forward.")]),e._v(" "),o("li",[e._v("Removing amino overhead from keys will help with the KSM.")]),e._v(" "),o("li",[e._v("Have a large ecosystem of supported languages.")])]),e._v(" "),o("h3",{attrs:{id:"negative"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),o("ul",[o("li",[e._v("Hardfork is required to integrate this into running chains.")])]),e._v(" "),o("h3",{attrs:{id:"neutral"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),o("h2",{attrs:{id:"references"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),o("blockquote",[o("p",[e._v("Are there any relevant PR comments, issues that led up to this, or articles referenced for why we made the given design choice? If so link them here!")])]),e._v(" "),o("ul",[o("li")])],1)}),[],!1,null,null,null);t.default=s.exports}}]);