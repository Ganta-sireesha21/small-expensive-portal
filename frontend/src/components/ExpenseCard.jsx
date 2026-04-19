import { useState } from "react";
export default function ExpenseCard({ expense, members, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
    const [paidBy, setPaidBy] = useState(expense.member_id);
    const handleUpdate = () => {
        onUpdate(expense.id, { title, amount: parseFloat(amount), paidBy });
        setEditing(false);
    };
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
        {editing ? (
            <>
                <input
                    className="border p-2 rounded w-full mb-2" placeholder="Title"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border p-2 rounded w-full mb-2" placeholder="Amount"
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-full mb-2" value={paidBy} onChange={(e) => setPaidBy(e.target.value)}
                >
                    <option>Select payer</option>   
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <div className="flex justify-end">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={() => setEditing(false)}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Save</button>
                </div>
            </>
        ) : (
            <>
                <h3 className="text-xl font-bold">{expense.title}</h3>      
                <p className="text-gray-600">Amount: ${expense.amount}</p>
                <p className="text-gray-600">Paid by: {members.find(m => m.id === expense.member_id)?.name || "Unknown"}</p>
                <div className="flex justify-end mt-2">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={() => setEditing(true)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(expense.id)}>Delete</button>
                </div>
            </>
        )}
    </div>
  );
}   
