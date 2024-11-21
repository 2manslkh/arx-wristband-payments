// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {Token} from "../src/Token.sol";

contract TokenTest is Test {
    Token public token;
    address public owner;
    address public user;

    function setUp() public {
        owner = makeAddr("owner");
        user = makeAddr("user");

        vm.startPrank(owner);
        token = new Token("EasyPay Token", "EPT", 1_000_000);
        vm.stopPrank();
    }

    function test_InitialSupply() public {
        assertEq(token.totalSupply(), 1_000_000 * 10 ** token.decimals());
        assertEq(token.balanceOf(owner), 1_000_000 * 10 ** token.decimals());
    }

    function test_Faucet() public {
        vm.prank(user);
        token.faucet(user);
        assertEq(token.balanceOf(user), 100 * 10 ** token.decimals());
    }

    function test_Mint() public {
        vm.prank(owner);
        token.mint(user, 500 * 10 ** token.decimals());
        assertEq(token.balanceOf(user), 500 * 10 ** token.decimals());
    }
}
