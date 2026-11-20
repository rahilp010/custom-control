import React from 'react'

export const Divider = ({
    orientation = 'horizontal', // 'horizontal' | 'vertical'
    align = 'center', // 'left' | 'center' | 'right'
    className = '',
    children
}) => {
    if (orientation === 'vertical') {
        return (
            <div
                role="separator"
                aria-orientation="vertical"
                className={`inline-block h-auto min-h-[1em] w-px self-stretch bg-cc-overlay/15 mx-2 align-middle ${className}`}
            />
        )
    }

    if (!children) {
        return (
            <div
                role="separator"
                aria-orientation="horizontal"
                className={`my-4 w-full border-t border-cc-overlay/10 ${className}`}
            />
        )
    }

    const alignClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    }

    return (
        <div
            role="separator"
            aria-orientation="horizontal"
            className={`my-4 flex items-center ${alignClasses[align] || alignClasses.center} text-xs font-medium text-cc-muted ${className}`}
        >
            <div className={`h-px bg-cc-overlay/10 ${align === 'left' ? 'w-6' : 'flex-1'}`} />
            <span className="px-3 select-none">{children}</span>
            <div className={`h-px bg-cc-overlay/10 ${align === 'right' ? 'w-6' : 'flex-1'}`} />
        </div>
    )
}

export default Divider
