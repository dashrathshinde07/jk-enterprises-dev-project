import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-[60%]",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <div
            className={`w-full ${maxWidth} transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center "
            >
              {title}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                X
              </button>
            </Dialog.Title>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
