import companyLogo from "../../Images/synovatechltd_logo.jpeg";

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 px-6 py-5">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <img
          src={companyLogo}
          alt="SynovaTech logo"
          className="h-auto w-[110px] object-contain"
        />

        <p className="m-0 text-[13px] text-gray-500">
          &copy; {new Date().getFullYear()} Product Explorer. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;