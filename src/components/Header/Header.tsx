import companyLogo from "../../Images/synovatechltd_logo.jpeg";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4">
        <img
          src={companyLogo}
          alt="SynovaTech logo"
          className="h-auto w-[140px] object-contain"
        />

        <h1 className="m-0 text-[22px] font-semibold text-gray-800">
          Product Explorer
        </h1>

        <p className="ml-auto w-full text-sm text-gray-500 md:w-auto">
          Browse and explore our product collection.
        </p>
      </div>
    </header>
  );
}

export default Header;