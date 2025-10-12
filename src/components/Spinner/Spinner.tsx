type SpinnerProps = {
  width?: number;
  height?: number;
  text?: string;
};

export const Spinner = ({ width = 64, height = 64, text }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div
        className="rounded-full animate-spin border-solid border-[5px] border-[#eee_#eee_transparent_transparent]"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      {text && <p className="text-gray-light">{text}</p>}
    </div>
  );
};
