interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const HomeIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M12 2l10 9h-3v8a1 1 0 01-1 1h-4v-6H10v6H6a1 1 0 01-1-1v-8H2l10-9z" />
  </svg>
);

export const SearchIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const PlusIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const HeartIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  className = "",
  color = "#EF4444",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const MessageIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const UserIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const NotificationIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const ShareIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const MoreIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export const ArrowBackIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
);

export const FilterIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

export const CheckIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

export const EditIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export const TrashIcon = ({
  size = 24,
  className = "",
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
  >
    <polyline points="3,6 5,6 21,6" />
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
  </svg>
);
