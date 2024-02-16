# Block Constructor

This Node.js script reads a CSV file containing transaction data from the mempool (memory pool), selects transactions for inclusion in a block based on specific criteria, and prints out the selected transactions.

## Usage

1. Clone the repository or download the code files.
2. Make sure you have Node.js installed on your system.
5. Run the script using `node index.js`.
6. The selected transactions will be printed to the console.

## Dependencies

- Node.js: This script is written in JavaScript and requires Node.js to run.
- `fs` module: This built-in Node.js module is used to read the CSV file.


## Functionality

- `readCSV(filePath)`: Reads the CSV file at the specified `filePath` and returns an array of arrays representing the CSV data.
- `selectTransactions(transactions)`: Selects transactions from the mempool based on certain criteria and returns an array of selected transaction IDs.
- `printTransactions(block)`: Prints the selected transactions to the console.

## Example

```bash
$ node index.js
