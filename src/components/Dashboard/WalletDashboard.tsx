import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import TransactionTable from "./TransactionTable";
import LoadingSpinner from "../Shared/LoadingSpinner";

import FundWalletModal from "../modals/FundWalletModal";
import WithdrawWallet from "../modals/WithdrawWallet";
import { Copy, Wallet, Clock, School, ChevronDown } from "lucide-react";
import Navbar from "../Shared/Navbar";
import TransferModal from "../modals/TransferModal";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
  status: "approved" | "pending";
}

interface Props {
  darkMode: boolean;
}

const WalletDashboard: React.FC<Props> = ({ darkMode }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const pendingAmount = 0;
  const bankInfo = "Wema Bank 010 210 2020";

  const user = localStorage.getItem("name");
  console.log(user);
  const email = localStorage.getItem("email");

  // Memoize fetchBalance with useCallback
  const fetchBalance = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/wallet/${email}/balance`);
      setBalance(data.balance);
    } catch (err) {
      setError("Failed to fetch balance.");
    }
  }, [email]);

  // Memoize fetchTransactions with useCallback
  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/wallet/${email}/transactions`);

      // Convert the API response to match the Transaction interface
      const formattedTransactions = data.transactions.map((tx: any) => ({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        timestamp: tx.timestamp,
        description: tx.description,
        balance: tx.balance,
        receiver: tx.receiver,
      }));

      setTransactions(formattedTransactions);
    } catch (err) {
      setError("Failed to fetch transactions.");
    }
  }, [email]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchBalance(), fetchTransactions()]);
      } catch (error) {
        setError("Failed to load dashboard data");
      }
      setLoading(false);
    };

    if (email) {
      loadData();
    } else {
      setError("No email found - please login");
      setLoading(false);
    }
  }, [email, fetchBalance, fetchTransactions]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col">
      <Navbar user={user} darkMode={darkMode} />
      <h2 className="text-3xl mx-12 py-8 border-b-2 font-bold">Wallet</h2>
      <div
        className={`p-12 flex w-full ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className=" w-1/3 text-xs">
          {error && <p className="error">{error}</p>}
          <div className=" bg-[#F8F8F6]">
            {/* Actual Balance */}
            <div className=" px-6 ">
              <div className="flex justify-between py-6 text-gray-600 items-center ">
                <span>Actual Balance</span>
                <Wallet size={16} />
              </div>
              <h2 className="text-3xl text-black py-6 border-y-[1px] m-0 leading-none font-bold">
                ₦{balance}
                <span className="text-gray-600 text-2xl">.00</span>
              </h2>
            </div>

            {/* Bank Info */}
            <div className="p-6">
              <div className="flex justify-between text-gray-700 items-center">
                <div className="flex items-center gap-2 ">
                  <School size={16} />
                  <span>{bankInfo}</span>
                </div>
                <button>
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Pending Amount */}
            <div className="border-t border-dashed p-6 text-gray-600">
              <div className="flex justify-between border-b pb-6 items-center">
                <span>Pending Amount</span>
                <Clock size={16} />
              </div>
              <h2 className="text-xl font-bold py-6 text-black">
                ₦{pendingAmount}
                <span className="text-gray-600 text-lg">.00</span>
              </h2>
            </div>

            {/* Action Buttons */}
          </div>
          <div className="grid mt-2 grid-cols-2 gap-3 ">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 bg-[#F9D900] hover:bg-yellow-500 font-semibold rounded"
            >
              Add Funds
            </button>
            {showModal && <FundWalletModal setShowModal={setShowModal} />}

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="w-full py-2 border border-gray-300 font-semibold rounded hover:bg-gray-500"
            >
              Withdrawal
            </button>
            {showWithdrawModal && (
              <WithdrawWallet setShowModal={setShowWithdrawModal} />
            )}
          </div>

          <div>
            <button onClick={() => setShowTransferModal(true)}>Transfer</button>
            {showTransferModal && (
              <TransferModal setShowModal={setShowTransferModal} />
            )}
          </div>

          {/* Other Buttons (Inactive) */}
          <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
            <button className="w-full py-1 px-0 border border-gray-300 text-gray-600 font-medium rounded cursor-not-allowed">
              PND Amount
            </button>
            <button className="w-full py-1 border border-gray-300 text-gray-600 font-medium rounded cursor-not-allowed">
              Place Lien
            </button>
            <button className="w-full py-2 px-1 border border-gray-300 text-gray-600 font-medium rounded cursor-not-allowed">
              Freeze Wallet
            </button>
          </div>
        </div>
        <div className="transactions w-2/3 border-l ml-6 pl-6">
          <h3 className="font-bold text-xl">Transaction History</h3>
          <div className="flex justify-between my-6">
            <div className="flex text-xs space-x-2">
              <div className="py-[6px] px-4 rounded-md border text-gray-500">
                3 years
              </div>
              <div className="py-[6px] px-4 rounded-md border text-gray-500">
                Approved
              </div>
              <div className="py-[6px] px-4 rounded-md border text-gray-500">
                Pending
              </div>
              <div className="py-[6px] px-4 rounded-md border border-black">
                History
              </div>
            </div>
            <div className="text-xs gap-x-2 flex text-gray-500">
              <span className="my-auto">Filter by</span>

              <div className="py-[6px] px-4 rounded-md border gap-x-4 flex ">
                Spot <ChevronDown className="text-black" size={14} />
              </div>
            </div>
          </div>
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
