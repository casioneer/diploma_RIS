import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const PaymentForm = ({ next }) => {
  const { userData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      username: userData?.username,
      address: userData?.address,
      country: userData?.country,
      city: userData?.city,
      state: userData?.state,
    },
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center mb-4 font-semibold">Детали адреса</h1>
      <form
        className="border p-4 border-black-4 w-full md:w-1/2 mx-auto"
        onSubmit={handleSubmit((data) => next(data))}
      >
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Имя</span>
          <Input
            disabled
            type="text"
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            name="fullname"
            {...register("fullname", { required: "Требуется имя" })}
          />
          {errors.fullname && <HelperText valid={false}>{errors.fullname.message}</HelperText>}
        </Label>
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Почта</span>
          <Input
            disabled
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            type="text"
            name="email"
            {...register("email", { required: "Требуется почта" })}
          />
          {errors.email && <HelperText valid={false}>{errors.email.message}</HelperText>}
        </Label>
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Адрес</span>
          <Input
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            type="text"
            name="address"
            {...register("address", { required: "Требуется адрес" })}
          />
          {errors.address && <HelperText valid={false}>{errors.address.message}</HelperText>}
        </Label>
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Страна</span>
          <Input
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            type="text"
            name="country"
            {...register("country", { required: "Требуется страна" })}
          />
          {errors.country && <HelperText valid={false}>{errors.country.message}</HelperText>}
        </Label>
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Область</span>
          <Input
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            type="text"
            name="state"
            {...register("state", { required: "Требуется страна" })}
          />
          {errors.state && <HelperText valid={false}>{errors.state.message}</HelperText>}
        </Label>
        <Label className="block text-grey-darker text-sm font-bold mb-4">
          <span>Город</span>
          <Input
            className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
            type="text"
            name="city"
            {...register("city", { required: "Требуется город" })}
          />
          {errors.city && <HelperText valid={false}>{errors.city.message}</HelperText>}
        </Label>
        <div className="flex justify-between">
          <Button tag={Link} to="/cart" layout="outline" size="small">
            Вернуться в корзину
          </Button>
          <Button type="submit" size="small" className=" bg-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
