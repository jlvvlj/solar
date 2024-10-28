import { Keypair } from '@solana/web3.js';
import { airdropIfRequired, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { SystemProgram, Transaction, Connection, sendAndConfirmTransaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import "dotenv/config";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const lamports =  LAMPORTS_PER_SOL * 0.001;
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const fromPubkey = new PublicKey(senderKeypair.publicKey);
const toPubkey = new PublicKey("8enwaqMTwrhYas3VsTtkMxpRj2ebqbsi25arvLsUucZT")

const balance = await connection.getBalance(senderKeypair.publicKey);

console.log(`The balance of the account at ${senderKeypair.publicKey} is ${balance / 1000000000} SOL`);

await airdropIfRequired(
    connection,
    fromPubkey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
    fromPubkey,
    toPubkey,
    lamports
});

transaction.add(transferInstruction);

sendAndConfirmTransaction(connection, transaction, [senderKeypair])
    .then((signature) => { console.log(`Transaction sent with signature: ${signature}`) })
    .catch((err) => { console.error(err) })


