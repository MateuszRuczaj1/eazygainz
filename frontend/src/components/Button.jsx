export default function Button({ action, children }) {
  return (
    <button
      className="min-w-44 mx-auto  text-white p-3 rounded-2xl bg-emerald-500 border border-emerald-950 transition duration-200 hover:bg-emerald-700 hover:cursor-pointer hover:-translate-y-0.5 hover:shadow-lg flex  items-center justify-between"
      onClick={action}
    >
      {children}
    </button>
  );
}
