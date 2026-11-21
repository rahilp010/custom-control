import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemedPortal } from '../src/theme.jsx'

const panelClass = 'border border-cc-overlay/10 bg-cc-surface text-cc-text shadow-2xl shadow-cc-scrim/15'

export const DropdownMenu = ({
    trigger = 'click', // 'click' | 'hover'
    placement = 'bottom-start',
    width = 200,
    className = '',
    menuClassName = '',
    renderTrigger,
    children
}) => {
    const [open, setOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const triggerRef = useRef(null)
    const menuRef = useRef(null)
    const menuId = useId()

    const handleClose = useCallback(() => {
        setOpen(false)
        setFocusedIndex(-1)
    }, [])

    useEffect(() => {
        const handler = (e) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                handleClose()
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [handleClose])

    const [coords, setCoords] = useState({ top: 0, left: 0 })

    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return
        const rect = triggerRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const placeAbove = spaceBelow < 200 && rect.top > 200

        let left = rect.left
        if (placement.endsWith('end')) {
            left = rect.right - width
        }
        if (left + width > window.innerWidth - 12) {
            left = Math.max(12, window.innerWidth - width - 12)
        }

        setCoords({
            top: placeAbove ? rect.top - 6 : rect.bottom + 6,
            left,
            placement: placeAbove ? 'top' : 'bottom'
        })
    }, [placement, width])

    useEffect(() => {
        if (open) {
            updatePosition()
            window.addEventListener('resize', updatePosition)
            window.addEventListener('scroll', updatePosition, true)
            return () => {
                window.removeEventListener('resize', updatePosition)
                window.removeEventListener('scroll', updatePosition, true)
            }
        }
    }, [open, updatePosition])

    const handleKeyDown = (e) => {
        if (!open) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                e.preventDefault()
                updatePosition()
                setOpen(true)
            }
            return
        }

        if (e.key === 'Escape') {
            e.preventDefault()
            handleClose()
        }
    }

    const renderTriggerContent = () => {
        const triggerProps = {
            open,
            onClick: () => {
                if (!open) updatePosition()
                setOpen((v) => !v)
            },
            onKeyDown: handleKeyDown
        }

        if (renderTrigger) {
            return renderTrigger(triggerProps)
        }

        if (React.isValidElement(trigger)) {
            return React.cloneElement(trigger, {
                onClick: (e) => {
                    trigger.props.onClick?.(e)
                    triggerProps.onClick()
                },
                onKeyDown: (e) => {
                    trigger.props.onKeyDown?.(e)
                    triggerProps.onKeyDown(e)
                }
            })
        }

        return (
            <button
                type="button"
                onClick={triggerProps.onClick}
                onKeyDown={triggerProps.onKeyDown}
                className="inline-flex items-center justify-center rounded-xl border border-cc-overlay/10 bg-cc-surface px-3 py-2 text-sm text-cc-text hover:bg-cc-overlay/5"
            >
                Menu
            </button>
        )
    }

    return (
        <div ref={triggerRef} className={`relative inline-block ${className}`}>
            {renderTriggerContent()}

            <ThemedPortal>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={menuRef}
                            id={menuId}
                            role="menu"
                            initial={{ opacity: 0, y: coords.placement === 'top' ? 4 : -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: coords.placement === 'top' ? 4 : -4 }}
                            transition={{ duration: 0.1, ease: 'easeOut' }}
                            style={{
                                position: 'fixed',
                                top: coords.placement === 'top' ? undefined : coords.top,
                                bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                                left: coords.left,
                                width,
                                zIndex: 'var(--cc-z)'
                            }}
                            className={`overflow-hidden rounded-2xl p-1.5 ${panelClass} ${menuClassName}`}
                            onClick={(e) => {
                                // Close menu when an item without preventClose is clicked
                                if (e.target.closest('[role="menuitem"]')) {
                                    handleClose()
                                }
                            }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </ThemedPortal>
        </div>
    )
}

DropdownMenu.Item = ({
    icon,
    shortcut,
    danger = false,
    disabled = false,
    onClick,
    className = '',
    children
}) => (
    <button
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${disabled
                ? 'cursor-not-allowed opacity-40'
                : danger
                    ? 'text-red-500 hover:bg-red-500/10 hover:text-red-600'
                    : 'text-cc-text hover:bg-cc-overlay/10'
            } ${className}`}
    >
        <span className="flex items-center gap-2.5 truncate">
            {icon && <span className="inline-flex shrink-0">{icon}</span>}
            <span className="truncate">{children}</span>
        </span>
        {shortcut && <span className="text-[11px] font-mono text-cc-muted">{shortcut}</span>}
    </button>
)

DropdownMenu.Separator = ({ className = '' }) => (
    <div role="separator" className={`my-1 border-t border-cc-overlay/10 ${className}`} />
)

DropdownMenu.Header = ({ children, className = '' }) => (
    <div className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cc-muted ${className}`}>
        {children}
    </div>
)

export default DropdownMenu
