import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data);

      login(response.access_token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          AI Developer Assistant
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-white">
            Email
          </label>

          <input
            type="email"
            className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white outline-none"
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
            className="w-full rounded border border-gray-700 bg-gray-800 p-3 text-white outline-none"
            {...register("password", {
              required: "Password is required",
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
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;