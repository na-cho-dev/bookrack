import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LucideLoaderCircle } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { ImageAssets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchemaPayload } from "../schemas/authSchemas";
import { useUserStore } from "../stores/useUserStore";
// import { useUserStore } from "../stores/useUserStore";

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setMemberships = useUserStore((state) => state.setMemberships);
  const setCurrentMembership = useUserStore(
    (state) => state.setCurrentMembership
  );
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // RHF setup
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaPayload) => {
    login(data, {
      onSuccess: (data) => {
        if ("memberships" in data) {
          setMemberships(data.memberships);
          setCurrentMembership(null);
          navigate("/select-org");
        } else if ("membership" in data) {
          setMemberships([data.membership]);
          setCurrentMembership(data.membership);
          navigate("/dashboard");
        }

        setUser(data);
        reset();
        navigate("/select-org");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#fff6e5] via-[#fff1cc] to-[#ffe6b3]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#fff4df] p-10 rounded-xl shadow-lg max-w-md w-full space-y-5"
      >
        <img
          src={ImageAssets.logo}
          alt="BookRack Logo"
          className="mx-auto h-12"
        />
        <h2 className="text-2xl font-bold text-center">Login to BookRack</h2>
        <p className="text-center text-sm text-gray-500">
          Welcome back! Please enter your credentials.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...formRegister("email")}
          className={`w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-sec bg-[#fff4df] ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...formRegister("password")}
            className={`w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-sec bg-[#fff4df] ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="text-right">
          <Link to={""} className="text-sm text-sec hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-sec text-white p-3 rounded hover:bg-pri transition flex items-center justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <LucideLoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-sec hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
