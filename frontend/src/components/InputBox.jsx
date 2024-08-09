export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-left py-1 text-gray-700">
        {label}
      </div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
