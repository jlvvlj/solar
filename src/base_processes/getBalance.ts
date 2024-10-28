import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import fs from 'fs';
import dotenv from 'dotenv';

const connection = new Connection(clusterApiUrl("devnet"));

const envConfig = dotenv.parse(fs.readFileSync('.env'));

const publickey = envConfig.PUBLIC_KEY;

const publickeyString = publickey.toString();

console.log(publickeyString)

const address = new PublicKey(publickey);
const balance = await connection.getBalance(address);

console.log(`The balance of the account at ${address} is ${balance/1000000000} SOL`);
console.log(`✅ Finished!`);