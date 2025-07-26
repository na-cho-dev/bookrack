import { X, UserCircle2, Mail, Loader } from "lucide-react";
import type { Membership } from "../../types/auth.type";

const PendingUserRequestsModal = ({
  isOpen,
  onClose,
  pendingUsers,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}: {
  isOpen: boolean;
  onClose: () => void;
  pendingUsers: Membership[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isAccepting?: boolean;
  isRejecting?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Pending Join Requests
        </h2>

        {pendingUsers.length === 0 ? (
          <p className="text-sm text-gray-500">No pending users.</p>
        ) : (
          <ul className="space-y-4">
            {pendingUsers.map((data) => (
              <li
                key={data.user._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <UserCircle2 className="w-4 h-4 text-gray-400" />
                    {data.user.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {data.user.email}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAccept(data.user._id)}
                    className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1"
                    disabled={isAccepting}
                  >
                    {isAccepting && <Loader className="w-3 h-3 animate-spin" />}
                    Accept
                  </button>
                  <button
                    onClick={() => onReject(data.user._id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1"
                    disabled={isRejecting}
                  >
                    {isRejecting && <Loader className="w-3 h-3 animate-spin" />}
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingUserRequestsModal;
