function Spinner({
  size = "md",
  color = "blue",
  text = "",
  fullScreen = false,
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const colors = {
    blue: "border-blue-600",
    red: "border-red-600",
    green: "border-green-600",
    gray: "border-gray-600",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`
          ${sizes[size]}
          ${colors[color]}
          border-t-transparent
          rounded-full
          animate-spin
        `}
      ></div>

      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Spinner;