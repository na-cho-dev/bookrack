// components/JoinOrgModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Loader } from "lucide-react";
import { useJoinOrg } from "../../hooks/useMembership";

type Props = {
  open: boolean;
  onClose: () => void;
};

const JoinOrgModal = ({ open, onClose }: Props) => {
  const [orgCode, setOrgCode] = useState("");
  const { mutate: joinOrg, isPending } = useJoinOrg();

  const handleJoin = () => {
    if (!orgCode) return;
    // console.log("Org Code: ", orgCode);

    joinOrg(orgCode, {
      onSuccess: () => {
        setOrgCode("");
        onClose();
      },
    });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold text-gray-700 mb-2">
              Join Organization
            </Dialog.Title>

            <Dialog.Description className="text-sm text-gray-500 mb-4">
              Enter the organization code provided by your admin.
            </Dialog.Description>

            <input
              type="text"
              value={orgCode}
              onChange={(e) => setOrgCode(e.target.value)}
              placeholder="Organization Code"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:ring-2 focus:ring-sec focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                disabled={isPending}
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleJoin}
                disabled={isPending}
                className="px-4 py-2 bg-sec text-white rounded-md hover:bg-sec-dark transition inline-flex items-center gap-2"
              >
                {isPending && <Loader className="w-4 h-4 animate-spin" />}
                Join
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JoinOrgModal;
