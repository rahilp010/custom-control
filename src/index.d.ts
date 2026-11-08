import * as React from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ColorTokens {
    primary?: string
    primaryHover?: string
    onPrimary?: string
    surface?: string
    surfaceRaised?: string
    text?: string
    muted?: string
    subtle?: string
    overlay?: string
    scrim?: string
    [key: string]: string | undefined
}

export interface CustomControlsProviderProps {
    theme?: ThemeMode
    colors?: ColorTokens
    fontFamily?: string
    zIndex?: number | string
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

export declare const CustomControlsProvider: React.FC<CustomControlsProviderProps>
export declare const ThemeProvider: React.FC<CustomControlsProviderProps>
export declare function useControlsTheme(): { theme: string; style?: React.CSSProperties }
export declare const ThemedPortal: React.FC<{ children: React.ReactNode }>

export declare function toRgbChannels(color?: string | number[] | null): string | null
export declare function darken(channels: string, amount?: number): string
export declare function contrastOn(channels: string, light?: string, dark?: string): string
export declare function buildThemeStyle(options?: {
    colors?: ColorTokens
    fontFamily?: string
    zIndex?: number | string
}): React.CSSProperties

/* ===================== BUTTON ===================== */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
}
export declare const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
>

/* ===================== LABELS & FORMS ===================== */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string
    required?: boolean
}
export declare const Label: React.FC<LabelProps>

export interface FormFieldProps {
    id?: string
    label?: React.ReactNode
    description?: React.ReactNode
    error?: React.ReactNode
    required?: boolean
    className?: string
    children?: React.ReactElement
}
export declare const FormField: React.FC<FormFieldProps>

/* ===================== INPUTS ===================== */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string | number
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}
export declare const Input: React.FC<InputProps>

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}
export interface InputGroupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode
}
export interface InputGroupComponent extends React.FC<InputGroupProps> {
    Button: React.FC<InputGroupButtonProps>
}
export declare const InputGroup: InputGroupComponent

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'prefix'> {
    value?: number | string
    onChange?: (value: number | '') => void
    min?: number
    max?: number
    step?: number | 'any'
    prefix?: React.ReactNode
    formatter?: (value: number | string) => string
}
export declare const InputNumber: React.FC<InputNumberProps>

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
    value?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
    rows?: number
    resize?: boolean
    showCount?: boolean
    maxLength?: number
}
export declare const Textarea: React.ForwardRefExoticComponent<
    TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    showToggle?: boolean
}
export declare const PasswordInput: React.ForwardRefExoticComponent<
    PasswordInputProps & React.RefAttributes<HTMLInputElement>
>

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement> | null) => void
    onClear?: () => void
    cleanable?: boolean
}
export declare const SearchInput: React.ForwardRefExoticComponent<
    SearchInputProps & React.RefAttributes<HTMLInputElement>
>

export interface OtpInputHandle {
    focus: (index?: number) => void
    clear: () => void
}
export interface OtpInputProps {
    length?: number
    value?: string
    defaultValue?: string
    onChange?: (code: string) => void
    disabled?: boolean
    autoFocus?: boolean
    type?: 'numeric' | 'alphanumeric'
    className?: string
    inputClassName?: string
}
export declare const OtpInput: React.ForwardRefExoticComponent<
    OtpInputProps & React.RefAttributes<OtpInputHandle>
>

/* ===================== PICKERS ===================== */
export interface PickerItem {
    label: string
    value: any
    disabled?: boolean
    [key: string]: any
}

export interface SelectPickerHandle {
    open: () => void
    close: () => void
}
export interface SelectPickerProps {
    data?: Array<PickerItem | any>
    value?: any
    onChange?: (value: any, item: PickerItem) => void
    placeholder?: string
    searchable?: boolean
    cleanable?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    menuMaxHeight?: number
    menuWidth?: number
    menuStyle?: React.CSSProperties
    renderMenuItem?: (label: string, item: PickerItem) => React.ReactNode
    renderExtraFooter?: React.ReactNode | ((close: () => void) => React.ReactNode)
    onCreateNew?: () => void
    createNewText?: string
}
export declare const SelectPicker: React.ForwardRefExoticComponent<
    SelectPickerProps & React.RefAttributes<SelectPickerHandle>
>

