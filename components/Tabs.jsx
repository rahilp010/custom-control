import React, { createContext, useContext, useState } from 'react'
import { motion } from 'framer-motion'

const TabsContext = createContext(null)

export const Tabs = ({
    value: controlledValue,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    variant = 'line', // 'line' | 'pill' | 'segmented'
    size = 'md', // 'sm' | 'md' | 'lg'
    className = '',
    children
}) => {
    const isControlled = controlledValue !== undefined
    const [innerValue, setInnerValue] = useState(defaultValue)
    const activeValue = isControlled ? controlledValue : innerValue

    const handleSelect = (nextValue) => {
        if (!isControlled) setInnerValue(nextValue)
        onChange?.(nextValue)
    }

    return (
        <TabsContext.Provider value={{ activeValue, handleSelect, orientation, variant, size }}>
            <div
                className={`flex ${orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col gap-4'} w-full ${className}`}
            >
                {children}
            </div>
        </TabsContext.Provider>
    )
}

const tabSizes = {
    sm: 'text-xs px-2.5 py-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 min-h-[48px]'
}

const listVariants = {
    line: 'border-b border-cc-overlay/10 gap-2',
    pill: 'gap-1.5',
    segmented: 'p-1 bg-cc-overlay/5 border border-cc-overlay/10 rounded-xl gap-1'
}

Tabs.List = ({ className = '', children }) => {
    const context = useContext(TabsContext)
    const { orientation = 'horizontal', variant = 'line', activeValue, handleSelect } = context || {}

    const handleKeyDown = (e) => {
        const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]:not([disabled])'))
        if (!tabs.length) return
        const activeIndex = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')
        let targetIndex = -1

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            targetIndex = (activeIndex + 1) % tabs.length
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            targetIndex = (activeIndex - 1 + tabs.length) % tabs.length
        } else if (e.key === 'Home') {
            e.preventDefault()
            targetIndex = 0
        } else if (e.key === 'End') {
            e.preventDefault()
            targetIndex = tabs.length - 1
        }

        if (targetIndex >= 0) {
            tabs[targetIndex].focus()
            tabs[targetIndex].click()
        }
    }

    return (
        <div
            role="tablist"
            aria-orientation={orientation}
            onKeyDown={handleKeyDown}
            className={`flex ${orientation === 'vertical' ? 'flex-col items-stretch' : 'flex-row items-center flex-wrap'} ${listVariants[variant] || listVariants.line} ${className}`}
        >
            {children}
        </div>
    )
}

Tabs.Tab = ({
    value,
    disabled = false,
    icon,
    badge,
    className = '',
    children
}) => {
    const context = useContext(TabsContext)
    if (!context) return null

    const { activeValue, handleSelect, variant = 'line', size = 'md' } = context
    const isActive = String(activeValue) === String(value)

    const baseClasses =
        'relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-primary/40 disabled:cursor-not-allowed disabled:opacity-50 select-none'

    let variantClasses = ''
    if (variant === 'segmented') {
        variantClasses = isActive
            ? 'rounded-lg bg-cc-surface text-cc-text shadow-sm'
            : 'rounded-lg text-cc-muted hover:text-cc-text hover:bg-cc-overlay/5'
    } else if (variant === 'pill') {
        variantClasses = isActive
            ? 'rounded-xl bg-cc-primary text-cc-on-primary shadow-sm shadow-cc-primary/20'
            : 'rounded-xl text-cc-muted hover:bg-cc-overlay/5 hover:text-cc-text'
    } else {
        // line variant
        variantClasses = isActive
            ? 'text-cc-primary font-semibold'
            : 'text-cc-muted hover:text-cc-text hover:border-cc-overlay/30'
    }

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => handleSelect(value)}
            className={`${baseClasses} ${tabSizes[size] || tabSizes.md} ${variantClasses} ${className}`}
        >
            {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
            <span>{children}</span>
            {badge !== undefined && badge !== null && (
                <span
                    className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${isActive && variant === 'pill'
                            ? 'bg-cc-surface text-cc-text'
                            : 'bg-cc-primary/10 text-cc-primary'
                        }`}
                >
                    {badge}
                </span>
            )}
            {variant === 'line' && isActive && (
                <motion.div
                    layoutId="cc-tab-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cc-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
            )}
        </button>
    )
}

Tabs.Panel = ({ value, className = '', children }) => {
    const context = useContext(TabsContext)
    if (!context) return null

    const { activeValue } = context
    if (String(activeValue) !== String(value)) return null

    return (
        <div role="tabpanel" tabIndex={0} className={`outline-none ${className}`}>
            {children}
        </div>
    )
}

export default Tabs
