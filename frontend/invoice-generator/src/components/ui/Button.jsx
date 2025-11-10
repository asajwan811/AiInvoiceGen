import { Loader2 } from "lucide-react";

const Button = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  children,
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-red-700 hover:bg-red-800 text-white focus:ring-red-500 shadow-sm hover:shadow border border-red-700",
    secondary: "bg-white hover:bg-red-50 text-red-700 border border-red-300 shadow-sm hover:shadow focus:ring-red-500",
    ghost: "bg-transparent hover:bg-red-50 text-red-700 focus:ring-red-500 hover:shadow-sm border border-transparent hover:border-red-200",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 h-8 text-sm gap-1.5",
    medium: "px-4 py-2.5 h-10 text-sm gap-2", 
    large: "px-6 py-3 h-12 text-base gap-2.5",
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <>
          {Icon && <Icon className={`${iconSizes[size]} flex-shrink-0`} />}
          <span className="whitespace-nowrap">{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;