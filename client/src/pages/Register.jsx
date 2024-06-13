import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import API from "api/axios.config";
import { useUser } from "context/UserContext";
import Layout from "../layout/Layout";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const { isLoggedIn, setUserState } = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { password, password2, username, name, email } = data;
    setError("");
    if (password === password2) {
      setIsLoading(!isLoading);
      API.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      })
        .then(({ data }) => {
          setError("");
          toast.success("Аккаунт успешно создан.");
          setTimeout(() => {
            setUserState(data);
            setIsLoading(!isLoading);
          }, 1000);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setError(response.data.message);
        });
    } else {
      setError("Пароль не подходит");
    }
  };

  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }
  return (
    <Layout title="Создать аккаунт">
      <div className="flex items-center justify-center mx-auto mt-20 ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2 mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-4xl">Создать аккаунт</h1>
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Никнейм</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="username"
              {...register("username", {
                minLength: {
                  value: 4,
                  message: "Длина никнейма должна превышать 3 символа",
                },
                required: "Требуется никнейм",
              })}
            />
          </div>
          {errors?.username && (
            <HelperText className="pt-2" valid={false}>
              {errors.username.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Имя</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="name"
              {...register("name", {
                required: "Имя не может быть пустым",
                minLength: {
                  value: 6,
                  message: "Длина имени должна превышать 3 символа",
                },
              })}
            />
          </div>
          {errors.name && (
            <HelperText className="pt-2" valid={false}>
              {errors.name.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Почта</span>
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              {...register("email", {
                required: "Требуется адрес почты",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Адрес почты не подходит",
                },
              })}
            />
          </div>
          {errors.email && (
            <HelperText className="pt-2" valid={false}>
              {errors.email.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Пароль</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password"
              {...register("password", {
                required: "Требуется пароль",
                minLength: {
                  value: 6,
                  message: "Длина пароля должна превышать 5 символов",
                },
              })}
            />
          </div>
          {errors.password && (
            <HelperText className="pt-2" valid={false}>
              {errors.password.message}
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Подтвердить пароль</span>
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password2"
              {...register("password2", {
                validate: (value) => value === password.current || "Пароли не совпадают",
              })}
            />
            {errors.password2 && (
              <HelperText className="pt-2" valid={false}>
                {errors.password2.message}
              </HelperText>
            )}
          </div>
          <p>

          </p>
          <Button type="submit" className="bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
            {isLoading ? (
              <PulseLoader color={"#0a138b"} size={10} loading={isLoading} />
            ) : (
              "Создать аккаунт"
            )}
          </Button >
          {error && (
            <HelperText className="pt-2" valid={false}>
              {error}
            </HelperText>
          )}
          <p className="text-sm mt-4">
            Есть аккаунт?{" "}
            <Link to="/login" className="font-bold">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
