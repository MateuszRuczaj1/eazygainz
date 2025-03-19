export default function ControlledInput({
  label,
  type = "text",
  name,
  register,
  error,
}) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold my-2">{label}</label>
      <input
        {...register(name)}
        type={type}
        className="border border-slate-500 px-8 p-4 rounded-xl max-w-lg"
      />
      <p className="text-red-500 font-light">{error}</p>
    </div>
  );
}
