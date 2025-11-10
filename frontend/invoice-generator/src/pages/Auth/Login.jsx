import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  ArrowRight,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail , validatePassword } from "../../utils/helper";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if(touched[name])
    {
      const newFieldErrors={ ...fieldErrors};
      if(name==='email')
      {
        newFieldErrors.email=validateEmail(value);
      }
      else if(name==='password'){
        newFieldErrors.password=validatePassword(value);
      }
      setFieldErrors(newFieldErrors);
    }
    if (error) setError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    const newFieldErrors={...fieldErrors};
    if(name==="email")
    {
      newFieldErrors.email= validateEmail(formData.email);
    }
    else if (name==="password")
    {
      newFieldErrors.password= validatePassword(formData.password);
    }
    setFieldErrors(newFieldErrors);
  };

  const isFormValid = () => {
    const emailError= validateEmail(formData.email);
    const passwordError= validatePassword(formData.password);
    return !emailError && !passwordError && formData.email && formData.password;
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
  
    console.log("🔍 1. Form validation:", { emailError, passwordError });
    
    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
      });
      setTouched({
        email: true,
        password: true,
      });
      return;
    }
    
    console.log("🔍 2. Starting API call...");
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("🔍 3. Making POST request to:", API_PATHS.AUTH.LOGIN);
      console.log("🔍 4. With data:", formData);
      
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      
      console.log("🔍 5. API Response received:", response);
      console.log("🔍 6. Response data:", response.data);
      
      if (response.status === 200) {
        // ✅ FIXED: Match your backend response structure
        const token = response.data.token;
        console.log("🔍 7. Extracted token:", token);
        
        if (token) {
          setSuccess("Login Successful");
          
          // ✅ FIXED: Create user object from backend response
          const userData = {
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            businessName: response.data.businessName || "",
            address: response.data.address || "",
            phone: response.data.phone || ""
          };
          
          console.log("🔍 8. Created user data:", userData);
          console.log("🔍 9. Calling login() with:", { userData, token });
          login(userData, token);
  
          setTimeout(() => {
            console.log("🔍 10. Redirecting to dashboard");
            window.location.href = '/dashboard';
          }, 2000);
        } else {
          setError("No token received from server");
        }
      } else {
        setError(response.data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("🔍 ❌ API Error:", err);
      console.error("🔍 ❌ Error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError("An error occurred during login.");
      }
    } finally {
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
          <h1 className="text-3xl font-bold text-red-800">Welcome Back</h1>
          <p className="text-xl font-light">Sign in to your account to continue</p>
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

        {/* Login Form */}
        <div className="space-y-4">
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
                    ? "border-red-300  focus:ring-red-50"
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
              <p className="mt-1 text-sm text-red-500">
                {fieldErrors.password}
              </p>
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
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center border-t border-red-800">
          <p className="text-md font-medium text-black">
            Don't have an account?{" "}
            <button
              className="text-red-800 hover:text-black font-bold transition-colors duration-200 hover:underline"
              onClick={()=>navigate("/signup")}
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
