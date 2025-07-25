import { X, LogOut, LayoutDashboard, LogIn, PlusCircle } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useLeaveOrg } from "../hooks/useMembership";
import JoinOrgModal from "./modals/JoinOrgModal";
import CreateOrgModal from "./modals/CreateOrgModal";
import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const OrgSwitcherDrawer: React.FC<Props> = ({ open, onClose, onLogout }) => {
  const memberships = useUserStore((s) => s.memberships ?? []);
  const currentMembership = useUserStore((s) => s.currentMembership);
  const setCurrentMembership = useUserStore((s) => s.setCurrentMembership);
  const navigate = useNavigate();
  const leaveOrgMutation = useLeaveOrg();
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);

  const handleLeaveOrganization = async () => {
    try {
      await leaveOrgMutation.mutateAsync();
      navigate("/select-org");
    } catch (err) {
      console.error("Failed to leave org", err);
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        {/* Slide-in Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="absolute right-0 top-0 h-full w-72 bg-[#fff4df] shadow-xl p-5 flex flex-col space-y-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Organizations</h2>
                  <button onClick={onClose}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <button
                      onClick={() => {
                        const route =
                          currentMembership?.role === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard/member";
                        navigate(route);
                        onClose();
                      }}
                      className="flex items-center justify-start gap-1 text-sec font-bold"
                    >
                      <LayoutDashboard className="w-6 h-6" />
                      <span className="">Dashboard</span>
                    </button>
                    {/* Create Organization Icon Button */}
                    <button
                      onClick={() => setIsCreateOrgOpen(true)}
                      className="p-2 rounded-full bg-sec text-white transition"
                      title="Create Organization"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Organizations list */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  {memberships.map((mem) => (
                    <div
                      key={mem._id}
                      className={`flex justify-between items-center px-3 py-2 rounded-md transition ${
                        currentMembership?.organization._id ===
                        mem.organization._id
                          ? "bg-sec text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setCurrentMembership(mem);
                          onClose();

                          const route =
                            mem.role === "admin"
                              ? "/dashboard/admin"
                              : "/dashboard/member";
                          navigate(route, { replace: true });
                        }}
                        className="flex-1 text-left"
                      >
                        {mem.organization.name}
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  {/* Join button with icon */}
                  <button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 my-2 bg-sec text-white rounded hover:bg-sec-dark transition w-full"
                    title="Join Organization"
                  >
                    <LogIn className="w-5 h-5" />
                    Join Organization
                  </button>

                  {/* Leave button with icon - now warning style */}
                  <button
                    onClick={() => setShowLeaveConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 my-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition w-full border border-red-300 font-semibold"
                    title="Leave Organization"
                  >
                    <LogOut className="w-5 h-5" />
                    Leave Organization
                  </button>

                  {/* Logout button */}
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="mt-5 px-4 flex items-center gap-2 text-red-600 font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>

                  {/* Leave Organization Confirmation Modal */}
                  {showLeaveConfirm && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl shadow-lg p-6 mx-4 max-w-sm w-full border border-red-200">
                        <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                          <FaExclamationTriangle className="w-5 h-5" />
                          Leave Organization?
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Are you sure you want to leave{" "}
                          <span className="font-semibold text-sec">
                            {currentMembership?.organization.name}
                          </span>
                          ? You will lose access to its dashboard and resources.
                        </p>
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setShowLeaveConfirm(false)}
                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              setShowLeaveConfirm(false);
                              await handleLeaveOrganization();
                            }}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                            disabled={leaveOrgMutation.isPending}
                          >
                            {leaveOrgMutation.isPending
                              ? "Leaving..."
                              : "Leave"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl shadow-lg p-6 mx-4 max-w-sm w-full border border-red-200">
                        <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                          <FaExclamationTriangle className="w-5 h-5" />
                          Logout?
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Are you sure you want to logout? You will need to sign
                          in again to access your organizations.
                        </p>
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setShowLogoutConfirm(false)}
                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              setShowLogoutConfirm(false);
                              onLogout();
                            }}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Join Org Modal */}
                  <JoinOrgModal
                    open={isJoinModalOpen}
                    onClose={() => setIsJoinModalOpen(false)}
                  />
                  {/* Create Org Modal */}
                  <CreateOrgModal
                    open={isCreateOrgOpen}
                    onClose={() => setIsCreateOrgOpen(false)}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrgSwitcherDrawer;
