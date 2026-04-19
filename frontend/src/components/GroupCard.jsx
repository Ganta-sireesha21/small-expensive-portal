import { Users, Receipt } from "lucide-react";
export default function GroupCard({ group,onClick,
    memberCount=0,
    totalAmount=0,
 }) {
    return (
        <div onClick={onClick} className="bg-white shadow rounded-lg p-4 cursor-pointer">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h2>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <div className="flex items-center text-gray-600">
                <Users className="mr-1" size={16} />
                {memberCount} members
            </div>
            <div className="flex items-center text-gray-600 mt-2">
                <Receipt className="mr-1" size={16} />
                Total: ${totalAmount}
            </div>
        </div>
    );
}

