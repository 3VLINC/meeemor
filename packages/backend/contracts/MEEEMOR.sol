//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract MEEME is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address private poapAddress;
    uint256 private duration;
    uint256 private bountyAmount;
    uint256 private winnerTokenId;

    uint256 private startTime;
    bool private timerStarted;
    uint256 private endTime;

    address[] private voteWinners;
    mapping(address => bool) _eligible;
    uint256 private voteAward;

    event TimerStarted(uint256 startTime);
    event TimerEnded(uint256 endTime);
    event BountyAwarded(address winner, uint256 amount);

    mapping(uint256 => uint256) private _tokenVotes;
    mapping(uint256 => address) private _creators;
    mapping(uint256 => address[]) private _voters;

    mapping(address => bool) public _voted;
    // mapping(address => mapping(uint256=>bool)) public votes;

    event MemeCreated(address indexed addr, uint256 tokenId);

    constructor(address _poapAddr) payable ERC721('MEEEMOR', 'MMR') {
        require(
            msg.value >= 1 ether,
            'Bounty amount must be greater than 1 EH'
        );
        poapAddress = _poapAddr;
        bountyAmount = msg.value;
    }

    function startTimer(uint256 _duration) external {
        require(!timerStarted, 'Timer already started');

        startTime = block.timestamp;
        endTime = startTime + _duration;
        timerStarted = true;

        emit TimerStarted(startTime);
    }

    function getRemainingTime() public view returns (uint256) {
        uint256 currentTime = block.timestamp;
        if (currentTime >= endTime) {
            return 0;
        } else {
            return endTime - currentTime;
        }
    }

    function endBounty() external onlyOwner {
        require(timerStarted, 'Timer not started');
        require(block.timestamp >= endTime, 'Timer not ended');

        timerStarted = false;

        emit TimerEnded(endTime);

        uint256 awardAmount = (bountyAmount * 50) / 100;
        uint256 tokenIndex = findLargestIndex();

        address winner = _creators[tokenIndex];
        voteWinners = _voters[tokenIndex];

        payable(winner).transfer(awardAmount);

        bountyAmount -= awardAmount;
        emit BountyAwarded(winner, awardAmount);

        voteAward = (bountyAmount * 95) / 100;

        for (uint256 i = 0; i < voteWinners.length; i++) {
            _eligible[voteWinners[i]] = true;
        }
    }

    function getBountyAmount() external view returns (uint256) {
        return bountyAmount;
    }

    function getPoapContract() public view virtual returns (address) {
        return poapAddress;
    }

    function createMeme(string memory uri) public returns (uint256) {
        require(checkEligibility(msg.sender), 'Mint your POAP token first');
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function checkEligibility(address _to)
        internal
        view
        returns (bool isEligible)
    {
        require(_to != address(0), 'Cannot be zero address');

        IERC721 token = IERC721(poapAddress);
        uint256 tokenBalance = token.balanceOf(_to);
        if (tokenBalance == 1) {
            isEligible = true;
        }

        return isEligible;
    }

    function vote(uint256 tokenId) public {
        require(_exists(tokenId), 'Token does not exist');
        require(!_voted[msg.sender], 'Account has voted');

        _voted[msg.sender] = true;
        _tokenVotes[tokenId] += 1;

        _voters[tokenId].push(msg.sender);
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

    function voterClaim() public {
        require(_eligible[msg.sender], 'Account is not eligible');
        require(bountyAmount > 0, 'No bounty remains');
        payable(msg.sender).transfer(voteAward);
        bountyAmount -= voteAward;
    }

    function getTokenVotes(uint256 tokenId) public view returns (uint256) {
        return _tokenVotes[tokenId];
    }

    function getVoteAddress(uint256 tokenId)
        public
        view
        returns (address[] memory)
    {
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

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
