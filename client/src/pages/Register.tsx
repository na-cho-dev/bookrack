import { useEffect, useState } from "react";
import { ImageAssets } from "../assets/assets";
import { EyeIcon, EyeOffIcon, LucideLoaderCircle } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import {
  registerSchema,
  type RegisterSchemaPayload,
} from "../schemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { getPasswordStrength } from "../utils/passwordCheck";
import { PwdStrengthBar } from "../components/PwdStrengthBar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    register: formRegister,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchemaPayload>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  useEffect(() => {
    setPasswordScore(getPasswordStrength(password));
  }, [password]);

  const onSubmit = (data: RegisterSchemaPayload) => {
    register(data, {
      onSuccess: () => {
        reset();
        navigate("/login");
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
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-center text-sm text-gray-500">
          Join BookRack by filling in your details.
        </p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...formRegister("name")}
          className={`w-full border p-3 rounded focus:outline-none focus:ring-1 focus:ring-sec bg-[#fff4df] ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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

        <PwdStrengthBar score={passwordScore} />

        <button
          type="submit"
          className="w-full bg-sec text-white p-3 rounded hover:bg-pri transition flex items-center justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <LucideLoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Register"
          )}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-sec hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
