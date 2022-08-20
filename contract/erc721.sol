// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract mintNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BlockChainSYL", "SYL") {}

    struct TokenData{
        uint256 TokenId;
        string TokenURI;
        uint256 TokenPrice;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintNFT(address recipient, string memory _tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }


    // 판매 함수
    mapping(uint256 => uint256) public TokenPrices;
    uint256[] public onSaleTokenArray;
    function setForSaleToken(uint256 _tokenId, uint256 _pirce) public {
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Caller is not token owner");
        require(_pirce > 0 , "Price is zero or lower");
        require(TokenPrices[_tokenId] == 0 , "This token is already on sale");
        // require(isApprovedForAll(tokenOwner, address(this)), "Token owner didn't approve token");
        TokenPrices[_tokenId] = _pirce;
        onSaleTokenArray.push(_tokenId);
    }

    //판매 취소 함수
    function deleteSaleToken(uint256 _tokenId) public{
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Caller is not token owner");
        require(TokenPrices[_tokenId] != 0 , "This token isn't already on sale");
        // 판매중인 가격 0으로 변경
        TokenPrices[_tokenId] = 0;
        // 판매 리스트에서 제거
        for(uint256 i = 0; i < onSaleTokenArray.length; i++){
            if(TokenPrices[onSaleTokenArray[i]] == 0){
                onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
                onSaleTokenArray.pop();
            }
        }

    }
    // 일반 transfer -> transfer 후 판매중인 nft 였다면 초기화
    function transferToken(uint256 _tokenId, address _recipient) public{
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Caller is not token owner");
        _transfer(tokenOwner, _recipient, _tokenId);
        // 판매중이라면
        if(TokenPrices[_tokenId] != 0){
            TokenPrices[_tokenId] = 0;
            for(uint256 i = 0; i < onSaleTokenArray.length; i++){
                if(TokenPrices[onSaleTokenArray[i]] == 0){
                    onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
                    onSaleTokenArray.pop();
                }
            }
        }
    }

    // 구매 함수
    function purchaseToken(uint256 _tokenId) public payable{
        uint256 price = TokenPrices[_tokenId];
        address tokenOwner = ownerOf(_tokenId);
        
        require(price > 0, "Token not sale");
        require(price <= msg.value, "Caller snet lower than price");
        require(tokenOwner != msg.sender, "Caller is token owner");

        // approve error 해결
        // 토큰에 대한 권한을 상대방에게 부여해야됨.
        // 돈은 판매자에게
        payable(tokenOwner).transfer(msg.value);
        // nft는 상대방에게
        _transfer(tokenOwner, msg.sender, _tokenId);
        TokenPrices[_tokenId] = 0;

        for(uint256 i = 0; i < onSaleTokenArray.length; i++){
            if(TokenPrices[onSaleTokenArray[i]] == 0){
                onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
                onSaleTokenArray.pop();
            }
        }

    }
    // 프런트 상 작업용 길이
    function getOnSaleTokenArrayLength() view public returns(uint256){
        return onSaleTokenArray.length;
    }
    // 나의 nft 확인
    function getTokens(address recipient) view public returns (TokenData[] memory){
        uint256 balanceLength = balanceOf(recipient);
        require(balanceLength != 0, "Owner didn't have token");
        TokenData[] memory tokenData = new TokenData[](balanceLength); 
        for(uint256 i = 0; i < balanceLength; i++){
            uint256 TokenId = tokenOfOwnerByIndex(recipient, i);
            string memory TokenURI = tokenURI(TokenId);
            uint256 TokenPrice = TokenPrices[TokenId];
            tokenData[i] = TokenData(TokenId, TokenURI, TokenPrice);
        }
        return tokenData;
    }
    // 판매중인 nft 확인
    function getSaleTokens() view public returns (TokenData[] memory){
        uint256 saleLength = getOnSaleTokenArrayLength();
        TokenData[] memory tokenData = new TokenData[](saleLength); 
        for(uint256 i = 0; i < saleLength; i++){
            uint256 TokenId = onSaleTokenArray[i];
            string memory TokenURI = tokenURI(TokenId);
            uint256 TokenPrice = TokenPrices[TokenId];
            tokenData[i] = TokenData(TokenId, TokenURI, TokenPrice);
        }
        return tokenData;
    }


}