import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseModal from "../components/ExpenseModal";
import { simplifyDebts } from "../utils/simplifyDebts";

export default function GroupPage() {
  const { id } = useParams();

  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState({});
  const [memberName, setMemberName] = useState(""); // ✅ FIXED
  const [open, setOpen] = useState(false);

  // 🔄 Fetch all data
  const fetchAll = async () => {
    try {
      const [membersRes, expensesRes, balanceRes] = await Promise.all([
        API.get(`/members/${id}`),
        API.get(`/expenses/${id}`),
        API.get(`/expenses/balance/${id}`)
      ]);

      setMembers(membersRes.data);
      setExpenses(expensesRes.data);
      setBalance(balanceRes.data);

    } catch (err) {
      console.error(
        "Fetch Group Data Error:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ➕ Add Member
  const addMember = async () => {
    if (!memberName.trim()) return;

    try {
      await API.post("/members", {
        name: memberName,
        group_id: id
      });

      setMemberName("");
      fetchAll();

    } catch (err) {
      console.error(
        "Add Member Error:",
        err.response?.data || err.message
      );
    }
  };

  // ➕ Add Expense
  const addExpense = async (title, amount) => {
    try {
      await API.post("/expenses", {
        title,
        amount,
        group_id: id,
        member_ids: members.map((m) => m.id)
      });

      setOpen(false);
      fetchAll();

    } catch (err) {
      console.error(
        "Add Expense Error:",
        err.response?.data || err.message
      );
    }
  };

  // 💰 Simplify debts
  const membersMap = {};
  members.forEach((m) => (membersMap[m.id] = m.name));

  const debts = simplifyDebts(balance, membersMap);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container mx-auto py-8">

        {/* 👥 MEMBERS */}
        <h2 className="text-2xl font-bold mb-4">Members</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter member name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={addMember}
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded"
          >
            Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {members.length === 0 ? (
            <p className="text-gray-500">No members yet</p>
          ) : (
            members.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-bold">{member.name}</h3>
              </div>
            ))
          )}
        </div>

        {/* 💸 EXPENSES */}
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => setOpen(true)}
        >
          Add Expense
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses yet</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-bold">{expense.title}</h3>
                <p className="text-gray-600">Amount: ₹{expense.amount}</p>
              </div>
            ))
          )}
        </div>

        {/* 💰 BALANCES */}
        <h2 className="text-2xl font-bold mb-4">Balances</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {debts.length === 0 ? (
            <p className="text-gray-500">All settled 🎉</p>
          ) : (
            debts.map((d, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <p className="text-gray-700">
                  <span className="font-semibold">{d.from}</span> pays{" "}
                  <span className="text-red-500 font-bold">₹{d.amount}</span>{" "}
                  to <span className="font-semibold">{d.to}</span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <ExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={addExpense}
        members={members}
      />
    </div>
  );
}