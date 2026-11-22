import React, { useState, useMemo } from 'react'
import { ChevronLeftOutlinedIcon, ChevronRightOutlinedIcon } from '../src/icons.jsx'

export const Pagination = ({
    total = 0,
    page: controlledPage,
    activePage: rsuiteActivePage,
    defaultPage = 1,
    pageSize: controlledPageSize,
    limit: rsuiteLimit,
    defaultPageSize = 10,
    onChangePage,
    onChangePageSize,
    pageSizeOptions = [10, 20, 50, 100],
    showTotal = true,
    showPageSize = false,
    size = 'md',
    className = '',
    ...props
}) => {
    const resolvedControlledPage = controlledPage !== undefined ? controlledPage : rsuiteActivePage
    const isControlledPage = resolvedControlledPage !== undefined
    const [innerPage, setInnerPage] = useState(defaultPage)
    const activePage = Math.max(1, isControlledPage ? resolvedControlledPage : innerPage)

    const resolvedControlledPageSize = controlledPageSize !== undefined ? controlledPageSize : rsuiteLimit
    const isControlledPageSize = resolvedControlledPageSize !== undefined
    const [innerPageSize, setInnerPageSize] = useState(defaultPageSize)
    const activePageSize = isControlledPageSize ? resolvedControlledPageSize : innerPageSize

    const totalPages = Math.max(1, Math.ceil(total / activePageSize))

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages || newPage === activePage) return
        if (!isControlledPage) setInnerPage(newPage)
        onChangePage?.(newPage)
    }

    const handlePageSizeChange = (e) => {
        const nextSize = Number(e.target.value)
        if (!isControlledPageSize) setInnerPageSize(nextSize)
        onChangePageSize?.(nextSize)
        // Reset to page 1 if current page exceeds new total pages
        const newTotalPages = Math.max(1, Math.ceil(total / nextSize))
        if (activePage > newTotalPages) {
            handlePageChange(1)
        }
    }

    const pages = useMemo(() => {
        const delta = 2
        const range = []
        const rangeWithDots = []
        let l

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= activePage - delta && i <= activePage + delta)) {
                range.push(i)
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1)
                } else if (i - l !== 1) {
                    rangeWithDots.push('...')
                }
            }
            rangeWithDots.push(i)
            l = i
        }

        return rangeWithDots
    }, [totalPages, activePage])

    const sizeClasses = {
        sm: {
            btn: 'h-7 min-w-[28px] text-xs px-2 rounded-md',
            select: 'h-7 text-xs px-2 rounded-md'
        },
        md: {
            btn: 'h-9 min-w-[36px] text-sm px-3 rounded-xl',
            select: 'h-9 text-sm px-2.5 rounded-xl'
        },
        lg: {
            btn: 'h-11 min-w-[44px] text-base px-4 rounded-xl',
            select: 'h-11 text-base px-3 rounded-xl'
        },
        small: {
            btn: 'h-7 min-w-[28px] text-xs px-2 rounded-md',
            select: 'h-7 text-xs px-2 rounded-md'
        },
        medium: {
            btn: 'h-9 min-w-[36px] text-sm px-3 rounded-xl',
            select: 'h-9 text-sm px-2.5 rounded-xl'
        },
        large: {
            btn: 'h-11 min-w-[44px] text-base px-4 rounded-xl',
            select: 'h-11 text-base px-3 rounded-xl'
        }
    }

    const normSize = typeof size === 'string' ? size.toLowerCase() : size
    const currentSizes = sizeClasses[normSize] || sizeClasses.md

    return (
        <div
            role="navigation"
            aria-label="Pagination"
            className={`flex flex-wrap items-center justify-between gap-3 text-sm text-cc-text ${className}`}
            {...props}
        >
            {showTotal && (
                <span className="text-xs text-cc-muted">
                    Total <strong className="font-semibold text-cc-text">{total}</strong> items
                </span>
            )}

            <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                    type="button"
                    disabled={activePage <= 1}
                    onClick={() => handlePageChange(activePage - 1)}
                    aria-label="Previous page"
                    className={`flex items-center justify-center border border-cc-overlay/10 bg-cc-surface text-cc-text transition-colors hover:bg-cc-overlay/10 disabled:cursor-not-allowed disabled:opacity-40 ${currentSizes.btn}`}
                >
                    <ChevronLeftOutlinedIcon size={16} />
                </button>

                {/* Page numbers */}
                {pages.map((p, idx) => {
                    if (p === '...') {
                        return (
                            <span
                                key={`dots-${idx}`}
                                className={`flex items-center justify-center text-cc-muted select-none ${currentSizes.btn}`}
                            >
                                …
                            </span>
                        )
                    }

                    const isCurrent = p === activePage
                    return (
                        <button
                            key={p}
                            type="button"
                            aria-current={isCurrent ? 'page' : undefined}
                            onClick={() => handlePageChange(p)}
                            className={`flex items-center justify-center font-medium transition-colors ${isCurrent
                                    ? 'bg-cc-primary text-cc-on-primary font-bold shadow-sm shadow-cc-primary/20'
                                    : 'border border-cc-overlay/10 bg-cc-surface text-cc-text hover:bg-cc-overlay/10'
                                } ${currentSizes.btn}`}
                        >
                            {p}
                        </button>
                    )
                })}

                {/* Next */}
                <button
                    type="button"
                    disabled={activePage >= totalPages}
                    onClick={() => handlePageChange(activePage + 1)}
                    aria-label="Next page"
                    className={`flex items-center justify-center border border-cc-overlay/10 bg-cc-surface text-cc-text transition-colors hover:bg-cc-overlay/10 disabled:cursor-not-allowed disabled:opacity-40 ${currentSizes.btn}`}
                >
                    <ChevronRightOutlinedIcon size={16} />
                </button>
            </div>

            {showPageSize && (
                <div className="flex items-center gap-2 text-xs text-cc-muted">
                    <span>Page size:</span>
                    <select
                        value={activePageSize}
                        onChange={handlePageSizeChange}
                        className={`border border-cc-overlay/10 bg-cc-surface text-cc-text outline-none focus:border-cc-primary/50 ${currentSizes.select}`}
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt} / page
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}

export default Pagination
