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

export default function Home() {
  const { createOrder, trackOrder, transferNFT, deliverOrder } =
    useContext(TransactionContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [merchantAddress, setMerchantAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState([]);

  const merchantInputHandler = (e) => {
    setMerchantAddress(e.target.value);
  };

  const amountInputHandler = (e) => {
    setAmount(e.target.value);
  };

  const orderInputHandler = (e) => {
    setOrderId(e.target.value);
  };

  const handleTrackOrder = async () => {
    const order = await trackOrder(orderId);
    setOrder(order);
    onOpen();
  };

  return (
    <div className="flex flex-col items-center justify-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-black">
          {(onClose) => (
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
                <p className=" font-bold">Current Owner: {order?.tokenOwner}</p>
                <p className=" font-bold">
                  Amout in Tokens: {ethers.utils.formatEther(order?.amount)}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
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
          onClick={() => createOrder(merchantAddress, amount)}
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
        <Button size="large" onClick={handleTrackOrder}>
          Track
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <p className="text-2xl font-bold">Transfer NFT Function</p>
        <Input
          placeholder="Enter recipient address"
          value={merchantAddress}
          onChange={merchantInputHandler}
        />
        <Button size="large" onClick={() => transferNFT(merchantAddress)}>
          Transfer
        </Button>
      </div>
    </div>
  );
}
