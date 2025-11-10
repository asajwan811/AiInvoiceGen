import { use, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Loader2, DollarSign, Plus, FileText } from "lucide-react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AiInsightsCard from "../../components/AiInsightsCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalPaid: 0,
    totalUnpaid: 0,
  });
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.INVOICE.GET_ALL_INVOICES
        );
        const invoices = response.data;
        const totalInvoices = invoices.length;
        const totalPaid = invoices
          .filter((inv) => inv.status === "Paid")
          .reduce((sum, inv) => sum + inv.total, 0);
        const totalUnpaid = invoices
          .filter((inv) => inv.status !== "Paid")
          .reduce((sum, inv) => sum + inv.total, 0);

        setStats({
          totalInvoices,
          totalPaid,
          totalUnpaid,
        });

        setRecentInvoices(
          invoices
            .sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate))
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statsData = [
    {
      icon: FileText,
      label: "Total Invoices",
      value: stats.totalInvoices,
      color: "blue",
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: `${stats.totalPaid.toFixed(2)}`,
      color: "emerald",
    },
    {
      icon: DollarSign,
      label: "Total Unpaid",
      value: `${stats.totalUnpaid.toFixed(2)}`,
      color: "red",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-100", text: "text-blue-800" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-800" },
    red: { bg: "bg-red-100", text: "text-red-800" },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 ">
      <div>
        <h2 className="text-2xl font-semibold text-red-900 text-center">
          Dashboard
        </h2>
        <p className="text-xl font-normal text-red-900 text-center mt-1">
          A quick overview of your invoice statistics and recent activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-xl border border-slate-300 shadow-lg shadow-red-200 space-x-4`}
          >
            <div className="flex items-center">
              <div
                className={`flex-shrink-0 w-12 h-12 ${
                  colorClasses[stat.color].bg
                } rounded-lg flex items-center justify-center`}
              >
                <stat.icon
                  className={`h-6 w-6 ${colorClasses[stat.color].text}`}
                />
              </div>
              <div className="ml-4 min-w-0">
                <div className="text-md font-medium text-slate-500 truncate">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold break-words">
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*Ai insighgts card*/}
        <AiInsightsCard/>

      {/* Recent Invoices */}
<div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm shadow-red-100 overflow-hidden">
  <div className="px-4 py-4 sm:px-6 flex items-center justify-between border-b border-slate-200 bg-white">
    <h3 className="text-lg font-semibold text-red-900">Recent Invoices</h3>
    <Button
      variant="ghost"
      onClick={() => navigate("/invoices")}
    >
      View All
    </Button>
  </div>
  {recentInvoices.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-red-900 mb-2">No Invoices yet</h3>
      <p className="text-red-800 mb-6 max-w-md">
        You haven't created any invoices yet. Get started by creating your
        first invoice.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate("/invoices/new")}
        icon={Plus}
      >
        Create Invoice
      </Button>
    </div>
  ) : (
    <div className="w-[90vw] md:w-auto overflow-x-auto">
      <table className="w-full min-w-[600px] divide-y divide-slate-100">
        <thead className="bg-red-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-red-700 uppercase tracking-wider text-left">Client</th>
            <th className="px-6 py-3 text-xs font-medium text-red-700 uppercase tracking-wider text-left">Amount</th>
            <th className="px-6 py-3 text-xs font-medium text-red-700 uppercase tracking-wider text-left">Status</th>
            <th className="px-6 py-3 text-xs font-medium text-red-700 uppercase tracking-wider text-left">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-100">
          {recentInvoices.map((invoice) => (
            <tr
              key={invoice._id}
              className="hover:bg-red-50 cursor-pointer transition-colors duration-150"
              onClick={() => navigate(`/invoices/${invoice._id}`)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-red-900">{invoice.billTo.clientName}</div>
                <div className="text-sm text-red-600">#{invoice.invoiceNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">${invoice.total.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : invoice.status === "pending"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                {moment(invoice.dueDate).format("MM/DD/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
};

export default Dashboard;
