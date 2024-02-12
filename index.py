class MempoolTransaction():
    def __init__(self, txid, fee, weight, parents):
        self.txid = txid
        self.fee = int(fee)
        self.weight = int(weight)
        self.parents = parents.split(';') if parents else []

def parse_mempool_csv(file_path='mempool.csv'):
    with open(file_path) as f:
        return [MempoolTransaction(*line.strip().split(',')) for line in f.readlines()]

def select_transactions(transactions, max_block_weight=4000000):
    selected_txids = set()
    total_weight = 0

    for transaction in transactions:
        if total_weight + transaction.weight <= max_block_weight and not any(parent_txid not in selected_txids for parent_txid in transaction.parents):
            selected_txids.add(transaction.txid)
            total_weight += transaction.weight

    return selected_txids

def order_transactions(transactions, selected_txids):
    # Preserve the order of appearance in the original CSV file
    ordered_txids = [tx.txid for tx in transactions if tx.txid in selected_txids]
    return ordered_txids

def main():
    transactions = parse_mempool_csv()
    selected_txids = select_transactions(transactions)
    ordered_txids = order_transactions(transactions, selected_txids)

    for txid in ordered_txids:
        print(txid)

if __name__ == "__main__":
    main()
