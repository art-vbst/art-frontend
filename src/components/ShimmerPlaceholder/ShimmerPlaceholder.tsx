type ShimmerPlaceholderProps = {
  aspectRatio?: string;
  style?: React.CSSProperties;
};

export const ShimmerPlaceholder = ({ aspectRatio, style }: ShimmerPlaceholderProps) => {
  return (
    <div
      className="bg-[#f0f0f0] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:-left-full before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-shimmer"
      style={{ aspectRatio, ...style }}
    />
  );
};
