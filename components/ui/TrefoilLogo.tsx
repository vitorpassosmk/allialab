interface TrefoilLogoProps {
  size?: number
  className?: string
}

export default function TrefoilLogo({ size = 32, className }: TrefoilLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="32" r="22" stroke="#4D8FD6" strokeWidth="6" opacity="0.95" />
      <circle cx="31" cy="64" r="22" stroke="#3570B5" strokeWidth="6" opacity="0.95" />
      <circle cx="69" cy="64" r="22" stroke="#27568C" strokeWidth="6" opacity="0.95" />
    </svg>
  )
}
