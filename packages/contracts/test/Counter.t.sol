// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;
    event CounterChanged(uint256 newCount);

    function setUp() public {
        counter = new Counter();
    }

    function test_InitialCountIsZero() public view {
        assertEq(counter.getCount(), 0, "Initial count should be 0");
    }

    function test_Increment() public {
        // Test the increment function
        vm.expectEmit(true, false, false, true);
        emit CounterChanged(1);
        counter.increment();
        assertEq(counter.getCount(), 1, "Count should be 1 after increment");
    }

    function test_Decrement() public {
        // First increment to 1
        counter.increment();

        // Test the decrement function
        vm.expectEmit(true, false, false, true);
        emit CounterChanged(0);
        counter.decrement();
        assertEq(counter.getCount(), 0, "Count should be 0 after decrement");
    }

    function test_DecrementReverts() public {
        // Test that decrementing at 0 reverts
        vm.expectRevert("Counter: cannot decrement below zero");
        counter.decrement();
    }

    function test_MultipleIncrements() public {
        uint256 numIncrements = 5;

        for (uint256 i = 0; i < numIncrements; i++) {
            counter.increment();
        }

        assertEq(
            counter.getCount(),
            numIncrements,
            "Count should match number of increments"
        );
    }

    function testFuzz_IncrementDecrement(uint8 numOperations) public {
        uint256 expectedCount = 0;

        for (uint256 i = 0; i < numOperations; i++) {
            counter.increment();
            expectedCount++;
        }

        for (uint256 i = 0; i < numOperations; i++) {
            counter.decrement();
            expectedCount--;
        }

        assertEq(
            counter.getCount(),
            expectedCount,
            "Count should match expected value after operations"
        );
    }
}
