// SPDX-License-Identifier: UNLICENSED

pragma solidity =0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@shoyunft/contracts/contracts/interfaces/INFT721.sol";

contract SharkpunksAirdrops is Ownable {
    address public immutable sharkpunks;
    mapping(bytes32 => Airdrop) public airdrops;
    mapping(bytes32 => mapping(bytes32 => bool)) _minted;
    uint256 internal _tokenId;

    struct Airdrop {
        address signer;
        uint32 deadline;
        uint32 max;
        uint32 minted;
    }

    event Add(bytes32 indexed slug, address signer, uint32 deadline, uint32 max);
    event Claim(bytes32 indexed slug, bytes32 indexed id, address indexed to, uint256 tokenId);

    constructor(address _sharkpunks, uint256 fromTokenId) {
        sharkpunks = _sharkpunks;
        _tokenId = fromTokenId;
    }

    function add(
        bytes32 slug,
        address signer,
        uint32 deadline,
        uint32 max
    ) external onlyOwner {
        Airdrop storage airdrop = airdrops[slug];
        require(airdrop.signer == address(0), "LEVX: ADDED");

        airdrop.signer = signer;
        airdrop.deadline = deadline;
        airdrop.max = max;

        emit Add(slug, signer, deadline, max);
    }

    function claim(
        bytes32 slug,
        bytes32 id,
        address to,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        Airdrop storage airdrop = airdrops[slug];
        address signer = airdrop.signer;

        require(signer != address(0), "LEVX: INVALID_SLUG");
        require(airdrop.max == 0 || airdrop.minted < airdrop.max, "LEVX: FINISHED");
        require(uint32(block.timestamp) < airdrop.deadline, "LEVX: EXPIRED");
        require(!_minted[slug][id], "LEVX: MINTED");

        bytes32 message = keccak256(abi.encodePacked(slug, id));
        require(ECDSA.recover(ECDSA.toEthSignedMessageHash(message), v, r, s) == signer, "LEVX: UNAUTHORIZED");

        airdrop.minted++;
        _minted[slug][id] = true;

        uint256 tokenId = _tokenId++;
        emit Claim(slug, id, to, tokenId);
        INFT721(sharkpunks).mint(to, tokenId, data);
    }
}
