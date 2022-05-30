//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

// contract Greeter {
//     string private greeting;

//     constructor(string memory _greeting) {
//         console.log("Deploying a Greeter with greeting:", _greeting);
//         greeting = _greeting;
//     }

//     function greet() public view returns (string memory) {
//         return greeting;
//     }

//     function setGreeting(string memory _greeting) public {
//         console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
//         greeting = _greeting;
//     }
// }
contract MintExample is ERC721Enumerable, Ownable {
    mapping(address => uint256) balances;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol){}

    function mint(uint256 numberOfMints) public payable {
        uint256 supply = totalSupply();
        for (uint256 i; i < numberOfMints; i++) {            
            _safeMint(msg.sender, supply + i);
            balances[msg.sender]++;
        }        
    }
}