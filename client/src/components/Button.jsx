// components/Button.jsx
export default function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 text-white focus:ring-blue-400 ',
    secondary: 'bg-white hover:bg-indigo-600/10 border border-indigo-300 text-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-white focus:ring-zinc-500 ',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 ',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-1">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
