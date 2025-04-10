// components/TransactionTable.tsx
import React, { useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
  status: "approved" | "pending"; // Ensure status is required
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Sort transactions by timestamp descending
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  // Added safety check for status
  const getStatusDisplay = (status: string) => {
    const cleanStatus = (status || "approved").toLowerCase();
    return cleanStatus.charAt(0).toUpperCase() + cleanStatus.slice(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Transaction Type
            </th>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Amount (₦)
            </th>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-2 text-left text-[10px] font-bold  uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                TXN{transaction.id.substring(0, 5)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                {transaction.type}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                ₦
                {transaction.amount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                <div className="flex items-center">
                  <span
                    className={`inline-block h-2 w-2 bg-green-500 rounded-full mr-2
                    }`}
                  ></span>
                  {getStatusDisplay(transaction.status)}
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                {formatDate(transaction.timestamp)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border-[1px] my-auto rounded-md py-1  px-3"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Feature to view transactions is coming soon!</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-[#F9D900] hover:bg-yellow-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end items-center mt-4 px-6 py-3">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={`px-4 py-2 ${
            currentPage === 1 || totalPages === 0
              ? "bg-gray-200 border-gray-500"
              : "border-black hover:bg-gray-200"
          } rounded-l-lg`}
        >
          &lt;
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 ${
            currentPage === totalPages || totalPages === 0
              ? "border-gray-500"
              : "border-black hover:bg-gray-200"
          } rounded-r-lg`}
        >
          &gt;
        </button>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
