import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  iconSize?: number;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({
  className = '',
  iconOnly = false,
  iconSize = 32,
  showText = true,
  textClassName = '',
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden" style={{ width: iconSize, height: iconSize }}>
        <Image
          src="/soilsync logo.svg"
          alt="SoilSync"
          width={iconSize}
          height={iconSize}
          className="object-contain"
        />
      </span>
      {!iconOnly && showText && (
        <span className={`font-bold tracking-tight ${textClassName || 'text-lg text-foreground'}`}>
          SoilSync
        </span>
      )}
    </span>
  );
}
