//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './MEEEMOR.sol';

contract MEEEMORDeploy is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _eventCounter;

    struct PoapEvent {
        address addr;
        uint256 eventId;
        string name;
        uint256 bounty;
    }

    address public poapAddress;

    mapping(uint256 => MEEME) private _events;

    event EventCreated(
        address indexed addr,
        uint256 eventId,
        string name,
        uint256 bounty
    );

    constructor(address addr) Ownable() {
        poapAddress = addr;
    }

    function initialize(
        uint256 eventId,
        string calldata name,
        uint256 bounty
    ) external {
        require(_eventCounter.current() == 0, 'Event already created');
        _eventCounter.increment();
        _events[_eventCounter.current()] = new MEEME(address(this));
        emit EventCreated(
            address(_events[_eventCounter.current()]),
            eventId,
            name,
            bounty
        );
    }
}
