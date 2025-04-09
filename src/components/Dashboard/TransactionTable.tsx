import React from 'react';

interface Transaction {
  id: number;
  amount: string;
  type: string;
  sender: string | null;
  receiver: string | null;
  timestamp: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount ($)</th>
          <th>Type</th>
          <th>Sender</th>
          <th>Receiver</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{new Date(tx.timestamp).toLocaleDateString()}</td>
              <td>{parseFloat(tx.amount).toFixed(2)}</td>
              <td>{tx.type}</td>
              <td>{tx.sender ?? 'N/A'}</td>
              <td>{tx.receiver ?? 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No transactions available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
