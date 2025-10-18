type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="mt-16 flex flex-col items-center gap-4 p-8 text-center">
      {children}
    </div>
  );
};
