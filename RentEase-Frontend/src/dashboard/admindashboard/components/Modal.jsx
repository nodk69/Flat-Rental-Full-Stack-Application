const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <button className="text-red-500 float-right" onClick={onClose}>✖</button>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  