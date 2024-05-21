// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBlast {
  // Note: the full interface for IBlast can be found below
  function configureClaimableGas() external;
  function claimAllGas(address contractAddress, address recipient) external returns (uint256);
}

contract Blast_ERC721 is ERC721, Ownable {
    uint256 private _nextTokenId;
    IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002);

    constructor()
        ERC721("MyToken", "MTK")
        Ownable(msg.sender)
    {
        BLAST.configureClaimableGas();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
    
    function claimMyContractsGas() external onlyOwner{
        BLAST.claimAllGas(address(this), msg.sender);
    }
}
