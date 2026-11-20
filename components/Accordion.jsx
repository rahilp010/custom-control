import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyboardArrowDownRounded } from '../src/icons.jsx'

const AccordionContext = createContext(null)
const AccordionItemContext = createContext(null)

export const Accordion = ({
    activeKey: controlledKey,
    defaultActiveKey,
    onChange,
    accordion = true, // If true, only one panel open at once
    className = '',
    children
}) => {
    const isControlled = controlledKey !== undefined
    const [innerKey, setInnerKey] = useState(
        defaultActiveKey !== undefined
            ? accordion
                ? defaultActiveKey
                : Array.isArray(defaultActiveKey)
                    ? defaultActiveKey
                    : [defaultActiveKey]
            : accordion
                ? null
                : []
    )

    const currentKey = isControlled ? controlledKey : innerKey

    const toggle = (key) => {
        let next
        if (accordion) {
            next = currentKey === key ? null : key
        } else {
            const list = Array.isArray(currentKey) ? currentKey : currentKey ? [currentKey] : []
            next = list.includes(key) ? list.filter((k) => k !== key) : [...list, key]
        }

        if (!isControlled) setInnerKey(next)
        onChange?.(next)
    }

    const isExpanded = (key) => {
        if (accordion) return currentKey === key
        return Array.isArray(currentKey) ? currentKey.includes(key) : currentKey === key
    }

    return (
        <AccordionContext.Provider value={{ toggle, isExpanded }}>
            <div className={`space-y-2 w-full ${className}`}>{children}</div>
        </AccordionContext.Provider>
    )
}

Accordion.Item = ({ eventKey, disabled = false, className = '', children }) => {
    return (
        <AccordionItemContext.Provider value={{ eventKey, disabled }}>
            <div
                className={`overflow-hidden rounded-2xl border border-cc-overlay/10 bg-cc-surface transition-all ${disabled ? 'opacity-50' : ''} ${className}`}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    )
}

Accordion.Header = ({ className = '', children }) => {
    const { toggle, isExpanded } = useContext(AccordionContext) || {}
    const { eventKey, disabled } = useContext(AccordionItemContext) || {}

    const open = isExpanded?.(eventKey)

    return (
        <button
            type="button"
            disabled={disabled}
            aria-expanded={open}
            onClick={() => !disabled && toggle?.(eventKey)}
            className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-cc-text transition-colors hover:bg-cc-overlay/5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        >
            <span className="truncate pr-4">{children}</span>
            <KeyboardArrowDownRounded
                size={20}
                strokeWidth={2}
                className={`shrink-0 text-cc-muted transition-transform duration-200 ${open ? 'rotate-180 text-cc-primary' : ''}`}
            />
        </button>
    )
}

Accordion.Body = ({ className = '', children }) => {
    const { isExpanded } = useContext(AccordionContext) || {}
    const { eventKey } = useContext(AccordionItemContext) || {}

    const open = isExpanded?.(eventKey)

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className={`border-t border-cc-overlay/10 px-5 py-4 text-sm leading-relaxed text-cc-text/90 ${className}`}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Accordion
