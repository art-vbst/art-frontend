import { ChevronsUp, Github, Instagram, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Footer = () => {
  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const [bodyScrollable, setBodyScrollable] = useState(false);

  const scrollUpVisibleTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    scrollUpVisibleTimeoutRef.current = setTimeout(() => {
      setScrollUpVisible(true);
    }, 5000);

    const observer = new ResizeObserver(() => {
      const scrollable = document.body.scrollHeight > window.innerHeight;
      setBodyScrollable(scrollable);
    });

    observer.observe(document.body);

    return () => {
      scrollUpVisibleTimeoutRef.current &&
        clearTimeout(scrollUpVisibleTimeoutRef.current);
      observer.disconnect();
    };
  }, []);

  const footerIcons = [
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/art-vbst/art-frontend',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: 'https://www.instagram.com/violetbergeson.art',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-8 bg-gradient-to-b from-gray-50 to-transparent px-12 py-8 sm:flex-row sm:py-12">
      <div className="flex flex-col items-center gap-4 sm:items-start">
        <p className="text-center text-sm text-gray-400 sm:text-left">
          &copy; {new Date().getFullYear()} Violet Bergeson. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          {footerIcons.map((icon) => (
            <FooterIcon key={icon.href} icon={icon.icon} href={icon.href} />
          ))}
        </div>
      </div>
      {scrollUpVisible && bodyScrollable && (
        <button
          className="animate-in fade-in cursor-pointer rounded-full border-none bg-gray-50 bg-transparent p-2 transition-all duration-200 hover:bg-gray-100"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ChevronsUp className="h-6 w-6 text-gray-400 sm:h-7 sm:w-7" />
        </button>
      )}
    </div>
  );
};

type FooterIconProps = {
  icon: React.ReactNode;
  href: string;
};

const FooterIcon = ({ icon, href }: FooterIconProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
    >
      {icon}
    </a>
  );
};
