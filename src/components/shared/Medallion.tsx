import "./Medallion.css";

type Props = {
  src: string;
  alt: string;
  size?: number;
};

// Circular logo "chip" on a dark backdrop so even white-on-transparent logos
// (e.g. DIGITALHeadhunter) stay visible and every logo reads at one uniform size.
export default function Medallion({ src, alt, size = 84 }: Props) {
  return (
    <div className="medallion" style={{ width: size, height: size }}>
      <div className="medallion__ring" />
      <div className="medallion__inner">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
