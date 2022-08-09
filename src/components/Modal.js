function Modal({ children, onClose }) {
  return (
    <div
      className="absolute w-full h-full top-0 left-0 flex flex-row justify-center items-center z-20"
    >
      <div
        role="presentation"
        onClick={onClose}
        className="z-30 absolute w-full h-full bg-slate-500 bg-opacity-40"
      />
      <div className="p-2 border-2 border-blue-500 bg-slate-50 text-green-800 dark:bg-slate-900 dark:text-yellow-200 flex flex-col rounded justify-center items-center z-50">
        {children}
      </div>
    </div>
  );
}

export default Modal;
