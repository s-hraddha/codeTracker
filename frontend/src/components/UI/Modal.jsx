export default function Modal({isOpen, onClose, children}){
    if (!isOpen) return null;
    return (
        <div className="fixed insert-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative p-6">
                <button
                 onClick={onClose}
                 className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
                >
                 Close
                </button>
                {children}
            </div>
        </div>
    );
}