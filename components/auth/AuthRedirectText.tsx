import Link from "next/link";

export default function AuthRedirectText({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="mt-2 text-gray-600 text-center">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-[rgb(73,163,90)] hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
