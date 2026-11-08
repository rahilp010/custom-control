import React from 'react'

/**
 * Tiny internal icon set so the package does not force consumers to install an
 * icon library. Icons inherit `currentColor` and accept `size` / `strokeWidth`.
 */
const SvgIcon = ({ children, size = 18, strokeWidth = 2, style, className = '', ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={style?.fontSize ?? size}
        height={style?.fontSize ?? size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={`shrink-0 ${className}`}
        style={style}
        {...props}
    >
        {children}
    </svg>
)

export const SearchRoundedIcon = (props) => (
    <SvgIcon {...props}>
        <circle cx="11" cy="11" r="7.5" />
        <line x1="16.6" y1="16.6" x2="20.5" y2="20.5" />
    </SvgIcon>
)

export const CalendarTodayRounded = (props) => (
    <SvgIcon {...props}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
        <line x1="3.5" y1="10" x2="20.5" y2="10" />
    </SvgIcon>
)

export const KeyboardArrowDownRounded = (props) => (
    <SvgIcon {...props}>
        <polyline points="6 9.5 12 15.5 18 9.5" />
    </SvgIcon>
)

export const KeyboardArrowUpOutlinedIcon = (props) => (
    <SvgIcon {...props}>
        <polyline points="6 14.5 12 8.5 18 14.5" />
    </SvgIcon>
)

export const CloseRounded = (props) => (
    <SvgIcon {...props}>
        <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
        <line x1="17.5" y1="6.5" x2="6.5" y2="17.5" />
    </SvgIcon>
)

export const AddRounded = (props) => (
    <SvgIcon {...props}>
        <line x1="12" y1="5.5" x2="12" y2="18.5" />
        <line x1="5.5" y1="12" x2="18.5" y2="12" />
    </SvgIcon>
)

export const ClearOutlinedIcon = (props) => (
    <SvgIcon {...props}>
        <circle cx="12" cy="12" r="9" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
    </SvgIcon>
)

export const ChevronLeftOutlinedIcon = (props) => (
    <SvgIcon {...props}>
        <polyline points="14.5 5.5 8 12 14.5 18.5" />
    </SvgIcon>
)

export const ChevronRightOutlinedIcon = (props) => (
    <SvgIcon {...props}>
        <polyline points="9.5 5.5 16 12 9.5 18.5" />
    </SvgIcon>
)

export const AccessTimeOutlinedIcon = (props) => (
    <SvgIcon {...props}>
        <circle cx="12" cy="12" r="8.5" />
        <polyline points="12 7.5 12 12 15.5 14" />
    </SvgIcon>
)

export const CheckRoundedIcon = (props) => (
    <SvgIcon {...props}>
        <polyline points="5 12.5 9.5 17 19 7" />
    </SvgIcon>
)

export const EyeRoundedIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.8" />
    </SvgIcon>
)

export const EyeOffRoundedIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M4 5.5 20 18.5" />
        <path d="M9.6 6.1A10.7 10.7 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17 17 0 0 1-2.6 3.4" />
        <path d="M6.3 8.2A17.4 17.4 0 0 0 2 12s3.6 6.5 10 6.5a10.9 10.9 0 0 0 4.3-.9" />
        <path d="M10 10a2.8 2.8 0 0 0 4 4" />
    </SvgIcon>
)

export const MinusRoundedIcon = (props) => (
    <SvgIcon {...props}>
        <line x1="5.5" y1="12" x2="18.5" y2="12" />
    </SvgIcon>
)

export default SvgIcon
