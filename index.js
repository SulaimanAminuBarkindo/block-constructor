const fs = require('fs');

function readCSV(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.trim().split('\n');
    return lines.map(line => line.split(','));
}

function selectTransactions(transactions) {
    const mempool = new Map();
    transactions.forEach(transaction => {
        const [txid, fee, weight, parent_txids] = transaction;
        mempool.set(txid, {
            fee: parseInt(fee),
            weight: parseInt(weight),
            parent_txids: parent_txids.split(';').filter(id => id !== '')
        });
    });

    const block = new Set(); // Using Set to store unique transactions
    let totalWeight = 0;

    function select(txid) {
        if (!mempool.has(txid) || block.has(txid)) return;

        const { fee, weight, parent_txids } = mempool.get(txid);

        if (totalWeight + weight > 4000000) return;

        parent_txids.forEach(parent => select(parent));

        block.add(txid); 
        totalWeight += weight;
    }

    transactions.forEach(transaction => {
        const [txid] = transaction;
        select(txid);
    });

    console.log(totalWeight)
    return Array.from(block);
}

function printTransactions(block) {
    block.forEach(txid => console.log(txid));
}

const transactions = readCSV('mempool.csv');
const block = selectTransactions(transactions);
printTransactions(block);