/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AccessTimeOutlinedIcon,
    AddRounded,
    CalendarTodayRounded,
    ChevronLeftOutlinedIcon,
    ChevronRightOutlinedIcon,
    ClearOutlinedIcon,
    CloseRounded,
    EyeOffRoundedIcon,
    EyeRoundedIcon,
    KeyboardArrowDownRounded,
    KeyboardArrowUpOutlinedIcon,
    SearchRoundedIcon
} from '../src/icons.jsx'
import { ThemedPortal } from '../src/theme.jsx'



/* ===================== CORE CONTROLS ===================== */

const fieldClass =

    'h-11 w-full rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 text-sm font-normal text-cc-text outline-none transition-all placeholder:text-cc-subtle focus:border-cc-primary/50 focus:ring-4 focus:ring-cc-primary/10 disabled:cursor-not-allowed disabled:opacity-50'



const buttonVariants = {

    primary: 'border border-cc-primary bg-cc-primary text-cc-on-primary shadow-sm shadow-cc-primary/20 hover:bg-cc-primary-hover',

    secondary: 'border border-cc-overlay/10 bg-cc-surface-2 text-cc-text hover:bg-cc-overlay/10',

    outline: 'border border-cc-overlay/15 bg-transparent text-cc-text hover:border-cc-primary/40 hover:bg-cc-primary/5',

    ghost: 'border border-transparent bg-transparent text-cc-text hover:bg-cc-overlay/5',

    danger: 'border border-red-500 bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-700'

}



const buttonSizes = {

    sm: 'h-9 gap-2 rounded-lg px-3 text-xs',

    md: 'h-11 gap-2 rounded-xl px-4 text-sm',

    lg: 'h-12 gap-2.5 rounded-xl px-5 text-base'

}



export const Button = forwardRef(

    (

        {

            variant = 'primary',

            size = 'md',

            loading = false,

            disabled = false,

            startIcon,

            endIcon,

            className = '',

            type = 'button',

            children,

            ...props

        },

        ref

    ) => (

        <button

            {...props}

            ref={ref}

            type={type}

            disabled={disabled || loading}

            aria-busy={loading || undefined}

            className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant] || buttonVariants.primary} ${buttonSizes[size] || buttonSizes.md} ${className}`}

        >

            {loading ? (

                <span

                    aria-hidden="true"

                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"

                />

            ) : (

                startIcon

            )}

            {children}

            {!loading && endIcon}

        </button>

    )

)



export const Label = ({ htmlFor, required = false, className = '', children, ...props }) => (

    <label

        {...props}

        htmlFor={htmlFor}

        className={`inline-flex items-center gap-1 text-sm font-medium text-cc-text ${className}`}

    >

        {children}

        {required && (

            <span aria-hidden="true" className="text-red-500">

                *

            </span>

        )}

    </label>

)



export const FormField = ({

    id: idProp,

    label,

    description,

    error,

    required = false,

    className = '',

    children

}) => {

    const generatedId = useId()

    const id = idProp || `cc-field-${generatedId}`

    const isControlElement = React.isValidElement(children)

    const controlId = isControlElement ? children.props.id || id : id

    const descriptionId = description ? `${controlId}-description` : undefined

    const errorId = error ? `${controlId}-error` : undefined

    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

    const control = isControlElement

        ? React.cloneElement(children, {

            id: controlId,

            required: children.props.required ?? required,

            'aria-invalid': error ? true : children.props['aria-invalid'],

            'aria-describedby': [children.props['aria-describedby'], describedBy]

                .filter(Boolean)

                .join(' ') || undefined

        })

        : children



    return (

        <div className={`grid gap-1.5 ${className}`}>

            {label && (

                <Label htmlFor={controlId} required={required}>

                    {label}

                </Label>

            )}

            {control}

            {description && (

                <p id={descriptionId} className="text-xs leading-relaxed text-cc-muted">

                    {description}

                </p>

            )}

            {error && (

                <p id={errorId} role="alert" className="text-xs leading-relaxed text-red-600">

                    {error}

                </p>

            )}

        </div>

    )

}



const normalizeOptions = (options) =>

    options.map((option) =>

        option !== null && typeof option === 'object'

            ? {

                label: String(option.label ?? option.value ?? ''),

                value: String(option.value ?? option.label ?? ''),

                disabled: Boolean(option.disabled)

            }

            : { label: String(option), value: String(option), disabled: false }

    )



const SuggestionInput = forwardRef(

    (

        {

            options = [],

            value,

            defaultValue = '',

            onChange,

            onSelect,

            placeholder = 'Start typing...',

            allowCustomValue = true,

            disabled = false,

            className = '',

            listClassName = '',

            emptyMessage = 'No suggestions found',

            onFocus,

            onBlur,

            ...props

        },

        forwardedRef

    ) => {

        const generatedId = useId()

        const listId = `cc-suggestions-${generatedId}`

        const inputRef = useRef(null)

        const isControlled = value !== undefined

        const [innerValue, setInnerValue] = useState(defaultValue)

        const currentValue = String(isControlled ? value ?? '' : innerValue)

        const [open, setOpen] = useState(false)

        const [activeIndex, setActiveIndex] = useState(-1)

        const [query, setQuery] = useState(currentValue)

        const inputValue = open ? query : currentValue

        const normalizedOptions = useMemo(() => normalizeOptions(options), [options])

        const filteredOptions = useMemo(() => {

            const search = query.trim().toLocaleLowerCase()

            return normalizedOptions.filter((option) => option.label.toLocaleLowerCase().includes(search))

        }, [normalizedOptions, query])



        React.useImperativeHandle(forwardedRef, () => inputRef.current)

        useEffect(() => {

            if (!open) setQuery(currentValue)

        }, [currentValue, open])



        const commit = (nextValue, event, selectedOption) => {

            if (!isControlled) setInnerValue(nextValue)

            setQuery(nextValue)

            onChange?.(nextValue, event)

            if (selectedOption) onSelect?.(selectedOption.value, selectedOption)

            setOpen(false)

            setActiveIndex(-1)

        }



        const handleKeyDown = (event) => {

            props.onKeyDown?.(event)

            if (event.defaultPrevented) return



            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {

                event.preventDefault()

                setOpen(true)

                setActiveIndex((index) => {

                    if (!filteredOptions.length) return -1

                    if (event.key === 'ArrowDown') return (index + 1) % filteredOptions.length

                    return index <= 0 ? filteredOptions.length - 1 : index - 1

                })

            } else if (event.key === 'Enter' && open && activeIndex >= 0) {

                event.preventDefault()

                const option = filteredOptions[activeIndex]

                if (option && !option.disabled) commit(option.value, event, option)

            } else if (event.key === 'Enter' && !allowCustomValue) {

                const exactMatch = normalizedOptions.find(

                    (option) => option.value === query || option.label === query

                )

                if (exactMatch) {

                    event.preventDefault()

                    commit(exactMatch.value, event, exactMatch)

                }

            } else if (event.key === 'Escape') {

                setOpen(false)

                setActiveIndex(-1)

            }

        }



        return (

            <div className={`relative w-full ${className}`}>

                <input

                    {...props}

                    ref={inputRef}

                    role="combobox"

                    aria-autocomplete="list"

                    aria-expanded={open}

                    aria-controls={listId}

                    aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}

                    autoComplete="off"

                    disabled={disabled}

                    value={inputValue}

                    placeholder={placeholder}

                    className={fieldClass}

                    onFocus={(event) => {

                        setQuery(currentValue)

                        setOpen(true)

                        onFocus?.(event)

                    }}

                    onBlur={(event) => {

                        setOpen(false)

                        setActiveIndex(-1)

                        setQuery(currentValue)

                        onBlur?.(event)

                    }}

                    onChange={(event) => {

                        setQuery(event.target.value)

                        if (allowCustomValue) {

                            if (!isControlled) setInnerValue(event.target.value)

                            onChange?.(event.target.value, event)

                        }

                        setOpen(true)

                        setActiveIndex(-1)

                    }}

                    onKeyDown={handleKeyDown}

                />

                {open && !disabled && (

                    <ul

                        id={listId}

                        role="listbox"

                        className={`absolute z-[var(--cc-z)] mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-cc-overlay/10 bg-cc-surface p-1.5 text-cc-text shadow-xl shadow-cc-scrim/15 customScrollbar ${listClassName}`}

                    >

                        {filteredOptions.length ? (

                            filteredOptions.map((option, index) => (

                                <li

                                    id={`${listId}-${index}`}

                                    key={`${option.value}-${index}`}

                                    role="option"

                                    aria-selected={index === activeIndex}

                                    aria-disabled={option.disabled || undefined}

                                    onMouseEnter={() => setActiveIndex(index)}

                                    onMouseDown={(event) => event.preventDefault()}

                                    onClick={(event) => {

                                        if (!option.disabled) commit(option.value, event, option)

                                    }}

                                    className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors ${option.disabled

                                        ? 'cursor-not-allowed opacity-50'

                                        : index === activeIndex

                                            ? 'bg-cc-primary/10 text-cc-primary'

                                            : 'text-cc-text hover:bg-cc-overlay/5'

                                        }`}

                                >

                                    {option.label}

                                </li>

                            ))

                        ) : (

                            <li className="px-3 py-2.5 text-sm text-cc-muted">{emptyMessage}</li>

                        )}

                    </ul>

                )}

            </div>

        )

    }

)



export const Combobox = forwardRef((props, ref) => (

    <SuggestionInput {...props} ref={ref} allowCustomValue={props.allowCustomValue ?? false} />

))



export const Autocomplete = forwardRef((props, ref) => (

    <SuggestionInput {...props} ref={ref} allowCustomValue={props.allowCustomValue ?? true} />

))



