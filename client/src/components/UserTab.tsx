import { UserCircle2, Mail, Shield } from "lucide-react";

const UsersTab = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-14 px-14 space-y-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500">
              View and manage users in your organization.
            </p>
          </div>
          <button className="px-4 py-2 bg-sec text-white text-sm rounded-md hover:opacity-90">
            + Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-[#fffcf8] rounded-xl shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User List</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sec"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamic user list */}
                <tr className="border-b text-gray-700">
                  <td className="">
                    <span className="flex items-center gap-2">
                      <UserCircle2 className="w-5 h-5 text-gray-400" />
                      John Doe
                    </span>
                  </td>
                  <td className="">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      john@example.com
                    </span>
                  </td>
                  <td className="">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      Member
                    </span>
                  </td>
                  <td className="py-2 pr-4 flex gap-2">
                    <button className="px-3 py-1 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                      View
                    </button>
                    <button className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                      Remove
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No users found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTab;
