import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import TransactionTable from "./TransactionTable";
import LoadingSpinner from "../Shared/LoadingSpinner";

import FundWalletModal from "../modals/FundWalletModal";
import WithdrawWallet from "../modals/WithdrawWallet";
import { Copy, Wallet, Clock, School, ChevronDown } from "lucide-react";
import Navbar from "../Shared/Navbar";
import TransferModal from "../modals/TransferModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [, setStatus] = useState("");

  const navigate = useNavigate();

  const pendingAmount = 0;
  const bankInfo = "Wema Bank 010 210 2020";

  const [copied, setCopied] = useState(false);

  const copyBankNumber = () => {
    // Extract only numbers from the bank info
    const numbersOnly = bankInfo.replace(/\D/g, "");

    // Copy to clipboard
    navigator.clipboard
      .writeText(numbersOnly)
      .then(() => {
        setCopied(true);
        // Reset notification after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/user");
      setUser(data.name);
      setEmail(data.email);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatus(error.response.data?.message || "Login failed");
      } else {
        setStatus("Login failed");
      }
    }
  }, []);
  fetchUser();

  const fetchBalance = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/user/balance");
      setBalance(data.balance.balance);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatus(error.response.data?.message || "Login failed");
      } else {
        setStatus("Login failed");
      }
    }
  }, []);

  // Memoize fetchTransactions with useCallback
  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/transactions`, {});

      // Format the transactions to match your Transaction interface
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
  }, []);

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
      // setError("No email found - please login");
      setLoading(false);
    }
  }, [email, fetchBalance, fetchTransactions]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col">
      <Navbar user={user} darkMode={darkMode} />
      <h2 className="text-3xl mx-4 md:mx-12 py-6 md:py-8 border-t-2 md:border-t-0 border-b-2 font-bold">
        Wallet
      </h2>
      <div
        className={`p-4 md:p-12 flex flex-col md:flex-row w-screen lg:w-full ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {/* Wallet Balance Section - Full width on mobile, 1/3 width on desktop */}
        <div className="w-full md:w-1/3 text-xs mb-8 md:mb-0">
          {error && <p className="error">{error}</p>}
          <div className="bg-[#F8F8F6]">
            {/* Actual Balance */}
            <div className="px-6">
              <div className="flex justify-between py-6 text-gray-600 items-center">
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
                <div className="flex items-center gap-2">
                  <School size={16} />
                  <span>{bankInfo}</span>
                </div>
                <button
                  onClick={copyBankNumber}
                  className="relative"
                  aria-label="Copy bank number"
                >
                  <Copy
                    size={16}
                    className="hover:text-blue-500 transition-colors"
                  />

                  {/* Notification badge */}
                  {copied && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Toast notification alternative */}
              {copied && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                  Bank number copied to clipboard!
                </div>
              )}
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
          </div>

          {/* Action Buttons */}
          <div className="grid mt-2 grid-cols-2 gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 bg-[#F9D900] hover:bg-yellow-500 font-semibold rounded"
            >
              Add Funds
            </button>
            {showModal && <FundWalletModal setShowModal={setShowModal} />}

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="w-full py-2 border border-gray-300 font-semibold rounded hover:bg-gray-300"
            >
              Withdrawal
            </button>
            {showWithdrawModal && (
              <WithdrawWallet setShowModal={setShowWithdrawModal} />
            )}
          </div>

          <div className="mt-2">
            <button
              onClick={() => setShowTransferModal(true)}
              className="w-full py-2 border border-gray-300 font-semibold rounded hover:bg-gray-300"
            >
              Transfer
            </button>
            {showTransferModal && (
              <TransferModal setShowModal={setShowTransferModal} />
            )}
          </div>

          {/* Other Buttons (Inactive) */}
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
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

        {/* Transactions Section - Full width on mobile, 2/3 width on desktop */}
        <div className="w-full md:w-2/3 md:border-l md:ml-6 md:pl-6 mt-6 md:mt-0">
          <h3 className="font-bold text-xl">Transaction History</h3>
          <div className="flex flex-col md:flex-row md:justify-between my-6 space-y-4 md:space-y-0">
            <div className="flex text-xs space-x-2 overflow-x-auto pb-2 md:pb-0">
              <div className="py-[6px] px-4 rounded-md border text-gray-500 whitespace-nowrap">
                3 years
              </div>
              <div className="py-[6px] px-4 rounded-md border text-gray-500 whitespace-nowrap">
                Approved
              </div>
              <div className="py-[6px] px-4 rounded-md border text-gray-500 whitespace-nowrap">
                Pending
              </div>
              <div className="py-[6px] px-4 rounded-md border border-black whitespace-nowrap">
                History
              </div>
            </div>
            <div className="text-xs gap-x-2 flex text-gray-500">
              <span className="my-auto">Filter by</span>
              <div className="py-[6px] px-4 rounded-md border gap-x-4 flex">
                Spot <ChevronDown className="text-black" size={14} />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
