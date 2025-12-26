const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin mb-3`}
      />
      {text && <p className="text-muted-foreground font-body text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
