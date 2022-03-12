pragma solidity >=0.4.16 <0.9.0;


abstract contract ERCProxy {
    uint256 internal constant FORWARDING = 1;
    uint256 internal constant UPGRADEABLE = 2;

    function proxyType() virtual public pure returns (uint256 proxyTypeId);
    function implementation() virtual public view returns (address codeAddr);
}
