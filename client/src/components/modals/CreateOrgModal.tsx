import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useCreateOrganization } from "../../hooks/useOrganization";
import { useUserStore } from "../../stores/useUserStore";
import type { Membership } from "../../types/auth.type";

const CreateOrgModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const createOrg = useCreateOrganization();
  // const setMemberships = useUserStore((s) => s.setMemberships);
  const setCurrentMembership = useUserStore((s) => s.setCurrentMembership);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrg.mutate(
      { name, description },
      {
        onSuccess: (org) => {
          setName("");
          setDescription("");
          setTimeout(() => {
            const memberships = useUserStore.getState().memberships;
            const newMembership = memberships?.find(
              (member: Membership) => member.organization._id === org._id
            );
            if (newMembership) setCurrentMembership(newMembership);
          }, 300);
          onClose();
        },
      }
    );
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
              Create Organization
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Organization Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-sec focus:outline-none"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-sec focus:outline-none"
                required
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                  disabled={createOrg.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sec text-white rounded-md hover:bg-sec-dark transition"
                  disabled={createOrg.isPending}
                >
                  {createOrg.isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateOrgModal;
