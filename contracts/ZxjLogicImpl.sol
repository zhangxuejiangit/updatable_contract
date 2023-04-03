// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract ZxjLogicImpl {
    // redefine, to new logic contract
    // uint256 public constant VERSION = 1;
    uint256 public constant VERSION = 100;

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

    function getValue() public view returns (uint256){
        return zxjValue;
    }
}
