export default function Button({ children }) {
  return (
    <button className="w-full text-center  text-white p-3 rounded-2xl bg-cyan-900 border border-cyan-950 transition duration-200 hover:bg-cyan-700 hover:cursor-pointer hover:-translate-y-0.5 hover:shadow-lg flex  items-center justify-between">
      {children}
    </button>
  );
}
