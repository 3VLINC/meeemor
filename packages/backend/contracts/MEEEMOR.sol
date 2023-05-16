//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Meeemor is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    IERC721Receiver
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 private duration;
    uint256 private bountyAmount;
    uint256 private winnerTokenId;

    uint256 private startTime;
    bool private timerStarted;
    uint256 private endTime;
    address private owner;

    event BountyStarted(uint256 startTime);
    event BountyEnded(uint256 endTime);
    event BountyAwarded(address winner, uint256 amount);
    event MemeCreated(address indexed addr, uint256 tokenId);
    event Voted(address indexed addr, uint256 tokenId);

    mapping(uint256 => uint256) private _tokenVotes;
    mapping(uint256 => address) private _creators;
    mapping(uint256 => address[]) private _voters;

    mapping(address => bool) public _voted;

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    modifier checkEligibility(address _to) {
        require(_to != address(0), 'Cannot be zero address');
        _;
    }

    function _checkOwner() internal view virtual {
        require(owner == msg.sender, 'Ownable: caller is not the owner');
    }

    constructor(address _owner) payable ERC721('MEEEMOR', 'MMR') {
        bountyAmount = msg.value;
        owner = _owner;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function begin(uint256 _duration) external onlyOwner {
        require(!timerStarted, 'Timer already started');

        startTime = block.timestamp;
        endTime = startTime + _duration;
        timerStarted = true;

        emit BountyStarted(startTime);
    }

    function end() external onlyOwner {
        require(timerStarted, 'Timer not started');
        require(block.timestamp >= endTime, 'Timer not ended');

        timerStarted = false;

        emit BountyEnded(endTime);

        uint256 tokenIndex = findLargestIndex();

        address winner = _creators[tokenIndex];

        payable(winner).transfer(bountyAmount);

        emit BountyAwarded(winner, bountyAmount);
    }

    function getRemainingTime() public view returns (uint256) {
        uint256 currentTime = block.timestamp;
        if (currentTime >= endTime) {
            return 0;
        } else {
            return endTime - currentTime;
        }
    }

    function createMeme(string memory uri) public checkEligibility(msg.sender) {
        uint256 tokenId = _tokenIdCounter.current();
        _creators[tokenId] = msg.sender;
        _tokenIdCounter.increment();
        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, uri);

        emit MemeCreated(address(this), tokenId);
    }

    function vote(uint256 tokenId) public {
        require(_exists(tokenId), 'Token does not exist');
        require(!_voted[msg.sender], 'Account has voted');

        _voted[msg.sender] = true;
        _tokenVotes[tokenId] += 1;

        _voters[tokenId].push(msg.sender);
        emit Voted(msg.sender, tokenId);
    }

    function findLargestIndex() public view returns (uint256) {
        uint256 largestIndex = 0;
        uint256 largestNumber = _tokenVotes[0];

        uint256 tokenId = _tokenIdCounter.current();

        for (uint256 i = 1; i < tokenId; i++) {
            if (_tokenVotes[i] > largestNumber) {
                largestNumber = _tokenVotes[i];
                largestIndex = i;
            }
        }

        return largestIndex;
    }

    function getTokenVotes(uint256 tokenId) public view returns (uint256) {
        return _tokenVotes[tokenId];
    }

    function getVoteAddress(
        uint256 tokenId
    ) public view returns (address[] memory) {
        return _voters[tokenId];
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
