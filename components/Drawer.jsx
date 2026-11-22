import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseRounded } from '../src/icons.jsx'
import { ThemedPortal } from '../src/theme.jsx'

export const Drawer = ({
    open = false,
    onClose,
    placement = 'right', // 'right' | 'left' | 'top' | 'bottom'
    size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'full'
    closeOnEsc = true,
    closeOnBackdropClick = true,
    bodyLock = true,
    className = '',
    children
}) => {
    useEffect(() => {
        if (!open) return undefined
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && closeOnEsc) {
                onClose?.()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        
        let originalOverflow = ''
        if (bodyLock && typeof document !== 'undefined') {
            originalOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            if (bodyLock && typeof document !== 'undefined') {
                document.body.style.overflow = originalOverflow
            }
        }
    }, [open, closeOnEsc, onClose, bodyLock])

    const normSize = typeof size === 'string' ? size.toLowerCase() : size
    const widthClasses = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-xl',
        full: 'max-w-full',
        small: 'max-w-sm',
        medium: 'max-w-md',
        large: 'max-w-xl'
    }

    const heightClasses = {
        xs: 'max-h-48',
        sm: 'max-h-72',
        md: 'max-h-96',
        lg: 'max-h-[80vh]',
        full: 'max-h-full',
        small: 'max-h-72',
        medium: 'max-h-96',
        large: 'max-h-[80vh]'
    }

    const isHorizontal = placement === 'right' || placement === 'left'

    const slideVariants = {
        hidden: {
            x: placement === 'right' ? '100%' : placement === 'left' ? '-100%' : 0,
            y: placement === 'bottom' ? '100%' : placement === 'top' ? '-100%' : 0,
            opacity: 0.95
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 28, stiffness: 300 }
        },
        exit: {
            x: placement === 'right' ? '100%' : placement === 'left' ? '-100%' : 0,
            y: placement === 'bottom' ? '100%' : placement === 'top' ? '-100%' : 0,
            opacity: 0.95,
            transition: { duration: 0.2, ease: 'easeInOut' }
        }
    }

    const placementContainer = {
        right: 'right-0 top-0 bottom-0 h-full border-l',
        left: 'left-0 top-0 bottom-0 h-full border-r',
        top: 'top-0 left-0 right-0 w-full border-b',
        bottom: 'bottom-0 left-0 right-0 w-full border-t rounded-t-2xl'
    }

    const sizeClass = isHorizontal
        ? `w-full ${widthClasses[normSize] || widthClasses.md}`
        : `h-full ${heightClasses[normSize] || heightClasses.md}`

    return (
        <ThemedPortal>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-[1000] overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeOnBackdropClick ? onClose : undefined}
                            className="absolute inset-0 bg-cc-scrim/60 backdrop-blur-sm"
                        />
                        <motion.div
                            variants={slideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`absolute flex flex-col bg-cc-surface text-cc-text border-cc-overlay/10 shadow-2xl shadow-cc-scrim/25 ${placementContainer[placement] || placementContainer.right} ${sizeClass} ${className}`}
                        >
                            {children}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ThemedPortal>
    )
}

Drawer.Header = ({ children, onClose, className = '' }) => (
    <div className={`flex items-center justify-between border-b border-cc-overlay/10 px-5 py-4 ${className}`}>
        <div className="min-w-0 flex-1">{children}</div>
        {onClose && (
            <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-cc-muted transition-colors hover:bg-cc-overlay/10 hover:text-cc-text"
            >
                <CloseRounded style={{ fontSize: 18 }} />
            </button>
        )}
    </div>
)

Drawer.Title = ({ children, className = '' }) => (
    <h3 className={`text-base font-semibold text-cc-text truncate ${className}`}>{children}</h3>
)

Drawer.Body = ({ children, className = '' }) => (
    <div className={`flex-1 overflow-y-auto px-5 py-4 customScrollbar ${className}`}>{children}</div>
)

Drawer.Footer = ({ children, className = '' }) => (
    <div className={`flex items-center justify-end gap-2 border-t border-cc-overlay/10 px-5 py-4 ${className}`}>
        {children}
    </div>
)

export default Drawer