export interface CheckPickerHandle {
    open: () => void
    close: () => void
}
export interface CheckPickerProps {
    data?: Array<PickerItem | any>
    value?: any[]
    onChange?: (values: any[]) => void
    placeholder?: string
    searchable?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    menuMaxHeight?: number
    menuWidth?: number
    menuStyle?: React.CSSProperties
    renderMenuItem?: (label: string, item: PickerItem) => React.ReactNode
    renderExtraFooter?: React.ReactNode | ((close: () => void) => React.ReactNode)
    onCreateNew?: () => void
    createNewText?: string
}
export declare const CheckPicker: React.ForwardRefExoticComponent<
    CheckPickerProps & React.RefAttributes<CheckPickerHandle>
>
export declare const TagPicker: typeof CheckPicker

export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'onSelect'> {
    options?: Array<string | { label: string; value: string; disabled?: boolean }>
    value?: string
    defaultValue?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    onSelect?: (value: string, item: { label: string; value: string; disabled?: boolean }) => void
    allowCustomValue?: boolean
    emptyMessage?: string
    listClassName?: string
}
export declare const Combobox: React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLInputElement>
>
export declare const Autocomplete: React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLInputElement>
>

/* ===================== DATE & TIME ===================== */
export interface DatePickerHandle {
    open: () => void
    close: () => void
}
export interface DatePickerProps {
    value?: string | Date | null
    onChange?: (formattedDate: string, date: Date | null) => void
    placeholder?: string
    cleanable?: boolean
    disabled?: boolean
    format?: string
    className?: string
    style?: React.CSSProperties
    menuStyle?: React.CSSProperties
}
export declare const DatePicker: React.ForwardRefExoticComponent<
    DatePickerProps & React.RefAttributes<DatePickerHandle>
>

export interface DateRangePickerProps {
    value?: [Date | string, Date | string] | []
    onChange?: (range: [Date, Date] | []) => void
    placeholder?: string
    className?: string
    style?: React.CSSProperties
}
export declare const DateRangePicker: React.FC<DateRangePickerProps>

export interface TimeDetail {
    time24: string
    time12: string
    hours24: number
    hours12: number
    minutes: number
    period: 'AM' | 'PM'
}
export interface TimePickerHandle {
    open: () => void
    close: () => void
}
export interface TimePickerProps {
    value?: string | Date
    onChange?: (time24: string, details: TimeDetail) => void
    placeholder?: string
    is12h?: boolean
    cleanable?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    menuStyle?: React.CSSProperties
}
export declare const TimePicker: React.ForwardRefExoticComponent<
    TimePickerProps & React.RefAttributes<TimePickerHandle>
>

/* ===================== SELECTION & TOGGLES ===================== */
export interface ToggleProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    checkedChildren?: React.ReactNode
    unCheckedChildren?: React.ReactNode
    disabled?: boolean
    size?: 'md' | 'lg'
    className?: string
}
export declare const Toggle: React.FC<ToggleProps>

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    checked?: boolean
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
    children?: React.ReactNode
    disabled?: boolean
}
export declare const Checkbox: React.FC<CheckboxProps>

export interface RadioProps {
    checked?: boolean
    onChange?: (value: any) => void
    value?: any
    name?: string
    disabled?: boolean
    children?: React.ReactNode
    className?: string
}
export declare const Radio: React.FC<RadioProps>

export interface RadioGroupProps {
    value?: any
    onChange?: (value: any) => void
    name?: string
    direction?: 'vertical' | 'horizontal'
    disabled?: boolean
    children?: React.ReactNode
    className?: string
}
export declare const RadioGroup: React.FC<RadioGroupProps>

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: number
    defaultValue?: number
    onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void
    min?: number
    max?: number
    step?: number
    showValue?: boolean
    formatValue?: (value: number) => React.ReactNode
    inputClassName?: string
}
export declare const Slider: React.ForwardRefExoticComponent<
    SliderProps & React.RefAttributes<HTMLInputElement>
>

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string
    defaultValue?: string
    onChange?: (hex: string, event: React.ChangeEvent<HTMLInputElement>) => void
    showValue?: boolean
    inputClassName?: string
}
export declare const ColorPicker: React.ForwardRefExoticComponent<
    ColorPickerProps & React.RefAttributes<HTMLInputElement>
>

/* ===================== OVERLAYS & MODALS ===================== */
export interface ModalProps {
    open?: boolean
    onClose?: () => void
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    children?: React.ReactNode
}
export interface ModalComponent extends React.FC<ModalProps> {
    Header: React.FC<{ children?: React.ReactNode; className?: string }>
    Title: React.FC<{ children?: React.ReactNode; className?: string }>
    Body: React.FC<{ children?: React.ReactNode; className?: string }>
    Footer: React.FC<{ children?: React.ReactNode; className?: string }>
}
export declare const Modal: ModalComponent

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export interface TooltipProps {
    content?: React.ReactNode
    speaker?: React.ReactNode
    placement?: TooltipPlacement
    open?: boolean
    onOpenChange?: (open: boolean) => void
    disabled?: boolean
    offset?: number
    className?: string
    tooltipClassName?: string
    children: React.ReactNode
}
export declare const Tooltip: React.FC<TooltipProps>

