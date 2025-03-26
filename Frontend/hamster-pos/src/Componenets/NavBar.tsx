import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-semibold">
          E-Commerce
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-blue-300">
            Home
          </Link>
          <Link href="/profile" className="text-white hover:text-blue-300">
            Profile
          </Link>
          <Link href="/cart" className="text-white hover:text-blue-300">
            Cart
          </Link>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
