import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("75kDE5KJwLeUdAHfBTwgVrwu89cknp7GDLiQfk9gBF7t");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, new PublicKey("127rLjEo5GtfczDVzqAW5exWJfsCFH7qXgJcCsjTPvs5"))
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA

        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, BigInt(100) * token_decimals)
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
