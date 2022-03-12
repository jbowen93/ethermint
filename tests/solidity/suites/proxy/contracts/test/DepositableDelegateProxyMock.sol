pragma solidity >=0.4.24 <0.9.0;


import "../DepositableDelegateProxy.sol";


contract DepositableDelegateProxyMock is DepositableDelegateProxy {
    address private implementationMock;

    function enableDepositsOnMock() external {
        setDepositable(true);
    }

    function setImplementationOnMock(address _implementationMock) external {
        implementationMock = _implementationMock;
    }

    function implementation() override public view returns (address) {
        return implementationMock;
    }

    function proxyType() override public pure returns (uint256 proxyTypeId) {
        return UPGRADEABLE;
    }
}
