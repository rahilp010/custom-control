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

/* ===================== BUTTON GROUP ===================== */
export interface ButtonGroupProps {
    variant?: ButtonVariant
    size?: ButtonSize
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}
export declare const ButtonGroup: React.FC<ButtonGroupProps>

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
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'prefix' | 'size'> {
    value?: string | number
    defaultValue?: string | number
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    size?: 'sm' | 'md' | 'lg'
    name?: string
    clearable?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
}
export declare const Input: React.FC<InputProps>

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg'
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

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'prefix' | 'size'> {
    value?: number | string
    defaultValue?: number | string
    onChange?: (value: number | '') => void
    size?: 'sm' | 'md' | 'lg'
    name?: string
    min?: number
    max?: number
    step?: number | 'any'
    prefix?: React.ReactNode
    formatter?: (value: number | string) => string
}
export declare const InputNumber: React.FC<InputNumberProps>

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
    value?: string
    defaultValue?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
    rows?: number
    resize?: boolean
    showCount?: boolean
    maxLength?: number
}
export declare const Textarea: React.ForwardRefExoticComponent<
    TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
    value?: string
    defaultValue?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    size?: 'sm' | 'md' | 'lg'
    name?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    showToggle?: boolean
}
export declare const PasswordInput: React.ForwardRefExoticComponent<
    PasswordInputProps & React.RefAttributes<HTMLInputElement>
>

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
    value?: string
    defaultValue?: string
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement> | null) => void
    size?: 'sm' | 'md' | 'lg'
    name?: string
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
    defaultValue?: any
    onChange?: (value: any, item: PickerItem) => void
    placeholder?: string
    searchable?: boolean
    cleanable?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    name?: string
    loading?: boolean
    onSearch?: (query: string) => void
    groupBy?: string | ((item: any) => string)
    creatable?: boolean
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
    defaultValue?: any[]
    onChange?: (values: any[]) => void
    placeholder?: string
    searchable?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    name?: string
    loading?: boolean
    onSearch?: (query: string) => void
    groupBy?: string | ((item: any) => string)
    tagDisplay?: boolean
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
export interface PickerShortcut<T> {
    label: string
    value: T | (() => T)
}

export interface DatePickerHandle {
    open: () => void
    close: () => void
}
export interface DatePickerProps {
    value?: string | Date | null
    defaultValue?: string | Date | null
    onChange?: (formattedDate: string, date: Date | null) => void
    placeholder?: string
    cleanable?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    name?: string
    format?: string
    shortcuts?: Array<PickerShortcut<Date>>
    disabledDate?: (date: Date) => boolean
    className?: string
    style?: React.CSSProperties
    menuStyle?: React.CSSProperties
}
export declare const DatePicker: React.ForwardRefExoticComponent<
    DatePickerProps & React.RefAttributes<DatePickerHandle>
>

