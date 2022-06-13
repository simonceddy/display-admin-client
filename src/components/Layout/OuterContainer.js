function OuterContainer({ children }) {
  return (
    <div className="flex flex-col w-full h-full">
      {children}
    </div>
  );
}

export default OuterContainer;
