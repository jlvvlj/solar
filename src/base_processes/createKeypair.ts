import { Keypair } from "@solana/web3.js"
import dotenv from 'dotenv';
import fs from 'fs';

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);


//get the number of keys in the "keypairs" object in the keypairs-history.json file
import keys from '../keypairs-history.json' assert { type: "json" };

//write a function to get all the lines in the file .env
const getAllLines = (file: string) => {
    return file.split('\n');
}

//get all the lines in the .env file
const lines = getAllLines(fs.readFileSync('.env').toString());

//write an async function to save the secret key and the public key in the .env file and then await to save the keypairs in the keypairs-history.json file
const saveKeystoEnv = async () => {
    fs.appendFileSync('.env', `SECRET_KEY=[${keypair.secretKey}]\n`);
    fs.appendFileSync('.env', `PUBLIC_KEY="${keypair.publicKey.toBase58()}"\n`);
}

const deleteKeys = async () => {
    fs.writeFileSync('.env', '');
}

const keypairCount = Object.keys(keys).length;

console.log(`The number of keypairs is: ${keypairCount}`);

const getKeypairsFromEnv = async () => {
    const keypairsjson = {
        ...keys,
        [`keypair_${keypairCount + 1}`]: {
            secret_key: fs.readFileSync('.env').toString().split('\n')[(0)],
            public_key: fs.readFileSync('.env').toString().split('\n')[(1)]
        }
    }
    return keypairsjson;
}

const saveKeys = async () => {
    getKeypairsFromEnv()
        // .then((result) => { console.log(result) })
        .then((result) => { fs.writeFileSync('keypairs-history.json', JSON.stringify(result, null, 2)) })

        .then(() => deleteKeys())
        .then(() => saveKeystoEnv())
}

const saveKeypairs = async () => {
    getKeypairsFromEnv()
        .then((result) => { fs.writeFileSync('keypairs-history.json', JSON.stringify(result, null, 2)) })
        .then(() => deleteKeys())
        .then(() => saveKeystoEnv())
}

saveKeys().then(() => console.log('Keys saved successfully!'));










