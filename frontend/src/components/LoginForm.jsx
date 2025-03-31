import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "./ControlledInput";
import Button from "./Button";
import useLogin from "@/hooks/useLogin";
import GoogleButton from "./GoogleButton";
const schema = yup.object().shape({
  username: yup.string().required("Wymagana nazwa użytkownika"),
  password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Wymagane hasło"),
});
export default function LoginForm({ handleClick }) {
  const { isLoading, mutate: doLogin, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    doLogin(data);
  };
  if (error) {
    console.log(error);
  }
  return (
    <form
      className="flex md:w-1/2 flex-col p-6 md:gap-10 gap-5 bg-white px-20 rounded-s-2xl max-md:rounded-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center px-4 md:text-left font-bold md:text-4xl text-2xl">
        Zaloguj się do EAZYGAINZ!
      </h2>
      <ControlledInput
        error={errors.username?.message}
        label={"Nazwa użytkownika"}
        name="username"
        register={register}
        placeholderText={"Podaj nazwę użytkownika"}
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
          {error.response?.data?.message || "Nie udało się zalogować"}
        </p>
      )}
      <div className="px-4 w-full space-y-3">
        <Button type="submit">Zaloguj się</Button>
      </div>

      <section className="self-start text-sm">
        <p>Nie masz konta? </p>
        <p>Dołącz do nas i uzyskaj dostęp do profesjonalnych treningów</p>
        <p
          className="text-blue-500 underline cursor-pointer hover:text-blue-700"
          onClick={handleClick}
        >
          Utwórz konto
        </p>
      </section>
      <GoogleButton />
    </form>
  );
}
