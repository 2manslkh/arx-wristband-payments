// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";
import {Counter} from "../src/Counter.sol";

contract DeployCounter is BaseScript {
    function run() public returns (Counter) {
        // Begin recording transactions for deployment
        vm.startBroadcast();

        // Deploy the Counter contract
        Counter counter = new Counter();

        // Stop recording
        vm.stopBroadcast();

        // Return the deployed contract
        return counter;
    }
}
