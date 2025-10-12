type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-8 mt-16 [&>*]:text-center">{children}</div>
  );
};
