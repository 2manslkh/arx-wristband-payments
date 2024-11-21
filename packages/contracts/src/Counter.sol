// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.21;

contract Counter {
    uint256 private count;

    // Event to emit when the counter changes
    event CounterChanged(uint256 newCount);

    // Initialize the counter to 0
    constructor() {
        count = 0;
    }

    /**
     * @dev Increment the counter by 1
     */
    function increment() public {
        count += 1;
        emit CounterChanged(count);
    }

    /**
     * @dev Decrement the counter by 1
     * @notice Will revert if count is 0
     */
    function decrement() public {
        require(count > 0, "Counter: cannot decrement below zero");
        count -= 1;
        emit CounterChanged(count);
    }

    /**
     * @dev Get the current count
     * @return The current count value
     */
    function getCount() public view returns (uint256) {
        return count;
    }
}