export interface DateRangePickerProps {
    value?: [Date | string, Date | string] | []
    defaultValue?: [Date | string, Date | string] | []
    onChange?: (range: [Date, Date] | []) => void
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
    name?: string
    shortcuts?: Array<PickerShortcut<[Date, Date]>>
    disabledDate?: (date: Date) => boolean
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
    defaultValue?: string | Date
    onChange?: (time24: string, details: TimeDetail) => void
    placeholder?: string
    is12h?: boolean
    cleanable?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    name?: string
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
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    name?: string
    checkedChildren?: React.ReactNode
    unCheckedChildren?: React.ReactNode
    disabled?: boolean
    size?: 'md' | 'lg'
    className?: string
}
export declare const Toggle: React.FC<ToggleProps>

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
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
    closeOnEsc?: boolean
    closeOnBackdropClick?: boolean
    bodyLock?: boolean
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

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'
export interface DrawerProps {
    open?: boolean
    onClose?: () => void
    placement?: DrawerPlacement
    size?: DrawerSize
    closeOnEsc?: boolean
    closeOnBackdropClick?: boolean
    bodyLock?: boolean
    className?: string
    children?: React.ReactNode
}
export interface DrawerComponent extends React.FC<DrawerProps> {
    Header: React.FC<{ children?: React.ReactNode; className?: string }>
    Title: React.FC<{ children?: React.ReactNode; className?: string }>
    Body: React.FC<{ children?: React.ReactNode; className?: string }>
    Footer: React.FC<{ children?: React.ReactNode; className?: string }>
}
export declare const Drawer: DrawerComponent

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

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export interface DropdownMenuProps {
    trigger: React.ReactNode
    placement?: DropdownPlacement
    disabled?: boolean
    closeOnSelect?: boolean
    className?: string
    menuClassName?: string
    children?: React.ReactNode
}
export interface DropdownMenuItemProps {
    icon?: React.ReactNode
    disabled?: boolean
    danger?: boolean
    onClick?: (event: React.MouseEvent) => void
    className?: string
    children?: React.ReactNode
}
export interface DropdownMenuComponent extends React.FC<DropdownMenuProps> {
    Item: React.FC<DropdownMenuItemProps>
    Separator: React.FC<{ className?: string }>
    Header: React.FC<{ children?: React.ReactNode; className?: string }>
}
export declare const DropdownMenu: DropdownMenuComponent

/* ===================== NAVIGATION ===================== */
export type TabsVariant = 'line' | 'pill' | 'segmented'
export type TabsSize = 'sm' | 'md' | 'lg'
export interface TabsProps {
    value?: string | number
    defaultValue?: string | number
    onChange?: (value: string | number) => void
    variant?: TabsVariant
    size?: TabsSize
    className?: string
    children?: React.ReactNode
}
export interface TabsListProps {
    children?: React.ReactNode
    className?: string
}
export interface TabsTabProps {
    value: string | number
    disabled?: boolean
    icon?: React.ReactNode
    badge?: React.ReactNode
    children?: React.ReactNode
    className?: string
}
export interface TabsPanelProps {
    value: string | number
    children?: React.ReactNode
    className?: string
}
export interface TabsComponent extends React.FC<TabsProps> {
    List: React.FC<TabsListProps>
    Tab: React.FC<TabsTabProps>
    Panel: React.FC<TabsPanelProps>
}
export declare const Tabs: TabsComponent

export interface PaginationProps {
    total?: number
    page?: number
    activePage?: number
    defaultPage?: number
    pageSize?: number
    limit?: number
    defaultPageSize?: number
    onChangePage?: (page: number) => void
    onChangePageSize?: (pageSize: number) => void
    pageSizeOptions?: number[]
    showTotal?: boolean
    showPageSize?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}
export declare const Pagination: React.FC<PaginationProps>

/* ===================== DATA DISPLAY ===================== */
export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
export interface BadgeProps {
    count?: number | React.ReactNode
    max?: number
    dot?: boolean
    color?: BadgeColor
    placement?: BadgePlacement
    className?: string
    children?: React.ReactNode
}
export declare const Badge: React.FC<BadgeProps>

export type TagVariant = 'solid' | 'subtle' | 'outline'
export type TagColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
export type TagSize = 'sm' | 'md' | 'lg'
export interface TagProps {
    variant?: TagVariant
    color?: TagColor
    size?: TagSize
    closable?: boolean
    onClose?: (event: React.MouseEvent) => void
    icon?: React.ReactNode
    className?: string
    children?: React.ReactNode
}
export declare const Tag: React.FC<TagProps>
export declare const Chip: typeof Tag

export interface AccordionProps {
    defaultActiveKey?: string | number | Array<string | number>
    activeKey?: string | number | Array<string | number>
    onChange?: (key: string | number | Array<string | number>) => void
    multiple?: boolean
    className?: string
    children?: React.ReactNode
}
export interface AccordionItemProps {
    eventKey: string | number
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}
export interface AccordionComponent extends React.FC<AccordionProps> {
    Item: React.FC<AccordionItemProps>
    Panel: React.FC<AccordionItemProps>
    Header: React.FC<{ children?: React.ReactNode; className?: string }>
    Body: React.FC<{ children?: React.ReactNode; className?: string }>
}
export declare const Accordion: AccordionComponent

