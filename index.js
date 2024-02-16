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

    // Sort transactions by fee in descending order
    const sortedTransactions = transactions.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));

    const block = [];
    let totalWeight = 0;

    function select(txid) {
        if (!mempool.has(txid)) return;

        const { fee, weight, parent_txids } = mempool.get(txid);

        if (totalWeight + weight > 4000000) return;

        parent_txids.forEach(parent => select(parent));

        if (!block.includes(txid)) {
            block.push(txid);
            totalWeight += weight;
        }
    }

    // Iterate over sorted transactions
    sortedTransactions.forEach(transaction => {
        const [txid] = transaction;
        select(txid);
    });

    console.log(totalWeight)
    return block;
}


function printTransactions(block) {
    block.forEach(txid => console.log(txid));
}

const transactions = readCSV('mempool.csv');
const block = selectTransactions(transactions);
printTransactions(block);