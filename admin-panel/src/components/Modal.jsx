const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
