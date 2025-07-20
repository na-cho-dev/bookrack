import { useState } from "react";
import { Pencil } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const SettingsTab = () => {
  const currentMembership = useUserStore((state) => state.currentMembership);

  // Local editable states
  const [editUser, setEditUser] = useState(false);
  const [editOrg, setEditOrg] = useState(false);

  // User
  const [userName, setUserName] = useState(currentMembership?.user.name || "");
  const [userEmail, setUserEmail] = useState(
    currentMembership?.user.email || ""
  );

  // Organization
  const [orgName, setOrgName] = useState(
    currentMembership?.organization.name || ""
  );
  const [orgDesc, setOrgDesc] = useState(
    currentMembership?.organization.description || ""
  );

  const handleSave = () => {
    console.log("Saving...", {
      userName,
      userEmail,
      orgName,
      orgDesc,
    });
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

  return (
    <div className="w-full px-6 py-10">
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
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec"
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
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec"
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
            <button
              onClick={() => setEditOrg((prev) => !prev)}
              className="text-gray-500 hover:text-sec"
            >
              <Pencil size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                disabled={!editOrg}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec"
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
                value={currentMembership?.organization.owner}
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
                disabled={!editOrg}
                onChange={(e) => setOrgDesc(e.target.value)}
                rows={3}
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-[#fffcf8] focus:outline-none focus:ring-sec"
              />
            </div>
          </div>
        </div>

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
