import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-4 text-sm flex justify-center items-center">
      <div className="text-gray-700">{label}</div>
      <Link
        className="underline pl-1 text-indigo-600 hover:text-indigo-800"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
