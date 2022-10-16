function NavbarAnchor({ children, to }) {
  return (
    <a
      className="rounded my-2 mr-3 p-2 text-lg hover:underline hover:bg-lime-200 dark:hover:bg-cyan-800 active:text-green-700 dark:active:text-yellow-200 text-purple-700 dark:text-yellow-300 bg-cyan-200 dark:bg-emerald-800 active:bg-emerald-200 dark:active:bg-zinc-700"
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default NavbarAnchor;
