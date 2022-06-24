import { useState, useRef, Dispatch, SetStateAction, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const DeleteConfirmDialog = ({
  isOpen,
  setIsOpen,
  setIsDeleted,
  text,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
  text: string;
}) => {
  let cancelButtonRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  const onDelete = () => {
    setIsDeleted(true);
    setIsOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={cancelButtonRef}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-primary-900"
                >
                  Are you sure you want to Delete?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-basics-600">{text}</p>
                </div>

                <div className="flex mx-4 mt-4">
                  <button
                    ref={cancelButtonRef}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-primary-900 bg-basics-50 hover:bg-primary-900 hover:text-basics-50 focus:bg-primary-900 focus:text-basics-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-white border border-transparent rounded-md text-error-900 hover:bg-error-900 hover:text-white focus:bg-error-900 focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                    onClick={() => onDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteConfirmDialog;
