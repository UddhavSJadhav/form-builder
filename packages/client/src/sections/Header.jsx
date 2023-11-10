import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-neutral-800 text-white fixed w-full top-0 z-[1000]">
      <nav className="h-16  flex items-center justify-between px-5">
        <h1 className="font-extrabold text-2xl">
          <Link to="/">Form Builder</Link>
        </h1>
        <div className="hidden sm:block">Hey, mock account 👋</div>
      </nav>
    </header>
  );
};

export default Navbar;
