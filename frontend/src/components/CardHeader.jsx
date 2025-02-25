/* eslint-disable react/prop-types */
export default function CardHeader({ title, date }) {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {date && (
        <span className="text-sm text-gray-500 absolute right-2 top-2">
          {new Date(date).toLocaleDateString()}
        </span>
      )}
    </header>
  );
}
