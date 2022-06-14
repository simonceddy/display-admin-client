function EditorContainer({ children }) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      {children}
    </div>
  );
}

export default EditorContainer;
