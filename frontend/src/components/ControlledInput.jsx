export default function ControlledInput({
  label,
  type = "text",
  name,
  register,
  error,
  placeholderText,
}) {
  return (
    <div className="flex flex-col w-full mx-auto items-start px-4">
      <label className="font-semibold my-4">{label}</label>
      <input
        {...register(name)}
        type={type}
        className="border border-slate-500 px-8 p-4 rounded-xl  w-full  placeholder:text-slate-400"
        placeholder={placeholderText}
      />
      <p className="text-red-500 font-light min-h-[24px]">{error}</p>
    </div>
  );
}
