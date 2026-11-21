import React, { useState } from 'react'

const avatarSizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
    xl: 'h-14 w-14 text-lg'
}

const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-cc-muted',
    busy: 'bg-red-500',
    away: 'bg-amber-500'
}

export const Avatar = ({
    src,
    alt = '',
    name = '',
    size = 'md',
    shape = 'circle', // 'circle' | 'square'
    status,
    className = '',
    ...props
}) => {
    const [imageError, setImageError] = useState(false)

    const getInitials = (str) => {
        if (!str) return ''
        const parts = str.trim().split(/\s+/)
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return str.slice(0, 2).toUpperCase()
    }

    const showImg = src && !imageError
    const sizeClass = avatarSizes[size] || avatarSizes.md
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl'

    return (
        <div
            {...props}
            className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-cc-overlay/10 bg-cc-surface-2 font-semibold text-cc-text select-none ${sizeClass} ${shapeClass} ${className}`}
        >
            {showImg ? (
                <img
                    src={src}
                    alt={alt || name}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{getInitials(name || alt)}</span>
            )}

            {status && (
                <span
                    aria-label={`Status: ${status}`}
                    className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-cc-surface ${statusColors[status] || statusColors.online}`}
                />
            )}
        </div>
    )
}

export const AvatarGroup = ({
    max = 4,
    size = 'md',
    className = '',
    children
}) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = childrenArray.slice(0, max)
    const extraCount = childrenArray.length - max

    const sizeClass = avatarSizes[size] || avatarSizes.md

    return (
        <div className={`flex items-center -space-x-2.5 ${className}`}>
            {visibleChildren.map((child, index) => {
                if (!React.isValidElement(child)) return child
                return React.cloneElement(child, {
                    key: index,
                    size: child.props.size || size,
                    className: `ring-2 ring-cc-surface ${child.props.className || ''}`
                })
            })}

            {extraCount > 0 && (
                <div
                    className={`relative inline-flex shrink-0 items-center justify-center rounded-full border border-cc-overlay/10 bg-cc-surface-2 font-bold text-xs text-cc-muted ring-2 ring-cc-surface ${sizeClass}`}
                >
                    +{extraCount}
                </div>
            )}
        </div>
    )
}

export default { Avatar, AvatarGroup }
