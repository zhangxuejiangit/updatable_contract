// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract ZxjLogicImpl {
    uint256 public constant VERSION = 1;

    bool public initialized;

    uint256 public zxjValue;

    modifier initializer() {
        require(!initialized, "Only initialize once");
        _;
        initialized = true;
    }

    function initialize(uint256 _initValue) public initializer {
        zxjValue = _initValue;
    }

    function setValue(uint256 _newValue) public {
        zxjValue = _newValue + 15;
    }
}
