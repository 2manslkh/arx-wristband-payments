import { ethers } from 'hardhat';

/**
 * This script migrates all ETH from the sender's account to the specified destination address.
 * $ npx hardhat run --network mainnet scripts/migrate-account.ts
 */
async function main() {

    const [sender] = await ethers.getSigners();
    const DESTINATION_ADDRESS = "0x6860542E55Fb9292e4c8b478FcEec724d3351C2e";

    // Fetch the balance of the sender's account
    const balance = await sender.provider.getBalance(sender.address);
    console.log("🚀 | main | balance:", balance)

    // Estimate gas price
    const gasPrice = (await sender.provider.getFeeData()).gasPrice;
    console.log("🚀 | main | gasPrice:", gasPrice)

    if (!gasPrice) {
        throw new Error('Unable to estimate gas price');
    }

    // Estimate gas limit - you might adjust this based on the network status
    const gasLimit = 21000n; // Standard gas limit for ETH transfer

    // Calculate the gas cost
    const gasCost = gasPrice * gasLimit;

    // Calculate the amount to transfer (balance - gasCost)
    const amountToSend = balance - gasCost;

    // Ensure the balance is sufficient to cover gas
    if (amountToSend <= 0) {
        throw new Error('Insufficient balance to cover gas cost');
    }

    // Create the transaction
    const tx = {
        to: DESTINATION_ADDRESS,
        value: amountToSend,
        gasPrice: gasPrice,
        gasLimit: gasLimit
    };

    // Send the transaction
    const transaction = await sender.sendTransaction(tx);
    await transaction.wait();

    // XX ETH transferred to AAA console log + tx hash
    console.log(`${ethers.formatEther(amountToSend)} ETH transferred to ${DESTINATION_ADDRESS} tx:${transaction.hash}`);

    const abalance = await sender.provider.getBalance(sender.address);
    console.log("🚀 | main | balance:", abalance)

}

main()
    .then(() => console.log('Transfer complete'))
    .catch(err => console.error(err));
