import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import TransactionTable from './TransactionTable';
import LoadingSpinner from '../Shared/LoadingSpinner';

interface Transaction {
  id: number;
  amount: string;
  type: string;
  sender: string | null;
  receiver: string | null;
  timestamp: string;
}

const WalletDashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchBalance = async () => {
    try {
      const { data } = await axiosInstance.get('/wallet/balance');
      // Assuming data.balance contains a number
      setBalance(data.balance);
    } catch (err) {
      setError('Failed to fetch balance.');
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axiosInstance.get('/wallet');
      // Assuming the API returns an array of transactions
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      setError('Failed to fetch transactions.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchBalance(), fetchTransactions()]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>Wallet Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <div className="balance">
        <h3>Current Balance: ${balance.toFixed(2)}</h3>
      </div>
      <div className="quick-actions">
        <Link to="/wallet/fund">
          <button>Fund Wallet</button>
        </Link>
        <Link to="/wallet/transfer">
          <button>Transfer</button>
        </Link>
      </div>
      <div className="transactions">
        <h3>Transaction History</h3>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default WalletDashboard;
