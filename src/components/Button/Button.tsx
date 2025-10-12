import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseClasses =
    'py-3 px-[30px] rounded text-sm cursor-pointer transition-[background-color] duration-200 ease border-none';

  const variantClasses = {
    primary:
      'bg-gray-dark text-white hover:bg-gray-dark/90 active:bg-gray-dark/80 disabled:bg-gray-light disabled:text-[#eee] disabled:cursor-not-allowed disabled:hover:bg-gray-light',
    outline:
      'bg-transparent text-gray-dark border border-gray-dark hover:bg-gray-dark hover:text-white active:bg-gray-dark/90 disabled:text-[#aaa] disabled:border-[#aaa] disabled:cursor-not-allowed disabled:hover:bg-transparent',
  };

  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props} />;
};
