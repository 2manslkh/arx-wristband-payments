// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21 <0.9.0;

import { Script } from "forge-std/Script.sol";

import "forge-std/console.sol";

abstract contract BaseScript is Script {
  /// @dev Needed for the deterministic deployments.
  bytes32 internal constant ZERO_SALT = bytes32(0);

  /// @dev The address of the transaction broadcaster.
  address internal broadcaster;

  /// @dev Used to derive the broadcaster's address if $ETH_FROM is not defined.
  string internal mnemonic;

  /// @dev Initializes the transaction broadcaster like this:
  ///
  /// - If $ETH_FROM is defined, use it.
  /// - Otherwise, derive the broadcaster address from $MNEMONIC.
  /// - If $MNEMONIC is not defined, default to a test mnemonic.
  ///
  /// The use case for $ETH_FROM is to specify the broadcaster key and its address via the command line.
  constructor() {
    // Use Private key
    broadcaster = vm.rememberKey(vm.envUint("PRIVATE_KEY"));
  }

  modifier broadcast() {
    vm.startBroadcast(broadcaster);
    console.log("Broadcasting from: ");
    console.log(broadcaster);
    _;
    vm.stopBroadcast();
  }
}
