import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "./ControlledInput";
import RegisterImage from "./RegisterImage";
import Button from "./Button";
import useRegister from "@/hooks/useRegister";
const schema = yup.object().shape({
  username: yup.string().required("Wymagana nazwa użytkownika"),
  email: yup
    .string()
    .email("Podaj poprawny adres email")
    .required("Wymagany adres email"),
  password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Wymagane hasło"),
});
export default function RegisterForm() {
  const { isLoading, mutate: doRegister } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    doRegister(data);
  };
  return (
    <div className="flex">
      <form
        className="flex md:w-1/2 flex-col p-6 gap-10 bg-white px-20 rounded-s-2xl max-md:rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center font-bold text-4xl">Zarejestruj się!</h2>
        <ControlledInput
          error={errors.username?.message}
          label={"Nazwa użytkownika"}
          name="username"
          register={register}
        />
        <ControlledInput
          error={errors.email?.message}
          label={"Adres email"}
          name="email"
          register={register}
        />
        <ControlledInput
          error={errors.password?.message}
          label={"Hasło"}
          name="password"
          register={register}
          type="password"
        />
        <Button type="submit">Prześlij</Button>
      </form>
      <RegisterImage />
    </div>
  );
}
