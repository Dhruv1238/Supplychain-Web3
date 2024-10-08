"use client";
import { Button } from "@nextui-org/button";
import { useAuth } from "@arcana/auth-react";
import { TransactionContext } from "./_components/Transactions";
import { useContext } from "react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { ethers } from "ethers";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

export default function Home() {
  const {
    createOrder,
    trackOrder,
    transferNFT,
    deliverOrder,
    setContractAddress,
    contractAddress,
  } = useContext(TransactionContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [merchantAddress, setMerchantAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [tokenId, setTokenId] = useState("");

  const merchantInputHandler = (e) => {
    setMerchantAddress(e.target.value);
  };

  const amountInputHandler = (e) => {
    setAmount(e.target.value);
  };

  const orderInputHandler = (e) => {
    setOrderId(e.target.value);
  };

  const recipientInputHandler = (e) => {
    setRecipient(e.target.value);
  };

  const tokenIdInputHandler = (e) => {
    setTokenId(e.target.value);
  };

  const handleTrackOrder = async () => {
    const order = await trackOrder(orderId);
    setOrder(order);
    onOpen();
  };

  function logTimestampAndExecute(handler) {
    return (event) => {
      console.log(`Button clicked at: ${new Date().toISOString()}`);
      if (handler) {
        handler(event);
      }
    };
  }

  return (
    <div className="flex flex-col items-center justify-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="font-bold text-2xl">
          Current Contract: 
        </p>
        <Dropdown className="bg-black">
          <DropdownTrigger>
            <Button variant="bordered">{contractAddress}</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className="bg-black">
            <DropdownItem
              key="ZkEvm"
              onClick={() =>
                setContractAddress("0xd587D8A253f8d2D5497f05C0343a4A9D816D6103")
              }
            >
              Cardona ZkEvm
            </DropdownItem>
            <DropdownItem
              key="Amoy Polygon"
              onClick={() =>
                setContractAddress("0x49650046f3c48e687F432153965Baee0497C45b3")
              }
            >
              Amoy TestNet
            </DropdownItem>
            <DropdownItem
              key="Sepolia "
              onClick={() =>
                setContractAddress("0xa0a180dc4094152f043567cee3d0cf24d4a0e370")
              }
            >
              Sepolia TestNet
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-black">
          {(onClose) =>
            order ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Order Details
                </ModalHeader>
                <ModalBody>
                  <p className=" font-bold">Merchant: {order?.merchant}</p>
                  <p className=" font-bold">Buyer: {order?.buyer}</p>
                  <p className=" font-bold">
                    Status: {order?.isCompleted ? "Completed" : "Pending"}
                  </p>
                  <p className=" font-bold">
                    Current Owner: {order?.tokenOwner}
                  </p>
                  <p className=" font-bold">
                    Amout in Tokens: {ethers.utils.formatEther(order?.amount)}{" "}
                    ETH/POL
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <ModalHeader className="flex flex-col gap-1">
                Order not found or Chain mismatch
              </ModalHeader>
            )
          }
        </ModalContent>
      </Modal>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="text-2xl font-bold">Create Order Function</p>
        <Input
          placeholder="Enter merchant address"
          value={merchantAddress}
          onChange={merchantInputHandler}
        />
        <Input
          placeholder="Enter amount"
          value={amount}
          onChange={amountInputHandler}
        />
        <Button
          size="large"
          onClick={logTimestampAndExecute(() => createOrder(merchantAddress, amount))}
        >
          Create
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="text-2xl font-bold">Track Order Function</p>
        <Input
          placeholder="Enter order ID"
          value={orderId}
          onChange={orderInputHandler}
          type="number"
        />
        <Button size="large" onClick={logTimestampAndExecute(handleTrackOrder)}>
          Track
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="text-2xl font-bold">Transfer NFT Function</p>
        <Input
          placeholder="Enter recipient address"
          value={recipient}
          onChange={recipientInputHandler}
        />
        <Input
          placeholder="Enter Token ID"
          value={tokenId}
          onChange={tokenIdInputHandler}
        />
        <Button size="large" onClick={logTimestampAndExecute(() => transferNFT(tokenId, recipient))}>
          Transfer
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="text-2xl font-bold">Deliver Order Function</p>
        <Input
          placeholder="Enter order ID"
          value={orderId}
          onChange={orderInputHandler}
          type="number"
        />
        <Button size="large" onClick={logTimestampAndExecute(() => deliverOrder(orderId))}>
          Deliver
        </Button>
      </div>
    </div>
  );
}
