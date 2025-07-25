import { useState } from "react";
import { Pencil } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useUpdateUser } from "../hooks/useUser";
import { useOrganizationUsers } from "../hooks/useMembership";
import { useTransferOwnership } from "../hooks/useMembership";
import { queryClient } from "../utils/queryClient";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth.api";
import { useUpdateOrganization } from "../hooks/useOrganization";

const SettingsTab = () => {
  const navigate = useNavigate();
  const currentMembership = useUserStore((state) => state.currentMembership);
  const isAdmin = currentMembership?.role === "admin";
  const updateUserMutation = useUpdateUser();
  const updateOrgMutation = useUpdateOrganization();
  const [editUser, setEditUser] = useState(false);
  const [editOrg, setEditOrg] = useState(false);
  const [newOwnerId, setNewOwnerId] = useState("");
  const [userName, setUserName] = useState(currentMembership?.user.name || "");
  const [userEmail, setUserEmail] = useState(
    currentMembership?.user.email || ""
  );
  const [orgName, setOrgName] = useState(
    currentMembership?.organization.name || ""
  );
  const [orgDesc, setOrgDesc] = useState(
    currentMembership?.organization.description || ""
  );
  const currentOwnerId = currentMembership?.organization?.owner?._id;
  const orgUsers = useOrganizationUsers();
  const transferOwnership = useTransferOwnership();
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (editUser && currentMembership?.user._id) {
      updateUserMutation.mutate({
        userId: currentMembership.user._id,
        userData: { name: userName, email: userEmail },
      });
    }

    if (editOrg && isAdmin) {
      updateOrgMutation.mutate({
        orgData: { name: orgName, description: orgDesc },
      });
    }

    await queryClient.invalidateQueries({ queryKey: ["organization-users"] });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    await queryClient.invalidateQueries({ queryKey: ["user-memberships"] });

    setEditUser(false);
    setEditOrg(false);
  };

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Copied!");
    } catch {
      alert("Failed to copy.");
    }
  };

  const handleTransferOwnership = async () => {
    try {
      await transferOwnership.mutateAsync(newOwnerId);
      setMessage("Ownership transferred successfully!");
      setNewOwnerId("");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["organization-users"] }),
        queryClient.invalidateQueries({ queryKey: ["user-memberships"] }),
        queryClient.invalidateQueries({ queryKey: ["current-user"] }),
      ]);

      // Get fresh current-user data directly
      const freshUser = await queryClient.fetchQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
      });

      const freshMembership =
        "membership" in freshUser ? freshUser.membership : null;

      if (freshMembership?.role === "member") navigate("/dashboard/member");
    } catch {
      setMessage("Failed to transfer ownership.");
    }
  };

  return (
    <div className="w-full px-3 py-10 mb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Settings</h1>

      <div className="space-y-10">
        {/* User Profile */}
        <div className="bg-[#fffcf8] border shadow rounded-xl p-6 space-y-6 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              User Profile
            </h2>
            <button
              onClick={() => setEditUser((prev) => !prev)}
              className="text-gray-500 hover:text-sec"
            >
              <Pencil size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                value={userName}
                disabled={!editUser}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec ${
                  editUser ? "ring-2 ring-sec" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                disabled={!editUser}
                onChange={(e) => setUserEmail(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec ${
                  editUser ? "ring-2 ring-sec" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Role
              </label>
              <input
                type="text"
                value={currentMembership?.role}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-gray-100 cursor-default"
              />
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="bg-[#fffcf8] border shadow rounded-xl p-6 space-y-6 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              Organization Info
            </h2>
            {isAdmin && (
              <button
                onClick={() => isAdmin && setEditOrg((prev) => !prev)}
                className={`text-gray-500 hover:text-sec ${
                  !isAdmin ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isAdmin}
              >
                <Pencil size={18} />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                disabled={!editOrg || !isAdmin}
                onChange={(e) => setOrgName(e.target.value)}
                className={`w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec ${
                  editOrg && isAdmin ? "ring-2 ring-sec" : ""
                }`}
              />
            </div>

            {/* Org Code with Copy Button */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Organization Code
              </label>
              <input
                type="text"
                value={currentMembership?.organization.code}
                readOnly
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-gray-100 pr-10 cursor-pointer focus:outline-none"
                onClick={() =>
                  handleCopy(currentMembership?.organization.code || "")
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Organization ID
              </label>
              <input
                type="text"
                value={currentMembership?.organization._id}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-gray-100 cursor-default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Organization Owner
              </label>
              <input
                type="text"
                value={currentMembership?.organization.owner.email}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-gray-100 cursor-default"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Organization Description
              </label>
              <textarea
                value={orgDesc}
                disabled={!editOrg || !isAdmin}
                onChange={(e) => setOrgDesc(e.target.value)}
                rows={3}
                className={`w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec ${
                  editOrg && isAdmin ? "ring-2 ring-sec" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Transfer Ownership Section */}
        {currentMembership?.role === "admin" && (
          <div className="bg-[#fffcf8] border shadow rounded-xl p-6 space-y-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Transfer Organization Ownership
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Select New Owner
                </label>
                <select
                  className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec"
                  value={newOwnerId}
                  onChange={(e) => setNewOwnerId(e.target.value)}
                >
                  <option value="">Select new owner</option>
                  {orgUsers.data &&
                    orgUsers.data
                      .filter((member) => member.user._id !== currentOwnerId)
                      .map((member) => (
                        <option key={member.user._id} value={member.user._id}>
                          {member.user.name} ({member.user.email})
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <button
                  className="px-6 py-2 bg-sec text-white rounded-md shadow hover:bg-opacity-90 text-sm"
                  disabled={!newOwnerId || transferOwnership.isPending}
                  onClick={handleTransferOwnership}
                >
                  Transfer Ownership
                </button>
                {message && <div className="mt-2 text-sm">{message}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        {(editUser || editOrg) && (
          <div className="text-right">
            <button
              onClick={handleSave}
              className="bg-sec text-white px-6 py-2 rounded-md shadow hover:bg-opacity-90 text-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTab;
