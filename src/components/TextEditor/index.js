export function EditorToolbarButton({
  children, onClick, className, id
}) {
  return (
    <button
      className={`${className} p-0.5 m-0.5 border border-gray-500 rounded-sm`}
      id={id}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// TODO setup editor toolbar
export function EditorToolbar({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