export const OtpInput = forwardRef(

    (

        {

            length = 6,

            value,

            defaultValue = '',

            onChange,

            disabled = false,

            autoFocus = false,

            className = '',

            inputClassName = '',

            type = 'numeric',

            ...props

        },

        forwardedRef

    ) => {

        const count = Math.max(1, Math.floor(Number(length) || 6))

        const isControlled = value !== undefined

        const [innerValue, setInnerValue] = useState(String(defaultValue))

        const refs = useRef([])

        const inputId = useId()

        const currentValue = String(isControlled ? value ?? '' : innerValue)

            .replace(type === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g, '')

            .slice(0, count)

        const digits = Array.from({ length: count }, (_, index) => currentValue[index] || '')



        React.useImperativeHandle(forwardedRef, () => ({

            focus: (index = 0) => refs.current[index]?.focus(),

            clear: () => {

                if (!isControlled) setInnerValue('')

                onChange?.('')

                refs.current[0]?.focus()

            }

        }))



        const updateValue = (nextValue, focusIndex) => {

            const sanitized = nextValue

                .replace(type === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g, '')

                .slice(0, count)

            if (!isControlled) setInnerValue(sanitized)

            onChange?.(sanitized)

            if (focusIndex !== undefined) refs.current[focusIndex]?.focus()

        }



        return (

            <div

                role="group"

                aria-label={props['aria-label'] || 'One-time password'}

                className={`flex items-center gap-2 sm:gap-3 ${className}`}

            >

                {digits.map((digit, index) => (

                    <input

                        {...props}

                        key={`${inputId}-${index}`}

                        ref={(element) => {

                            refs.current[index] = element

                        }}

                        type="text"

                        inputMode={type === 'numeric' ? 'numeric' : 'text'}

                        autoComplete={index === 0 ? 'one-time-code' : 'off'}

                        aria-label={`Character ${index + 1} of ${count}`}

                        maxLength={count}

                        value={digit}

                        disabled={disabled}

                        autoFocus={autoFocus && index === 0}

                        className={`h-12 w-10 rounded-xl border border-cc-overlay/10 bg-cc-surface text-center text-lg font-semibold text-cc-text outline-none transition-all focus:border-cc-primary/50 focus:ring-4 focus:ring-cc-primary/10 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-12 ${inputClassName}`}

                        onChange={(event) => {

                            const entered = event.target.value.replace(

                                type === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g,

                                ''

                            )

                            if (!entered) {

                                const next = currentValue.split('')

                                next[index] = ''

                                updateValue(next.join(''))

                                return

                            }

                            const next = currentValue.split('')

                            entered.slice(0, count - index).split('').forEach((character, offset) => {

                                next[index + offset] = character

                            })

                            const nextValue = next.join('').slice(0, count)

                            updateValue(nextValue, Math.min(index + entered.length, count - 1))

                        }}

                        onKeyDown={(event) => {

                            props.onKeyDown?.(event)

                            if (event.defaultPrevented) return

                            if (event.key === 'Backspace' && !digits[index] && index > 0) {

                                refs.current[index - 1]?.focus()

                            } else if (event.key === 'ArrowLeft' && index > 0) {

                                event.preventDefault()

                                refs.current[index - 1]?.focus()

                            } else if (event.key === 'ArrowRight' && index < count - 1) {

                                event.preventDefault()

                                refs.current[index + 1]?.focus()

                            }

                        }}

                        onPaste={(event) => {

                            const pasted = event.clipboardData.getData('text')

                            if (!pasted) return

                            event.preventDefault()

                            const start = index

                            const prefix = currentValue.slice(0, start)

                            const suffixStart = start + pasted.length

                            const nextValue = `${prefix}${pasted}${currentValue.slice(suffixStart)}`

                            updateValue(nextValue, Math.min(start + pasted.length, count - 1))

                        }}

                    />

                ))}

            </div>

        )

    }

)



const alertVariants = {

    info: 'border-blue-500/20 bg-blue-500/5 text-cc-text',

    success: 'border-emerald-500/20 bg-emerald-500/5 text-cc-text',

    warning: 'border-amber-500/25 bg-amber-500/10 text-cc-text',

    error: 'border-red-500/20 bg-red-500/5 text-cc-text'

}



export const Alert = ({

    variant = 'info',

    title,

    children,

    dismissible = false,

    onClose,

    className = ''

}) => (

    <div

        role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}

        className={`relative flex items-start justify-between gap-4 rounded-xl border p-4 text-sm ${alertVariants[variant] || alertVariants.info} ${className}`}

    >

        <div className="min-w-0">

            {title && <p className="mb-1 font-semibold">{title}</p>}

            <div className="leading-relaxed">{children}</div>

        </div>

        {dismissible && (

            <button

                type="button"

                aria-label="Dismiss alert"

                onClick={onClose}

                className="shrink-0 rounded-md px-2 py-1 text-lg leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"

            >

                ×

            </button>

        )}

    </div>

)



export const Toast = ({

    variant = 'info',

    title,

    children,

    duration = 5000,

    onClose,

    className = ''

}) => {

    useEffect(() => {

        if (!duration || !onClose) return undefined

        const timer = window.setTimeout(onClose, duration)

        return () => window.clearTimeout(timer)

    }, [duration, onClose])



    const variantClasses = {

        info: 'border-l-4 border-l-blue-500',

        success: 'border-l-4 border-l-emerald-500',

        warning: 'border-l-4 border-l-amber-500',

        error: 'border-l-4 border-l-red-500'

    }



    return (

        <div

            role={variant === 'error' ? 'alert' : 'status'}

            className={`pointer-events-auto w-full rounded-xl border border-cc-overlay/10 bg-cc-surface p-4 text-sm text-cc-text shadow-xl shadow-cc-scrim/15 ${variantClasses[variant] || variantClasses.info} ${className}`}

        >

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    {title && <p className="mb-1 font-semibold">{title}</p>}

                    <div className="text-cc-muted">{children}</div>

                </div>

                {onClose && (

                    <button

                        type="button"

                        aria-label="Close notification"

                        onClick={onClose}

                        className="shrink-0 rounded-md px-2 py-1 text-lg leading-none text-cc-muted transition-colors hover:bg-cc-overlay/5 hover:text-cc-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-primary/40"

                    >

                        ×

                    </button>

                )}

            </div>

        </div>

    )

}



const ToastContext = createContext(null)



export const useToast = () => {

    const context = useContext(ToastContext)

    if (!context) throw new Error('useToast must be used within a ToastProvider')

    return context

}



export const ToastProvider = ({ children, position = 'top-right', limit = 5, duration = 5000 }) => {

    const [toasts, setToasts] = useState([])

    const nextId = useRef(0)

    const dismiss = useCallback((id) => {

        setToasts((current) => current.filter((toast) => toast.id !== id))

    }, [])

    const toast = useCallback(

        (message, options = {}) => {

            const id = ++nextId.current

            setToasts((current) => [

                ...current.slice(-(Math.max(1, limit) - 1)),

                {

                    id,

                    message: message ?? '',

                    ...options,

                    duration: options.duration ?? duration

                }

            ])

            return id

        },

        [duration, limit]

    )

    const actions = useMemo(

        () => ({

            toast,

            success: (message, options = {}) => toast(message, { ...options, variant: 'success' }),

            error: (message, options = {}) => toast(message, { ...options, variant: 'error' }),

            warning: (message, options = {}) => toast(message, { ...options, variant: 'warning' }),

            info: (message, options = {}) => toast(message, { ...options, variant: 'info' }),

            dismiss,

            dismissAll: () => setToasts([])

        }),

        [dismiss, toast]

    )

    const positionClasses = {

        'top-left': 'left-4 top-4 sm:left-6 sm:top-6',

        'top-center': 'left-1/2 top-4 -translate-x-1/2 sm:top-6',

        'top-right': 'right-4 top-4 sm:right-6 sm:top-6',

        'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',

        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6',

        'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6'

    }



    return (

        <ToastContext.Provider value={actions}>

            {children}

            <div

                aria-label="Notifications"

                aria-live="polite"

                className={`pointer-events-none fixed z-[var(--cc-z)] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 ${positionClasses[position] || positionClasses['top-right']}`}

            >

                {toasts.map(({ id, message, title, variant, duration: toastDuration, ...options }) => (

                    <Toast

                        key={id}

                        title={title}

                        variant={variant}

                        duration={toastDuration}

                        onClose={() => dismiss(id)}

                        {...options}

                    >

                        {message}

                    </Toast>

                ))}

            </div>

        </ToastContext.Provider>

    )

}



export const Progress = ({

    value,

    max = 100,

    label,

    showValue = false,

    size = 'md',

    className = '',

    ...props

}) => {

    const isIndeterminate = value === undefined || value === null

    const safeMax = Number.isFinite(Number(max)) && Number(max) > 0 ? Number(max) : 100

    const safeValue = isIndeterminate

        ? undefined

        : Math.min(safeMax, Math.max(0, Number(value) || 0))

    const percent = safeValue === undefined ? undefined : (safeValue / safeMax) * 100

    const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }



    return (

        <div className={`w-full ${className}`}>

            {(label || showValue) && (

                <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-cc-muted">

                    {label && <span>{label}</span>}

                    {showValue && <span>{isIndeterminate ? '' : `${Math.round(percent)}%`}</span>}

                </div>

            )}

            <div

                {...props}

                role="progressbar"

                aria-label={props['aria-label'] || label || 'Progress'}

                aria-valuemin={0}

                aria-valuemax={safeMax}

                aria-valuenow={safeValue}

                className={`relative w-full overflow-hidden rounded-full bg-cc-overlay/10 ${heights[size] || heights.md}`}

            >

                <div

                    className={`h-full rounded-full bg-cc-primary transition-[width] duration-300 ease-out ${isIndeterminate ? 'w-1/3 animate-[cc-progress_1.4s_ease-in-out_infinite]' : ''

                        }`}

                    style={isIndeterminate ? undefined : { width: `${percent}%` }}

                />

            </div>

        </div>

    )

}



