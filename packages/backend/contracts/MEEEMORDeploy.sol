//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Meeemor.sol';
import './Poap.sol';

contract MeeemorDeploy is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public eventCounter;

    struct PoapEvent {
        address addr;
        uint256 eventId;
        string name;
        uint256 bounty;
    }

    Poap public poap;

    mapping(uint256 => Meeemor) public events;

    event EventCreated(uint256 eventId, string name, uint256 bounty);

    event AttendeeVoted(address indexed addr, uint256 eventId, uint256 tokenId);

    constructor() Ownable() {
        poap = new Poap();
    }

    function initialize(string calldata name) external payable {
        uint256 eventId = eventCounter.current();
        eventCounter.increment();
        events[eventId] = new Meeemor{value: msg.value}(address(poap));
        poap.mintToken(eventId, msg.sender);
        emit EventCreated(eventId, name, msg.value);
    }
}
