//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Meeemor.sol';

contract MeeemorDeploy {
    using Counters for Counters.Counter;

    Counters.Counter public eventCounter;

    mapping(uint256 => Meeemor) public events;

    event EventCreated(
        uint256 eventId,
        string name,
        uint256 bounty,
        address owner
    );

    event AttendeeVoted(address indexed addr, uint256 eventId, uint256 tokenId);

    constructor() {}

    function initialize(string calldata name) external payable {
        uint256 eventId = eventCounter.current();
        eventCounter.increment();
        events[eventId] = new Meeemor{value: msg.value}(msg.sender);
        emit EventCreated(eventId, name, msg.value, msg.sender);
    }
}
