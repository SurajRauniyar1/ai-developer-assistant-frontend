import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";

interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);

      alert("Registration Successful!");

      navigate("/");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Registration failed."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-white">
            Full Name
          </label>

          <input
            type="text"
            className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
            {...register("full_name", {
              required: "Full name is required",
            })}
          />

          {errors.full_name && (
            <p className="mt-1 text-sm text-red-400">
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-white">
            Email
          </label>

          <input
            type="email"
            className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-white">
            Password
          </label>

          <input
            type="password"
            className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-green-600 p-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;