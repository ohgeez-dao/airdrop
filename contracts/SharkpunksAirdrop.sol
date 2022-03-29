// SPDX-License-Identifier: UNLICENSED

pragma solidity =0.8.3;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@shoyunft/contracts/contracts/interfaces/INFT721.sol";

contract SharkpunksAirdrop {
    address public immutable sharkpunks;
    address public immutable signer;
    uint64 public immutable deadline;
    uint256 internal _tokenId;
    mapping(bytes32 => mapping(bytes32 => bool)) _minted;

    event Claim(bytes32 indexed id, bytes32 indexed memo, address indexed to, uint256 tokenId);

    constructor(
        address _sharkpunks,
        address _signer,
        uint64 _deadline,
        uint256 fromTokenId
    ) {
        sharkpunks = _sharkpunks;
        signer = _signer;
        deadline = _deadline;
        _tokenId = fromTokenId;
    }

    function mintMultiple(address[] calldata recipients) external {
        require(msg.sender == signer, "LEVX: FORIBDDEN");

        for (uint256 i; i < recipients.length; i++) {
            INFT721(sharkpunks).mint(recipients[i], _tokenId++, "");
        }
    }

    function claim(
        bytes32 id,
        bytes32 memo,
        address to,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        uint64 _now = uint64(block.timestamp);
        require(_now < deadline, "LEVX: EXPIRED");
        require(!_minted[id][memo], "LEVX: MINTED");

        bytes32 message = keccak256(abi.encodePacked(id, memo));
        require(ECDSA.recover(ECDSA.toEthSignedMessageHash(message), v, r, s) == signer, "LEVX: UNAUTHORIZED");

        _minted[id][memo] = true;

        uint256 tokenId = _tokenId++;
        emit Claim(id, memo, to, tokenId);
        INFT721(sharkpunks).mint(to, tokenId, data);
    }
}
