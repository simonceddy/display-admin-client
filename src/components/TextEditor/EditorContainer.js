function EditorContainer({ children }) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start m-2 border-2 border-blue-400">
      {children}
    </div>
  );
}

export default EditorContainer;
