import { Edit, Trash2 } from "lucide-react";

const TableActions = ({ onEdit, onDelete }) => (
  <div className="flex space-x-2">
    <button onClick={onEdit} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
    <button onClick={onDelete} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
  </div>
);
export default TableActions;
