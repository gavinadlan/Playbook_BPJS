import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BPJS Kesehatan. All rights reserved.
          </span>
        </div>
        <div className="mt-4 flex justify-center space-x-6 md:mt-0">
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Developer Guidelines
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;