export interface DividerProps {
    direction?: 'horizontal' | 'vertical'
    align?: 'center' | 'left' | 'right'
    dashed?: boolean
    className?: string
    children?: React.ReactNode
}
export declare const Divider: React.FC<DividerProps>

export interface RateProps {
    value?: number
    defaultValue?: number
    max?: number
    allowHalf?: boolean
    readOnly?: boolean
    disabled?: boolean
    character?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    name?: string
    onChange?: (value: number) => void
    onHoverChange?: (value: number) => void
    className?: string
}
export declare const Rate: React.FC<RateProps>

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'
export interface AvatarProps {
    src?: string
    alt?: string
    name?: string
    size?: AvatarSize
    shape?: AvatarShape
    status?: AvatarStatus
    icon?: React.ReactNode
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
export declare const Avatar: React.FC<AvatarProps>

export interface AvatarGroupProps {
    max?: number
    size?: AvatarSize
    shape?: AvatarShape
    spacing?: 'tight' | 'normal' | 'relaxed'
    className?: string
    children?: React.ReactNode
}
export declare const AvatarGroup: React.FC<AvatarGroupProps>

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

export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'loading'
export type ToastEffect = 'glass' | 'colorful' | 'gradient' | 'outline' | 'default'

export interface ToastProps {
    variant?: ToastVariant
    effect?: ToastEffect
    title?: string
    duration?: number
    action?: { label: string; onClick?: (event: React.MouseEvent) => void }
    icon?: React.ReactNode | boolean
    progress?: boolean
    pauseOnHover?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
    message?: React.ReactNode
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
    variant?: ToastVariant
    effect?: ToastEffect
    duration?: number
    action?: { label: string; onClick?: (event: React.MouseEvent) => void }
    icon?: React.ReactNode | boolean
    progress?: boolean
    pauseOnHover?: boolean
    closable?: boolean
    className?: string
    style?: React.CSSProperties
}
export interface ToastPromiseOptions<T> {
    loading?: React.ReactNode
    success?: React.ReactNode | ((data: T) => React.ReactNode)
    error?: React.ReactNode | ((err: any) => React.ReactNode)
    duration?: number
    effect?: ToastEffect
}
export interface ToastContextActions {
    toast: (message: React.ReactNode, options?: ToastOptions) => number
    success: (message: React.ReactNode, options?: ToastOptions) => number
    error: (message: React.ReactNode, options?: ToastOptions) => number
    warning: (message: React.ReactNode, options?: ToastOptions) => number
    info: (message: React.ReactNode, options?: ToastOptions) => number
    loading: (message: React.ReactNode, options?: ToastOptions) => number
    dismiss: (id: number) => void
    dismissAll: () => void
    promise: <T>(prom: Promise<T> | (() => Promise<T>), msgs?: ToastPromiseOptions<T>) => Promise<T>
}
export declare function useToast(): ToastContextActions

export interface ToastProviderProps {
    children?: React.ReactNode
    position?: ToastPosition
    limit?: number
    duration?: number
    effect?: ToastEffect
    progress?: boolean
    pauseOnHover?: boolean
    closable?: boolean
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
    Tabs: typeof Tabs
    Drawer: typeof Drawer
    Badge: typeof Badge
    Tag: typeof Tag
    Chip: typeof Chip
    Pagination: typeof Pagination
    DropdownMenu: typeof DropdownMenu
    Accordion: typeof Accordion
    Divider: typeof Divider
    Rate: typeof Rate
    ButtonGroup: typeof ButtonGroup
    Avatar: typeof Avatar
    AvatarGroup: typeof AvatarGroup
}

export default Controls
