type ShimmerPlaceholderProps = {
  aspectRatio?: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
};

export const ShimmerPlaceholder = ({ aspectRatio, width, height }: ShimmerPlaceholderProps) => {
  return (
    <div
      className="before:animate-shimmer relative overflow-hidden bg-[#f0f0f0] before:absolute before:top-0 before:-left-full before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:content-['']"
      style={{ aspectRatio, paddingBottom: `${(height / width) * 100}%` }}
    />
  );
};
