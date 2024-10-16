import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-28 w-full items-center justify-center border-b-2 border-black border-opacity-15 bg-gray-200 px-40">
      <Link to="/">
        <div className="font-billy flex h-auto justify-center text-7xl font-bold">
          Pixel Hoot
        </div>
      </Link>
    </header>
  );
};

export default Header;
