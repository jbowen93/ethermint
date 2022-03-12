pragma solidity >=0.4.24 <0.9.0;


contract EthSender {
    function sendEth(address payable to) external payable {
        to.transfer(msg.value);
    }
}
