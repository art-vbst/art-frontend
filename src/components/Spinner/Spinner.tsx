type SpinnerProps = {
  width?: number;
  height?: number;
  text?: string;
};

export const Spinner = ({ width = 64, height = 64, text }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-full animate-spin border-4 border-gray-200 border-t-transparent"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      {text && <p className="text-gray-light">{text}</p>}
    </div>
  );
};
