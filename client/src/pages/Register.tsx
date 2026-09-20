import { useEffect, useState } from "react";
import { ImageAssets } from "../assets/assets";
import { EyeIcon, EyeOffIcon, LucideLoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { getPasswordStrength } from "../utils/passwordCheck";
import { PwdStrengthBar } from "../components/PwdStrengthBar";
import {
  adminRegisterSchema,
  userRegisterSchema,
  type AdminRegisterPayload,
  type UserRegisterPayload,
} from "../schemas/authSchemas";
import { useRegisterAdmin, useRegisterUser } from "../hooks/useRegister";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const {
    register: registerUserField,
    handleSubmit: handleSubmitUser,
    watch: watchUser,
    formState: { errors: userErrors },
    reset: resetUser,
  } = useForm<UserRegisterPayload>({
    resolver: zodResolver(userRegisterSchema),
  });

  const {
    register: registerAdminField,
    handleSubmit: handleSubmitAdmin,
    watch: watchAdmin,
    formState: { errors: adminErrors },
    reset: resetAdmin,
  } = useForm<AdminRegisterPayload>({
    resolver: zodResolver(adminRegisterSchema),
  });

  const userPassword = watchUser("password", "");
  const adminPassword = watchAdmin("password", "");
  const [userPasswordScore, setUserPasswordScore] = useState(0);
  const [adminPasswordScore, setAdminPasswordScore] = useState(0);

  useEffect(() => {
    setUserPasswordScore(getPasswordStrength(userPassword));
    setAdminPasswordScore(getPasswordStrength(adminPassword));
  }, [userPassword, adminPassword]);

  const { mutate: registerUser, isPending: isUserPending } = useRegisterUser();
  const { mutate: registerAdmin, isPending: isAdminPending } =
    useRegisterAdmin();

  const onUserSubmit = (data: UserRegisterPayload) => {
    registerUser(data, {
      onSuccess: () => {
        resetUser();
        navigate("/login");
      },
    });
  };

  const onAdminSubmit = (data: AdminRegisterPayload) => {
    registerAdmin(data, {
      onSuccess: () => {
        resetAdmin();
        navigate("/login");
      },
    });
  };

  const isUser = activeTab === "user";

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <div className="auth-brand">
          <Link to="/">
            <img src={ImageAssets.logo} alt="BookRack" />
            <span>BookRack</span>
          </Link>
        </div>
        <div className="auth-quote">
          <p>
            Build a library people will <span>love to use.</span>
          </p>
          <small>One organized place for books, members, and borrowing.</small>
        </div>
      </aside>
      <section className="auth-copy">
        <div className="auth-card">
          <form
            onSubmit={
              isUser
                ? handleSubmitUser(onUserSubmit)
                : handleSubmitAdmin(onAdminSubmit)
            }
            className="space-y-5"
          >
            <p className="eyebrow">GET STARTED</p>
            <h1>Create your BookRack space.</h1>
            <p className="text-sm text-gray-500">
              Choose how you’ll be joining, then add a few details.
            </p>

            {/* Modern Tab UI */}
            <div className="auth-tabs mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("user")}
                className={`w-1/2 py-2 rounded-lg transition text-xs font-medium ${
                  isUser ? "active" : "text-gray-700"
                }`}
              >
                Register as User
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("admin")}
                className={`w-1/2 py-2 rounded-lg transition text-xs font-medium ${
                  !isUser ? "active" : "text-gray-700"
                }`}
              >
                Register as Organization
              </button>
            </div>

            {/* Form Fields */}
            {isUser ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...registerUserField("name")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    userErrors.name ? "border-red-500" : ""
                  }`}
                />
                {userErrors.name && (
                  <p className="text-red-500 text-sm">
                    {userErrors.name.message}
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  {...registerUserField("email")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    userErrors.email ? "border-red-500" : ""
                  }`}
                />
                {userErrors.email && (
                  <p className="text-red-500 text-sm">
                    {userErrors.email.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Organization Code"
                  {...registerUserField("organizationCode")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    userErrors.organizationCode ? "border-red-500" : ""
                  }`}
                />
                {userErrors.organizationCode && (
                  <p className="text-red-500 text-sm">
                    {userErrors.organizationCode.message}
                  </p>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...registerUserField("password")}
                    className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                      userErrors.password ? "border-red-500" : ""
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
                {userErrors.password && (
                  <p className="text-red-500 text-sm">
                    {userErrors.password.message}
                  </p>
                )}

                <PwdStrengthBar score={userPasswordScore} />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...registerAdminField("name")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    adminErrors.name ? "border-red-500" : ""
                  }`}
                />
                {adminErrors.name && (
                  <p className="text-red-500 text-sm">
                    {adminErrors.name.message}
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  {...registerAdminField("email")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    adminErrors.email ? "border-red-500" : ""
                  }`}
                />
                {adminErrors.email && (
                  <p className="text-red-500 text-sm">
                    {adminErrors.email.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Organization Name"
                  {...registerAdminField("organizationName")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    adminErrors.organizationName ? "border-red-500" : ""
                  }`}
                />
                {adminErrors.organizationName && (
                  <p className="text-red-500 text-sm">
                    {adminErrors.organizationName.message}
                  </p>
                )}

                <textarea
                  placeholder="Organization Description"
                  {...registerAdminField("organizationDescription")}
                  className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                    adminErrors.organizationDescription ? "border-red-500" : ""
                  }`}
                />
                {adminErrors.organizationDescription && (
                  <p className="text-red-500 text-sm">
                    {adminErrors.organizationDescription.message}
                  </p>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...registerAdminField("password")}
                    className={`w-full border p-3 rounded bg-[#fff4df] focus:outline-none focus:ring-1 focus:ring-sec ${
                      adminErrors.password ? "border-red-500" : ""
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
                {adminErrors.password && (
                  <p className="text-red-500 text-sm">
                    {adminErrors.password.message}
                  </p>
                )}

                <PwdStrengthBar score={adminPasswordScore} />
              </>
            )}

            <button
              type="submit"
              className="auth-submit w-full flex items-center justify-center"
              disabled={isUser ? isUserPending : isAdminPending}
            >
              {(isUser && isUserPending) || (!isUser && isAdminPending) ? (
                <LucideLoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Register"
              )}
            </button>

            <p className="auth-foot">
              Already have an account?{" "}
              <Link to="/login" className="text-sec hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
