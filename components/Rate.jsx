import React, { useState } from 'react'
import { StarFilledIcon, StarOutlinedIcon } from '../src/icons.jsx'

export const Rate = ({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    max = 5,
    allowHalf = false,
    disabled = false,
    readOnly = false,
    size = 'md',
    color = 'text-amber-400',
    character,
    name,
    className = '',
    ...props
}) => {
    const isControlled = controlledValue !== undefined
    const [innerValue, setInnerValue] = useState(defaultValue)
    const [hoverValue, setHoverValue] = useState(null)

    const currentValue = isControlled ? controlledValue : innerValue
    const activeValue = hoverValue !== null ? hoverValue : currentValue
    const normSize = typeof size === 'string' ? size.toLowerCase() : size
    const iconSize = {
        sm: 16,
        md: 20,
        lg: 28,
        small: 16,
        medium: 20,
        large: 28
    }[normSize] || 20

    const handleClick = (val) => {
        if (disabled || readOnly) return
        if (!isControlled) setInnerValue(val)
        onChange?.(val)
    }

    const handleMouseMove = (index, e) => {
        if (disabled || readOnly) return
        if (!allowHalf) {
            setHoverValue(index + 1)
            return
        }
        const rect = e.currentTarget.getBoundingClientRect()
        const isLeftHalf = e.clientX - rect.left < rect.width / 2
        setHoverValue(isLeftHalf ? index + 0.5 : index + 1)
    }

    const handleMouseLeave = () => {
        if (disabled || readOnly) return
        setHoverValue(null)
    }

    const handleKeyDown = (e) => {
        if (disabled || readOnly) return
        const step = allowHalf ? 0.5 : 1
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault()
            const next = Math.min(max, Math.round(((currentValue || 0) + step) * 2) / 2)
            handleClick(next)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault()
            const next = Math.max(0, Math.round(((currentValue || 0) - step) * 2) / 2)
            handleClick(next)
        } else if (e.key === 'Home') {
            e.preventDefault()
            handleClick(0)
        } else if (e.key === 'End') {
            e.preventDefault()
            handleClick(max)
        }
    }

    return (
        <div
            {...props}
            role="radiogroup"
            aria-label="Rating"
            tabIndex={disabled || readOnly ? -1 : 0}
            onKeyDown={handleKeyDown}
            onMouseLeave={handleMouseLeave}
            className={`inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cc-primary/40 rounded-lg ${disabled ? 'opacity-50 cursor-not-allowed' : readOnly ? 'cursor-default' : 'cursor-pointer'} ${className}`}
        >
            {name && <input type="hidden" name={name} value={currentValue} disabled={disabled} />}
            {Array.from({ length: max }, (_, index) => {
                const isFull = activeValue >= index + 1
                const isHalf = allowHalf && activeValue >= index + 0.5 && activeValue < index + 1

                return (
                    <button
                        key={index}
                        type="button"
                        disabled={disabled || readOnly}
                        tabIndex={readOnly ? -1 : 0}
                        aria-label={`${index + 1} stars`}
                        onClick={() => handleClick(hoverValue !== null ? hoverValue : index + 1)}
                        onMouseMove={(e) => handleMouseMove(index, e)}
                        className="relative flex items-center justify-center p-0.5 focus:outline-none transition-transform hover:scale-110"
                    >
                        {character ? (
                            <span className={isFull ? color : 'text-cc-overlay/30'}>{character}</span>
                        ) : isFull ? (
                            <StarFilledIcon size={iconSize} className={color} />
                        ) : isHalf ? (
                            <span
                                className="relative block shrink-0"
                                style={{ width: iconSize, height: iconSize }}
                            >
                                <StarOutlinedIcon size={iconSize} className="block text-cc-overlay/30" />
                                <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                                    <StarFilledIcon size={iconSize} className={color} />
                                </span>
                            </span>
                        ) : (
                            <StarOutlinedIcon size={iconSize} className="text-cc-overlay/30 hover:text-cc-overlay/50" />
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default Rate
