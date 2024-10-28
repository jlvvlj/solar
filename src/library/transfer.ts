import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { SystemProgram, Transaction, Connection, sendAndConfirmTransaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import "dotenv/config";

const transfer = async (amount: number, recipient: PublicKey) => {

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const transaction = new Transaction();

    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

    const transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(getKeypairFromEnvironment("SECRET_KEY").publicKey),
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL
    });

    transaction.add(transferInstruction);

    await sendAndConfirmTransaction(connection, transaction, [senderKeypair])
        .then((signature) => { console.log(`Transaction sent with signature: ${signature}`) })
        .catch((err) => { console.error(err) })
}

const amount =  0.001;
const recipient = new PublicKey("8enwaqMTwrhYas3VsTtkMxpRj2ebqbsi25arvLsUucZT")

transfer(amount, recipient)