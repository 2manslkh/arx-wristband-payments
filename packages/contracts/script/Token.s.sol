// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";

contract TokenScript is Script {
    function run() external returns (Token) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Token token = new Token(
            "Zubit", // name
            "ZBT", // symbol
            1_000_000 // initial supply (1 million)
        );

        vm.stopBroadcast();
        return token;
    }
}
