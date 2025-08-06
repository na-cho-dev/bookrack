import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  CheckIcon,
  PlusCircle,
  LogIn,
} from "lucide-react";
import { Listbox } from "@headlessui/react";
import JoinOrgModal from "../components/modals/JoinOrgModal";
import CreateOrgModal from "../components/modals/CreateOrgModal";
// import { queryClient } from "../utils/queryClient";

const SelectOrganization = () => {
  const navigate = useNavigate();
  const memberships = useUserStore((state) => state.memberships ?? []);
  const user = useUserStore((state) => state.user);
  const setCurrentMembership = useUserStore(
    (state) => state.setCurrentMembership
  );
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);

  const handleSelect = (orgId: string) => {
    setSelectedOrgId(orgId);

    const membership =
      memberships.find((m) => m.organization._id === orgId) ?? null;
    setCurrentMembership(membership);

    if (membership?.role === "admin") {
      navigate("/dashboard/admin");
    } else if (membership?.role === "member") {
      navigate("/dashboard/member");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#fff4df] p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          {user?.name ? (
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome, <span className="text-sec">{user.name}</span>
            </h2>
          ) : (
            <UserCircleIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          )}
          <p className="text-sm text-gray-500">
            Please select the organization you want to continue with
          </p>
        </div>

        {/* No organizations */}
        {memberships.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              You're not part of any organization yet.
            </p>
            <div className="flex flex-col gap-3">
              {/* <Link
                to="/create-org"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-sec-dark transition w-full"
              >
                <PlusCircle className="w-4 h-4" />
                Create Organization
              </Link> */}

              <button
                onClick={() => setIsCreateOrgOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-sec-dark transition w-full"
              >
                <PlusCircle className="w-4 h-4" />
                Create Organization
              </button>

              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-sec text-sec rounded-lg hover:bg-sec hover:text-white transition w-full"
              >
                <LogIn className="w-4 h-4" />
                Join Organization
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Dropdown selection */}
            <div className="relative">
              <Listbox value={selectedOrgId} onChange={handleSelect}>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#fff4df] border border-gray-300 py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec text-gray-700">
                    <span className="block truncate">
                      {selectedOrgId
                        ? memberships.find(
                            (m) => m.organization._id === selectedOrgId
                          )?.organization.name
                        : "Select an organization"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-2 w-full rounded-lg bg-[#fffbf3] border border-gray-200 shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
                    {memberships.map((mem) => (
                      <Listbox.Option
                        key={mem._id}
                        value={mem.organization._id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-5 pl-10 pr-4 ${
                            active ? "bg-sec text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {mem.organization.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon className="h-4 w-4" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Membership info */}
            <p className="text-sm text-gray-400 mt-4 text-center">
              You are a member of{" "}
              <span className="text-sec">{memberships.length}</span>{" "}
              organization{memberships.length !== 1 ? "s" : ""}.
            </p>

            {/* Extra actions */}
            <div className="mt-6 flex flex-col gap-3">
              {/* <Link
                to="/create-org"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-sec-dark transition w-full"
              >
                <PlusCircle className="w-4 h-4" />
                Create Organization
              </Link> */}
              <button
                onClick={() => setIsCreateOrgOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-sec-dark transition w-full"
              >
                <PlusCircle className="w-4 h-4" />
                Create Organization
              </button>

              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-sec text-sec rounded-lg hover:bg-sec hover:text-white transition w-full"
              >
                <LogIn className="w-4 h-4" />
                Join Organization
              </button>
            </div>
          </>
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
    </div>
  );
};

export default SelectOrganization;
