import { UserCircle2, Mail, Shield } from "lucide-react";
import {
  useAcceptUserRequest,
  useOrganizationUsers,
  usePendingUserRequests,
  useRejectUserRequest,
  useRemoveUserFromOrg,
} from "../../hooks/useMembership";
import PendingUserRequestsModal from "../modals/PendingUserRequestsModal";
import { useState } from "react";

const UsersTab = () => {
  const { data: users } = useOrganizationUsers();
  const removeUserMutation = useRemoveUserFromOrg();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: pendingUsers = [] } = usePendingUserRequests();
  const acceptUserMutation = useAcceptUserRequest();
  const rejectUserMutation = useRejectUserRequest();

  const handleAccept = (userId: string) => {
    acceptUserMutation.mutate(userId);
  };

  const handleReject = (userId: string) => {
    rejectUserMutation.mutate(userId);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-8 px-6 sm:py-14 sm:px-14 space-y-8 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500">
              View and manage users in your organization.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-sec text-white text-sm rounded-md hover:opacity-90"
          >
            View Pending Requests
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User List</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec w-full sm:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm text-left table-fixed">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4 w-1/4">Name</th>
                  <th className="py-2 pr-4 w-1/4">Email</th>
                  <th className="py-2 pr-4 w-1/5">Role</th>
                  <th className="py-2 pr-4 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((membership) => (
                    <tr key={membership._id} className="border-b text-gray-700">
                      <td className="py-4 pr-4 truncate max-w-[10rem]">
                        <span className="flex items-center gap-2">
                          <UserCircle2 className="w-5 h-5 text-gray-400" />
                          <span className="truncate">
                            {membership.user?.name || "Unknown"}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[12rem]">
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">
                            {membership.user?.email || "Unknown"}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 pr-4 truncate max-w-[8rem]">
                        <span className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="truncate">
                            {membership.role.charAt(0).toUpperCase() +
                              membership.role.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 pr-4 flex gap-2">
                        {membership.role !== "admin" && (
                          <button
                            className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                            onClick={() =>
                              removeUserMutation.mutate(membership.user._id)
                            }
                            disabled={removeUserMutation.isPending}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PendingUserRequestsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pendingUsers={pendingUsers}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default UsersTab;
