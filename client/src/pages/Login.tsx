import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LucideLoaderCircle } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { ImageAssets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchemaPayload } from "../schemas/authSchemas";
import { useUserStore } from "../stores/useUserStore";

const Login = () => {
  const setUser = useUserStore((s) => s.setUser);
  const setMemberships = useUserStore((s) => s.setMemberships);
  const setCurrentMembership = useUserStore((s) => s.setCurrentMembership);
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaPayload>({ resolver: zodResolver(loginSchema) });
  const onSubmit = (values: LoginSchemaPayload) =>
    login(values, {
      onSuccess: (data) => {
        if ("memberships" in data) {
          setMemberships(data.memberships);
          setCurrentMembership(null);
        } else if ("membership" in data) {
          setMemberships([data.membership]);
          setCurrentMembership(data.membership);
        }
        setUser(data);
        reset();
        navigate("/select-org");
      },
    });
  return (
    <main className="auth-page">
      <aside className="auth-aside">
        <div className="auth-brand">
          <Link to="/">
            <img src={ImageAssets.logo} alt="BookRack" />
            <span>BookRack</span>
          </Link>
        </div>
        <div className="auth-quote">
          <p>
            A home for the books that bring your people <span>together.</span>
          </p>
          <small>
            Organize your collection. Keep every reader in the loop.
          </small>
        </div>
      </aside>
      <section className="auth-copy">
        <div className="auth-card">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Pick up where you left off.</h1>
          <p>Sign in to see your organization’s library.</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label>
              Email
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600 text-xs">
                  {errors.email.message}
                </span>
              )}
            </label>
            <label>
              Password
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-600 text-xs">
                  {errors.password.message}
                </span>
              )}
            </label>
            <button className="auth-submit" disabled={isPending}>
              {isPending ? (
                <LucideLoaderCircle
                  className="mx-auto animate-spin"
                  size={20}
                />
              ) : (
                "Sign in to BookRack"
              )}
            </button>
          </form>
          <p className="auth-foot">
            New to BookRack? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
};
export default Login;