export interface WhisperProps {
    speaker: React.ReactNode
    placement?: TooltipPlacement
    className?: string
    children: React.ReactNode
}
export declare const Whisper: React.FC<WhisperProps>

/* ===================== FEEDBACK ===================== */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error'
export interface AlertProps {
    variant?: AlertVariant
    title?: string
    dismissible?: boolean
    onClose?: () => void
    className?: string
    children?: React.ReactNode
}
export declare const Alert: React.FC<AlertProps>

export interface ToastProps {
    variant?: AlertVariant
    title?: string
    duration?: number
    onClose?: () => void
    className?: string
    children?: React.ReactNode
}
export declare const Toast: React.FC<ToastProps>

export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

export interface ToastOptions {
    title?: string
    variant?: AlertVariant
    duration?: number
}
export interface ToastContextActions {
    toast: (message: React.ReactNode, options?: ToastOptions) => number
    success: (message: React.ReactNode, options?: ToastOptions) => number
    error: (message: React.ReactNode, options?: ToastOptions) => number
    warning: (message: React.ReactNode, options?: ToastOptions) => number
    info: (message: React.ReactNode, options?: ToastOptions) => number
    dismiss: (id: number) => void
    dismissAll: () => void
}
export declare function useToast(): ToastContextActions

export interface ToastProviderProps {
    children?: React.ReactNode
    position?: ToastPosition
    limit?: number
    duration?: number
}
export declare const ToastProvider: React.FC<ToastProviderProps>

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    label?: string
    showValue?: boolean
    size?: 'sm' | 'md' | 'lg'
}
export declare const Progress: React.FC<ProgressProps>

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
    width?: number | string
    height?: number | string
    circle?: boolean
}
export declare const Skeleton: React.FC<SkeletonProps>

/* ===================== FILES & MEDIA ===================== */
export interface UploadFile {
    blobFile: File
    name: string
}
export interface UploaderProps {
    onChange?: (files: UploadFile[]) => void
    accept?: string
    disabled?: boolean
    draggable?: boolean
    autoUpload?: boolean
    className?: string
    children?: React.ReactNode
    onDragEnter?: React.DragEventHandler<HTMLDivElement>
    onDragLeave?: React.DragEventHandler<HTMLDivElement>
    onDrop?: React.DragEventHandler<HTMLDivElement>
}
export declare const Uploader: React.FC<UploaderProps>

/* ===================== ANIMATION ===================== */
export interface AnimationHelpers {
    Collapse: React.FC<{ in?: boolean; children?: React.ReactNode }>
    Bounce: React.FC<{ in?: boolean; children?: React.ReactNode; className?: string }>
    Fade: React.FC<{ in?: boolean; children?: React.ReactNode; className?: string }>
}
export declare const Animation: AnimationHelpers

/* ===================== DEFAULT EXPORT ===================== */
declare const Controls: {
    Button: typeof Button
    Label: typeof Label
    FormField: typeof FormField
    Combobox: typeof Combobox
    Autocomplete: typeof Autocomplete
    OtpInput: typeof OtpInput
    Alert: typeof Alert
    Toast: typeof Toast
    ToastProvider: typeof ToastProvider
    useToast: typeof useToast
    Progress: typeof Progress
    Skeleton: typeof Skeleton
    ColorPicker: typeof ColorPicker
    Input: typeof Input
    InputNumber: typeof InputNumber
    InputGroup: typeof InputGroup
    SelectPicker: typeof SelectPicker
    CheckPicker: typeof CheckPicker
    TagPicker: typeof TagPicker
    DateRangePicker: typeof DateRangePicker
    DatePicker: typeof DatePicker
    TimePicker: typeof TimePicker
    Modal: typeof Modal
    Toggle: typeof Toggle
    Checkbox: typeof Checkbox
    Uploader: typeof Uploader
    Animation: typeof Animation
    Textarea: typeof Textarea
    PasswordInput: typeof PasswordInput
    SearchInput: typeof SearchInput
    Radio: typeof Radio
    RadioGroup: typeof RadioGroup
    Slider: typeof Slider
    Tooltip: typeof Tooltip
    Whisper: typeof Whisper
}

export default Controls