export const Skeleton = ({

    width,

    height,

    circle = false,

    className = '',

    style,

    ...props

}) => (

    <span

        {...props}

        aria-hidden="true"

        className={`block animate-pulse bg-cc-overlay/10 ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}

        style={{ width, height, ...style }}

    />

)



export const ColorPicker = forwardRef(

    (

        {

            value,

            defaultValue = '#635bff',

            onChange,

            disabled = false,

            showValue = true,

            className = '',

            inputClassName = '',

            ...props

        },

        ref

    ) => {

        const isControlled = value !== undefined

        const [innerValue, setInnerValue] = useState(defaultValue)

        const currentValue = isControlled ? value : innerValue



        return (

            <div className={`inline-flex min-h-11 items-center gap-3 rounded-xl border border-cc-overlay/10 bg-cc-surface px-3 py-2 ${className}`}>

                <input

                    {...props}

                    ref={ref}

                    type="color"

                    value={currentValue}

                    disabled={disabled}

                    onChange={(event) => {

                        if (!isControlled) setInnerValue(event.target.value)

                        onChange?.(event.target.value, event)

                    }}

                    className={`h-8 w-9 cursor-pointer overflow-hidden rounded-lg border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName}`}

                />

                {showValue && (

                    <output className="min-w-16 font-mono text-xs uppercase text-cc-muted">

                        {currentValue}

                    </output>

                )}

            </div>

        )

    }

)

/* ===================== INPUT, PICKER & LAYOUT CONTROLS ===================== */

const panelClass = 'border border-cc-overlay/10 bg-cc-surface text-cc-text shadow-2xl shadow-cc-scrim/15'

const filterDomProps = (props = {}) => {
    const {
        container,
        virtualized,
        menuStyle,
        menuStyleOverride,
        renderExtraFooter,
        renderMenuItem,
        preventOverflow,
        placement,
        cleanable,
        searchable,
        menuMaxHeight,
        formatter,
        parser,
        checkedChildren,
        unCheckedChildren,
        speaker,
        renderTitle,
        characterSet,
        containerStyle,
        onCreateNew,
        createNewText,
        ...validProps
    } = props
    return validProps
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const useDropdownPosition = (open, triggerRef, menuWidthOverride = null) => {
    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
        width: 220,
        placement: 'bottom'
    })

    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return
        const rect = triggerRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const placeAbove = spaceBelow < 280 && rect.top > 280
        const width = menuWidthOverride || Math.max(rect.width, 200)
        let left = rect.left
        if (left + width > window.innerWidth - 12) {
            left = Math.max(12, window.innerWidth - width - 12)
        }

        setCoords({
            top: placeAbove ? rect.top - 6 : rect.bottom + 6,
            left,
            width,
            placement: placeAbove ? 'top' : 'bottom'
        })
    }, [triggerRef, menuWidthOverride])

    useIsomorphicLayoutEffect(() => {
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

    return { coords, updatePosition }
}

export const Input = ({
    value = '',
    onChange,
    placeholder,
    type = 'text',
    className = '',
    ...props
}) => (
    <input
        {...filterDomProps(props)}
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value, e)}
        className={`h-11 w-full rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 text-sm font-normal text-cc-text outline-none transition-all placeholder:text-cc-subtle focus:border-cc-primary/50 focus:ring-4 focus:ring-cc-primary/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
)

export const InputGroup = ({ children, className = '', ...props }) => (
    <div
        {...filterDomProps(props)}
        className={`flex h-11 items-center overflow-hidden rounded-xl border border-cc-overlay/10 bg-cc-surface transition-all focus-within:border-cc-primary/50 focus-within:ring-4 focus-within:ring-cc-primary/10 ${className}`}
    >
        {children}
    </div>
)

InputGroup.Button = ({ children, className = '', onClick, ...props }) => (
    <button
        {...props}
        type="button"
        onClick={onClick}
        className={`flex h-full shrink-0 items-center justify-center px-3 text-cc-muted transition-colors hover:text-cc-primary ${className}`}
    >
        {children}
    </button>
)

