import * as React from 'react';
import { cn } from '~/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantClasses;
};

const baseClasses =
  'py-3 px-6 rounded text-sm cursor-pointer transition-colors duration-200 ease border-none disabled:cursor-not-allowed';

const variantClasses = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-800 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:active:bg-gray-500',
  outline:
    'bg-transparent text-gray-dark border border-gray-dark hover:bg-gray-dark hover:text-white active:bg-gray-dark/90 disabled:text-[#aaa] disabled:border-[#aaa] disabled:cursor-not-allowed disabled:hover:bg-transparent',
};

export const Button = ({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
};
