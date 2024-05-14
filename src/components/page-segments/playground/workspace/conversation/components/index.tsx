export const ConvoDemoLogoSymbol = ({ src }) => {
  return (
    <div className="absolute bottom-6 right-6 hover:opacity-80 transition-all duration-300">
      <img src={src} className="w-10 h-10 rounded-sm" draggable={false} />
    </div>
  );
};
