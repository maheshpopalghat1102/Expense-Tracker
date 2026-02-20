const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseStyle =
    "px-4 py-2 rounded-xl font-medium transition focus:outline-none";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-indigo-700",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600",
    secondary:
      "bg-gray-200 text-slate-700 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
