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
export default function RegisterForm({ handleClick }) {
  const { isLoading, mutate: doRegister, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    doRegister(data);
  };
  return (
    <form
      className="flex md:w-1/2 flex-col p-6 gap-5 bg-white rounded-s-2xl max-md:rounded-2xl px-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center md:text-left font-bold text-4xl px-4">
        Zarejestruj się!
      </h2>
      <ControlledInput
        error={errors.username?.message}
        label={"Nazwa użytkownika"}
        name="username"
        register={register}
        placeholderText={"Podaj nazwę użytkownika"}
      />
      <ControlledInput
        error={errors.email?.message}
        label={"Adres email"}
        name="email"
        register={register}
        placeholderText={"Podaj adres email"}
      />
      <ControlledInput
        error={errors.password?.message}
        label={"Hasło"}
        name="password"
        register={register}
        type="password"
        placeholderText={"Wpisz hasło"}
      />
      {error && (
        <p className="text-red-500 text-sm">
          {error.response?.data?.message || "Nie udało się zarejestrować"}
        </p>
      )}
      <div className="px-4 w-full">
        <Button type="submit">Prześlij</Button>
      </div>
      <p
        className="mt-4 text-blue-500 underline cursor-pointer hover:text-blue-700 text-lg font-medium"
        onClick={handleClick}
      >
        Mam już konto
      </p>
    </form>
  );
}
