'use client';
import { CONTRACT_ABI, NEW_CONTRACT_ADDRESS } from "./utils/constants";
import { ethers } from 'ethers';
import { AuthProvider } from "@arcana/auth"
import { createContext, useState, useEffect } from "react";
import { useAuth } from "@arcana/auth-react";

export const TransactionContext = createContext(null);

export function TransactionsProvider({ children }) {

    const ArcanaProvider = new AuthProvider('xar_test_b4e8ce56861ba32cbdf6402c772d3d8d2451d0a1');

    let provider, signer;

    const { loading, isLoggedIn, connect } = useAuth()

    async function initializeProviderAndSigner() {
        try {
            // Ensure Arcana provider is initialized
            await ArcanaProvider.init();

            const arcanaProvider = await ArcanaProvider.connect();

            provider = new ethers.providers.Web3Provider(arcanaProvider);
            signer = await provider.getSigner();

            console.log('Provider:', provider);
            console.log('Signer:', signer);
        } catch (error) {
            console.error('Error during provider and signer initialization:', error);
        }
    }

    useEffect(() => {
        initializeProviderAndSigner();
        console.log('Provider and Signer initialized');
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Arcana provider connected:', isLoggedIn);
    }, [isLoggedIn]);

    const contractAddress = NEW_CONTRACT_ADDRESS;
    const abi = CONTRACT_ABI;
    const tokenURI = 'https://gateway.pinata.cloud/ipfs/QmdweZsr5amukNQHVjehwM7iQ2euR6vFrY3s4HWCepN9Ro';

    async function createOrder(merchantAddress, amount) {
        try {

            // await ArcanaProvider.init();

            // const ArProvider = await ArcanaProvider.connect();

            // const Provider = new ethers.BrowserProvider(ArProvider);
            // const Signer = await Provider.getSigner();

            console.log('Provider:', provider);
            console.log('Signer:', signer);

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract instance created:', contract);

            // Define transaction overrides
            const overrides = {
                value: ethers.utils.parseEther(amount),
            };

            // Call the createOrder function
            const tx = await contract.createOrder(merchantAddress, overrides.value, tokenURI, overrides);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            console.log('Transaction successful:', receipt);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    async function createOrder(merchantAddress, amount) {
        try {
            // Ensure signer is available
            if (!signer) {
                console.error('Signer is not initialized');
                return;
            }

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract instance created:', contract);

            // Define transaction overrides
            const overrides = {
                value: ethers.utils.parseEther(amount),
            };

            // Call the createOrder function
            const tx = await contract.createOrder(merchantAddress, overrides.value, tokenURI, overrides);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            console.log('Transaction successful:', receipt);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    async function trackOrder(orderId) {
        try {
            // Ensure signer is available
            if (!signer) {
                console.error('Signer is not initialized');
                return;
            }

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract instance created:', contract);

            // Call the trackOrder function
            const result = await contract.trackOrder(orderId);

            console.log('Order tracked:', result);
            return result;
        } catch (error) {
            console.error('Error tracking order:', error);
        }
    }

    async function transferNFT(tokenId, toAddress) {
        try {
            // Ensure signer is available
            if (!signer) {
                console.error('Signer is not initialized');
                return;
            }

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract instance created:', contract);

            // Call the transferNFT function
            const tx = await contract.transferNFT(tokenId, toAddress);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            console.log('NFT transferred successfully:', receipt);
            return receipt; // Ensure to return something to indicate success
        } catch (error) {
            console.error('Error transferring NFT:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    }

    async function deliverOrder(orderId) {
        try {
            // Ensure signer is available
            if (!signer) {
                console.error('Signer is not initialized');
                return;
            }

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log('Contract instance created:', contract);

            // Call the deliverOrder function
            const tx = await contract.deliverOrder(orderId);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            console.log('Order delivered successfully:', receipt);
            return receipt; // Ensure to return something to indicate success
        } catch (error) {
            console.error('Error delivering order:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    }


    return (
        <TransactionContext.Provider value={{ createOrder, trackOrder, transferNFT, deliverOrder }}>
            {children}
        </TransactionContext.Provider>
    );
}