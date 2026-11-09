# React Custom Controls — @rahilp010/custom-control

[![npm version](https://img.shields.io/npm/v/@rahilp010/custom-control.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![npm downloads](https://img.shields.io/npm/dm/@rahilp010/custom-control.svg?style=flat-square&color=success)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@rahilp010/custom-control?style=flat-square&color=informational)](https://bundlephobia.com/package/@rahilp010/custom-control)
[![types included](https://img.shields.io/badge/types-included-blue.svg?style=flat-square)](https://www.npmjs.com/package/@rahilp010/custom-control)
[![license](https://img.shields.io/npm/l/@rahilp010/custom-control.svg?style=flat-square)](https://github.com/rahilp010/custom-control/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rahilp010/custom-control.svg?style=flat-square)](https://github.com/rahilp010/custom-control)

> **React Custom Controls** (`@rahilp010/custom-control`) is a modern, lightweight, accessible, and fully themeable React UI & form controls library. Inspired by **React Suite (rsuite)** design patterns and built on **Tailwind CSS** and **Framer Motion**, it provides 30+ reusable custom controls including select pickers, date pickers, range pickers, time pickers, inputs, modals, toasts, toggles, OTP inputs, and tooltips.

- 🌗 **Dark & Light Themes** out of the box (`theme="dark" | "light" | "system"`)
- 🎨 **Custom Color Palette** — customize the accent or surface palette using hex, RGB, or CSS variables
- 🪶 **Zero CSS Reset Conflicts** — clean, scoped CSS variable tokens with no forced global resets
- ♿ **Full Keyboard Accessibility** — complete arrow navigation, Escape to close, Enter to select (rsuite standard)
- 📦 **TypeScript Support** — bundled `.d.ts` declarations with full autocomplete
- 🚀 **Next.js & Remix Ready** — SSR-safe portalled overlays (App Router & Pages Router compatible)
- ⚡ **Ultra-Lightweight** — ~19.8 kB gzipped for 30+ production-ready form controls

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
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
  - [Modal](#modal)
  - [Tooltip & Whisper](#tooltip--whisper)
  - [Alert](#alert)
  - [Toast & ToastProvider](#toast--toastprovider)
  - [Progress](#progress)
  - [Skeleton](#skeleton)
  - [FormField & Label](#formfield--label)
  - [Uploader](#uploader)
  - [Animation](#animation)
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

Single-line text input control with focus rings and disabled styling.

#### How to Use

```jsx
import { useState } from 'react'
import { Input } from '@rahilp010/custom-control'

function Example() {
  const [val, setVal] = useState('')
  return <Input value={val} onChange={setVal} placeholder="Enter username..." />
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Input value. |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Callback fired on input change. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `type` | `string` | `'text'` | HTML input type (`'text'`, `'email'`, `'url'`, etc.). |
| `disabled` | `boolean` | `false` | Whether input is disabled. |
| `className` | `string` | `''` | Custom CSS class names. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` | Submit | Submits enclosing form if inside a `<form>` element. |
| `Tab` | Focus / Blur | Navigates into and out of the text field. |

---

### InputGroup

Grouped container allowing addons, buttons, or icons to be placed alongside inputs.

#### How to Use

```jsx
import { InputGroup, Input } from '@rahilp010/custom-control'

function Example() {
  return (
    <InputGroup>
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

Controlled decimal and integer numeric input with bounds clamping, custom formatting, and prefix support.

#### How to Use

```jsx
import { useState } from 'react'
import { InputNumber } from '@rahilp010/custom-control'

function Example() {
  const [price, setPrice] = useState(25)

  return (
    <InputNumber
      value={price}
      onChange={setPrice}
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
| `value` | `number \| string` | `''` | Numeric value. |
| `onChange` | `(value: number \| '') => void` | `undefined` | Callback fired when value changes. |
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

Secure input field featuring a toggle button to reveal or conceal passwords.

#### How to Use

```jsx
import { useState } from 'react'
import { PasswordInput } from '@rahilp010/custom-control'

function Example() {
  const [pass, setPass] = useState('')

  return (
    <PasswordInput
      value={pass}
      onChange={setPass}
      placeholder="Enter password"
      showToggle
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Password string. |
| `onChange` | `(value: string, event: ChangeEvent) => void` | `undefined` | Change callback. |
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

Search field with magnifying glass icon and clear button.

#### How to Use

```jsx
import { useState } from 'react'
import { SearchInput } from '@rahilp010/custom-control'

function Example() {
  const [search, setSearch] = useState('')

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
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
| `value` | `string` | `''` | Search query value. |
| `onChange` | `(value: string, event: ChangeEvent \| null) => void` | `undefined` | Callback on search query change. |
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

Searchable single-select dropdown picker supporting custom menu item rendering and extra footer actions.

#### How to Use

```jsx
import { useState } from 'react'
import { SelectPicker } from '@rahilp010/custom-control'

const data = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' }
]

function Example() {
  const [val, setVal] = useState('react')

  return (
    <SelectPicker
      data={data}
      value={val}
      onChange={setVal}
      placeholder="Select framework"
      searchable
      cleanable
      onCreateNew={() => alert('New item')}
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `Array<{ label: string, value: any, [key: string]: any }>` | `[]` | List of selectable options. |
| `value` | `any` | `undefined` | Controlled value matching option `value`. |
| `onChange` | `(value: any, item: object) => void` | `undefined` | Fired when an option is selected. |
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
| `Enter` | Select Option | Selects the highlighted option and closes menu. |
| `Escape` | Close Menu | Closes dropdown menu without changing value. |
| Typing in search | Filter | Filters options in real-time. |

---

### CheckPicker / TagPicker

Multi-select searchable dropdown picker with checkboxes. `TagPicker` is an alias of `CheckPicker`.

#### How to Use

```jsx
import { useState } from 'react'
import { CheckPicker, TagPicker } from '@rahilp010/custom-control'

const skills = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' },
  { label: 'Rust', value: 'rust' }
]

function Example() {
  const [selected, setSelected] = useState(['js'])

  return (
    <CheckPicker
      data={skills}
      value={selected}
      onChange={setSelected}
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
| `value` | `any[]` | `[]` | Array of selected values. |
| `onChange` | `(values: any[]) => void` | `undefined` | Callback fired on selection change. |
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

Interactive calendar dropdown date picker supporting ISO strings (`yyyy-MM-dd`), quick "Today" selection, and clear button.

#### How to Use

```jsx
import { useState } from 'react'
import { DatePicker } from '@rahilp010/custom-control'

function Example() {
  const [date, setDate] = useState('2026-11-08')

  return (
    <DatePicker
      value={date}
      onChange={(formatted, dateObj) => {
        console.log('Selected:', formatted, dateObj)
        setDate(formatted)
      }}
      placeholder="Select birth date"
      cleanable
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| Date` | `''` | Selected date (`'yyyy-MM-dd'` string or `Date` object). |
| `onChange` | `(formatted: string, date: Date \| null) => void` | `undefined` | Fired when date is selected or cleared. |
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
| `Tab` | Next Control | Navigates between Month Prev/Next, Day cells, Today, and Clear buttons. |
| `Escape` | Close | Closes calendar popup. |

---

### DateRangePicker

From/To date range picker with preview formatting and quick apply action.

#### How to Use

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@rahilp010/custom-control'

function Example() {
  const [range, setRange] = useState([])

  return (
    <DateRangePicker
      value={range}
      onChange={(newRange) => {
        console.log('Range:', newRange) // [Date, Date]
        setRange(newRange)
      }}
      placeholder="Select date range"
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `[Date \| string, Date \| string] \| []` | `[]` | Start and end dates. |
| `onChange` | `(range: [Date, Date] \| []) => void` | `undefined` | Fired when "Apply Range" or "Clear" is clicked. |
| `placeholder` | `string` | `'Select Date Range'` | Empty state label. |
| `className` | `string` | `''` | Container class name. |

#### Keyboard Shortcuts

| Key | Operation | Description |
| :--- | :--- | :--- |
| `Enter` / `Space` | Open Popup | Opens the date range configuration popover. |
| `Tab` | Navigate Fields | Cycles between From date input, To date input, Clear, and Apply Range. |
| `Escape` | Dismiss | Closes popover without applying unsubmitted changes. |

---

### TimePicker

Hour and minute picker supporting both 12-hour (AM/PM) and 24-hour formats, presets, and a "Now" button.

#### How to Use

```jsx
import { useState } from 'react'
import { TimePicker } from '@rahilp010/custom-control'

function Example() {
  const [time, setTime] = useState('02:30 PM')

  return (
    <TimePicker
      value={time}
      onChange={(time24Str, details) => {
        console.log('24h string:', time24Str)
        console.log('Details:', details)
        setTime(details.time12)
      }}
      is12h
      cleanable
    />
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| Date` | `''` | Time string (e.g. `'14:30'`, `'02:30 PM'`) or `Date`. |
| `onChange` | `(time24: string, details: object) => void` | `undefined` | Callback returning 24-hour string and breakdown object. |
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

Accessible animated switch button with optional internal label text.

#### How to Use

```jsx
import { useState } from 'react'
import { Toggle } from '@rahilp010/custom-control'

function Example() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Toggle
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
| `checked` | `boolean` | `false` | Switch checked state. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback fired on toggle switch. |
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

Controlled checkbox with associated label.

#### How to Use

```jsx
import { useState } from 'react'
import { Checkbox } from '@rahilp010/custom-control'

function Example() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      Subscribe to product updates
    </Checkbox>
  )
}
```

#### Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state. |
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
| `onClose` | `() => void` | `undefined` | Callback fired when clicking the backdrop overlay. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Width constraint (`xs` = 448px, `md` = 672px, `lg` = 1024px, etc.). |
| `children` | `ReactNode` | `undefined` | Dialog contents. |

#### Subcomponents

- `Modal.Header`: Top border bar for title and close actions.
- `Modal.Title`: Formatted header heading element.
- `Modal.Body`: Scrollable main content area (`overflow-auto`).
- `Modal.Footer`: Bottom border action bar.

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

Timed notification toast system with imperative hook helpers (`useToast`).

#### How to Use

```jsx
import { ToastProvider, useToast, Button } from '@rahilp010/custom-control'

function ToastTrigger() {
  const { success, error, info, warning } = useToast()

  return (
    <div className="flex gap-2">
      <Button onClick={() => success('Data saved successfully!')}>
        Success Toast
      </Button>
      <Button onClick={() => error('Failed to fetch data')}>
        Error Toast
      </Button>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider position="top-right" duration={4000}>
      <ToastTrigger />
    </ToastProvider>
  )
}
```

#### Props (ToastProvider)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Screen position for floating toasts. |
| `duration` | `number` | `5000` | Default auto-dismiss timeout (ms). Pass `0` for sticky toasts. |
| `limit` | `number` | `5` | Maximum number of toasts displayed concurrently. |

#### useToast() API Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `success(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a green success notification. |
| `error(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a red error notification. |
| `warning(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers an amber warning notification. |
| `info(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers a blue info notification. |
| `toast(message, options?)` | `message: ReactNode, options?: ToastOptions` | Triggers generic toast with custom options. |
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
