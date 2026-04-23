interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  white?: boolean;
}

export default function Logo({ size = 'md', white = true }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  const color = white ? '#FFFFFF' : '#0D0D0D';
  const { icon, text } = sizes[size];

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <svg
        width={icon}
        height={icon * 0.85}
        viewBox="0 0 40 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5"
      >
        <polygon points="20,2 38,32 2,32" fill={color} />
        <polygon points="20,10 30,28 10,28" fill={white ? '#0D0D0D' : '#FFFFFF'} />
        <polygon points="20,16 25,26 15,26" fill={color} />
      </svg>
      <span
        className={`font-heading tracking-widest ${text}`}
        style={{ color, fontFamily: '"Bebas Neue", cursive', letterSpacing: '0.2em' }}
      >
        ZISCILINE
      </span>
    </div>
  );
}
