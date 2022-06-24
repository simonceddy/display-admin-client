function OuterContainer({ children }) {
  return (
    <div className="flex flex-col w-full h-full bg-orange-100 dark:bg-black text-purple-900 dark:text-purple-300">
      {children}
    </div>
  );
}

export default OuterContainer;
