import React from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';

const Dialog = ({ open, onClose, onSave, title, children, saveButtonText }) => {
    return (
        <HeadlessDialog open={open} onClose={onClose} className="fixed inset-0 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="p-6">
                    <HeadlessDialog.Title as="h3" className="text-lg font-bold mb-4">{title}</HeadlessDialog.Title>
                    <div>{children}</div>
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button
                        type="button"
                        className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                        onClick={onSave}
                    >
                        {saveButtonText}
                    </button>
                </div>
            </div>
        </HeadlessDialog>
    );
};

export default Dialog;
