import { useState } from "react";
export default function ExpenseModal({ open, onClose, onSave, members }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState([]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Add Expense</h2>
                <input
                    className="border p-2 rounded w-full mb-4" placeholder="Title"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    className="border p-2 rounded w-full mb-4" placeholder="Amount"
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-full mb-4" multiple
                    value={paidBy} onChange={(e) => setPaidBy(Array.from(e.target.selectedOptions, option => option.value))}
                >   
                <option>Select payer</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <div className="flex justify-end">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => onSave({ title, amount: parseFloat(amount), paidBy })}>Save</button>
                </div>
            </div>
        </div>
    );
}

