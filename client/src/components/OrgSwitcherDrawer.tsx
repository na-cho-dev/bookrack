import { X, LogOut, LayoutDashboard } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const OrgSwitcherDrawer: React.FC<Props> = ({ open, onClose, onLogout }) => {
  const memberships = useUserStore((s) => s.memberships ?? []);
  const currentMembership = useUserStore((s) => s.currentMembership);
  const setCurrentMembership = useUserStore((s) => s.setCurrentMembership);

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
                  <Link
                    to="/dashboard/admin"
                    className="flex items-center justify-start gap-1 text-sec font-bold"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <LayoutDashboard className="w-6" />
                    <span className="">Dashboard</span>
                  </Link>
                </div>

                {/* Organizations list */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  {memberships.map((mem) => (
                    <button
                      key={mem._id}
                      onClick={() => {
                        setCurrentMembership(mem);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        currentMembership?.organization._id ===
                        mem.organization._id
                          ? "bg-sec text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      {mem.organization.name}
                    </button>
                  ))}
                </div>

                {/* Logout button */}
                <button
                  onClick={onLogout}
                  className="mt-5 flex items-center gap-2 text-red-600 font-bold"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrgSwitcherDrawer;
