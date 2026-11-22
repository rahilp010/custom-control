import React from 'react'
import { CloseRounded } from '../src/icons.jsx'

const badgeColors = {
    primary: 'bg-cc-primary text-cc-on-primary',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    neutral: 'bg-cc-overlay/20 text-cc-text'
}

export const Badge = ({
    content,
    count,
    max = 99,
    dot = false,
    color = 'danger',
    placement = 'top-right',
    className = '',
    children
}) => {
    const isStandalone = !children
    const rawContent = content !== undefined ? content : count

    const displayContent = dot
        ? null
        : typeof rawContent === 'number' && rawContent > max
            ? `${max}+`
            : rawContent

    const placementClasses = {
        'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
        'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
        'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
        'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2'
    }

    const badgeEl = (
        <span
            className={`inline-flex items-center justify-center font-bold transition-all ${dot
                    ? 'h-2.5 w-2.5 rounded-full'
                    : 'min-w-[18px] h-[18px] px-1 text-[10px] rounded-full leading-none'
                } ${badgeColors[color] || badgeColors.danger} ${!isStandalone ? `absolute ${placementClasses[placement] || placementClasses['top-right']}` : ''
                } ${className}`}
        >
            {displayContent}
        </span>
    )

    if (isStandalone) return badgeEl

    return (
        <span className="relative inline-flex shrink-0">
            {children}
            {rawContent !== undefined || dot ? badgeEl : null}
        </span>
    )
}

const tagVariants = {
    default: 'bg-cc-overlay/10 text-cc-text border border-cc-overlay/15',
    primary: 'bg-cc-primary/10 text-cc-primary border border-cc-primary/25',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25',
    error: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25',
    outline: 'bg-transparent text-cc-text border border-cc-overlay/25'
}

const tagSizes = {
    sm: 'text-xs h-6 px-2 gap-1 rounded-md',
    md: 'text-xs h-7 px-2.5 gap-1.5 rounded-lg',
    lg: 'text-sm h-8 px-3 gap-2 rounded-xl',
    small: 'text-xs h-6 px-2 gap-1 rounded-md',
    medium: 'text-xs h-7 px-2.5 gap-1.5 rounded-lg',
    large: 'text-sm h-8 px-3 gap-2 rounded-xl'
}

const getTagSizeClass = (sz) => {
    if (!sz) return tagSizes.md
    const key = typeof sz === 'string' ? sz.toLowerCase() : sz
    return tagSizes[key] || tagSizes.md
}

export const Tag = ({
    variant = 'default',
    color,
    size = 'md',
    closable = false,
    onClose,
    icon,
    className = '',
    children,
    ...props
}) => {
    const activeVariant = color ? (tagVariants[color] ? color : variant) : variant
    return (
        <span
            {...props}
            className={`inline-flex items-center font-medium select-none shrink-0 ${tagVariants[activeVariant] || tagVariants.default} ${getTagSizeClass(size)} ${className}`}
        >
            {icon && <span className="inline-flex shrink-0 items-center">{icon}</span>}
            <span>{children}</span>
            {closable && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose?.(e)
                    }}
                    aria-label="Remove tag"
                    className="inline-flex items-center justify-center rounded-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-cc-overlay/10 transition-opacity"
                >
                    <CloseRounded style={{ fontSize: 13 }} />
                </button>
            )}
        </span>
    )
}

export const Chip = Tag

export default { Badge, Tag, Chip }
