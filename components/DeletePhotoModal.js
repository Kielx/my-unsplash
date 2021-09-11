import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setIsDeleteOpen } from "../redux/modalSlice";

const DeletePhotoModal = () => {
  const [confirm, setConfirm] = useState(null);
  const dispatch = useDispatch();
  const isDeleteOpen = useSelector((state) => state.modal.isDeleteOpen);

  return (
    <Dialog
      open={isDeleteOpen[0]}
      onClose={() => dispatch(setIsDeleteOpen([false]))}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

        <div className="relative bg-white rounded-lg w-full max-w-md mx-auto p-6 flex flex-col">
          <Dialog.Title className="text-xl font-medium mb-5">
            Delete Photo
          </Dialog.Title>
          <form className="flex flex-col">
            <label
              htmlFor="confirm"
              className="block text-gray-700 text-sm mb-1"
            >
              <div className="flex flex-wrap">
                <span className="w-full">
                  Are you absolutely sure that you want to delete this photo?
                </span>
                <span className="whitespace-pre">Please type in </span>
                <span className="font-extrabold underline ">
                  {`${isDeleteOpen[2]}`}
                </span>
                <span className="whitespace-pre"> to continue</span>
              </div>
            </label>
            <input
              id="confirm"
              placeholder={isDeleteOpen[2]}
              className="w-full text-gray-700 text-xs px-3 py-3 border border-black border-opacity-50 rounded-xl mb-5"
              required={true}
              onChange={(e) => setConfirm(e.target.value)}
            ></input>
            <div className="flex place-content-end space-x-4">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setIsDeleteOpen([false]));
                }}
                className="p-4 bg-transparent text-gray-400 text-center rounded-xl text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm === isDeleteOpen[2]) {
                    isDeleteOpen[1]();
                  }
                }}
                className="btn-danger ripple"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletePhotoModal;
