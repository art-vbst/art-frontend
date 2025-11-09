import * as React from 'react';
import { cn } from '~/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantClasses;
};

const baseClasses =
  'py-3 px-6 rounded cursor-pointer transition-colors duration-200 ease disabled:cursor-not-allowed';

const variantClasses = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-800 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:active:bg-gray-500 border-none',
  outline:
    'bg-transparent text-black border border-black hover:bg-gray-50 active:bg-gray-100',
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
