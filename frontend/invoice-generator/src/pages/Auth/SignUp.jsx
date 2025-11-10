import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  FileText,
  ArrowRight,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if(touched[name])
    {
      const newFieldErrors = { ...fieldErrors };
      if(name === 'email')
      {
        newFieldErrors.email = validateEmail(value);
      }
      else if(name === 'password'){
        newFieldErrors.password = validatePassword(value);
      }
      else if(name === 'confirmPassword'){
        newFieldErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match";
      }
      setFieldErrors(newFieldErrors);
    }
    if (error) setError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    const newFieldErrors = {...fieldErrors};
    if(name === "email")
    {
      newFieldErrors.email = validateEmail(value);
    }
    else if (name === "password")
    {
      newFieldErrors.password = validatePassword(value);
      // Also validate confirm password if it's already filled
      if(formData.confirmPassword) {
        newFieldErrors.confirmPassword = value === formData.confirmPassword ? "" : "Passwords do not match";
      }
    }
    else if (name === "confirmPassword")
    {
      newFieldErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match";
    }
    else if (name === "name")
    {
      newFieldErrors.name = value ? "" : "Name is required";
    }
    setFieldErrors(newFieldErrors);
  };

  const isFormValid = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password === formData.confirmPassword ? "" : "Passwords do not match";
    const nameError = formData.name ? "" : "Name is required";
    
    return !emailError && !passwordError && !confirmPasswordError && !nameError && 
           formData.name && formData.email && formData.password && formData.confirmPassword;
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password === formData.confirmPassword ? "" : "Passwords do not match";
    const nameError = formData.name ? "" : "Name is required";

    if(emailError || passwordError || confirmPasswordError || nameError)
    {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);
      if(response.status === 200 || response.status === 201)
      {
        const { token } = response.data;
        if(token)
        {
          setSuccess("Account created successfully!");
          login(response.data.user, token);

          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        }
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm border-red-700 border-2 rounded-lg px-4 py-4 bg-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-red-300 rounded-xl mx-auto mb-6 flex items-center justify-center hover:bg-red-600">
            <FileText className="w-6 h-6 text-black hover:text-red-50" />
          </div>
          <h1 className="text-3xl font-bold text-red-800">Create Account</h1>
          <p className="text-xl font-light">Sign up to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-3 bg-green-100 border border-green-300 rounded-xl text-green-800 font-semibold text-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* Sign Up Form */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-red-900 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-800 w-5 h-5" />
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  touched.name && fieldErrors.name
                    ? "border-red-300 focus:ring-red-50"
                    : "border-gray-300 focus:ring-black"
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {touched.name && fieldErrors.name && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-red-900 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-800 w-5 h-5" />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  touched.email && fieldErrors.email
                    ? "border-red-300 focus:ring-red-50"
                    : "border-gray-300 focus:ring-black"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {touched.email && fieldErrors.email && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-red-900 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-800 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  touched.password && fieldErrors.password
                    ? "border-red-300 focus:ring-red-50"
                    : "border-gray-300 focus:ring-black"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {touched.password && fieldErrors.password && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-red-900 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-800 w-5 h-5" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                  touched.confirmPassword && fieldErrors.confirmPassword
                    ? "border-red-300 focus:ring-red-50"
                    : "border-gray-300 focus:ring-black"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {touched.confirmPassword && fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid()}
            className="w-full bg-red-800 text-white py-3 px-4 rounded-lg font-medium text-xl hover:text-black hover:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center group"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-8 text-center border-t border-red-800">
          <p className="text-md font-medium text-black">
            Already have an account?{" "}
            <button
              className="text-red-800 hover:text-black font-bold transition-colors duration-200 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;