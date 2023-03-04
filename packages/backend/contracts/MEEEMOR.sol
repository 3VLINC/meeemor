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

    struct TokenVote {
        uint256 tokenId;
        uint256 votes;
    }

    address public poapAddress;

    mapping(uint256 => TokenVote) private _tokenVotes;
    mapping(address => mapping(uint256 => bool)) private _voters;

    mapping(address => bool) public _voted;
    mapping(address => mapping(uint256 => bool)) public votes;

    event MintRequested(address indexed account, uint256 tokenId, bool voted);

    constructor(address addr) ERC721('MEEEMOR', 'MMR') {
        poapAddress = addr;
    }

    function getPoapContract() public view virtual returns (address) {
        return poapAddress;
    }

    function createMeme(string memory uri) public {
        require(checkEligibility(msg.sender), 'Mint your POAP token first');
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, uri);
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

        _voters[msg.sender][tokenId] = true;
        _tokenVotes[tokenId].votes += 1;
    }

    function getTokenVotes(uint256 tokenId) public view returns (uint256) {
        return _tokenVotes[tokenId].votes;
    }

    function getVoterVote(address voter, uint256 tokenId)
        public
        view
        returns (bool)
    {
        return _voters[voter][tokenId];
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
