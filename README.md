# React Custom Controls — @rahilp010/custom-control

[![npm version](https://img.shields.io/npm/v/@rahilp010/custom-control.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![npm downloads](https://img.shields.io/npm/dm/@rahilp010/custom-control.svg?style=flat-square&color=success)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@rahilp010/custom-control?style=flat-square&color=informational)](https://bundlephobia.com/package/@rahilp010/custom-control)
[![types included](https://img.shields.io/badge/types-included-blue.svg?style=flat-square)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![license](https://img.shields.io/npm/l/@rahilp010/custom-control.svg?style=flat-square)](https://github.com/rahilp010/custom-control/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rahilp010/custom-control.svg?style=flat-square)](https://github.com/rahilp010/custom-control)

> **React Custom Controls** (`@rahilp010/custom-control`) is a modern, lightweight, accessible, and fully themeable React UI & form controls library. Inspired by **React Suite (rsuite)** design patterns and built on **Tailwind CSS** and **Framer Motion**, it provides 40+ reusable custom controls including select pickers, date pickers, range pickers, time pickers, tabs, drawers, pagination, dropdown menus, accordions, badges, tags, avatars, star ratings, inputs, modals, toasts, toggles, OTP inputs, and tooltips.

- 🌗 **Dark & Light Themes** out of the box (`theme="dark" | "light" | "system"`)
- 🎨 **Custom Color Palette** — customize the accent or surface palette using hex, RGB, or CSS variables
- 🍞 **Customizable Toast Notifications** — frosted glass effect, vibrant colorful UI, gradients, countdown progress timers, pause-on-hover, and Promise lifecycle tracking with Framer Motion spring physics
- 📋 **HTML Form & Server Actions Ready** — native `name` prop and hidden inputs for effortless FormData extraction
- 📏 **Universal Size Scaling** — uniform `'sm' | 'md' | 'lg'` (with `'small' | 'medium' | 'large'` aliases) consistent across all inputs, pickers, tags, badges, and buttons
- 🪶 **Zero CSS Reset Conflicts** — clean, scoped CSS variable tokens with no forced global resets
- ♿ **Full Keyboard Accessibility** — complete arrow navigation, Escape to close, Enter to select (rsuite standard)
- 📦 **TypeScript Support** — bundled `.d.ts` declarations with full autocomplete
- 🚀 **Next.js & Remix Ready** — SSR-safe portalled overlays (App Router & Pages Router compatible)
- ⚡ **Ultra-Lightweight** — ~29 kB gzipped for 40+ production-ready form controls & components

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Interactive Demo Showcase](#interactive-demo-showcase)
- [Theming & Provider](#theming--provider)
  - [CustomControlsProvider](#customcontrolsprovider)
  - [Color Tokens](#color-tokens)
- [Components API & Keyboard Guide](#components-api--keyboard-guide)
  - [Input](#input)
  - [InputGroup](#inputgroup)
  - [InputNumber](#inputnumber)
  - [Textarea](#textarea)
  - [PasswordInput](#passwordinput)
  - [SearchInput](#searchinput)
  - [OtpInput](#otpinput)
  - [SelectPicker](#selectpicker)
  - [CheckPicker / TagPicker](#checkpicker--tagpicker)
  - [Combobox](#combobox)
  - [Autocomplete](#autocomplete)
  - [DatePicker](#datepicker)
  - [DateRangePicker](#daterangepicker)
  - [TimePicker](#timepicker)
  - [Toggle](#toggle)
  - [Checkbox](#checkbox)
  - [Radio & RadioGroup](#radio--radiogroup)
  - [Slider](#slider)
  - [ColorPicker](#colorpicker)
  - [Button](#button)
  - [ButtonGroup](#buttongroup)
  - [Modal](#modal)
  - [Drawer](#drawer)
  - [Tabs](#tabs)
  - [Pagination](#pagination)
  - [DropdownMenu](#dropdownmenu)
  - [Accordion](#accordion)
  - [Badge](#badge)
  - [Tag & Chip](#tag--chip)
  - [Rate](#rate)
  - [Avatar & AvatarGroup](#avatar--avatargroup)
  - [Divider](#divider)
  - [Tooltip & Whisper](#tooltip--whisper)
  - [Alert](#alert)
  - [Toast & ToastProvider](#toast--toastprovider)
  - [Progress](#progress)
  - [Skeleton](#skeleton)
  - [FormField & Label](#formfield--label)
  - [Uploader](#uploader)
  - [Animation](#animation)
- [Server Rendering (SSR)](#server-rendering-ssr)
- [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
- [License](#license)

---

## Installation

```bash
npm install @rahilp010/custom-control framer-motion
```

> **Note**: `react` and `react-dom` (>= 17.0.0) and `framer-motion` (>= 11.0.0) are peer dependencies.

Import the stylesheet once in your application root (e.g. `main.jsx`, `_app.tsx`, or `layout.tsx`):

```js
import '@rahilp010/custom-control/styles.css'
```

---

## Quick Start

```jsx
import React, { useState } from 'react'
import {
  Input,
  SelectPicker,
  DatePicker,
  Toggle,
  Button
} from '@rahilp010/custom-control'

export default function App() {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [agree, setAgree] = useState(false)

  const cityOptions = [
    { label: 'New York', value: 'nyc' },
    { label: 'London', value: 'lon' },
    { label: 'Tokyo', value: 'tyo' }
  ]

  return (
    <div className="space-y-4 max-w-md p-6">
      <Input
        value={name}
        onChange={setName}
        placeholder="Enter your name"
      />

      <SelectPicker
        data={cityOptions}
        value={city}
        onChange={setCity}
        placeholder="Select city"
        cleanable
      />

      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date"
      />

      <div className="flex items-center gap-3">
        <Toggle checked={agree} onChange={setAgree} />
        <span>Agree to terms</span>
      </div>

      <Button variant="primary" onClick={() => alert(`Saved: ${name}`)}>
        Submit
      </Button>
    </div>
  )
}
```

> **Convention**: In `custom-control`, all `onChange` handlers receive the changed value as the **first parameter**, and the event or original data item as the **second parameter**:
> `onChange?.(value, eventOrItem)`

---

## Interactive Demo Showcase

A complete interactive demo application is included in this repository. It showcases all 40+ components with live customizer controls (theme switcher, accent color swatches, size presets, and dynamic code generators).

```bash
# Start the live interactive demo locally
npm run dev

# Or build static production demo
npm run build:demo
```
Once started, open `http://localhost:5173` in your browser.

---

## Theming & Provider

### CustomControlsProvider

Wrap your application root (or any subtree) with `CustomControlsProvider` to apply theme modes and custom brand colors.

```jsx
import { CustomControlsProvider } from '@rahilp010/custom-control'

function Root() {
  return (
    <CustomControlsProvider
      theme="light"
      colors={{ primary: '#7c3aed' }}
    >
      <App />
    </CustomControlsProvider>
  )
}
```

#### Provider Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `'light' \| 'dark' \| 'system'` | `'light'` | Theme mode. `'system'` dynamically tracks user OS preferences. |
| `colors` | `Record<string, string>` | `undefined` | Custom palette overrides (hex, `rgb(...)`, or space-separated `'r g b'`). |
| `fontFamily` | `string` | `undefined` | Sets custom `--cc-font` CSS variable on the controls container. |
| `zIndex` | `number \| string` | `undefined` | Sets base stacking order for overlays and dropdown popovers. |
| `className` | `string` | `''` | Additional class name applied to the scope wrapper. |

### Color Tokens

When overriding `colors`, hover, foreground contrast, and focus rings derive automatically from `primary`:

| Token Key | CSS Variable | Description |
| :--- | :--- | :--- |
| `primary` | `--cc-primary` | Accent color for active elements, selected items, knobs, and focus rings |
| `primaryHover` | `--cc-primary-hover` | Hover/pressed shade (auto-derived if omitted) |
| `onPrimary` | `--cc-on-primary` | Readable text/icon color placed on top of `primary` (auto-derived) |
| `surface` | `--cc-surface` | Background for inputs, dropdown panels, and modal containers |
| `surfaceRaised` | `--cc-surface-2` | Secondary/elevated surface color |
| `text` | `--cc-text` | Primary body text and headers |
| `muted` | `--cc-muted` | Secondary labels, descriptions, and passive icons |
| `subtle` | `--cc-subtle` | Placeholder text and inactive indicators |
| `overlay` | `--cc-overlay` | Subtle backgrounds and translucent borders |
| `scrim` | `--cc-scrim` | Backdrop filter and shadow tint |

---

## Components API & Keyboard Guide

---

### Input

Single-line text input control with universal sizing, clearable button, prefixes/suffixes, and native form compatibility.

#### How to Use

```jsx
import { useState } from 'react'
import { Input } from '@rahilp010/custom-control'

function Example() {
  const [val, setVal] = useState('')

  return (
    <div className="space-y-3">
      {/* Basic Controlled */}
      <Input value={val} onChange={setVal} placeholder="Enter username..." />

      {/* Clearable with Prefix Icon and Size */}
      <Input
        defaultValue="rahil@example.com"
        name="email"
        size="lg"
        clearable
        prefix={<span>📧</span>}
        placeholder="Email address"
      />
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | `undefined` | Controlled input value. |
| `defaultValue` | `string \| number` | `''` | Initial value for uncontrolled usage (e.g. native HTML forms / Server Actions). |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Callback fired on input change. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height & padding variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute for native `<form>` submissions and FormData extraction. |
| `clearable` | `boolean` | `false` | When true, renders a clean `✕` button to instantly clear text. |
| `prefix` | `ReactNode` | `undefined` | Leading icon, addon, or currency symbol inside the input border. |
| `suffix` | `ReactNode` | `undefined` | Trailing icon or addon placed before clear button. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `type` | `string` | `'text'` | HTML input type (`'text'`, `'email'`, `'url'`, etc.). |
| `disabled` | `boolean` | `false` | Whether input is disabled. |
| `className` | `string` | `''` | Custom CSS class names. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` | Submit | Submits enclosing form if inside a `<form>` element. |
| `Tab` | Focus / Blur | Navigates into and out of the text field. |
| `Escape` | Clear | Clears input when clearable button is focused. |

---

### InputGroup

Grouped container allowing addons, buttons, or icons to be placed alongside inputs with unified sizing.

#### How to Use

```jsx
import { InputGroup, Input } from '@rahilp010/custom-control'

function Example() {
  return (
    <InputGroup size="md">
      <InputGroup.Button onClick={() => alert('Search clicked!')}>
        🔍
      </InputGroup.Button>
      <Input placeholder="Search records..." />
    </InputGroup>
  )
}
```

#### Props (InputGroup)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing applied across group components. |
| `children` | `ReactNode` | `undefined` | Child elements (`Input`, `InputGroup.Button`, etc.). |
| `className` | `string` | `''` | Custom CSS class names. |

#### Props (InputGroup.Button)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click callback. |
| `children` | `ReactNode` | `undefined` | Button content/icon. |
| `className` | `string` | `''` | Custom CSS class names. |

---

### InputNumber

Controlled decimal and integer numeric input with bounds clamping, custom formatting, universal sizing, and native form support.

#### How to Use

```jsx
import { useState } from 'react'
import { InputNumber } from '@rahilp010/custom-control'

function Example() {
  const [price, setPrice] = useState(25)

  return (
    <InputNumber
      name="price"
      value={price}
      onChange={setPrice}
      size="md"
      min={0}
      max={100}
      prefix="$"
      formatter={(val) => `${val}.00`}
      placeholder="0.00"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number \| string` | `undefined` | Controlled numeric value. |
| `defaultValue` | `number \| string` | `''` | Uncontrolled default numeric value for HTML forms. |
| `onChange` | `(value: number \| '') => void` | `undefined` | Callback fired when value changes. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute for FormData and native form submissions. |
| `min` | `number` | `undefined` | Minimum allowed value (clamped on blur). |
| `max` | `number` | `undefined` | Maximum allowed value (clamped on blur). |
| `step` | `number \| 'any'` | `'any'` | Step value. |
| `prefix` | `ReactNode` | `undefined` | Addon icon or currency symbol placed on the left. |
| `formatter` | `(value: number \| string) => string` | `undefined` | Formats displayed value when not focused. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `disabled` | `boolean` | `false` | Whether control is disabled. |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Focus handler. |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Blur handler (triggers min/max sanitization). |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `0-9` | Input Digits | Inputs numeric digits into the field. |
| `.` | Input Decimal | Inputs a single decimal point (duplicates prevented). |
| `-` | Input Negative | Toggles or inputs negative sign (allowed only when `min < 0`). |
| `Backspace` / `Delete` | Remove | Erases digits before or after cursor. |
| `Tab` | Next field | Commits number, sanitizes against `min`/`max`, and blurs field. |

---

### Textarea

Multi-line text input with auto character count display, resize control, and maxLength.

#### How to Use

```jsx
import { useState } from 'react'
import { Textarea } from '@rahilp010/custom-control'

function Example() {
  const [comment, setComment] = useState('')

  return (
    <Textarea
      value={comment}
      onChange={setComment}
      rows={4}
      maxLength={250}
      showCount
      placeholder="Type your notes here..."
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Controlled text value. |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Change callback. |
| `rows` | `number` | `4` | Number of visible text lines. |
| `maxLength` | `number` | `undefined` | Maximum number of characters allowed. |
| `showCount` | `boolean` | `false` | Displays character count badge at bottom right. |
| `resize` | `boolean` | `true` | Allows vertical resizing (`false` sets `resize-none`). |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables the textarea. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` | New Line | Inserts a line break. |
| `Tab` | Focus / Blur | Shifts focus to the next interactive control. |

---

### PasswordInput

Secure input field featuring a toggle button to reveal or conceal passwords, sizing, and form compatibility.

#### How to Use

```jsx
import { useState } from 'react'
import { PasswordInput } from '@rahilp010/custom-control'

function Example() {
  const [pass, setPass] = useState('')

  return (
    <PasswordInput
      name="password"
      value={pass}
      onChange={setPass}
      size="md"
      placeholder="Enter password"
      showToggle
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `undefined` | Controlled password string. |
| `defaultValue` | `string` | `''` | Default uncontrolled value for HTML form integration. |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Change callback. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute for native form submission. |
| `placeholder` | `string` | `'Password'` | Placeholder text. |
| `showToggle` | `boolean` | `true` | Shows/hides visibility toggle button icon. |
| `visible` | `boolean` | `undefined` | Controlled password visibility state. |
| `onVisibleChange` | `(visible: boolean) => void` | `undefined` | Callback fired when visibility toggles. |
| `disabled` | `boolean` | `false` | Disables input. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` | Submit | Submits enclosing form if present. |
| `Tab` | Next field | Navigates to subsequent form field. |

---

### SearchInput

Search field with magnifying glass icon, clear button, universal sizing, and native form support.

#### How to Use

```jsx
import { useState } from 'react'
import { SearchInput } from '@rahilp010/custom-control'

function Example() {
  const [search, setSearch] = useState('')

  return (
    <SearchInput
      name="q"
      value={search}
      onChange={setSearch}
      size="md"
      onClear={() => console.log('Cleared')}
      placeholder="Search products..."
      cleanable
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `undefined` | Controlled search query value. |
| `defaultValue` | `string` | `''` | Default uncontrolled search query for native forms. |
| `onChange` | `(value: string, event: ChangeEvent \| null) => void` | `undefined` | Callback on search query change. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute. |
| `onClear` | `() => void` | `undefined` | Callback fired when the clear button (`✕`) is clicked. |
| `cleanable` | `boolean` | `true` | Displays clear button when field contains text. |
| `placeholder` | `string` | `'Search...'` | Input placeholder. |
| `disabled` | `boolean` | `false` | Disables input. |

---

### OtpInput

Segmented one-time password / PIN code input with clipboard paste and auto-advance.

#### How to Use

```jsx
import { useRef } from 'react'
import { OtpInput, Button } from '@rahilp010/custom-control'

function Example() {
  const otpRef = useRef(null)

  return (
    <div className="space-y-3">
      <OtpInput
        ref={otpRef}
        length={6}
        type="numeric"
        onChange={(code) => console.log('OTP:', code)}
      />
      <Button size="sm" onClick={() => otpRef.current?.clear()}>
        Clear Code
      </Button>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `length` | `number` | `6` | Number of OTP digit inputs. |
| `value` | `string` | `undefined` | Controlled OTP value string. |
| `defaultValue` | `string` | `''` | Initial uncontrolled value. |
| `onChange` | `(code: string) => void` | `undefined` | Callback fired with combined code string. |
| `type` | `'numeric' \| 'alphanumeric'` | `'numeric'` | Allowed character format. |
| `autoFocus` | `boolean` | `false` | Automatically focuses the first digit input on mount. |
| `disabled` | `boolean` | `false` | Disables all digit inputs. |

#### Imperative Methods (Ref Handle)

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `focus(index?: number)` | `index: number` (default `0`) | Focuses input box at the specified index. |
| `clear()` | none | Clears all digits and focuses the first input box. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `0-9` (or alphanumeric) | Enter Digit | Inputs character and automatically advances focus to next box. |
| `Backspace` | Erase / Previous | Erases current digit; if empty, focuses previous box. |
| `ArrowLeft` | Previous Box | Moves cursor focus to preceding digit box. |
| `ArrowRight` | Next Box | Moves cursor focus to subsequent digit box. |
| `Ctrl + V` / `Cmd + V` | Paste | Spreads clipboard text across inputs starting from active box. |

---

### SelectPicker

Searchable single-select dropdown picker supporting async search, option grouping (`groupBy`), dynamic item creation (`creatable`), universal sizing, and native form integration.

#### How to Use

```jsx
import { useState } from 'react'
import { SelectPicker } from '@rahilp010/custom-control'

const data = [
  { label: 'React', value: 'react', group: 'Frontend' },
  { label: 'Vue', value: 'vue', group: 'Frontend' },
  { label: 'Node.js', value: 'node', group: 'Backend' },
  { label: 'Go', value: 'go', group: 'Backend' }
]

function Example() {
  const [val, setVal] = useState('react')

  return (
    <SelectPicker
      name="framework"
      data={data}
      value={val}
      onChange={setVal}
      groupBy="group"
      size="md"
      creatable
      searchable
      cleanable
      placeholder="Select framework"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `Array<{ label: string, value: any, [key: string]: any }>` | `[]` | List of selectable options. |
| `value` | `any` | `undefined` | Controlled value matching option `value`. |
| `defaultValue` | `any` | `undefined` | Uncontrolled default value for HTML forms. |
| `onChange` | `(value: any, item: object) => void` | `undefined` | Fired when an option is selected. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>` for native form compatibility. |
| `groupBy` | `string \| ((item: object) => string)` | `undefined` | Groups options under sticky category headers (e.g. `'group'` or `item => item.category`). |
| `creatable` | `boolean` | `false` | When true and search doesn't match an exact option, allows user to create the typed option on Enter. |
| `loading` | `boolean` | `false` | Displays a loading spinner indicator in the search header for async lookups. |
| `onSearch` | `(query: string) => void` | `undefined` | Async search callback triggered on query input. |
| `placeholder` | `string` | `'Select...'` | Placeholder text. |
| `searchable` | `boolean` | `true` | Enables search filtering inside dropdown menu. |
| `cleanable` | `boolean` | `true` | Shows clear button (`✕`) to unselect current value. |
| `disabled` | `boolean` | `false` | Disables picker trigger. |
| `menuMaxHeight` | `number` | `260` | Maximum height (px) of dropdown list scroll container. |
| `menuWidth` | `number` | `undefined` | Explicit dropdown menu width (px). |
| `menuStyle` | `CSSProperties` | `undefined` | Custom style object for dropdown popover. |
| `renderMenuItem` | `(label: string, item: object) => ReactNode` | `undefined` | Custom renderer for individual list items. |
| `renderExtraFooter` | `ReactNode \| ((close: () => void) => ReactNode)` | `undefined` | Custom footer element or render function inside menu. |
| `onCreateNew` | `() => void` | `undefined` | Convenience prop to render a "+ Create New" action button. |
| `createNewText` | `string` | `'Create New'` | Custom label for create button. |

#### Imperative Methods (Ref Handle)

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `open()` | none | Programmatically opens the dropdown popover. |
| `close()` | none | Programmatically closes the dropdown popover. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `ArrowDown` / `ArrowUp` | Open Menu | When trigger is focused, opens dropdown menu. |
| `ArrowDown` | Next Option | Highlights next item in menu (loops to start; includes footer). |
| `ArrowUp` | Previous Option | Highlights previous item in menu (loops to bottom). |
| `Enter` | Select Option | Selects the highlighted option and closes menu (or creates new when `creatable`). |
| `Escape` | Close Menu | Closes dropdown menu without changing value. |
| Typing in search | Filter | Filters options in real-time. |

---

### CheckPicker / TagPicker

Multi-select searchable dropdown picker with checkboxes, async search, grouping, and removable tag chips (`tagDisplay`). `TagPicker` is an alias of `CheckPicker`.

#### How to Use

```jsx
import { useState } from 'react'
import { CheckPicker, TagPicker } from '@rahilp010/custom-control'

const skills = [
  { label: 'JavaScript', value: 'js', group: 'Languages' },
  { label: 'TypeScript', value: 'ts', group: 'Languages' },
  { label: 'React', value: 'react', group: 'Frameworks' },
  { label: 'Vue', value: 'vue', group: 'Frameworks' }
]

function Example() {
  const [selected, setSelected] = useState(['js', 'react'])

  return (
    <CheckPicker
      name="skills"
      data={skills}
      value={selected}
      onChange={setSelected}
      groupBy="group"
      tagDisplay
      size="md"
      placeholder="Select skills..."
      searchable
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `Array<{ label: string, value: any }>` | `[]` | Selectable options. |
| `value` | `any[]` | `undefined` | Array of selected values (controlled). |
| `defaultValue` | `any[]` | `[]` | Uncontrolled default values for HTML form submission. |
| `onChange` | `(values: any[]) => void` | `undefined` | Callback fired on selection change. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>` with serialized JSON for forms. |
| `groupBy` | `string \| ((item: object) => string)` | `undefined` | Groups options under sticky category headers. |
| `tagDisplay` | `boolean` | `false` | When true, renders selected values as interactive tag chips directly inside the trigger. |
| `loading` | `boolean` | `false` | Shows loading spinner during async data fetches. |
| `onSearch` | `(query: string) => void` | `undefined` | Async search callback fired on query input. |
| `placeholder` | `string` | `'Select...'` | Empty selection placeholder text. |
| `searchable` | `boolean` | `true` | Enables search filtering input in menu. |
| `disabled` | `boolean` | `false` | Disables picker trigger. |
| `menuMaxHeight` | `number` | `260` | Maximum height of option scroll area. |
| `menuWidth` | `number` | `undefined` | Popover width override. |
| `menuStyle` | `CSSProperties` | `undefined` | Custom style overrides for menu. |
| `renderMenuItem` | `(label: string, item: object) => ReactNode` | `undefined` | Custom option renderer. |
| `renderExtraFooter` | `ReactNode \| ((close: () => void) => ReactNode)` | `undefined` | Custom footer element inside popover. |
| `onCreateNew` | `() => void` | `undefined` | Renders a "Create New" action button. |

#### Imperative Methods (Ref Handle)

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `open()` | none | Opens the multi-select dropdown. |
| `close()` | none | Closes the multi-select dropdown. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `ArrowDown` / `ArrowUp` | Open Menu | Opens the multi-select dropdown list. |
| `ArrowDown` | Next Item | Shifts highlight to the next option. |
| `ArrowUp` | Previous Item | Shifts highlight to the preceding option. |
| `Enter` | Toggle Option | Toggles selection state (checked/unchecked) of highlighted item without closing dropdown. |
| `Escape` | Close Menu | Dismisses dropdown menu. |

---

### Combobox

Accessible select input that commits from a predefined list with keyboard autocomplete navigation.

#### How to Use

```jsx
import { useState } from 'react'
import { Combobox } from '@rahilp010/custom-control'

const frameworks = ['Next.js', 'Remix', 'Gatsby', 'Astro']

function Example() {
  const [val, setVal] = useState('')

  return (
    <Combobox
      options={frameworks}
      value={val}
      onChange={setVal}
      placeholder="Choose framework..."
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `Array<string \| { label: string, value: string, disabled?: boolean }>` | `[]` | Available suggestions. |
| `value` | `string` | `undefined` | Controlled value. |
| `defaultValue` | `string` | `''` | Uncontrolled default value. |
| `onChange` | `(value: string, event: any) => void` | `undefined` | Value change handler. |
| `onSelect` | `(value: string, item: object) => void` | `undefined` | Fired when an item is chosen. |
| `allowCustomValue` | `boolean` | `false` | Whether values outside `options` can be committed. |
| `emptyMessage` | `string` | `'No suggestions found'` | Text displayed when query has no matches. |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text. |
| `disabled` | `boolean` | `false` | Disables control. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `ArrowDown` | Open / Next | Opens listbox or moves focus to next suggestion. |
| `ArrowUp` | Open / Previous | Opens listbox or moves focus to previous suggestion. |
| `Enter` | Commit Option | Commits highlighted suggestion into the field. |
| `Escape` | Close List | Closes suggestions popup and resets highlight. |

---

### Autocomplete

Search suggestion control that permits free-form user typing while offering dynamic recommendations.

#### How to Use

```jsx
import { useState } from 'react'
import { Autocomplete } from '@rahilp010/custom-control'

const emails = ['user@gmail.com', 'admin@work.org', 'support@company.io']

function Example() {
  const [email, setEmail] = useState('')

  return (
    <Autocomplete
      options={emails}
      value={email}
      onChange={setEmail}
      placeholder="Type email address..."
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `Array<string \| { label: string, value: string }>` | `[]` | List of suggestions. |
| `value` | `string` | `undefined` | Controlled input value. |
| `defaultValue` | `string` | `''` | Initial default value. |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Fired on any keystroke or selection. |
| `allowCustomValue` | `boolean` | `true` | Allows arbitrary text entry beyond suggestions. |
| `placeholder` | `string` | `'Start typing...'` | Field placeholder text. |
| `disabled` | `boolean` | `false` | Disables input. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| Typing | Filter | Directly updates field value and filters suggestion list. |
| `ArrowDown` / `ArrowUp` | Navigate | Navigates up and down through matching suggestions. |
| `Enter` | Select Suggestion | Inserts currently highlighted suggestion into field. |
| `Escape` | Dismiss Menu | Hides suggestion listbox. |

---

### DatePicker

Interactive calendar dropdown date picker supporting ISO strings (`yyyy-MM-dd`), quick preset shortcuts (`shortcuts`), disabled date rules (`disabledDate`), universal sizing, and native HTML form submission.

#### How to Use

```jsx
import { useState } from 'react'
import { DatePicker } from '@rahilp010/custom-control'

function Example() {
  const [date, setDate] = useState('2026-11-08')

  return (
    <DatePicker
      name="birthDate"
      value={date}
      onChange={(formatted, dateObj) => setDate(formatted)}
      size="md"
      placeholder="Select birth date"
      cleanable
      shortcuts={[
        { label: 'Today', value: new Date() },
        { label: 'Yesterday', value: () => new Date(Date.now() - 86400000) }
      ]}
      disabledDate={(d) => d > new Date()} // Disable future dates
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| Date \| null` | `undefined` | Selected date (`'yyyy-MM-dd'` string or `Date` object). |
| `defaultValue` | `string \| Date \| null` | `''` | Default uncontrolled date for native form submission. |
| `onChange` | `(formatted: string, date: Date \| null) => void` | `undefined` | Fired when date is selected or cleared. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>` for native forms. |
| `shortcuts` | `Array<{ label: string, value: Date \| (() => Date) }>` | `undefined` | Quick preset buttons displayed above or beside the calendar. |
| `disabledDate` | `(date: Date) => boolean` | `undefined` | Function to disable specific dates (e.g. past dates, weekends, or holidays). |
| `placeholder` | `string` | `'Select Date'` | Trigger placeholder text. |
| `format` | `string` | `'yyyy-MM-dd'` | Output date format. |
| `cleanable` | `boolean` | `true` | Enables clear button (`✕`) when date is selected. |
| `disabled` | `boolean` | `false` | Disables date picker trigger. |
| `menuStyle` | `CSSProperties` | `undefined` | Style overrides for calendar panel. |

#### Imperative Methods (Ref Handle)

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `open()` | none | Programmatically opens calendar popover. |
| `close()` | none | Programmatically closes calendar popover. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open / Pick | Opens calendar when trigger is focused; activates buttons. |
| `Tab` | Next Control | Navigates between Shortcuts, Month Prev/Next, Day cells, Today, and Clear buttons. |
| `Escape` | Close | Closes calendar popup. |

---

### DateRangePicker

From/To date range picker with preview formatting, quick shortcut presets (`shortcuts`), date disabling rules (`disabledDate`), universal sizing, and native HTML form submission.

#### How to Use

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@rahilp010/custom-control'

function Example() {
  const [range, setRange] = useState([])

  return (
    <DateRangePicker
      name="dateRange"
      value={range}
      onChange={(newRange) => setRange(newRange)}
      size="md"
      placeholder="Select date range"
      shortcuts={[
        {
          label: 'Last 7 Days',
          value: [new Date(Date.now() - 7 * 86400000), new Date()]
        },
        {
          label: 'Last 30 Days',
          value: [new Date(Date.now() - 30 * 86400000), new Date()]
        }
      ]}
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `[Date \| string, Date \| string] \| []` | `undefined` | Controlled start and end dates. |
| `defaultValue` | `[Date \| string, Date \| string] \| []` | `[]` | Uncontrolled default date range for HTML forms. |
| `onChange` | `(range: [Date, Date] \| []) => void` | `undefined` | Fired when "Apply Range" or "Clear" is clicked. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>` for native forms. |
| `shortcuts` | `Array<{ label: string, value: [Date, Date] \| (() => [Date, Date]) }>` | `undefined` | Quick range preset buttons (e.g. "Last 7 Days", "This Month"). |
| `disabledDate` | `(date: Date) => boolean` | `undefined` | Disables dates matching condition. |
| `placeholder` | `string` | `'Select Date Range'` | Empty state label. |
| `className` | `string` | `''` | Container class name. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open Popup | Opens the date range configuration popover. |
| `Tab` | Navigate Fields | Cycles between Shortcut buttons, From date input, To date input, Clear, and Apply Range. |
| `Escape` | Dismiss | Closes popover without applying unsubmitted changes. |

---

### TimePicker

Hour and minute picker supporting both 12-hour (AM/PM) and 24-hour formats, presets, "Now" button, universal sizing, and native form integration.

#### How to Use

```jsx
import { useState } from 'react'
import { TimePicker } from '@rahilp010/custom-control'

function Example() {
  const [time, setTime] = useState('02:30 PM')

  return (
    <TimePicker
      name="meetingTime"
      value={time}
      onChange={(time24Str, details) => setTime(details.time12)}
      size="md"
      is12h
      cleanable
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| Date` | `undefined` | Controlled time string (e.g. `'14:30'`, `'02:30 PM'`) or `Date`. |
| `defaultValue` | `string \| Date` | `''` | Default uncontrolled time for native HTML forms. |
| `onChange` | `(time24: string, details: object) => void` | `undefined` | Callback returning 24-hour string and breakdown object. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`sm` = 36px, `md` = 44px, `lg` = 48px). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>` for forms. |
| `is12h` | `boolean` | `true` | Enables 12-hour mode with AM/PM toggle. Set `false` for 24-hour format. |
| `cleanable` | `boolean` | `true` | Shows clear button (`✕`) when time is set. |
| `placeholder` | `string` | `'Select Time'` | Trigger placeholder text. |
| `disabled` | `boolean` | `false` | Disables time picker. |
| `menuStyle` | `CSSProperties` | `undefined` | Style overrides for popover panel. |

#### Imperative Methods (Ref Handle)

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `open()` | none | Opens time selection menu. |
| `close()` | none | Closes time selection menu. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open / Choose | Opens time menu; clicks focused preset or time cell. |
| `Tab` | Section Cycle | Tabs between Presets row, Hours column, Minutes column, Period, and Done button. |
| `Escape` | Close Menu | Closes time picker popover. |

---

### Toggle

Accessible animated switch button with optional internal label text, controlled or uncontrolled state, and native form integration.

#### How to Use

```jsx
import { useState } from 'react'
import { Toggle } from '@rahilp010/custom-control'

function Example() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Toggle
      name="notifications"
      checked={enabled}
      onChange={setEnabled}
      checkedChildren="ON"
      unCheckedChildren="OFF"
      size="md"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `undefined` | Controlled switch state. |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default state for native forms. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback fired on toggle switch. |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input type="checkbox">` for form submissions. |
| `checkedChildren` | `ReactNode` | `undefined` | Text or icon shown when `checked=true`. |
| `unCheckedChildren` | `ReactNode` | `undefined` | Text or icon shown when `checked=false`. |
| `size` | `'md' \| 'lg'` | `'md'` | Size variant. |
| `disabled` | `boolean` | `false` | Disables switch interaction. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Space` / `Enter` | Toggle State | Toggles the switch between checked and unchecked. |
| `Tab` | Focus / Blur | Navigates into and out of switch. |

---

### Checkbox

Controlled or uncontrolled checkbox with associated label and native form integration.

#### How to Use

```jsx
import { useState } from 'react'
import { Checkbox } from '@rahilp010/custom-control'

function Example() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox name="terms" checked={checked} onChange={setChecked}>
      Subscribe to product updates
    </Checkbox>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `undefined` | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default state for forms. |
| `name` | `string` | `undefined` | HTML `name` attribute for native form submission. |
| `onChange` | `(checked: boolean, event: ChangeEvent) => void` | `undefined` | Callback fired on check/uncheck. |
| `children` | `ReactNode` | `undefined` | Label text or elements. |
| `disabled` | `boolean` | `false` | Disables checkbox. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Space` | Toggle | Checks or unchecks the checkbox. |

---

### Radio & RadioGroup

Radio button and grouped container for mutually exclusive options.

#### How to Use

```jsx
import { useState } from 'react'
import { Radio, RadioGroup } from '@rahilp010/custom-control'

function Example() {
  const [plan, setPlan] = useState('pro')

  return (
    <RadioGroup value={plan} onChange={setPlan} direction="vertical">
      <Radio value="starter">Starter Plan ($9/mo)</Radio>
      <Radio value="pro">Pro Plan ($29/mo)</Radio>
      <Radio value="enterprise">Enterprise (Custom)</Radio>
    </RadioGroup>
  )
}
```

#### Props (RadioGroup)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `any` | `undefined` | Currently selected radio value. |
| `onChange` | `(value: any) => void` | `undefined` | Fired when selection changes. |
| `name` | `string` | auto-generated | Shared HTML name attribute for radio inputs. |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation of radio buttons. |
| `disabled` | `boolean` | `false` | Disables all radio buttons in group. |

#### Props (Radio)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `any` | `undefined` | Unique value for this radio option. |
| `checked` | `boolean` | `false` | Controlled checked state (auto-managed when inside `RadioGroup`). |
| `onChange` | `(value: any) => void` | `undefined` | Callback fired when this radio is checked. |
| `children` | `ReactNode` | `undefined` | Label text. |
| `disabled` | `boolean` | `false` | Disables radio item. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Tab` | Focus Group | Enters the radio group to the selected radio. |
| `ArrowDown` / `ArrowRight` | Next Radio | Selects next radio in the group. |
| `ArrowUp` / `ArrowLeft` | Previous Radio | Selects previous radio in the group. |
| `Space` | Select Radio | Selects the currently focused radio. |

---

### Slider

Horizontal range slider with value readout label and gradient track fill.

#### How to Use

```jsx
import { useState } from 'react'
import { Slider } from '@rahilp010/custom-control'

function Example() {
  const [volume, setVolume] = useState(40)

  return (
    <Slider
      value={volume}
      onChange={setVolume}
      min={0}
      max={100}
      step={5}
      formatValue={(val) => `${val}%`}
      showValue
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `undefined` | Controlled numeric slider value. |
| `defaultValue` | `number` | `0` | Uncontrolled initial value. |
| `onChange` | `(value: number, event: ChangeEvent) => void` | `undefined` | Fired while dragging or adjusting slider. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Increment step. |
| `showValue` | `boolean` | `true` | Shows formatted value label on the right. |
| `formatValue` | `(value: number) => ReactNode` | `undefined` | Custom formatter for value readout. |
| `disabled` | `boolean` | `false` | Disables slider. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `ArrowRight` / `ArrowUp` | Increase Step | Increments slider by `step`. |
| `ArrowLeft` / `ArrowDown` | Decrease Step | Decrements slider by `step`. |
| `PageUp` | Increase Large | Steps value up by a larger increment. |
| `PageDown` | Decrease Large | Steps value down by a larger increment. |
| `Home` | Minimum | Jumps slider to `min`. |
| `End` | Maximum | Jumps slider to `max`. |

---

### ColorPicker

Native color input with hex preview badge and controlled/uncontrolled state.

#### How to Use

```jsx
import { useState } from 'react'
import { ColorPicker } from '@rahilp010/custom-control'

function Example() {
  const [color, setColor] = useState('#7c3aed')

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      showValue
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `undefined` | Controlled hex color code (e.g. `'#635bff'`). |
| `defaultValue` | `string` | `'#635bff'` | Default uncontrolled hex color. |
| `onChange` | `(hex: string, event: ChangeEvent) => void` | `undefined` | Callback fired on color selection. |
| `showValue` | `boolean` | `true` | Displays uppercase hex text output next to swatch. |
| `disabled` | `boolean` | `false` | Disables color input. |

---

### Button

Versatile button with multiple styles, sizes, loading spinners, and icon slots.

#### How to Use

```jsx
import { Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" loading>Saving...</Button>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual button style. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and padding preset. |
| `loading` | `boolean` | `false` | Shows animated loading spinner and disables clicks. |
| `disabled` | `boolean` | `false` | Disables button. |
| `startIcon` | `ReactNode` | `undefined` | Icon element placed before button text. |
| `endIcon` | `ReactNode` | `undefined` | Icon element placed after button text. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native HTML button type. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Activate | Triggers the `onClick` action. |

---

### ButtonGroup

Horizontal or vertical connected set of buttons with unified variant styling and size.

#### How to Use

```jsx
import { ButtonGroup, Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <ButtonGroup variant="outline" size="md">
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'secondary'` | Visual style propagated to children. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing applied across group buttons. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the button group. |
| `disabled` | `boolean` | `false` | Disables all buttons in the group. |
| `className` | `string` | `''` | Custom CSS class names. |
| `children` | `ReactNode` | `undefined` | Child buttons. |

---

### Modal

Portalled dialog modal with backdrop blur, smooth scale animation, and subcomponents.

#### How to Use

```jsx
import { useState } from 'react'
import { Modal, Button } from '@rahilp010/custom-control'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm">Manage your account preferences here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
```

#### Props (Modal)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls whether modal is rendered. |
| `onClose` | `() => void` | `undefined` | Callback fired when modal requests to close. |
| `closeOnEsc` | `boolean` | `true` | Dismisses modal when `Escape` key is pressed. |
| `closeOnBackdropClick` | `boolean` | `true` | Dismisses modal when clicking outside dialog on the dimmed backdrop. |
| `bodyLock` | `boolean` | `true` | Locks background `document.body` scroll while modal is visible. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Width constraint (`xs` = 448px, `sm` = 512px, `md` = 672px, `lg` = 896px, `xl` = 1152px). |
| `children` | `ReactNode` | `undefined` | Dialog contents. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Escape` | Close Dialog | Dismisses open modal when `closeOnEsc=true`. |
| `Tab` | Focus Cycle | Cycles interactive focus inside modal elements. |

#### Subcomponents

- `Modal.Header`: Top border bar for title and close actions.
- `Modal.Title`: Formatted header heading element.
- `Modal.Body`: Scrollable main content area (`overflow-auto`).
- `Modal.Footer`: Bottom border action bar.

---

### Drawer

Slide-over sheet panel overlay anchoring from screen edges (`right`, `left`, `top`, `bottom`) with backdrop blur, smooth spring entrance, body scroll locking, and accessible keyboard dismiss.

#### How to Use

```jsx
import { useState } from 'react'
import { Drawer, Button } from '@rahilp010/custom-control'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        size="md"
        closeOnEsc
      >
        <Drawer.Header>
          <Drawer.Title>Account Settings</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <p className="text-sm">Manage user security, API keys, and notification preferences.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}
```

#### Props (Drawer)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls whether drawer is rendered. |
| `onClose` | `() => void` | `undefined` | Callback fired when drawer requests to close. |
| `placement` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | Edge of the viewport where the panel slides out from. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Width (or height for top/bottom) constraint (`sm` = 320px, `md` = 448px, `lg` = 640px, `full` = 100vw). |
| `closeOnEsc` | `boolean` | `true` | Dismisses drawer when `Escape` key is pressed. |
| `closeOnBackdropClick` | `boolean` | `true` | Dismisses drawer when clicking on the backdrop overlay. |
| `bodyLock` | `boolean` | `true` | Locks background `document.body` scroll while drawer is open. |
| `className` | `string` | `''` | Custom CSS class names for panel container. |
| `children` | `ReactNode` | `undefined` | Drawer content (`Drawer.Header`, `Drawer.Body`, `Drawer.Footer`, etc.). |

#### Subcomponents

- `Drawer.Header`: Top bar container with bottom border.
- `Drawer.Title`: Bold styled heading.
- `Drawer.Body`: Scrollable body area (`overflow-y-auto`).
- `Drawer.Footer`: Action bar with top border.

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Escape` | Close | Dismisses drawer when `closeOnEsc=true`. |
| `Tab` | Focus Cycle | Cycles interactive focus through drawer elements. |

---

### Tabs

Dynamic tabbed navigation with interactive Framer Motion sliding pill/line active indicators, badge integration, and accessible keyboard navigation.

#### How to Use

```jsx
import { useState } from 'react'
import { Tabs } from '@rahilp010/custom-control'

function Example() {
  const [active, setActive] = useState('profile')

  return (
    <Tabs value={active} onChange={setActive} variant="line" size="md">
      <Tabs.List>
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="billing" badge="3">Billing</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">
        <p className="p-4 text-sm">Personal details and public profile information.</p>
      </Tabs.Panel>
      <Tabs.Panel value="billing">
        <p className="p-4 text-sm">Invoices, payment methods, and current subscription plan.</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p className="p-4 text-sm">Application preferences.</p>
      </Tabs.Panel>
    </Tabs>
  )
}
```

#### Props (Tabs)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | `undefined` | Controlled active tab value. |
| `defaultValue` | `string \| number` | `undefined` | Default active tab for uncontrolled usage. |
| `onChange` | `(value: string \| number) => void` | `undefined` | Callback fired when active tab changes. |
| `variant` | `'line' \| 'pill' \| 'segmented'` | `'line'` | Visual tab styling (`line` with indicator, `pill` chips, or `segmented` control). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing of tab triggers. |
| `className` | `string` | `''` | Custom CSS class names. |
| `children` | `ReactNode` | `undefined` | Tab children (`Tabs.List`, `Tabs.Panel`). |

#### Props (Tabs.Tab)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | (required) | Unique identifier for this tab. |
| `disabled` | `boolean` | `false` | Whether tab button is disabled. |
| `icon` | `ReactNode` | `undefined` | Icon element rendered before tab title. |
| `badge` | `ReactNode` | `undefined` | Count or status badge rendered after tab title. |
| `className` | `string` | `''` | Custom CSS class names. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `ArrowRight` / `ArrowDown` | Next Tab | Focuses and activates next tab (skips disabled tabs). |
| `ArrowLeft` / `ArrowUp` | Previous Tab | Focuses and activates previous tab (skips disabled tabs). |
| `Home` | First Tab | Jumps to the first enabled tab. |
| `End` | Last Tab | Jumps to the last enabled tab. |
| `Enter` / `Space` | Select Tab | Activates the focused tab. |

---

### Pagination

Full pagination bar with numeric page buttons, ellipsis (`...`), previous/next navigation, total count display, and page size selector.

#### How to Use

```jsx
import { useState } from 'react'
import { Pagination } from '@rahilp010/custom-control'

function Example() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  return (
    <Pagination
      total={250}
      page={page}
      onChangePage={setPage}
      pageSize={limit}
      onChangePageSize={setLimit}
      pageSizeOptions={[10, 20, 50, 100]}
      showTotal
      showPageSize
      size="md"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `total` | `number` | `0` | Total number of data items. |
| `page` / `activePage` | `number` | `undefined` | Controlled active page number (1-indexed). |
| `defaultPage` | `number` | `1` | Default active page number. |
| `pageSize` / `limit` | `number` | `undefined` | Controlled items per page. |
| `defaultPageSize` | `number` | `10` | Default items per page. |
| `onChangePage` | `(page: number) => void` | `undefined` | Callback fired on page change. |
| `onChangePageSize` | `(pageSize: number) => void` | `undefined` | Callback fired when items-per-page selector changes. |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Available page size dropdown options. |
| `showTotal` | `boolean` | `true` | Shows total item count summary. |
| `showPageSize` | `boolean` | `false` | Shows page size select dropdown. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing of pagination buttons. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `ArrowRight` | Next Page | Focuses and activates next page button. |
| `ArrowLeft` | Previous Page | Focuses and activates previous page button. |
| `Enter` / `Space` | Change Page | Navigates to the focused page number. |
| `Tab` | Next Control | Navigates between page buttons and page size selector. |

---

### DropdownMenu

Floating context action menu anchored to any trigger element with item separators, icons, headers, danger actions, and full arrow navigation.

#### How to Use

```jsx
import { DropdownMenu, Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <DropdownMenu
      trigger={<Button variant="outline">Actions ▾</Button>}
      placement="bottom-start"
    >
      <DropdownMenu.Header>User Options</DropdownMenu.Header>
      <DropdownMenu.Item onClick={() => alert('Profile')}>
        Profile
      </DropdownMenu.Item>
      <DropdownMenu.Item onClick={() => alert('Settings')}>
        Settings
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item danger onClick={() => alert('Delete')}>
        Delete Account
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
```

#### Props (DropdownMenu)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `trigger` | `ReactNode` | (required) | Interactive element that opens the dropdown menu when clicked. |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Positioning of the floating dropdown panel. |
| `disabled` | `boolean` | `false` | Disables trigger and menu opening. |
| `closeOnSelect` | `boolean` | `true` | Automatically closes menu when an item is selected. |
| `menuClassName` | `string` | `''` | Custom CSS class names for dropdown popover. |

#### Props (DropdownMenu.Item)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Item click callback. |
| `icon` | `ReactNode` | `undefined` | Icon element rendered before item label. |
| `danger` | `boolean` | `false` | Styles item with red danger/destructive text & hover styling. |
| `disabled` | `boolean` | `false` | Disables click interaction. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` / `ArrowDown` | Open Menu | When trigger is focused, opens dropdown menu. |
| `ArrowDown` | Next Item | Highlights next menu item (skips separators & headers). |
| `ArrowUp` | Previous Item | Highlights preceding menu item. |
| `Home` | First Item | Jumps highlight to first selectable item. |
| `End` | Last Item | Jumps highlight to last selectable item. |
| `Enter` | Select Item | Activates highlighted item. |
| `Escape` | Close Menu | Dismisses dropdown menu. |

---

### Accordion

Collapsible disclosure panel supporting single or multi-expand modes (`multiple`), animated height transition, and rotating chevron indicators.

#### How to Use

```jsx
import { Accordion } from '@rahilp010/custom-control'

function Example() {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="1">
        <Accordion.Header>What is @rahilp010/custom-control?</Accordion.Header>
        <Accordion.Body>
          A modern, lightweight React form controls and UI library with 40+ components.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Does it support Server-Side Rendering?</Accordion.Header>
        <Accordion.Body>
          Yes! All popovers, modals, and drawers use SSR-guarded portals compatible with Next.js and Remix.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
```

#### Props (Accordion)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeKey` | `string \| number \| Array<string \| number>` | `undefined` | Controlled active accordion item key(s). |
| `defaultActiveKey` | `string \| number \| Array<string \| number>` | `undefined` | Default expanded item key(s). |
| `onChange` | `(key: any) => void` | `undefined` | Callback fired when active item changes. |
| `multiple` | `boolean` | `false` | When true, allows multiple panels to be open simultaneously. |

#### Props (Accordion.Item)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `eventKey` | `string \| number` | (required) | Unique identifier for this panel. |
| `disabled` | `boolean` | `false` | Disables toggle interaction. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Toggle Panel | Expands or collapses focused accordion panel. |
| `ArrowDown` | Next Header | Moves focus to the next accordion header. |
| `ArrowUp` | Previous Header | Moves focus to the previous accordion header. |
| `Home` | First Header | Jumps focus to first accordion header. |
| `End` | Last Header | Jumps focus to last accordion header. |

---

### Badge

Notification badge component supporting count readouts, overflow caps (`max`), dot badges, status colors, and corner positioning.

#### How to Use

```jsx
import { Badge, Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="flex gap-6 items-center">
      {/* Count Badge */}
      <Badge count={5}>
        <Button variant="outline">Inbox</Button>
      </Badge>

      {/* Overflow Cap */}
      <Badge count={120} max={99} color="error">
        <Button variant="outline">Notifications</Button>
      </Badge>

      {/* Status Dot */}
      <Badge dot color="success">
        <div className="w-10 h-10 rounded-full bg-cc-overlay/10" />
      </Badge>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `count` | `number \| ReactNode` | `undefined` | Number or element rendered inside badge. |
| `max` | `number` | `99` | Maximum number before displaying `${max}+` (e.g. `99+`). |
| `dot` | `boolean` | `false` | Renders a small circular dot indicator without text. |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'error'` | Badge background color variant. |
| `placement` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Corner placement relative to child element. |
| `children` | `ReactNode` | `undefined` | Wrapped target element (or standalone if omitted). |

---

### Tag & Chip

Compact interactive label tag with removable dismiss buttons (`closable`), solid/subtle/outline variants, status colors, and sizing. `Chip` is an alias of `Tag`.

#### How to Use

```jsx
import { Tag, Chip } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag color="primary" variant="subtle">React</Tag>
      <Tag color="success" variant="solid">Active</Tag>
      <Tag color="warning" variant="outline">Pending</Tag>
      <Tag
        color="error"
        variant="subtle"
        closable
        onClose={() => alert('Removed')}
      >
        Removable Filter
      </Tag>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'solid' \| 'subtle' \| 'outline'` | `'subtle'` | Visual styling variant. |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | Color theme. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height & padding preset (`sm` = 20px, `md` = 24px, `lg` = 28px). |
| `closable` | `boolean` | `false` | Displays a close button (`✕`). |
| `onClose` | `(event: MouseEvent) => void` | `undefined` | Callback fired when close button is clicked. |
| `icon` | `ReactNode` | `undefined` | Leading icon element. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Remove | Triggers `onClose` when close icon button is focused. |
| `Tab` | Focus | Navigates into and out of tag element. |

---

### Rate

Star rating component with hover preview, half-star selection (`allowHalf`), custom character icons, read-only mode, and form compatibility.

#### How to Use

```jsx
import { useState } from 'react'
import { Rate } from '@rahilp010/custom-control'

function Example() {
  const [score, setScore] = useState(3.5)

  return (
    <Rate
      name="rating"
      value={score}
      onChange={setScore}
      allowHalf
      max={5}
      size="md"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `undefined` | Controlled score value. |
| `defaultValue` | `number` | `0` | Uncontrolled default score for native forms. |
| `onChange` | `(value: number) => void` | `undefined` | Callback fired on rating selection. |
| `onHoverChange` | `(value: number) => void` | `undefined` | Callback fired when hovering over stars. |
| `max` | `number` | `5` | Total number of rating stars/characters. |
| `allowHalf` | `boolean` | `false` | Enables half-star precision (`0.5` steps). |
| `readOnly` | `boolean` | `false` | Disables clicks & hover interactions (display-only). |
| `disabled` | `boolean` | `false` | Disables rating component. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Star icon size (`sm` = 16px, `md` = 20px, `lg` = 28px). |
| `character` | `ReactNode` | `★` | Custom character or icon (defaults to star icon). |
| `name` | `string` | `undefined` | HTML `name` attribute rendered as hidden `<input>`. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `ArrowRight` / `ArrowUp` | Increase Score | Increases rating by 1 (or 0.5 when `allowHalf=true`). |
| `ArrowLeft` / `ArrowDown` | Decrease Score | Decreases rating by 1 (or 0.5 when `allowHalf=true`). |

---

### Avatar & AvatarGroup

User profile avatar with image thumbnail, fallback initials generator from name, online/offline status dot indicator, and stacked `AvatarGroup` with `+N` overflow badge.

#### How to Use

```jsx
import { Avatar, AvatarGroup } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="space-y-4">
      {/* Single Avatars */}
      <div className="flex gap-3 items-center">
        <Avatar name="Rahil Patel" size="md" status="online" />
        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" size="md" status="busy" />
        <Avatar name="John Doe" shape="square" size="lg" />
      </div>

      {/* Stacked Avatar Group with Overflow */}
      <AvatarGroup max={3} size="md">
        <Avatar name="Alex Morgan" />
        <Avatar name="David Beckham" />
        <Avatar name="Lionel Messi" />
        <Avatar name="Cristiano Ronaldo" />
        <Avatar name="Kylian Mbappe" />
      </AvatarGroup>
    </div>
  )
}
```

#### Props (Avatar)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `undefined` | Profile image URL. |
| `alt` | `string` | `''` | Alt description for image. |
| `name` | `string` | `undefined` | Full name used to generate two-letter initials fallback (e.g. `'Rahil Patel'` -> `'RP'`). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar dimensions (`xs` = 24px, `sm` = 32px, `md` = 40px, `lg` = 48px, `xl` = 64px). |
| `shape` | `'circle' \| 'square'` | `'circle'` | Corner rounding shape. |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `undefined` | Colored presence badge dot. |
| `icon` | `ReactNode` | `undefined` | Custom fallback icon when image & name are not provided. |

#### Props (AvatarGroup)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `max` | `number` | `undefined` | Maximum visible avatars before collapsing into a `+N` badge. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Sizing applied across avatars in the group. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape applied across avatars in the group. |
| `spacing` | `'tight' \| 'normal' \| 'relaxed'` | `'normal'` | Negative margin overlap between avatars. |

---

### Divider

Horizontal or vertical rule divider with center, left, or right aligned title labels and optional dashed styling.

#### How to Use

```jsx
import { Divider } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="space-y-4">
      <p>Sign in with email and password</p>
      <Divider align="center">OR CONTINUE WITH</Divider>
      <p>Single Sign-On (SSO)</p>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider rule. |
| `align` | `'center' \| 'left' \| 'right'` | `'center'` | Title label alignment. |
| `dashed` | `boolean` | `false` | Displays border as dashed lines instead of solid. |
| `children` | `ReactNode` | `undefined` | Optional title label element placed on divider line. |

---

---

### Tooltip & Whisper

Lightweight floating popover tooltip triggered on mouse hover and keyboard focus. `Whisper` is an alias designed for rsuite compatibility.

#### How to Use

```jsx
import { Tooltip, Whisper, Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Quick helpful tip" placement="top">
        <Button variant="outline">Hover or Focus Me</Button>
      </Tooltip>

      <Whisper speaker={<span>rsuite speaker format</span>} placement="bottom">
        <Button variant="secondary">Whisper Tooltip</Button>
      </Whisper>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `content` | `ReactNode` | `undefined` | Tooltip body content. |
| `speaker` | `ReactNode` | `undefined` | Alternative prop for tooltip content (rsuite style). |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip popover positioning anchor. |
| `open` | `boolean` | `undefined` | Controlled visibility state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Fired when open state changes. |
| `offset` | `number` | `8` | Distance (px) between trigger and tooltip. |
| `disabled` | `boolean` | `false` | Prevents tooltip from opening. |

#### Keyboard Interaction

| Event | Operation | Description |
| :--- | :--- | :--- |
| `Focus` | Show Tooltip | Displays tooltip when child element receives focus via `Tab`. |
| `Blur` | Hide Tooltip | Conceals tooltip when child element loses focus. |

---

### Alert

Inline message card for informative, success, warning, or error messages.

#### How to Use

```jsx
import { Alert } from '@rahilp010/custom-control'

function Example() {
  return (
    <Alert
      variant="success"
      title="Deployment Complete"
      dismissible
      onClose={() => console.log('Closed')}
    >
      Your application was successfully deployed to production.
    </Alert>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert color palette. |
| `title` | `string` | `undefined` | Bold title line. |
| `children` | `ReactNode` | `undefined` | Alert description message. |
| `dismissible` | `boolean` | `false` | Renders close button (`×`). |
| `onClose` | `() => void` | `undefined` | Fired when close button is clicked. |

---

### Toast & ToastProvider

High-performance, fully customizable notification system powered by **Framer Motion** spring physics. Features **Frosted Glassmorphism**, **Vibrant Colorful (Solid)**, and **Multi-tone Gradient** visual styles, animated countdown progress bars, pause-on-hover timers, variant icons with optical alignment, and automatic Promise lifecycle tracking.

#### Toast Visual Effects

| Effect | Description |
| :--- | :--- |
| `glass` *(default)* | Modern frosted glass with `backdrop-blur-xl`, translucent refraction borders, subtle ambient glow, and tinted icon badges. |
| `colorful` | Saturated, high-contrast solid backgrounds (emerald, rose, amber, blue) with crisp white typography. |
| `gradient` | Rich multi-tone gradients (e.g., emerald to teal, rose to pink, amber to orange) with white typography. |
| `outline` | Colored border accent on a clean surface background. |
| `default` | Classic subtle left-accent border with surface background. |

#### How to Use

```jsx
import { ToastProvider, useToast, Button } from '@rahilp010/custom-control'

function ToastTrigger() {
  const { toast, success, error, warning, info, loading, promise, dismissAll } = useToast()

  // 1. Frosted Glass (Default)
  const showGlassToast = () => {
    success('Deployment complete and live on global CDN!', {
      title: 'Deployment Live',
      effect: 'glass'
    })
  }

  // 2. Vibrant Colorful UI
  const showColorfulToast = () => {
    error('Could not authenticate user token.', {
      title: 'Authentication Error',
      effect: 'colorful'
    })
  }

  // 3. Multi-tone Gradient with Action Button
  const showGradientToast = () => {
    warning('Storage limit reached 85%.', {
      title: 'Storage Warning',
      effect: 'gradient',
      action: {
        label: 'Upgrade Plan',
        onClick: () => alert('Navigating to billing...')
      }
    })
  }

  // 4. Automatic Promise Tracking
  const handleSave = () => {
    promise(
      fetch('/api/sync', { method: 'POST' }),
      {
        loading: 'Syncing database...',
        success: 'All records synced successfully!',
        error: 'Failed to sync with remote host.',
        effect: 'glass'
      }
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={showGlassToast}>Glass Toast</Button>
      <Button variant="danger" onClick={showColorfulToast}>Colorful Error</Button>
      <Button variant="outline" onClick={showGradientToast}>Gradient with Action</Button>
      <Button variant="primary" onClick={handleSave}>Promise Toast</Button>
      <Button variant="ghost" onClick={dismissAll}>Dismiss All</Button>
    </div>
  )
}

export default function App() {
  return (
    {/* Global Toast Provider with customizable effect, position, and progress */}
    <ToastProvider
      position="top-right"
      effect="glass"
      duration={4000}
      progress={true}
      pauseOnHover={true}
    >
      <ToastTrigger />
    </ToastProvider>
  )
}
```

#### Props (ToastProvider)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `effect` | `'glass' \| 'colorful' \| 'gradient' \| 'outline' \| 'default'` | `'glass'` | Default visual effect applied to all toasts. |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Screen position for floating toasts. |
| `duration` | `number` | `5000` | Default auto-dismiss timeout (ms). Pass `0` for sticky toasts. |
| `progress` | `boolean` | `true` | Show an animated countdown progress bar along the bottom edge. |
| `pauseOnHover` | `boolean` | `true` | Freeze timer and progress countdown while hovering over the toast. |
| `closable` | `boolean` | `true` | Whether toasts display a close button (`×`). |
| `limit` | `number` | `5` | Maximum number of toasts displayed concurrently. |

#### Toast Options (`useToast()` & `<Toast />`)

Every method on `useToast()` accepts an optional `ToastOptions` object:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `undefined` | Bold title header for the toast. |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` | Color and icon status variant. |
| `effect` | `'glass' \| 'colorful' \| 'gradient' \| 'outline' \| 'default'` | Provider's effect | Override visual styling for this specific toast. |
| `duration` | `number` | Provider's duration | Auto-dismiss timeout in ms (`0` for persistent). |
| `progress` | `boolean` | `true` | Show/hide the animated countdown progress bar. |
| `pauseOnHover` | `boolean` | `true` | Pause dismiss timer when hovered. |
| `closable` | `boolean` | `true` | Show/hide the close button. |
| `icon` | `ReactNode \| boolean` | Variant icon | Custom icon element, or `false` to hide icon. |
| `action` | `{ label: string, onClick?: (e) => void }` | `undefined` | Action button rendered below the message. |
| `className` | `string` | `''` | Custom CSS classes applied to toast container. |
| `style` | `CSSProperties` | `{}` | Inline styles for container overrides. |

#### useToast() API Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `promise(prom, msgs)` | `prom: Promise \| (() => Promise), msgs: { loading, success, error, duration?, effect? }` | Tracks an async Promise with animated spinner -> success / error transitions. |
| `success(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a green/emerald success notification. |
| `error(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a red/rose error notification. |
| `warning(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers an amber/orange warning notification. |
| `info(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a blue/indigo info notification. |
| `loading(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a persistent loading notification with spinning icon. |
| `toast(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers generic toast with custom options (`effect`, `action`, etc.). |
| `dismiss(id)` | `id: number` | Dismisses a specific toast by its ID. |
| `dismissAll()` | none | Dismisses all active toasts immediately. |

---

### Progress

Determinate or indeterminate progress bar with label and percentage readout.

#### How to Use

```jsx
import { Progress } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="space-y-4 max-w-sm">
      {/* Determinate */}
      <Progress value={65} max={100} label="Uploading..." showValue size="md" />

      {/* Indeterminate */}
      <Progress label="Processing..." size="sm" />
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `undefined` | Current value (0 to `max`). Omit for animated indeterminate mode. |
| `max` | `number` | `100` | Maximum progress value. |
| `label` | `string` | `undefined` | Header text above the progress bar. |
| `showValue` | `boolean` | `false` | Displays percentage readout on the right (e.g. `'65%'`). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height variant (`h-1`, `h-2`, or `h-3`). |

---

### Skeleton

Animated pulsing placeholder for loading states.

#### How to Use

```jsx
import { Skeleton } from '@rahilp010/custom-control'

function Example() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton circle width={40} height={40} />
      <div className="space-y-2">
        <Skeleton width={180} height={14} />
        <Skeleton width={120} height={12} />
      </div>
    </div>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number \| string` | `undefined` | Width (e.g. `200` or `'100%'`). |
| `height` | `number \| string` | `undefined` | Height (e.g. `16` or `'1rem'`). |
| `circle` | `boolean` | `false` | Sets `rounded-full` for avatar placeholders. |
| `className` | `string` | `''` | Custom CSS class names. |

---

### FormField & Label

Standardized form field wrapper that connects labels, helper descriptions, error alerts, and accessibility attributes (`aria-describedby`, `aria-invalid`) automatically.

#### How to Use

```jsx
import { useState } from 'react'
import { FormField, Input } from '@rahilp010/custom-control'

function Example() {
  const [email, setEmail] = useState('')
  const isInvalid = email.length > 0 && !email.includes('@')

  return (
    <FormField
      label="Work Email"
      description="We'll never share your email address."
      error={isInvalid ? 'Please enter a valid email address.' : undefined}
      required
    >
      <Input
        value={email}
        onChange={setEmail}
        placeholder="name@company.com"
      />
    </FormField>
  )
}
```

#### Props (FormField)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `ReactNode` | `undefined` | Label text placed above the control. |
| `description` | `ReactNode` | `undefined` | Helper text placed beneath the control. |
| `error` | `ReactNode` | `undefined` | Error message (renders red alert message and sets `aria-invalid`). |
| `required` | `boolean` | `false` | Appends a red asterisk (`*`) to the label. |
| `id` | `string` | auto-generated | ID linked between label, input, and descriptions. |

#### Props (Label)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `htmlFor` | `string` | `undefined` | Associated control ID. |
| `required` | `boolean` | `false` | Shows red asterisk (`*`). |
| `children` | `ReactNode` | `undefined` | Label text. |

---

### Uploader

File uploader component supporting drag-and-drop or file click selection.

#### How to Use

```jsx
import { Uploader, Button } from '@rahilp010/custom-control'

function Example() {
  return (
    <Uploader
      accept="image/*,.pdf"
      onChange={(files) => {
        console.log('Selected files:', files)
        // files: Array<{ blobFile: File, name: string }>
      }}
    >
      <div className="border-2 border-dashed border-cc-overlay/20 p-8 rounded-2xl text-center cursor-pointer hover:border-cc-primary">
        <p className="font-semibold text-sm">Click or drag files here to upload</p>
        <p className="text-xs text-cc-muted mt-1">PNG, JPG, or PDF up to 10MB</p>
      </div>
    </Uploader>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onChange` | `(files: Array<{ blobFile: File, name: string }>) => void` | `undefined` | Fired when files are dropped or selected. |
| `accept` | `string` | `undefined` | Standard HTML file input accept filter (e.g. `'image/*', '.pdf'`). |
| `draggable` | `boolean` | `true` | Enables drag-and-drop listeners on wrapper. |
| `disabled` | `boolean` | `false` | Disables file picker. |
| `onDragEnter` | `(event: DragEvent) => void` | `undefined` | Fired on drag enter. |
| `onDragLeave` | `(event: DragEvent) => void` | `undefined` | Fired on drag leave. |
| `onDrop` | `(event: DragEvent) => void` | `undefined` | Fired on drop. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open File Dialog | When focused on trigger, opens OS file selection dialog. |

---

### Animation

Utility animation helpers built on top of Framer Motion.

#### How to Use

```jsx
import { useState } from 'react'
import { Animation, Button } from '@rahilp010/custom-control'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-3">
      <Button onClick={() => setOpen((v) => !v)}>Toggle Panel</Button>

      <Animation.Collapse in={open}>
        <div className="p-4 rounded-xl bg-cc-overlay/10">
          Smooth collapsible accordion content.
        </div>
      </Animation.Collapse>

      <Animation.Fade in={open}>
        <p className="text-sm">Fading content</p>
      </Animation.Fade>

      <Animation.Bounce in={open}>
        <p className="text-sm font-semibold">Bouncing pop element</p>
      </Animation.Bounce>
    </div>
  )
}
```

#### Helpers & Props

| Component | Props | Description |
| :--- | :--- | :--- |
| `Animation.Collapse` | `in: boolean`, `children: ReactNode` | Smooth height 0 to auto accordion expand/collapse. |
| `Animation.Fade` | `in?: boolean`, `children: ReactNode`, `className?: string` | Smooth opacity entrance and exit transition. |
| `Animation.Bounce` | `in?: boolean`, `children: ReactNode`, `className?: string` | Scale and vertical spring entrance. |

---

## Server Rendering (SSR)

All popovers, modals, and tooltips render via a portal (`ThemedPortal`) guarded against `window`/`document` references. The package is safe to import directly in Next.js (App Router or Pages Router), Remix, and Vite SSR setups.

## Frequently Asked Questions (FAQ)

### What makes `@rahilp010/custom-control` different from other libraries?
Unlike heavy UI suites, `@rahilp010/custom-control` focuses specifically on high-frequency form controls and pickers. It bundles 30+ components in under **20 kB gzipped**, avoids destructive global CSS resets, adheres to **React Suite (rsuite)** keyboard accessibility paradigms, and includes animated micro-interactions powered by Framer Motion.

### Do I need to have Tailwind CSS installed in my project?
No. The library compiles all required styles into a single standalone stylesheet (`@rahilp010/custom-control/styles.css`). Your application does not need Tailwind CSS or PostCSS configured.

### Does it support Server-Side Rendering (SSR) in Next.js?
Yes. All dropdown overlays, pickers, tooltips, and modals render through an SSR-safe `ThemedPortal` that safely guards against `document` and `window` accesses during server evaluation.

### How do I customize primary brand colors?
Pass a `colors` object to `CustomControlsProvider`. The library will automatically calculate hover tones, contrast foreground colors, and focus ring opacities:
```jsx
<CustomControlsProvider theme="dark" colors={{ primary: '#8b5cf6' }}>
  <App />
</CustomControlsProvider>
```

---

## Contributing & Issues

Contributions, suggestions, and feature requests are welcome!
Feel free to open an issue or pull request on [GitHub](https://github.com/rahilp010/custom-control).

---

## License

MIT © [Rahil Patel](https://github.com/rahilpatel)
