import Image from "next/image";

type BrandLogoSize = "sm" | "md" | "lg" | "xl";

const presets: Record<
  BrandLogoSize,
  { width: number; height: number; className: string }
> = {
  sm: { width: 128, height: 32, className: "h-8 w-auto max-h-8 sm:h-9 sm:max-h-9" },
  md: {
    width: 160,
    height: 40,
    className: "h-10 w-auto max-h-10 sm:h-11 sm:max-h-11",
  },
  lg: {
    width: 200,
    height: 50,
    className: "h-12 w-auto max-h-12 sm:h-14 sm:max-h-14 md:h-16 md:max-h-16",
  },
  xl: {
    width: 240,
    height: 60,
    className: "h-14 w-auto max-h-14 sm:h-16 sm:max-h-16 md:h-[4.5rem] md:max-h-[4.5rem]",
  },
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
  /** Defaults to "GesTURO" for accessibility */
  alt?: string;
};

export function BrandLogo({
  size = "md",
  className = "",
  priority = false,
  alt = "GesTURO",
}: BrandLogoProps) {
  const p = presets[size];
  return (
    <Image
      src="/logo/logo.png"
      alt={alt}
      width={p.width}
      height={p.height}
      className={`object-contain object-center ${p.className} ${className}`.trim()}
      priority={priority}
    />
  );
}
