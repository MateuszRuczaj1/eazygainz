import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMuscles from "@/hooks/useMuscles";
import Button from "./Button";
export default function AddTrainingForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const { data: musclesData, isLoading, error } = useMuscles();

  const handleShowContent = (e) => {
    e.preventDefault();
    setIsFormVisible(true);
  };
  const onSubmit = (data) => {
    setData(JSON.stringify(data));
    setIsFormVisible(false);
  };
  if (isLoading) return <p>Ładowanie muskli....</p>;
  if (error) return <p>Wystąpił błąd: {error}</p>;
  console.log(musclesData);
  return (
    <form
      className="flex flex-col items-center space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        defaultValue={"Nowy trening"}
        className="text-center"
        {...register("title")}
      />
      {isFormVisible ? (
        <div className="flex flex-col justify-between p-6 ">
          <div>
            <label htmlFor="exercise" className="text-sm md:text-base">
              Ćwiczona grupa mięśniowa:
            </label>
            <select
              className="min-w-[80px] border border-slate-500 rounded-2xl ms-4 px-2 text-sm md:text-base appearance-none bg-white"
              name="exercise"
              id="exercise"
              {...register("exercises", { required: true })}
            >
              {musclesData.map((item) => {
                return (
                  <option key={item._id} value={item.muscle}>
                    {item.muscle}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="self-start my-4">
            <Button type="submit">Dodaj</Button>
          </div>
        </div>
      ) : (
        <>
          <motion.button
            className="w-full px-6 rounded-2xl text-start border border-gray-200 py-2"
            whileHover={{
              scale: 1.01,

              cursor: "pointer",
            }}
            onClick={handleShowContent}
          >
            + Dodaj ćwiczenie
          </motion.button>
          <p>{data}</p>
        </>
      )}
    </form>
  );
}
