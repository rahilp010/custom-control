import React from 'react'

export const Divider = ({
    orientation = 'horizontal', // 'horizontal' | 'vertical'
    direction,
    align = 'center', // 'left' | 'center' | 'right'
    dashed = false,
    className = '',
    children
}) => {
    const activeOrientation = direction || orientation
    const borderStyle = dashed ? 'border-dashed' : 'border-solid'

    if (activeOrientation === 'vertical') {
        return (
            <div
                role="separator"
                aria-orientation="vertical"
                className={`inline-block h-auto min-h-[1em] w-0 self-stretch border-l border-cc-overlay/15 mx-2 align-middle ${borderStyle} ${className}`}
            />
        )
    }

    if (!children) {
        return (
            <div
                role="separator"
                aria-orientation="horizontal"
                className={`my-4 w-full border-t border-cc-overlay/10 ${borderStyle} ${className}`}
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
            <div className={`border-t border-cc-overlay/10 ${borderStyle} ${align === 'left' ? 'w-6' : 'flex-1'}`} />
            <span className="px-3 select-none">{children}</span>
            <div className={`border-t border-cc-overlay/10 ${borderStyle} ${align === 'right' ? 'w-6' : 'flex-1'}`} />
        </div>
    )
}

export default Divider
