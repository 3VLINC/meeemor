//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './MEEEMOR.sol';
import './Poap.sol';

contract MEEEMORDeploy is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _eventCounter;

    struct PoapEvent {
        address addr;
        uint256 eventId;
        string name;
        uint256 bounty;
    }

    Poap public poap;

    mapping(uint256 => MEEME) private _events;

    event EventCreated(uint256 eventId, string name, uint256 bounty);

    event AttendeedVoted(
        address indexed addr,
        uint256 eventId,
        uint256 tokenId
    );

    constructor() Ownable() {
        poap = new Poap();
    }

    function initialize(string calldata name) external payable {
        uint256 eventId = _eventCounter.current();
        _eventCounter.increment();
        _events[eventId] = new MEEME{value: msg.value}(address(this));
        poap.mintToken(eventId, msg.sender);
        emit EventCreated(eventId, name, msg.value);
    }

    function vote(uint256 eventId, uint256 tokenId) external {
        _events[eventId].vote(tokenId);
        emit AttendeedVoted(msg.sender, eventId, tokenId);
    }
}