export const SelectPicker = forwardRef(
    (
        {
            data = [],
            value,
            onChange,
            placeholder = 'Select...',
            searchable = true,
            cleanable = true,
            style,
            className = '',
            menuMaxHeight = 260,
            menuWidth,
            menuStyle,
            disabled = false,
            renderMenuItem,
            renderExtraFooter,
            onCreateNew,
            createNewText,
            ...props
        },
        outerRef
    ) => {
        const [open, setOpen] = useState(false)
        const [query, setQuery] = useState('')
        const [focusedIndex, setFocusedIndex] = useState(-1)
        const triggerRef = useRef(null)
        const menuRef = useRef(null)
        const listRef = useRef(null)
        const resolvedMenuWidth = menuStyle?.width ?? menuWidth ?? null
        const { coords, updatePosition } = useDropdownPosition(open, triggerRef, resolvedMenuWidth)

        const handleClose = useCallback(() => {
            setOpen(false)
            setQuery('')
            setFocusedIndex(-1)
        }, [])

        useImperativeHandle(outerRef, () => ({
            close: handleClose,
            open: () => {
                updatePosition()
                setOpen(true)
            }
        }))

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

        const selected = data.find((item) => String(item?.value) === String(value))
        const filtered = useMemo(() => {
            if (!searchable || !query) return data
            const q = query.toLowerCase()
            return data.filter((item) =>
                String(item?.label ?? item?.value ?? '')
                    .toLowerCase()
                    .includes(q)
            )
        }, [data, query, searchable])

        const displayed = useMemo(() => {
            if (filtered.length > 80) return filtered.slice(0, 80)
            return filtered
        }, [filtered])

        useEffect(() => {
            if (open) {
                setFocusedIndex(displayed.length > 0 ? 0 : -1)
            }
        }, [open, query, displayed.length])

        useEffect(() => {
            if (open && focusedIndex >= 0 && listRef.current) {
                const targetEl = listRef.current.children[focusedIndex]
                if (targetEl && typeof targetEl.scrollIntoView === 'function') {
                    targetEl.scrollIntoView({ block: 'nearest' })
                }
            }
        }, [focusedIndex, open])

        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (open) handleClose()
                return
            }
            e.stopPropagation()
            if (!open) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                    e.preventDefault()
                    updatePosition()
                    setOpen(true)
                }
                return
            }

            const extraCount = renderExtraFooter || onCreateNew ? 1 : 0
            const totalCount = displayed.length + extraCount

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setFocusedIndex((prev) => (prev < totalCount - 1 ? prev + 1 : 0))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalCount - 1))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (focusedIndex >= 0 && focusedIndex < displayed.length) {
                    const item = displayed[focusedIndex]
                    onChange?.(item?.value, item)
                    handleClose()
                } else if (focusedIndex === displayed.length && (renderExtraFooter || onCreateNew)) {
                    handleClose()
                    if (onCreateNew) {
                        onCreateNew()
                    } else if (typeof renderExtraFooter === 'function') {
                        renderExtraFooter(handleClose)
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                handleClose()
            }
        }

        const menuContent = (
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        style={{
                            ...menuStyle,
                            position: 'fixed',
                            top: coords.placement === 'top' ? undefined : coords.top,
                            bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                            left: coords.left,
                            width: coords.width,
                            maxWidth: 'calc(100vw - 24px)',
                            zIndex: menuStyle?.zIndex ?? 'var(--cc-z)'
                        }}
                        className={`overflow-hidden rounded-2xl ${panelClass}`}
                    >
                        {searchable && (
                            <div className="border-b border-cc-overlay/10 p-2">
                                <div className="flex items-center rounded-xl border border-cc-overlay/10 bg-cc-overlay/5 px-3">
                                    <SearchRoundedIcon size={17} strokeWidth={2} className="shrink-0 text-cc-muted" />
                                    <input
                                        autoFocus
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search..."
                                        className="h-10 w-full bg-transparent px-2 text-sm text-cc-text outline-none placeholder:text-cc-subtle"
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            ref={listRef}
                            className="overflow-y-auto p-1.5 customScrollbar"
                            style={{ maxHeight: menuMaxHeight }}
                        >
                            {displayed.length === 0 ? (
                                <div className="px-4 py-6 text-center text-sm text-cc-muted">No results found</div>
                            ) : (
                                displayed.map((item, idx) => {
                                    const isSelected = String(item?.value) === String(value)
                                    const isFocused = idx === focusedIndex
                                    const labelText = item?.label ?? item?.value
                                    return (
                                        <button
                                            key={String(item?.value)}
                                            type="button"
                                            onMouseEnter={() => setFocusedIndex(idx)}
                                            onClick={() => {
                                                onChange?.(item?.value, item)
                                                handleClose()
                                            }}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${isSelected
                                                ? 'bg-cc-primary/10 text-cc-primary'
                                                : isFocused
                                                    ? 'bg-cc-overlay/10 text-cc-text'
                                                    : 'text-cc-text hover:bg-cc-overlay/10 hover:text-cc-text'
                                                }`}
                                        >
                                            {renderMenuItem ? (
                                                renderMenuItem(labelText, item)
                                            ) : (
                                                <span className="truncate">{labelText}</span>
                                            )}
                                            {isSelected && !renderMenuItem && <span>✓</span>}
                                        </button>
                                    )
                                })
                            )}
                        </div>
                        {(renderExtraFooter || onCreateNew) && (
                            <div
                                className={`border-t border-cc-overlay/10 p-1.5 bg-cc-surface ${focusedIndex === displayed.length ? 'bg-cc-overlay/10' : ''
                                    }`}
                                onMouseEnter={() => setFocusedIndex(displayed.length)}
                            >
                                {renderExtraFooter ? (
                                    typeof renderExtraFooter === 'function' ? (
                                        renderExtraFooter(handleClose)
                                    ) : (
                                        renderExtraFooter
                                    )
                                ) : (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleClose()
                                            onCreateNew?.()
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary/15 px-3 py-2 text-xs font-bold text-cc-primary transition-colors hover:bg-cc-primary/25 cursor-pointer"
                                    >
                                        <AddRounded size={16} strokeWidth={2.5} />
                                        {createNewText || 'Create New'}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        )

        return (
            <div
                ref={triggerRef}
                {...filterDomProps(props)}
                className={`relative ${className}`}
                style={style}
            >
                <button
                    type="button"
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                        if (disabled) return
                        if (!open) {
                            updatePosition()
                        }
                        setOpen((v) => !v)
                    }}
                    className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-4 text-left text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/15 ${open
                        ? 'border-cc-primary/50 bg-cc-surface ring-4 ring-cc-primary/10'
                        : 'border-cc-overlay/10 bg-cc-surface hover:border-cc-primary/30'
                        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <span className={selected ? 'truncate text-cc-text' : 'truncate text-cc-muted'}>
                        {selected?.label ?? placeholder}
                    </span>
                    <div className="flex items-center gap-1">
                        {cleanable && value !== undefined && value !== null && value !== '' && (
                            <span
                                role="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onChange?.('')
                                }}
                                className="flex h-6 w-6 items-center justify-center rounded-md text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text"
                            >
                                <CloseRounded style={{ fontSize: 17 }} />
                            </span>
                        )}
                        <KeyboardArrowDownRounded
                            size={20}
                            strokeWidth={2}
                            className={`shrink-0 text-cc-muted transition-transform duration-200 ${open ? 'rotate-180 text-cc-primary' : ''
                                }`}
                        />
                    </div>
                </button>
                <ThemedPortal>{menuContent}</ThemedPortal>
            </div>
        )
    }
)
export const DateRangePicker = ({
    value = [],
    onChange,
    placeholder = 'Select Date Range',
    className = '',
    style,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const triggerRef = useRef(null)
    const menuRef = useRef(null)
    const { coords, updatePosition } = useDropdownPosition(open, triggerRef, 330)

    useEffect(() => {
        if (Array.isArray(value) && value.length === 2) {
            const a = new Date(value[0])
            const b = new Date(value[1])
            setStart(!isNaN(a) ? a.toISOString().slice(0, 10) : '')
            setEnd(!isNaN(b) ? b.toISOString().slice(0, 10) : '')
        } else if (!value?.length) {
            setStart('')
            setEnd('')
        }
    }, [value])

    useEffect(() => {
        const handler = (e) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const display =
        start && end
            ? `${new Date(`${start}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} — ${new Date(`${end}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`
            : placeholder

    const menuContent = (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={menuRef}
                    initial={{
                        opacity: 0,
                        y: coords.placement === 'top' ? 4 : -4
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        y: coords.placement === 'top' ? 4 : -4
                    }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        top: coords.placement === 'top' ? undefined : coords.top,
                        bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                        left: coords.left,
                        width: 330,
                        zIndex: 999999
                    }}
                    className={`rounded-2xl p-4 ${panelClass}`}
                >
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-cc-text">Date Range</p>
                        <p className="mt-1 text-xs text-cc-muted">Select the period you want to view</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cc-muted">
                            From
                            <input
                                type="date"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className="mt-1.5 h-11 w-full rounded-xl border border-cc-overlay/10 bg-cc-overlay/5 px-3 text-sm text-cc-text outline-none"
                            />
                        </label>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-cc-muted">
                            To
                            <input
                                type="date"
                                value={end}
                                min={start}
                                onChange={(e) => setEnd(e.target.value)}
                                className="mt-1.5 h-11 w-full rounded-xl border border-cc-overlay/10 bg-cc-overlay/5 px-3 text-sm text-cc-text outline-none"
                            />
                        </label>
                    </div>
                    <div className="mt-4 flex justify-between border-t border-cc-overlay/10 pt-3">
                        <button
                            type="button"
                            onClick={() => {
                                setStart('')
                                setEnd('')
                                onChange?.([])
                                setOpen(false)
                            }}
                            className="rounded-xl px-3 py-2 text-xs text-cc-muted hover:bg-cc-overlay/5 hover:text-cc-text"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            disabled={!start || !end}
                            onClick={() => {
                                const s = new Date(`${start}T00:00:00`)
                                const e = new Date(`${end}T23:59:59.999`)
                                onChange?.([s, e])
                                setOpen(false)
                            }}
                            className="rounded-xl bg-cc-primary px-4 py-2 text-xs font-bold text-cc-on-primary hover:bg-cc-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Apply Range
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )

    return (
        <div
            ref={triggerRef}
            className={`relative ${className}`}
            style={style}
            {...filterDomProps(props)}
        >
            <button
                type="button"
                onClick={() => {
                    if (!open) updatePosition()
                    setOpen((v) => !v)
                }}
                className="flex h-11 w-full min-w-[220px] items-center justify-between gap-3 rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 text-sm font-normal transition-all hover:border-cc-primary/30 focus:border-cc-primary/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/15"
            >
                <span className="flex min-w-0 items-center gap-3">
                    {/* <CalendarTodayRounded
            size={2}
            strokeWidth={2}
            className={open ? 'text-cc-primary' : 'text-cc-muted'}
          /> */}
                    <span className={start && end ? 'truncate text-cc-text' : 'truncate text-cc-muted'}>
                        {display}
                    </span>
                </span>
                <KeyboardArrowDownRounded
                    size={20}
                    strokeWidth={2}
                    className={`text-cc-muted transition-transform ${open ? 'rotate-180 text-cc-primary' : ''}`}
                />
            </button>
            <ThemedPortal>{menuContent}</ThemedPortal>
        </div>
    )
}

export const DatePicker = forwardRef(
    (
        {
            value,
            onChange,
            placeholder = 'Select Date',
            className = '',
            style,
            cleanable = true,
            disabled = false,
            format = 'yyyy-MM-dd',
            menuStyle,
            ...props
        },
        outerRef
    ) => {
        const [open, setOpen] = useState(false)
        const triggerRef = useRef(null)
        const menuRef = useRef(null)

        const parsedSelectedDate = useMemo(() => {
            if (!value) return null
            if (value instanceof Date && !isNaN(value)) return value
            if (typeof value === 'string') {
                const dateOnly = value.split('T')[0]
                const parts = dateOnly.split('-')
                if (parts.length === 3) {
                    const y = parseInt(parts[0], 10)
                    const m = parseInt(parts[1], 10) - 1
                    const d = parseInt(parts[2], 10)
                    const parsed = new Date(y, m, d)
                    if (!isNaN(parsed)) return parsed
                }
                const d = new Date(value)
                if (!isNaN(d)) return d
            }
            return null
        }, [value])

        const [viewDate, setViewDate] = useState(() => {
            return parsedSelectedDate || new Date()
        })

        useEffect(() => {
            if (parsedSelectedDate) {
                setViewDate(parsedSelectedDate)
            }
        }, [parsedSelectedDate])

        const handleClose = useCallback(() => {
            setOpen(false)
        }, [])

        useImperativeHandle(outerRef, () => ({
            close: handleClose,
            open: () => setOpen(true)
        }))

        const { coords, updatePosition } = useDropdownPosition(open, triggerRef, 290)

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

        const formatDisplayDate = (d) => {
            if (!d || isNaN(d)) return placeholder
            return d.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        }

        const formatValueStr = (d) => {
            if (!d || isNaN(d)) return ''
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }

        const handleSelectDay = (dayDate) => {
            const formatted = formatValueStr(dayDate)
            onChange?.(formatted, dayDate)
            handleClose()
        }

        const prevMonth = () => {
            setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
        }

        const nextMonth = () => {
            setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
        }

        const year = viewDate.getFullYear()
        const month = viewDate.getMonth()

        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDayOfWeek = new Date(year, month, 1).getDay()
        const startOffset = (firstDayOfWeek + 6) % 7
        const daysInPrevMonth = new Date(year, month, 0).getDate()

        const calendarCells = []

        for (let i = startOffset - 1; i >= 0; i--) {
            const dayNum = daysInPrevMonth - i
            calendarCells.push({
                date: new Date(year, month - 1, dayNum),
                dayNum,
                isCurrentMonth: false
            })
        }

        for (let d = 1; d <= daysInMonth; d++) {
            calendarCells.push({
                date: new Date(year, month, d),
                dayNum: d,
                isCurrentMonth: true
            })
        }

        const remaining = 42 - calendarCells.length
        for (let d = 1; d <= remaining; d++) {
            calendarCells.push({
                date: new Date(year, month + 1, d),
                dayNum: d,
                isCurrentMonth: false
            })
        }

        const todayStr = formatValueStr(new Date())
        const selectedStr = formatValueStr(parsedSelectedDate)

        const monthName = viewDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })

        const menuContent = (
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        style={{
                            ...menuStyle,
                            position: 'fixed',
                            top: coords.placement === 'top' ? undefined : coords.top,
                            bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                            left: coords.left,
                            width: 290,
                            zIndex: menuStyle?.zIndex ?? 'var(--cc-z)'
                        }}
                        className={`rounded-2xl p-3.5 ${panelClass}`}
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-cc-overlay/10">
                            <button
                                type="button"
                                onClick={prevMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text transition-colors"
                            >
                                <ChevronLeftOutlinedIcon size={18} />
                            </button>
                            <span className="text-sm font-semibold text-cc-text">{monthName}</span>
                            <button
                                type="button"
                                onClick={nextMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text transition-colors"
                            >
                                <ChevronRightOutlinedIcon size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 pt-3 pb-1 text-center text-[11px] font-bold text-cc-muted uppercase tracking-wider">
                            <span>Mo</span>
                            <span>Tu</span>
                            <span>We</span>
                            <span>Th</span>
                            <span>Fr</span>
                            <span>Sa</span>
                            <span>Su</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarCells.map((cell, idx) => {
                                const cellStr = formatValueStr(cell.date)
                                const isSelected = selectedStr && cellStr === selectedStr
                                const isToday = cellStr === todayStr

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelectDay(cell.date)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs transition-all font-medium ${isSelected
                                            ? 'bg-cc-primary text-cc-on-primary font-bold shadow-md shadow-cc-primary/20'
                                            : cell.isCurrentMonth
                                                ? isToday
                                                    ? 'border border-cc-primary/50 text-cc-primary font-semibold bg-cc-primary/10'
                                                    : 'text-cc-text hover:bg-cc-overlay/10 hover:text-cc-text'
                                                : 'text-cc-subtle hover:bg-cc-overlay/5'
                                            }`}
                                    >
                                        {cell.dayNum}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-cc-overlay/10 pt-2.5">
                            <button
                                type="button"
                                onClick={() => {
                                    const today = new Date()
                                    setViewDate(today)
                                    handleSelectDay(today)
                                }}
                                className="rounded-lg px-2.5 py-1 text-xs font-semibold text-cc-primary hover:bg-cc-primary/10 transition-colors"
                            >
                                Today
                            </button>
                            {cleanable && parsedSelectedDate && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange?.('', null)
                                        handleClose()
                                    }}
                                    className="rounded-lg px-2.5 py-1 text-xs text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        )

        return (
            <div
                ref={triggerRef}
                className={`relative ${className}`}
                style={style}
                {...filterDomProps(props)}
            >
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                        if (disabled) return
                        if (!open) updatePosition()
                        setOpen((v) => !v)
                    }}
                    className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-4 text-left text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/15 ${open
                        ? 'border-cc-primary/50 bg-cc-surface ring-4 ring-cc-primary/10'
                        : 'border-cc-overlay/10 bg-cc-surface hover:border-cc-primary/30'
                        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <span className="flex items-center gap-2.5 min-w-0">
                        <CalendarTodayRounded
                            style={{ fontSize: 15 }}
                            strokeWidth={2}
                            className={open ? 'text-cc-primary' : 'text-cc-muted'}
                        />
                        <span
                            className={parsedSelectedDate ? 'truncate text-cc-text' : 'truncate text-cc-muted'}
                        >
                            {formatDisplayDate(parsedSelectedDate)}
                        </span>
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                        {cleanable && parsedSelectedDate && (
                            <span
                                role="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onChange?.('', null)
                                }}
                                className="flex h-6 w-6 items-center justify-center rounded-md text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text"
                            >
                                <CloseRounded className="w-4 h-4" />
                            </span>
                        )}
                        <KeyboardArrowDownRounded
                            size={20}
                            strokeWidth={2}
                            className={`text-cc-muted transition-transform duration-200 ${open ? 'rotate-180 text-cc-primary' : ''
                                }`}
                        />
                    </div>
                </button>
                <ThemedPortal>{menuContent}</ThemedPortal>
            </div>
        )
    }
)

export const TimePicker = forwardRef(
    (
        {
            value = '',
            onChange,
            placeholder = 'Select Time',
            className = '',
            style,
            cleanable = true,
            disabled = false,
            is12h = true,
            menuStyle,
            ...props
        },
        outerRef
    ) => {
        const [open, setOpen] = useState(false)
        const triggerRef = useRef(null)
        const menuRef = useRef(null)

        const parsed = useMemo(() => {
            if (!value)
                return {
                    hours12: 12,
                    hours24: 12,
                    minutes: 0,
                    period: 'PM',
                    isValid: false
                }

            let h24 = 12
            let m = 0
            let p = 'PM'

            if (typeof value === 'string') {
                const match = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i)
                if (match) {
                    let rawH = parseInt(match[1], 10)
                    m = parseInt(match[2], 10)
                    const rawP = match[3] ? match[3].toUpperCase() : null

                    if (rawP) {
                        p = rawP
                        if (p === 'PM' && rawH < 12) h24 = rawH + 12
                        else if (p === 'AM' && rawH === 12) h24 = 0
                        else h24 = rawH
                    } else {
                        h24 = rawH
                        p = h24 >= 12 ? 'PM' : 'AM'
                    }
                }
            } else if (value instanceof Date && !isNaN(value)) {
                h24 = value.getHours()
                m = value.getMinutes()
                p = h24 >= 12 ? 'PM' : 'AM'
            }

            let h12 = h24 % 12
            if (h12 === 0) h12 = 12

            return {
                hours12: h12,
                hours24: h24,
                minutes: m,
                period: p,
                isValid: true
            }
        }, [value])

        const [selectedH12, setSelectedH12] = useState(parsed.hours12)
        const [selectedH24, setSelectedH24] = useState(parsed.hours24)
        const [selectedM, setSelectedM] = useState(parsed.minutes)
        const [selectedP, setSelectedP] = useState(parsed.period)

        useEffect(() => {
            if (parsed.isValid) {
                setSelectedH12(parsed.hours12)
                setSelectedH24(parsed.hours24)
                setSelectedM(parsed.minutes)
                setSelectedP(parsed.period)
            }
        }, [parsed])

        const handleClose = useCallback(() => {
            setOpen(false)
        }, [])

        useImperativeHandle(outerRef, () => ({
            close: handleClose,
            open: () => setOpen(true)
        }))

        const { coords, updatePosition } = useDropdownPosition(open, triggerRef, 270)

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

        const emitTime = (h12Val, h24Val, mVal, pVal) => {
            let finalH24 = h24Val
            if (is12h) {
                if (pVal === 'PM' && h12Val < 12) finalH24 = h12Val + 12
                else if (pVal === 'AM' && h12Val === 12) finalH24 = 0
                else finalH24 = h12Val
            }

            const time24Str = `${String(finalH24).padStart(2, '0')}:${String(mVal).padStart(2, '0')}`
            const time12Str = `${String(h12Val).padStart(2, '0')}:${String(mVal).padStart(2, '0')} ${pVal}`

            onChange?.(time24Str, {
                time24: time24Str,
                time12: time12Str,
                hours24: finalH24,
                hours12: h12Val,
                minutes: mVal,
                period: pVal
            })
        }

        const displayFormatted = useMemo(() => {
            if (!parsed.isValid) return placeholder
            if (is12h) {
                return `${String(parsed.hours12).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')} ${parsed.period}`
            }
            return `${String(parsed.hours24).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')}`
        }, [parsed, is12h, placeholder])

        const presets = [
            { label: '09:00 AM', h12: 9, h24: 9, m: 0, p: 'AM' },
            { label: '12:00 PM', h12: 12, h24: 12, m: 0, p: 'PM' },
            { label: '03:00 PM', h12: 3, h24: 15, m: 0, p: 'PM' },
            { label: '06:00 PM', h12: 6, h24: 18, m: 0, p: 'PM' },
            { label: '09:00 PM', h12: 9, h24: 21, m: 0, p: 'PM' }
        ]

        const hourOptions = useMemo(() => {
            if (is12h) {
                return Array.from({ length: 12 }, (_, i) => i + 1)
            }
            return Array.from({ length: 24 }, (_, i) => i)
        }, [is12h])

        const minuteOptions = useMemo(() => {
            return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
        }, [])

        const menuContent = (
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 4 : -4
                        }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        style={{
                            ...menuStyle,
                            position: 'fixed',
                            top: coords.placement === 'top' ? undefined : coords.top,
                            bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                            left: coords.left,
                            width: 270,
                            zIndex: menuStyle?.zIndex ?? 'var(--cc-z)'
                        }}
                        className={`rounded-2xl p-3 ${panelClass}`}
                    >
                        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-cc-overlay/10 customScrollbar">
                            {presets.map((pr) => (
                                <button
                                    key={pr.label}
                                    type="button"
                                    onClick={() => {
                                        setSelectedH12(pr.h12)
                                        setSelectedH24(pr.h24)
                                        setSelectedM(pr.m)
                                        setSelectedP(pr.p)
                                        emitTime(pr.h12, pr.h24, pr.m, pr.p)
                                    }}
                                    className="shrink-0 rounded-lg bg-cc-overlay/5 px-2 py-1 text-[11px] font-medium text-cc-text hover:bg-cc-primary/15 hover:text-cc-primary transition-colors"
                                >
                                    {pr.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-1 pt-2 pb-1 text-center">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-cc-muted mb-1.5">Hours</p>
                                <div className="h-44 overflow-y-auto customScrollbar space-y-1 pr-1">
                                    {hourOptions.map((h) => {
                                        const isSelected = is12h ? selectedH12 === h : selectedH24 === h

                                        return (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => {
                                                    if (is12h) {
                                                        setSelectedH12(h)
                                                        emitTime(h, selectedH24, selectedM, selectedP)
                                                    } else {
                                                        setSelectedH24(h)
                                                        let h12 = h % 12
                                                        if (h12 === 0) h12 = 12
                                                        const p = h >= 12 ? 'PM' : 'AM'
                                                        setSelectedH12(h12)
                                                        setSelectedP(p)
                                                        emitTime(h12, h, selectedM, p)
                                                    }
                                                }}
                                                className={`w-full rounded-lg py-1.5 text-xs font-semibold transition-all ${isSelected
                                                    ? 'bg-cc-primary text-cc-on-primary font-bold'
                                                    : 'text-cc-text hover:bg-cc-overlay/10 hover:text-cc-text'
                                                    }`}
                                            >
                                                {String(h).padStart(2, '0')}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase text-cc-muted mb-1.5">Mins</p>
                                <div className="h-44 overflow-y-auto customScrollbar space-y-1 pr-1">
                                    {minuteOptions.map((m) => {
                                        const isSelected = selectedM === m
                                        return (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedM(m)
                                                    emitTime(selectedH12, selectedH24, m, selectedP)
                                                }}
                                                className={`w-full rounded-lg py-1.5 text-xs font-semibold transition-all ${isSelected
                                                    ? 'bg-cc-primary text-cc-on-primary font-bold'
                                                    : 'text-cc-text hover:bg-cc-overlay/10 hover:text-cc-text'
                                                    }`}
                                            >
                                                {String(m).padStart(2, '0')}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase text-cc-muted mb-1.5">
                                    {is12h ? 'Period' : 'Actions'}
                                </p>
                                {is12h ? (
                                    <div className="space-y-2 pt-2">
                                        {['AM', 'PM'].map((period) => (
                                            <button
                                                key={period}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedP(period)
                                                    emitTime(selectedH12, selectedH24, selectedM, period)
                                                }}
                                                className={`w-full rounded-xl py-3 text-xs font-bold transition-all ${selectedP === period
                                                    ? 'bg-cc-primary text-cc-on-primary shadow-md shadow-cc-primary/20'
                                                    : 'bg-cc-overlay/5 text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text'
                                                    }`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={() => {
                                        const now = new Date()
                                        const nowH24 = now.getHours()
                                        const nowM = Math.floor(now.getMinutes() / 5) * 5
                                        const nowP = nowH24 >= 12 ? 'PM' : 'AM'
                                        let nowH12 = nowH24 % 12
                                        if (nowH12 === 0) nowH12 = 12

                                        setSelectedH12(nowH12)
                                        setSelectedH24(nowH24)
                                        setSelectedM(nowM)
                                        setSelectedP(nowP)
                                        emitTime(nowH12, nowH24, nowM, nowP)
                                        handleClose()
                                    }}
                                    className="w-full mt-3 rounded-xl bg-cc-overlay/10 border border-cc-overlay/10 py-2 text-[11px] font-semibold text-cc-primary hover:bg-cc-primary/15 transition-colors"
                                >
                                    Now
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-cc-overlay/10 pt-2">
                            {cleanable && parsed.isValid && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange?.('')
                                        handleClose()
                                    }}
                                    className="rounded-lg px-2.5 py-1 text-xs text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleClose}
                                className="ml-auto rounded-lg bg-cc-primary px-4 py-1 text-xs font-bold text-cc-on-primary hover:bg-cc-primary-hover transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        )

        return (
            <div
                ref={triggerRef}
                className={`relative ${className}`}
                style={style}
                {...filterDomProps(props)}
            >
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                        if (disabled) return
                        if (!open) updatePosition()
                        setOpen((v) => !v)
                    }}
                    className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-4 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/15 ${open
                        ? 'border-cc-primary/50 bg-cc-surface ring-4 ring-cc-primary/10'
                        : 'border-cc-overlay/10 bg-cc-surface hover:border-cc-primary/30'
                        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <span className="flex items-center gap-2.5 min-w-0">
                        <AccessTimeOutlinedIcon
                            size={18}
                            strokeWidth={2}
                            className={open ? 'text-cc-primary' : 'text-cc-muted'}
                        />
                        <span
                            className={
                                parsed.isValid ? 'truncate text-cc-text font-medium' : 'truncate text-cc-muted'
                            }
                        >
                            {displayFormatted}
                        </span>
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                        {cleanable && parsed.isValid && (
                            <span
                                role="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onChange?.('')
                                }}
                                className="flex h-6 w-6 items-center justify-center rounded-md text-cc-muted hover:bg-cc-overlay/10 hover:text-cc-text"
                            >
                                <CloseRounded className="w-4 h-4" />
                            </span>
                        )}
                        <KeyboardArrowDownRounded
                            size={20}
                            strokeWidth={2}
                            className={`text-cc-muted transition-transform duration-200 ${open ? 'rotate-180 text-cc-primary' : ''
                                }`}
                        />
                    </div>
                </button>
                <ThemedPortal>{menuContent}</ThemedPortal>
            </div>
        )
    }
)

export const Modal = ({ open, onClose, children, size = 'md', className = '' }) => {
    if (!open) return null
    const widths = {
        xs: 'max-w-md',
        sm: 'max-w-lg',
        md: 'max-w-2xl',
        lg: 'max-w-5xl',
        xl: 'max-w-6xl'
    }

    return (
        <ThemedPortal>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-cc-scrim/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`relative flex max-h-[90vh] w-full ${widths[size] || widths.md} flex-col overflow-hidden rounded-2xl border border-cc-overlay/10 bg-cc-surface shadow-2xl shadow-cc-scrim/15 ${className}`}
                >
                    {children}
                </motion.div>
            </div>
        </ThemedPortal>
    )
}

Modal.Header = ({ children, className = '' }) => (
    <div
        className={`flex items-center justify-between border-b border-cc-overlay/10 px-5 py-4 ${className}`}
    >
        {children}
    </div>
)

Modal.Title = ({ children, className = '' }) => (
    <div className={`text-base font-semibold text-cc-text ${className}`}>{children}</div>
)

Modal.Body = ({ children, className = '' }) => (
    <div className={`min-h-0 flex-1 overflow-auto customScrollbar px-5 py-4 ${className}`}>
        {children}
    </div>
)

Modal.Footer = ({ children, className = '' }) => (
    <div
        className={`flex items-center justify-end gap-2 border-t border-cc-overlay/10 px-5 py-4 ${className}`}
    >
        {children}
    </div>
)

export const InputNumber = ({
    value = '',
    onChange,
    min,
    max,
    step = 'any',
    prefix,
    disabled = false,
    formatter,
    className = '',
    placeholder,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [localStr, setLocalStr] = useState(
        value === '' || value === null || value === undefined ? '' : String(value)
    )

    useEffect(() => {
        if (!isFocused) {
            setLocalStr(value === '' || value === null || value === undefined ? '' : String(value))
        }
    }, [value, isFocused])

    const displayValue = isFocused
        ? localStr
        : value === '' || value === null || value === undefined
            ? ''
            : formatter
                ? formatter(value)
                : String(value)

    const handleChange = (e) => {
        const raw = e.target.value
        if (raw === '' || raw === null || raw === undefined) {
            setLocalStr('')
            onChange?.('')
            return
        }

        const allowNegative = min === undefined || min < 0
        const hasMinus = allowNegative && raw.includes('-')
        let cleanDigits = raw.replace(/[^0-9.]/g, '')
        const parts = cleanDigits.split('.')
        if (parts.length > 2) {
            cleanDigits = parts[0] + '.' + parts.slice(1).join('')
        }

        const clean = (hasMinus ? '-' : '') + cleanDigits
        setLocalStr(clean)

        if (clean === '' || clean === '.' || clean === '-' || clean === '-.') {
            onChange?.('')
        } else {
            const num = Number(clean)
            if (!Number.isNaN(num)) {
                onChange?.(num)
            }
        }
    }

    const handleFocus = (e) => {
        setIsFocused(true)
        setLocalStr(value === '' || value === null || value === undefined ? '' : String(value))
        onFocus?.(e)
    }

    const handleBlur = (e) => {
        setIsFocused(false)
        onBlur?.(e)
        if (localStr === '.' || localStr === '-' || localStr === '-.' || localStr === '') {
            setLocalStr('')
            onChange?.('')
        } else {
            const num = Number(localStr)
            if (!Number.isNaN(num)) {
                let finalNum = num
                if (min !== undefined && num < min) finalNum = min
                if (max !== undefined && num > max) finalNum = max
                if (finalNum !== num) {
                    onChange?.(finalNum)
                    setLocalStr(String(finalNum))
                }
            }
        }
    }

    return (
        <div className={`relative flex items-center ${className}`}>
            {prefix !== undefined && prefix !== null && (
                <div className="absolute left-3 z-10 flex items-center text-cc-muted pointer-events-none">
                    {prefix}
                </div>
            )}
            <input
                {...filterDomProps(props)}
                type="text"
                inputMode="decimal"
                value={displayValue}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`h-11 w-full rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 text-sm font-normal text-cc-text outline-none transition-all placeholder:text-cc-subtle focus:border-cc-primary/50 focus:ring-4 focus:ring-cc-primary/10 disabled:cursor-not-allowed disabled:opacity-50 ${prefix !== undefined && prefix !== null ? 'pl-9' : ''}`}
            />
        </div>
    )
}

const normalizePickerData = (data = []) =>
    data.map((item) => (typeof item === 'object' ? item : { label: String(item), value: item }))

export const CheckPicker = forwardRef(
    (
        {
            data = [],
            value = [],
            onChange,
            placeholder = 'Select...',
            searchable = true,
            className = '',
            menuMaxHeight = 260,
            menuWidth,
            menuStyle,
            disabled = false,
            renderMenuItem,
            renderExtraFooter,
            onCreateNew,
            createNewText,
            ...props
        },
        outerRef
    ) => {
        const items = normalizePickerData(data)
        const [open, setOpen] = useState(false)
        const [query, setQuery] = useState('')
        const [focusedIndex, setFocusedIndex] = useState(-1)
        const triggerRef = useRef(null)
        const menuRef = useRef(null)
        const listRef = useRef(null)
        const resolvedMenuWidth = menuStyle?.width ?? menuWidth ?? null
        const { coords, updatePosition } = useDropdownPosition(open, triggerRef, resolvedMenuWidth)
        const selectedValues = Array.isArray(value) ? value : []

        const handleClose = useCallback(() => {
            setOpen(false)
            setQuery('')
            setFocusedIndex(-1)
        }, [])

        useImperativeHandle(outerRef, () => ({
            close: handleClose,
            open: () => {
                updatePosition()
                setOpen(true)
            }
        }))

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

        const filtered = useMemo(
            () =>
                !query
                    ? items
                    : items.filter((i) =>
                        String(i.label ?? i.value)
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    ),
            [items, query]
        )

        useEffect(() => {
            if (open) {
                setFocusedIndex(filtered.length > 0 ? 0 : -1)
            }
        }, [open, query, filtered.length])

        useEffect(() => {
            if (open && focusedIndex >= 0 && listRef.current) {
                const targetEl = listRef.current.children[focusedIndex]
                if (targetEl && typeof targetEl.scrollIntoView === 'function') {
                    targetEl.scrollIntoView({ block: 'nearest' })
                }
            }
        }, [focusedIndex, open])

        const toggle = (v) => {
            const exists = selectedValues.some((x) => String(x) === String(v))
            onChange?.(
                exists ? selectedValues.filter((x) => String(x) !== String(v)) : [...selectedValues, v]
            )
        }

        const handleKeyDown = (e) => {
            e.stopPropagation()
            if (!open) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                    e.preventDefault()
                    updatePosition()
                    setOpen(true)
                }
                return
            }

            const extraCount = renderExtraFooter || onCreateNew ? 1 : 0
            const totalCount = filtered.length + extraCount

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setFocusedIndex((prev) => (prev < totalCount - 1 ? prev + 1 : 0))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalCount - 1))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (focusedIndex >= 0 && focusedIndex < filtered.length) {
                    toggle(filtered[focusedIndex].value)
                } else if (focusedIndex === filtered.length && (renderExtraFooter || onCreateNew)) {
                    handleClose()
                    if (onCreateNew) {
                        onCreateNew()
                    } else if (typeof renderExtraFooter === 'function') {
                        renderExtraFooter(handleClose)
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                handleClose()
            }
        }

        const labels = items
            .filter((i) => selectedValues.some((v) => String(v) === String(i.value)))
            .map((i) => i.label)

        const menuContent = (
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{
                            opacity: 0,
                            y: coords.placement === 'top' ? 5 : -5
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: coords.placement === 'top' ? 5 : -5 }}
                        style={{
                            ...menuStyle,
                            position: 'fixed',
                            top: coords.placement === 'top' ? undefined : coords.top,
                            bottom: coords.placement === 'top' ? window.innerHeight - coords.top : undefined,
                            left: coords.left,
                            width: coords.width,
                            maxWidth: 'calc(100vw - 24px)',
                            zIndex: menuStyle?.zIndex ?? 'var(--cc-z)'
                        }}
                        className={`overflow-hidden rounded-2xl ${panelClass}`}
                    >
                        {searchable && (
                            <div className="border-b border-cc-overlay/10 p-2">
                                <input
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search..."
                                    className="h-10 w-full rounded-xl border border-cc-overlay/10 bg-cc-overlay/5 px-3 text-sm text-cc-text outline-none"
                                />
                            </div>
                        )}
                        <div
                            ref={listRef}
                            className="overflow-y-auto p-1.5 customScrollbar"
                            style={{ maxHeight: menuMaxHeight }}
                        >
                            {filtered.length === 0 ? (
                                <div className="px-4 py-6 text-center text-sm text-cc-muted">No results found</div>
                            ) : (
                                filtered.map((item, idx) => {
                                    const checked = selectedValues.some((v) => String(v) === String(item.value))
                                    const isFocused = idx === focusedIndex
                                    return (
                                        <button
                                            key={String(item.value)}
                                            type="button"
                                            onMouseEnter={() => setFocusedIndex(idx)}
                                            onClick={() => toggle(item.value)}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${checked
                                                ? 'bg-cc-primary/10 text-cc-primary'
                                                : isFocused
                                                    ? 'bg-cc-overlay/10 text-cc-text'
                                                    : 'text-cc-text hover:bg-cc-overlay/10 hover:text-cc-text'
                                                }`}
                                        >
                                            <span className="truncate">{item.label ?? item.value}</span>
                                            <span
                                                className={`h-5 w-5 rounded-md border flex items-center justify-center ${checked ? 'border-cc-primary bg-cc-primary text-cc-on-primary' : 'border-cc-overlay/15'
                                                    }`}
                                            >
                                                {checked ? '✓' : ''}
                                            </span>
                                        </button>
                                    )
                                })
                            )}
                        </div>
                        {(renderExtraFooter || onCreateNew) && (
                            <div
                                className={`border-t border-cc-overlay/10 p-1.5 bg-cc-surface ${focusedIndex === filtered.length ? 'bg-cc-overlay/10' : ''
                                    }`}
                                onMouseEnter={() => setFocusedIndex(filtered.length)}
                            >
                                {renderExtraFooter ? (
                                    typeof renderExtraFooter === 'function' ? (
                                        renderExtraFooter(handleClose)
                                    ) : (
                                        renderExtraFooter
                                    )
                                ) : (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleClose()
                                            onCreateNew?.()
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary/15 px-3 py-2 text-xs font-bold text-cc-primary transition-colors hover:bg-cc-primary/25 cursor-pointer"
                                    >
                                        <AddRounded size={16} strokeWidth={2.5} />
                                        {createNewText || 'Create New'}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        )

        return (
            <div ref={triggerRef} className={`relative ${className}`} {...filterDomProps(props)}>
                <button
                    type="button"
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                        if (disabled) return
                        if (!open) updatePosition()
                        setOpen((v) => !v)
                    }}
                    className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 py-2 text-left text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cc-primary/15 ${open ? 'border-cc-primary/50 ring-4 ring-cc-primary/10' : 'hover:border-cc-primary/30'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className={labels.length ? 'truncate text-cc-text' : 'truncate text-cc-muted'}>
                        {labels.length ? labels.join(', ') : placeholder}
                    </span>
                    <KeyboardArrowDownRounded
                        size={20}
                        strokeWidth={2}
                        className={`shrink-0 text-cc-muted transition-transform ${open ? 'rotate-180 text-cc-primary' : ''}`}
                    />
                </button>
                <ThemedPortal>{menuContent}</ThemedPortal>
            </div>
        )
    }
)

export const TagPicker = CheckPicker

export const Toggle = ({
    checked = false,
    onChange,
    checkedChildren,
    unCheckedChildren,
    disabled = false,
    size = 'md',
    className = ''
}) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex items-center shrink-0 rounded-full border transition-all duration-300 focus:outline-none ${size === 'lg' ? 'h-8 w-16 p-1' : 'h-6 w-12 p-0.5'
            } ${checked
                ? 'border-cc-primary bg-cc-primary text-cc-on-primary shadow-md shadow-cc-primary/20'
                : 'border-cc-overlay/15 bg-cc-surface text-cc-muted hover:border-cc-overlay/25'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
        <span
            className={`rounded-full shadow-md transition-all duration-300 ease-out transform ${size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
                } ${checked
                    ? size === 'lg'
                        ? 'translate-x-8 bg-cc-on-primary'
                        : 'translate-x-6 bg-cc-on-primary'
                    : 'translate-x-0.5 bg-cc-muted'
                }`}
        />
        {(checkedChildren || unCheckedChildren) && (
            <span
                className={`absolute inset-0 flex items-center ${checked ? 'justify-start pl-2 text-cc-primary' : 'justify-end pr-2 text-cc-muted'
                    } text-[9px] font-bold pointer-events-none select-none transition-opacity duration-200`}
            >
                {checked ? checkedChildren : unCheckedChildren}
            </span>
        )}
    </button>
)

export const Checkbox = ({
    checked = false,
    onChange,
    children,
    disabled = false,
    className = ''
}) => (
    <label
        className={`inline-flex items-center gap-2 cursor-pointer text-sm text-cc-text ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
        <input
            type="checkbox"
            checked={!!checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked, e)}
            className="h-4 w-4 accent-cc-primary"
        />
        {children}
    </label>
)

export const Uploader = ({
    onChange,
    onDragEnter,
    onDragLeave,
    onDrop,
    disabled = false,
    accept,
    children,
    className = '',
    draggable = true,
    autoUpload = false,
    ...props
}) => {
    const fileInputRef = useRef(null)

    const handleFiles = (files) => {
        if (!files || files.length === 0) return
        const fileList = Array.from(files).map((file) => ({
            blobFile: file,
            name: file.name
        }))
        onChange?.(fileList)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onDragEnter?.(e)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onDragLeave?.(e)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onDrop?.(e)
        if (!disabled && e.dataTransfer && e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files)
        }
    }

    return (
        <div
            className={`relative ${className}`}
            onDragOver={draggable ? handleDragOver : undefined}
            onDragEnter={draggable ? handleDragEnter : undefined}
            onDragLeave={draggable ? handleDragLeave : undefined}
            onDrop={draggable ? handleDrop : undefined}
            onClick={() => {
                if (!disabled && fileInputRef.current) {
                    fileInputRef.current.click()
                }
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                disabled={disabled}
                onChange={(e) => {
                    if (e.target.files) {
                        handleFiles(e.target.files)
                        e.target.value = ''
                    }
                }}
            />
            {children}
        </div>
    )
}

export const Animation = {
    Collapse: ({ in: isIn, children }) => (
        <AnimatePresence initial={false}>
            {isIn && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    ),
    Bounce: ({ in: isIn = true, children, className = '' }) => (
        <AnimatePresence>
            {isIn && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    ),
    Fade: ({ in: isIn = true, children, className = '' }) => (
        <AnimatePresence>
            {isIn && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ===================== ADDITIONAL CONTROLS ===================== */

/* Shared field styling so every text based control matches. */




export const Textarea = forwardRef(

    (

        {

            value = '',

            onChange,

            rows = 4,

            placeholder,

            className = '',

            disabled = false,

            resize = true,

            maxLength,

            showCount = false,

            ...props

        },

        ref

    ) => {

        const text = value ?? ''



        return (

            <div className={`relative w-full ${className}`}>

                <textarea

                    {...props}

                    ref={ref}

                    rows={rows}

                    value={text}

                    maxLength={maxLength}

                    disabled={disabled}

                    placeholder={placeholder}

                    onChange={(e) => onChange?.(e.target.value, e)}

                    className={`w-full rounded-xl border border-cc-overlay/10 bg-cc-surface px-4 py-3 text-sm font-normal leading-relaxed text-cc-text outline-none transition-all placeholder:text-cc-subtle focus:border-cc-primary/50 focus:ring-4 focus:ring-cc-primary/10 disabled:cursor-not-allowed disabled:opacity-50 ${resize ? 'resize-y' : 'resize-none'

                        } ${showCount ? 'pb-7' : ''}`}

                />

                {showCount && (

                    <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] font-medium text-cc-subtle">

                        {String(text).length}

                        {maxLength ? ` / ${maxLength}` : ''}

                    </span>

                )}

            </div>

        )

    }

)



export const PasswordInput = forwardRef(

    (

        {

            value = '',

            onChange,

            placeholder = 'Password',

            className = '',

            disabled = false,

            visible: visibleProp,

            onVisibleChange,

            showToggle = true,

            ...props

        },

        ref

    ) => {

        const [innerVisible, setInnerVisible] = useState(false)

        const isControlled = visibleProp !== undefined

        const visible = isControlled ? visibleProp : innerVisible



        const toggle = () => {

            if (!isControlled) setInnerVisible((v) => !v)

            onVisibleChange?.(!visible)

        }



        return (

            <div className={`relative flex w-full items-center ${className}`}>

                <input

                    {...props}

                    ref={ref}

                    type={visible ? 'text' : 'password'}

                    value={value ?? ''}

                    disabled={disabled}

                    placeholder={placeholder}

                    onChange={(e) => onChange?.(e.target.value, e)}

                    className={`${fieldClass} pr-11`}

                />

                {showToggle && (

                    <button

                        type="button"

                        tabIndex={-1}

                        disabled={disabled}

                        onClick={toggle}

                        aria-label={visible ? 'Hide password' : 'Show password'}

                        className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-xl text-cc-muted transition-colors hover:bg-cc-overlay/10 hover:text-cc-text"

                    >

                        {visible ? <EyeOffRoundedIcon size={17} /> : <EyeRoundedIcon size={17} />}

                    </button>

                )}

            </div>

        )

    }

)



export const SearchInput = forwardRef(

    (

        {

            value = '',

            onChange,

            onClear,

            placeholder = 'Search...',

            className = '',

            disabled = false,

            cleanable = true,

            ...props

        },

        ref

    ) => {

        const text = value ?? ''



        return (

            <div className={`relative flex w-full items-center ${className}`}>

                <SearchRoundedIcon

                    size={17}

                    className="pointer-events-none absolute left-3.5 text-cc-muted"

                />

                <input

                    {...props}

                    ref={ref}

                    type="text"

                    value={text}

                    disabled={disabled}

                    placeholder={placeholder}

                    onChange={(e) => onChange?.(e.target.value, e)}

                    className={`${fieldClass} pl-10 ${cleanable && text ? 'pr-10' : ''}`}

                />

                {cleanable && text && (

                    <button

                        type="button"

                        aria-label="Clear search"

                        onClick={() => {

                            onChange?.('', null)

                            onClear?.()

                        }}

                        className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-xl text-cc-muted transition-colors hover:bg-cc-overlay/10 hover:text-cc-text"

                    >

                        <CloseRounded size={15} />

                    </button>

                )}

            </div>

        )

    }

)



export const Radio = ({

    checked = false,

    onChange,

    value,

    name,

    disabled = false,

    children,

    className = ''

}) => (

    <label

        className={`inline-flex items-center gap-2.5 text-sm text-cc-text ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'

            } ${className}`}

    >

        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">

            <input

                type="radio"

                name={name}

                value={value}

                checked={!!checked}

                disabled={disabled}

                onChange={() => onChange?.(value)}

                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"

            />

            <span

                className={`pointer-events-none flex h-4 w-4 items-center justify-center rounded-full border transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-cc-primary/20 ${checked ? 'border-cc-primary' : 'border-cc-overlay/30'

                    }`}

            >

                {checked && <span className="h-2 w-2 rounded-full bg-cc-primary" />}

            </span>

        </span>

        {children}

    </label>

)



export const RadioGroup = ({

    value,

    onChange,

    name,

    direction = 'vertical',

    disabled = false,

    children,

    className = ''

}) => {

    const generatedName = React.useId ? React.useId() : undefined

    const groupName = name || `cc-radio-${generatedName ?? ''}`



    return (

        <div

            role="radiogroup"

            className={`flex ${direction === 'horizontal'

                ? 'flex-row flex-wrap gap-x-5 gap-y-2'

                : 'flex-col gap-2.5'

                } ${className}`}

        >

            {React.Children.map(children, (child) => {

                if (!React.isValidElement(child)) return child

                return React.cloneElement(child, {

                    name: groupName,

                    disabled: disabled || child.props.disabled,

                    checked: String(child.props.value) === String(value),

                    onChange

                })

            })}

        </div>

    )

}



export const Slider = forwardRef(

    (

        {

            value,

            defaultValue = 0,

            onChange,

            min = 0,

            max = 100,

            step = 1,

            disabled = false,

            showValue = true,

            formatValue,

            className = '',

            inputClassName = '',

            style,

            ...props

        },

        ref

    ) => {

        const [innerValue, setInnerValue] = useState(defaultValue)

        const isControlled = value !== undefined

        const current = isControlled ? value : innerValue

        const numeric = Math.min(max, Math.max(min, Number(current) || 0))

        const percent = max === min ? 0 : ((numeric - min) / (max - min)) * 100

        const label = formatValue ? formatValue(numeric) : numeric



        return (

            <div className={`flex w-full items-center gap-3 ${className}`}>

                <input

                    {...props}

                    ref={ref}

                    type="range"

                    min={min}

                    max={max}

                    step={step}

                    value={numeric}

                    disabled={disabled}

                    onChange={(e) => {

                        const next = Number(e.target.value)

                        if (!isControlled) setInnerValue(next)

                        onChange?.(next, e)

                    }}

                    className={`cc-slider h-1.5 w-full cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName}`}

                    style={{

                        ...style,

                        background: `linear-gradient(to right, rgb(var(--cc-primary)) ${percent}%, rgb(var(--cc-overlay) / 0.15) ${percent}%)`

                    }}

                />

                {showValue && (

                    <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-cc-muted">

                        {label}

                    </span>

                )}

            </div>

        )

    }

)



export const Tooltip = ({

    content,

    speaker,

    placement = 'top',

    open,

    onOpenChange,

    disabled = false,

    offset = 8,

    className = '',

    tooltipClassName = '',

    children

}) => {

    const [innerOpen, setInnerOpen] = useState(false)

    const [coords, setCoords] = useState({ top: 0, left: 0, transform: 'translate(-50%, -100%)' })

    const triggerRef = useRef(null)

    const isControlled = open !== undefined

    const visible = !disabled && (isControlled ? open : innerOpen)

    const label = content ?? (React.isValidElement(speaker) ? speaker.props.children : speaker)



    const setOpenState = (next) => {

        if (!isControlled) setInnerOpen(next)

        onOpenChange?.(next)

    }



    const updatePosition = useCallback(() => {

        if (!triggerRef.current) return

        const rect = triggerRef.current.getBoundingClientRect()

        const positions = {

            top: {

                top: rect.top - offset,

                left: rect.left + rect.width / 2,

                transform: 'translate(-50%, -100%)'

            },

            bottom: {

                top: rect.bottom + offset,

                left: rect.left + rect.width / 2,

                transform: 'translate(-50%, 0)'

            },

            left: {

                top: rect.top + rect.height / 2,

                left: rect.left - offset,

                transform: 'translate(-100%, -50%)'

            },

            right: {

                top: rect.top + rect.height / 2,

                left: rect.right + offset,

                transform: 'translate(0, -50%)'

            }

        }

        setCoords(positions[placement] || positions.top)

    }, [offset, placement])



    useIsomorphicLayoutEffect(() => {

        if (!visible) return undefined

        updatePosition()

        window.addEventListener('resize', updatePosition)

        window.addEventListener('scroll', updatePosition, true)

        return () => {

            window.removeEventListener('resize', updatePosition)

            window.removeEventListener('scroll', updatePosition, true)

        }

    }, [visible, updatePosition])



    return (

        <>

            <span

                ref={triggerRef}

                className={`inline-flex ${className}`}

                onMouseEnter={() => setOpenState(true)}

                onMouseLeave={() => setOpenState(false)}

                onFocus={() => setOpenState(true)}

                onBlur={() => setOpenState(false)}

            >

                {children}

            </span>

            {label ? (

                <ThemedPortal>

                    <AnimatePresence>

                        {visible && (

                            <motion.div

                                role="tooltip"

                                initial={{ opacity: 0, scale: 0.96 }}

                                animate={{ opacity: 1, scale: 1 }}

                                exit={{ opacity: 0, scale: 0.96 }}

                                transition={{ duration: 0.1, ease: 'easeOut' }}

                                style={{

                                    position: 'fixed',

                                    ...coords,

                                    zIndex: 'var(--cc-z)',

                                    pointerEvents: 'none'

                                }}

                                className={`whitespace-nowrap rounded-lg border border-cc-overlay/10 bg-cc-surface px-2.5 py-1.5 text-xs font-medium text-cc-text shadow-lg shadow-cc-scrim/30 ${tooltipClassName}`}

                            >

                                {label}

                            </motion.div>

                        )}

                    </AnimatePresence>

                </ThemedPortal>

            ) : null}

        </>

    )

}



export const Whisper = ({ children, speaker, placement = 'top', className = '' }) => (

    <Tooltip speaker={speaker} placement={placement} className={className}>

        {children}

    </Tooltip>

)

/* ===================== PACKAGE EXPORTS ===================== */

export default {
    Button, Label, FormField, Combobox, Autocomplete, OtpInput,
    Alert, Toast, ToastProvider, useToast, Progress, Skeleton, ColorPicker,
    Input, InputNumber, InputGroup, SelectPicker, CheckPicker, TagPicker,
    DateRangePicker, DatePicker, TimePicker, Modal, Toggle, Checkbox,
    Uploader, Animation,
    Textarea, PasswordInput, SearchInput, Radio, RadioGroup, Slider,
    Tooltip, Whisper
}