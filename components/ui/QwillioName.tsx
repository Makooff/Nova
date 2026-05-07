interface QwillioNameProps {
  size?: number | string;
  className?: string;
}

export default function QwillioName({ size = "inherit", className = "" }: QwillioNameProps) {
  return (
    <span
      className={`qw-gradient-text font-jakarta font-extrabold ${className}`}
      style={{ fontSize: size !== "inherit" ? size : undefined }}
    >
      Qwillio
    </span>
  );
}
