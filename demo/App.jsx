import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  CustomControlsProvider,
  Input,
  InputGroup,
  InputNumber,
  Textarea,
  PasswordInput,
  SearchInput,
  OtpInput,
  SelectPicker,
  CheckPicker,
  Combobox,
  DatePicker,
  DateRangePicker,
  TimePicker,
  Toggle,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  ColorPicker,
  Button,
  ButtonGroup,
  Modal,
  Drawer,
  Tabs,
  Pagination,
  DropdownMenu,
  Accordion,
  Badge,
  Tag,
  Rate,
  Avatar,
  AvatarGroup,
  Divider,
  Tooltip,
  Whisper,
  Alert,
  ToastProvider,
  useToast,
  Progress,
  Skeleton,
  FormField,
  Uploader,
  Animation
} from '../src/index.js'

const COLOR_PRESETS = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Cyan', hex: '#06b6d4' }
]

function ComponentCard({ title, id, description, controls, code, children }) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const cardRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true)
        observer.unobserve(card)
      }
    }, { threshold: 0.08 })

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      id={id}
      animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed || reduceMotion ? 0 : 18 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 group rounded-[28px] border border-white/60 bg-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-[box-shadow,background-color] duration-300 ease-out hover:bg-white hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
    >
      {/* Header */}
      <div className="rounded-t-[27px] border-b border-black/[0.04] bg-white/30 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
              {title}
            </h3>
            <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-500">
              #{id}
            </span>
          </div>
          {description && (
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {code && (
            <button
              type="button"
              onClick={() => setShowCode((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-black/[0.06] bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-white transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          )}
          {showCode && code && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-2xl bg-cc-primary px-3 py-1.5 text-xs font-semibold text-cc-on-primary hover:bg-cc-primary-hover transition-all duration-200 shadow-sm"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          )}
        </div>
      </div>

      {controls && (
        <div className="border-b border-black/[0.04] bg-black/[0.015] px-6 py-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="font-medium text-slate-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-cc-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Live Customizer
          </span>
          {controls}
        </div>
      )}

      <div className="p-6">{children}</div>

      {showCode && code && (
        <div className="rounded-b-[27px] border-t border-black/[0.04] bg-slate-900 p-5 text-slate-200">
          <pre className="overflow-x-auto text-[12px] leading-relaxed font-mono tracking-tight">
            <code>{code.trim()}</code>
          </pre>
        </div>
      )}
    </motion.div>
  )
}

function DemoContent({ globalSize }) {
  const { success, error, info, promise } = useToast()

  // All original states (unchanged)
  const [inputText, setInputText] = useState('John Doe')
  const [inputClearable, setInputClearable] = useState(true)
  const [inputPrefix, setInputPrefix] = useState(true)
  const [inputSuffix, setInputSuffix] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const [inputSize, setInputSize] = useState('md')

  const [numberVal, setNumberVal] = useState(49)
  const [numberFormatter, setNumberFormatter] = useState(true)

  const [textareaVal, setTextareaVal] = useState('Custom controls provide enterprise UI components with smooth micro-interactions.')
  const [textareaShowCount, setTextareaShowCount] = useState(true)

  const [passVal, setPassVal] = useState('SuperSecret123!')
  const [searchVal, setSearchVal] = useState('')

  const [otpVal, setOtpVal] = useState('4829')
  const [otpLength, setOtpLength] = useState(4)
  const [otpType, setOtpType] = useState('numeric')

  const [selectVal, setSelectVal] = useState('react')
  const [selectGroupBy, setSelectGroupBy] = useState(true)
  const [selectCreatable, setSelectCreatable] = useState(true)
  const [selectLoading, setSelectLoading] = useState(false)

  const [checkVal, setCheckVal] = useState(['js', 'ts'])
  const [checkTagDisplay, setCheckTagDisplay] = useState(true)
  const [checkGroupBy, setCheckGroupBy] = useState(true)

  const [comboVal, setComboVal] = useState('Next.js')

  const [dateVal, setDateVal] = useState('2026-11-20')
  const [dateShortcuts, setDateShortcuts] = useState(true)
  const [dateDisablePast, setDateDisablePast] = useState(false)

  const [rangeVal, setRangeVal] = useState([])
  const [rangeShortcuts, setRangeShortcuts] = useState(true)

  const [timeVal, setTimeVal] = useState('02:30 PM')
  const [time12h, setTime12h] = useState(true)

  const [toggleChecked, setToggleChecked] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [radioVal, setRadioVal] = useState('pro')
  const [radioDirection, setRadioDirection] = useState('horizontal')
  const [sliderVal, setSliderVal] = useState(65)
  const [colorVal, setColorVal] = useState('#6366f1')
  const [rateVal, setRateVal] = useState(4.5)
  const [rateHalf, setRateHalf] = useState(true)

  const [buttonLoading, setButtonLoading] = useState(false)
  const [buttonVariant, setButtonVariant] = useState('primary')
  const [tabsVariant, setTabsVariant] = useState('line')
  const [activeTab, setActiveTab] = useState('analytics')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [dropdownPlacement, setDropdownPlacement] = useState('bottom-start')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState('md')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerPlacement, setDrawerPlacement] = useState('right')
  const [drawerSize, setDrawerSize] = useState('md')
  const [tooltipPlacement, setTooltipPlacement] = useState('top')

  const [badgeCount, setBadgeCount] = useState(8)
  const [badgeDot, setBadgeDot] = useState(false)
  const [badgeColor, setBadgeColor] = useState('error')
  const [tagVariant, setTagVariant] = useState('subtle')
  const [tagColor, setTagColor] = useState('primary')
  const [progressVal, setProgressVal] = useState(68)
  const [progressIndeterminate, setProgressIndeterminate] = useState(false)
  const [accordionMultiple, setAccordionMultiple] = useState(false)
  const [dividerAlign, setDividerAlign] = useState('center')
  const [dividerDashed, setDividerDashed] = useState(false)
  const [avatarStatus, setAvatarStatus] = useState('online')
  const [avatarShape, setAvatarShape] = useState('circle')
  const [animOpen, setAnimOpen] = useState(true)

  const frameworkData = [
    { label: 'React', value: 'react', group: 'Frontend' },
    { label: 'Vue.js', value: 'vue', group: 'Frontend' },
    { label: 'Svelte', value: 'svelte', group: 'Frontend' },
    { label: 'Node.js', value: 'node', group: 'Backend' },
    { label: 'Go (Golang)', value: 'go', group: 'Backend' },
    { label: 'Python (FastAPI)', value: 'py', group: 'Backend' },
    { label: 'Rust', value: 'rust', group: 'Systems' }
  ]

  const skillsData = [
    { label: 'JavaScript', value: 'js', group: 'Languages' },
    { label: 'TypeScript', value: 'ts', group: 'Languages' },
    { label: 'React', value: 'react', group: 'Libraries' },
    { label: 'Tailwind CSS', value: 'tailwind', group: 'Styling' },
    { label: 'GraphQL', value: 'graphql', group: 'API' },
    { label: 'Docker', value: 'docker', group: 'DevOps' }
  ]

  const comboboxOptions = [
    { label: 'Next.js (App Router)', value: 'Next.js' },
    { label: 'Remix', value: 'Remix' },
    { label: 'Vite', value: 'Vite' },
    { label: 'Astro', value: 'Astro' },
    { label: 'Gatsby', value: 'Gatsby' }
  ]

  const dateShortcutsList = [
    { label: 'Today', value: new Date() },
    { label: 'Yesterday', value: () => new Date(Date.now() - 86400000) },
    { label: 'Tomorrow', value: () => new Date(Date.now() + 86400000) }
  ]

  const rangeShortcutsList = [
    { label: 'Last 7 Days', value: [new Date(Date.now() - 7 * 86400000), new Date()] },
    { label: 'Last 30 Days', value: [new Date(Date.now() - 30 * 86400000), new Date()] },
    { label: 'Next 14 Days', value: [new Date(), new Date(Date.now() + 14 * 86400000)] }
  ]

  const handleSimulatePromise = () => {
    promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) resolve({ user: 'Rahil Patel', updated: true })
          else reject(new Error('Network timeout'))
        }, 1500)
      }),
      {
        loading: 'Synchronizing settings with cloud...',
        success: (data) => `Success! Synced settings for ${data.user}.`,
        error: (err) => `Failed: ${err.message}`
      }
    )
  }

  return (
    <div className="space-y-14">
      {/* SECTION 01 */}
      <section id="section-inputs" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">
              01
            </span>
            Text & Numeric Inputs
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Form controls with size presets, prefix/suffix icons, clear buttons, bounds validation, and native form compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Input"
            id="input"
            description="Universal text input with clearable button, prefixes, and size variants."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={inputClearable} onChange={(e) => setInputClearable(e.target.checked)} className="rounded text-cc-primary" />
                  clearable
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={inputPrefix} onChange={(e) => setInputPrefix(e.target.checked)} className="rounded text-cc-primary" />
                  prefix
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={inputSuffix} onChange={(e) => setInputSuffix(e.target.checked)} className="rounded text-cc-primary" />
                  suffix
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={inputDisabled} onChange={(e) => setInputDisabled(e.target.checked)} className="rounded text-cc-primary" />
                  disabled
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">size</span>
                  <select value={inputSize} onChange={(e) => setInputSize(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="sm">sm</option>
                    <option value="md">md</option>
                    <option value="lg">lg</option>
                  </select>
                </div>
              </>
            }
            code={`<Input
  name="username"
  value="${inputText}"
  onChange={setInputText}
  size="${inputSize}"
  placeholder="Enter username..."
  ${inputClearable ? 'clearable\n  ' : ''}${inputPrefix ? 'prefix={<span>👤</span>}\n  ' : ''}${inputSuffix ? 'suffix={<span>✓</span>}\n  ' : ''}${inputDisabled ? 'disabled\n  ' : ''}/>`}
          >
            <div className="space-y-3 max-w-md">
              <Input
                name="username"
                value={inputText}
                onChange={setInputText}
                size={inputSize}
                disabled={inputDisabled}
                clearable={inputClearable}
                prefix={inputPrefix ? <span className="text-sm">👤</span> : undefined}
                suffix={inputSuffix ? <span className="text-xs text-emerald-500 font-bold">✓</span> : undefined}
                placeholder="Enter username..."
              />
              <p className="text-[12px] text-slate-500">
                Current value: <strong className="font-mono text-cc-primary">{inputText || '(empty)'}</strong>
              </p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="InputNumber"
            id="input-number"
            description="Numeric input with bounds clamping, stepping, custom prefix, and formatters."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={numberFormatter} onChange={(e) => setNumberFormatter(e.target.checked)} className="rounded text-cc-primary" />
                formatter ($)
              </label>
            }
            code={`<InputNumber
  name="price"
  value={${numberVal}}
  onChange={setNumberVal}
  min={0}
  max={100}
  step={5}
  prefix="$"
  ${numberFormatter ? 'formatter={(v) => `${v}.00`}\n  ' : ''}size="${globalSize}"
/>`}
          >
            <div className="space-y-3 max-w-md">
              <InputNumber
                name="price"
                value={numberVal}
                onChange={setNumberVal}
                min={0}
                max={100}
                step={5}
                prefix="$"
                size={globalSize}
                formatter={numberFormatter ? (v) => `${v}.00` : undefined}
                placeholder="0.00"
              />
              <p className="text-[12px] text-slate-500">
                Number value: <strong className="font-mono text-cc-primary">{numberVal}</strong>
              </p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Textarea"
            id="textarea"
            description="Multi-line input with automatic character count badge and resize controls."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={textareaShowCount} onChange={(e) => setTextareaShowCount(e.target.checked)} className="rounded text-cc-primary" />
                showCount
              </label>
            }
            code={`<Textarea
  value="${textareaVal}"
  onChange={setTextareaVal}
  rows={3}
  maxLength={200}
  ${textareaShowCount ? 'showCount\n  ' : ''}placeholder="Type feedback here..."
/>`}
          >
            <div className="max-w-md">
              <Textarea
                value={textareaVal}
                onChange={setTextareaVal}
                rows={3}
                maxLength={200}
                showCount={textareaShowCount}
                placeholder="Type feedback here..."
              />
            </div>
          </ComponentCard>

          <ComponentCard
            title="PasswordInput & SearchInput"
            id="password-search"
            description="Dedicated inputs with reveal/hide password toggle and search clear buttons."
            code={`<PasswordInput
  name="password"
  value={password}
  onChange={setPassword}
  size="${globalSize}"
  placeholder="Enter password"
  showToggle
/>

<SearchInput
  name="search"
  value={search}
  onChange={setSearch}
  size="${globalSize}"
  cleanable
  placeholder="Search catalog..."
/>`}
          >
            <div className="space-y-5 max-w-md">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1.5">Password</span>
                <PasswordInput name="password" value={passVal} onChange={setPassVal} size={globalSize} placeholder="Enter password" showToggle />
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1.5">Search</span>
                <SearchInput name="search" value={searchVal} onChange={setSearchVal} size={globalSize} cleanable placeholder="Search catalog..." />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="OtpInput"
            id="otp-input"
            description="Segmented security PIN code input with clipboard paste and auto-advance."
            controls={
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">length</span>
                  <button type="button" onClick={() => setOtpLength(4)} className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${otpLength === 4 ? 'bg-cc-primary text-cc-on-primary shadow-sm' : 'bg-black/5'}`}>4</button>
                  <button type="button" onClick={() => setOtpLength(6)} className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${otpLength === 6 ? 'bg-cc-primary text-cc-on-primary shadow-sm' : 'bg-black/5'}`}>6</button>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">type</span>
                  <select value={otpType} onChange={(e) => setOtpType(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="numeric">numeric</option>
                    <option value="alphanumeric">alphanumeric</option>
                  </select>
                </div>
              </>
            }
            code={`<OtpInput
  length={${otpLength}}
  type="${otpType}"
  value="${otpVal}"
  onChange={setOtpVal}
/>`}
          >
            <div className="space-y-3">
              <OtpInput length={otpLength} type={otpType} value={otpVal} onChange={setOtpVal} />
              <p className="text-[12px] text-slate-500">Entered Code: <strong className="font-mono text-cc-primary">{otpVal || '(empty)'}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="InputGroup"
            id="input-group"
            description="Connected group wrapper with prefix buttons, search addons, and uniform sizing."
            code={`<InputGroup size="${globalSize}">
  <InputGroup.Button onClick={() => alert('Search!')}>
    🔍
  </InputGroup.Button>
  <Input placeholder="Search records by ID..." />
</InputGroup>`}
          >
            <div className="max-w-md">
              <InputGroup size={globalSize}>
                <InputGroup.Button onClick={() => alert(`Searching: ${inputText}`)}>🔍</InputGroup.Button>
                <Input value={inputText} onChange={setInputText} placeholder="Search records..." />
              </InputGroup>
            </div>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 02 - Pickers */}
      <section id="section-pickers" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">02</span>
            Pickers & Selectors
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Rich searchable dropdown menus, category grouping, dynamic creation, multiselect chips, calendar date pickers, and time selectors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="SelectPicker"
            id="select-picker"
            description="Single-select dropdown with async search, grouping headers, and dynamic creation."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={selectGroupBy} onChange={(e) => setSelectGroupBy(e.target.checked)} className="rounded text-cc-primary" /> groupBy
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={selectCreatable} onChange={(e) => setSelectCreatable(e.target.checked)} className="rounded text-cc-primary" /> creatable
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={selectLoading} onChange={(e) => setSelectLoading(e.target.checked)} className="rounded text-cc-primary" /> loading
                </label>
              </>
            }
            code={`<SelectPicker
  name="framework"
  data={frameworkData}
  value="${selectVal}"
  onChange={setSelectVal}
  ${selectGroupBy ? 'groupBy="group"\n  ' : ''}${selectCreatable ? 'creatable\n  ' : ''}${selectLoading ? 'loading\n  ' : ''}size="${globalSize}"
  searchable
  cleanable
  placeholder="Select framework"
/>`}
          >
            <div className="space-y-3 max-w-md">
              <SelectPicker
                name="framework"
                data={frameworkData}
                value={selectVal}
                onChange={setSelectVal}
                groupBy={selectGroupBy ? 'group' : undefined}
                creatable={selectCreatable}
                loading={selectLoading}
                size={globalSize}
                searchable
                cleanable
                placeholder="Select framework..."
              />
              <p className="text-[12px] text-slate-500">Selected: <strong className="font-mono text-cc-primary">{selectVal || '(none)'}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="CheckPicker / TagPicker"
            id="check-picker"
            description="Multi-select dropdown with checkbox selection, tagDisplay chips, and grouping."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={checkTagDisplay} onChange={(e) => setCheckTagDisplay(e.target.checked)} className="rounded text-cc-primary" /> tagDisplay
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={checkGroupBy} onChange={(e) => setCheckGroupBy(e.target.checked)} className="rounded text-cc-primary" /> groupBy
                </label>
              </>
            }
            code={`<CheckPicker
  name="skills"
  data={skillsData}
  value={${JSON.stringify(checkVal)}}
  onChange={setCheckVal}
  ${checkTagDisplay ? 'tagDisplay\n  ' : ''}${checkGroupBy ? 'groupBy="group"\n  ' : ''}size="${globalSize}"
  searchable
  placeholder="Select skills..."
/>`}
          >
            <div className="space-y-3 max-w-md">
              <CheckPicker
                name="skills"
                data={skillsData}
                value={checkVal}
                onChange={setCheckVal}
                tagDisplay={checkTagDisplay}
                groupBy={checkGroupBy ? 'group' : undefined}
                size={globalSize}
                searchable
                placeholder="Select skills..."
              />
              <p className="text-[12px] text-slate-500">Selected ({checkVal.length}): <strong className="font-mono text-cc-primary">{checkVal.join(', ') || '(none)'}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="DatePicker"
            id="date-picker"
            description="Calendar popover supporting quick shortcuts presets, date disabling, and clean button."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={dateShortcuts} onChange={(e) => setDateShortcuts(e.target.checked)} className="rounded text-cc-primary" /> shortcuts
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={dateDisablePast} onChange={(e) => setDateDisablePast(e.target.checked)} className="rounded text-cc-primary" /> disable past
                </label>
              </>
            }
            code={`<DatePicker
  name="appointmentDate"
  value="${dateVal}"
  onChange={(formatted) => setDateVal(formatted)}
  size="${globalSize}"
  cleanable
  ${dateShortcuts ? 'shortcuts={dateShortcutsList}\n  ' : ''}${dateDisablePast ? 'disabledDate={(d) => d < new Date()}\n  ' : ''}placeholder="Select date..."
/>`}
          >
            <div className="space-y-3 max-w-md">
              <DatePicker
                name="appointmentDate"
                value={dateVal}
                onChange={(formatted) => setDateVal(formatted)}
                size={globalSize}
                cleanable
                shortcuts={dateShortcuts ? dateShortcutsList : undefined}
                disabledDate={dateDisablePast ? (d) => d < new Date(new Date().setHours(0, 0, 0, 0)) : undefined}
                placeholder="Select date..."
              />
              <p className="text-[12px] text-slate-500">Selected: <strong className="font-mono text-cc-primary">{dateVal || '(empty)'}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="DateRangePicker"
            id="date-range-picker"
            description="Start and End calendar range picker with quick presets and preview formatting."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={rangeShortcuts} onChange={(e) => setRangeShortcuts(e.target.checked)} className="rounded text-cc-primary" /> shortcuts
              </label>
            }
            code={`<DateRangePicker
  name="dateRange"
  value={rangeVal}
  onChange={setRangeVal}
  size="${globalSize}"
  ${rangeShortcuts ? 'shortcuts={rangeShortcutsList}\n  ' : ''}placeholder="Select date range..."
/>`}
          >
            <div className="space-y-3 max-w-md">
              <DateRangePicker
                name="dateRange"
                value={rangeVal}
                onChange={setRangeVal}
                size={globalSize}
                shortcuts={rangeShortcuts ? rangeShortcutsList : undefined}
                placeholder="Select date range..."
              />
              <p className="text-[12px] text-slate-500">
                Range:{' '}
                <strong className="font-mono text-cc-primary">
                  {rangeVal.length === 2
                    ? `${new Date(rangeVal[0]).toLocaleDateString()} – ${new Date(rangeVal[1]).toLocaleDateString()}`
                    : '(none)'}
                </strong>
              </p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="TimePicker"
            id="time-picker"
            description="Hour/minute picker supporting 12-hour AM/PM and 24-hour formats with presets."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={time12h} onChange={(e) => setTime12h(e.target.checked)} className="rounded text-cc-primary" /> 12-Hour
              </label>
            }
            code={`<TimePicker
  name="meetingTime"
  value="${timeVal}"
  onChange={(time24, details) => setTimeVal(time12h ? details.time12 : time24)}
  size="${globalSize}"
  is12h={${time12h}}
  cleanable
  placeholder="Select time..."
/>`}
          >
            <div className="space-y-3 max-w-md">
              <TimePicker
                name="meetingTime"
                value={timeVal}
                onChange={(time24, details) => setTimeVal(time12h ? details.time12 : time24)}
                size={globalSize}
                is12h={time12h}
                cleanable
                placeholder="Select time..."
              />
              <p className="text-[12px] text-slate-500">Time: <strong className="font-mono text-cc-primary">{timeVal || '(none)'}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Combobox / Autocomplete"
            id="combobox"
            description="Freeform text input that offers keyboard-navigable autocomplete suggestions."
            code={`<Combobox
  options={comboboxOptions}
  value="${comboVal}"
  onChange={setComboVal}
  allowCustomValue
  placeholder="Type a web framework..."
/>`}
          >
            <div className="space-y-3 max-w-md">
              <Combobox
                options={comboboxOptions}
                value={comboVal}
                onChange={setComboVal}
                allowCustomValue
                placeholder="Type a web framework..."
              />
              <p className="text-[12px] text-slate-500">Value: <strong className="font-mono text-cc-primary">{comboVal}</strong></p>
            </div>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 03 */}
      <section id="section-toggles" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">03</span>
            Toggles, Sliders & Ratings
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Interactive binary switches, checkboxes, radio button groups, gradient sliders, native color pickers, and star ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Toggle & Checkbox"
            id="toggle-checkbox"
            description="Animated state switches and native-friendly checkboxes with labels."
            code={`<Toggle
  name="notifications"
  checked={${toggleChecked}}
  onChange={setToggleChecked}
  checkedChildren="ON"
  unCheckedChildren="OFF"
  size="md"
/>

<Checkbox
  name="terms"
  checked={${checkboxChecked}}
  onChange={setCheckboxChecked}
>
  Agree to terms and conditions
</Checkbox>`}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Toggle name="notifications" checked={toggleChecked} onChange={setToggleChecked} checkedChildren="ON" unCheckedChildren="OFF" size="md" />
                <span className="text-sm font-medium text-slate-700">
                  Toggle: <strong className="text-cc-primary">{toggleChecked ? 'Enabled' : 'Disabled'}</strong>
                </span>
              </div>
              <Checkbox name="terms" checked={checkboxChecked} onChange={setCheckboxChecked}>
                Receive occasional product updates & newsletters
              </Checkbox>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Radio & RadioGroup"
            id="radio-group"
            description="Mutually exclusive single-choice options with horizontal or vertical flow."
            controls={
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">direction</span>
                <select value={radioDirection} onChange={(e) => setRadioDirection(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                  <option value="horizontal">horizontal</option>
                  <option value="vertical">vertical</option>
                </select>
              </div>
            }
            code={`<RadioGroup
  name="billingPlan"
  value="${radioVal}"
  onChange={setRadioVal}
  direction="${radioDirection}"
>
  <Radio value="starter">Starter ($9/mo)</Radio>
  <Radio value="pro">Pro ($29/mo)</Radio>
  <Radio value="enterprise">Enterprise</Radio>
</RadioGroup>`}
          >
            <div className="space-y-3">
              <RadioGroup name="billingPlan" value={radioVal} onChange={setRadioVal} direction={radioDirection}>
                <Radio value="starter">Starter Plan ($9/mo)</Radio>
                <Radio value="pro">Professional Plan ($29/mo)</Radio>
                <Radio value="enterprise">Enterprise Tier (Custom)</Radio>
              </RadioGroup>
              <p className="text-[12px] text-slate-500">Selected: <strong className="font-mono text-cc-primary">{radioVal}</strong></p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Slider & ColorPicker"
            id="slider-color"
            description="Horizontal range track with value readout and native color picker."
            code={`<Slider
  value={${sliderVal}}
  onChange={setSliderVal}
  min={0}
  max={100}
  step={5}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>

<ColorPicker
  value="${colorVal}"
  onChange={setColorVal}
  showValue
/>`}
          >
            <div className="space-y-6 max-w-md">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-2">Range Slider</span>
                <Slider value={sliderVal} onChange={setSliderVal} min={0} max={100} step={5} showValue formatValue={(v) => `${v}%`} />
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-2">Color Picker</span>
                <ColorPicker value={colorVal} onChange={setColorVal} showValue />
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Rate"
            id="rate"
            description="Star rating control with hover preview, half-star accuracy, and form compatibility."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={rateHalf} onChange={(e) => setRateHalf(e.target.checked)} className="rounded text-cc-primary" /> allowHalf
              </label>
            }
            code={`<Rate
  name="rating"
  value={${rateVal}}
  onChange={setRateVal}
  allowHalf={${rateHalf}}
  max={5}
  size="${globalSize}"
/>`}
          >
            <div className="space-y-3">
              <Rate name="rating" value={rateVal} onChange={setRateVal} allowHalf={rateHalf} max={5} size={globalSize} />
              <p className="text-[12px] text-slate-500">Score: <strong className="font-mono text-cc-primary">{rateVal}</strong> / 5.0</p>
            </div>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 04 */}
      <section id="section-actions" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">04</span>
            Buttons, Tabs & Navigation
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Versatile buttons, connected button groups, animated tabs with sliding indicators, pagination bars, and anchored dropdown menus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Button & ButtonGroup"
            id="buttons"
            description="Interactive action triggers with variant presets, loading spinners, and connected groups."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={buttonLoading} onChange={(e) => setButtonLoading(e.target.checked)} className="rounded text-cc-primary" /> loading
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">variant</span>
                  <select value={buttonVariant} onChange={(e) => setButtonVariant(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="outline">outline</option>
                    <option value="ghost">ghost</option>
                    <option value="danger">danger</option>
                  </select>
                </div>
              </>
            }
            code={`<Button variant="${buttonVariant}" size="${globalSize}" ${buttonLoading ? 'loading ' : ''}onClick={() => alert('Clicked!')}>
  Action Button
</Button>

<ButtonGroup variant="outline" size="${globalSize}">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>`}
          >
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2.5 items-center">
                <Button variant={buttonVariant} size={globalSize} loading={buttonLoading} onClick={() => success('Button clicked successfully!')}>
                  {buttonLoading ? 'Saving Data...' : 'Click Me'}
                </Button>
                <Button variant="secondary" size={globalSize}>Secondary</Button>
                <Button variant="outline" size={globalSize}>Outline</Button>
                <Button variant="danger" size={globalSize}>Danger</Button>
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-2">Connected ButtonGroup</span>
                <ButtonGroup variant="outline" size={globalSize}>
                  <Button>Daily</Button>
                  <Button>Weekly</Button>
                  <Button>Monthly</Button>
                  <Button>Yearly</Button>
                </ButtonGroup>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Tabs"
            id="tabs"
            description="Sliding indicator tabbed view with line, pill, or segmented styles and badge counts."
            controls={
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">variant</span>
                <select value={tabsVariant} onChange={(e) => setTabsVariant(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                  <option value="line">line</option>
                  <option value="pill">pill</option>
                  <option value="segmented">segmented</option>
                </select>
              </div>
            }
            code={`<Tabs value="${activeTab}" onChange={setActiveTab} variant="${tabsVariant}" size="${globalSize}">
  <Tabs.List>
    <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
    <Tabs.Tab value="orders" badge="14">Orders</Tabs.Tab>
    <Tabs.Tab value="customers">Customers</Tabs.Tab>
    <Tabs.Tab value="settings" disabled>Settings</Tabs.Tab>
  </Tabs.List>
  ...
</Tabs>`}
          >
            <Tabs value={activeTab} onChange={setActiveTab} variant={tabsVariant} size={globalSize}>
              <Tabs.List>
                <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
                <Tabs.Tab value="orders" badge="14">Orders</Tabs.Tab>
                <Tabs.Tab value="customers">Customers</Tabs.Tab>
                <Tabs.Tab value="settings" disabled>Settings</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="analytics">
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-[13px] text-slate-600 mt-3">📊 Real-time visitor analytics, conversion rates, and performance charts.</div>
              </Tabs.Panel>
              <Tabs.Panel value="orders">
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-[13px] text-slate-600 mt-3">📦 14 pending orders awaiting processing and dispatch.</div>
              </Tabs.Panel>
              <Tabs.Panel value="customers">
                <div className="rounded-2xl border border-dashed border-black/10 p-4 text-[13px] text-slate-600 mt-3">👥 Customer accounts, tiers, and loyalty programs.</div>
              </Tabs.Panel>
            </Tabs>
          </ComponentCard>

          <ComponentCard
            title="Pagination"
            id="pagination"
            description="Page navigation with page buttons, ellipsis truncation, total count, and page size select."
            code={`<Pagination
  total={250}
  page={${currentPage}}
  onChangePage={setCurrentPage}
  pageSize={${pageSize}}
  onChangePageSize={setPageSize}
  pageSizeOptions={[10, 20, 50, 100]}
  showTotal
  showPageSize
  size="${globalSize}"
/>`}
          >
            <div className="space-y-3">
              <Pagination
                total={250}
                page={currentPage}
                onChangePage={setCurrentPage}
                pageSize={pageSize}
                onChangePageSize={setPageSize}
                pageSizeOptions={[10, 20, 50, 100]}
                showTotal
                showPageSize
                size={globalSize}
              />
              <p className="text-[12px] text-slate-500">Page <strong className="text-cc-primary">{currentPage}</strong> of 25 (size: {pageSize})</p>
            </div>
          </ComponentCard>

          <ComponentCard
            title="DropdownMenu"
            id="dropdown-menu"
            description="Anchored floating context menu with headers, item icons, separators, and destructive actions."
            controls={
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">placement</span>
                <select value={dropdownPlacement} onChange={(e) => setDropdownPlacement(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                  <option value="bottom-start">bottom-start</option>
                  <option value="bottom-end">bottom-end</option>
                  <option value="top-start">top-start</option>
                  <option value="top-end">top-end</option>
                </select>
              </div>
            }
            code={`<DropdownMenu
  trigger={<Button variant="outline" size="${globalSize}">Actions ▾</Button>}
  placement="${dropdownPlacement}"
>
  <DropdownMenu.Header>User Actions</DropdownMenu.Header>
  <DropdownMenu.Item onClick={() => alert('Profile')}>Profile & Account</DropdownMenu.Item>
  <DropdownMenu.Item onClick={() => alert('Billing')}>Billing & Invoices</DropdownMenu.Item>
  <DropdownMenu.Separator />
  <DropdownMenu.Item danger onClick={() => alert('Logout')}>Log Out</DropdownMenu.Item>
</DropdownMenu>`}
          >
            <DropdownMenu
              trigger={<Button variant="outline" size={globalSize}>Manage Account ▾</Button>}
              placement={dropdownPlacement}
            >
              <DropdownMenu.Header>Account Menu</DropdownMenu.Header>
              <DropdownMenu.Item onClick={() => info('Navigating to profile...')}>👤 User Profile</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => info('Opening security settings...')}>🔑 Security & Keys</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item danger onClick={() => error('Signing out session')}>🚪 Sign Out</DropdownMenu.Item>
            </DropdownMenu>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 05 */}
      <section id="section-overlays" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">05</span>
            Modals, Drawers & Tooltips
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Portalled overlays with spring physics, backdrop blurring, body scroll lock, Escape dismissal, and tooltip triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Modal"
            id="modal"
            description="Accessible centered dialog modal with backdrop blur, size presets, and body scroll locking."
            controls={
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">size</span>
                <select value={modalSize} onChange={(e) => setModalSize(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                </select>
              </div>
            }
            code={`<Modal open={${modalOpen}} onClose={() => setModalOpen(false)} size="${modalSize}" closeOnEsc closeOnBackdropClick>
  <Modal.Header>
    <Modal.Title>Edit Profile Information</Modal.Title>
  </Modal.Header>
  <Modal.Body>...</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>`}
          >
            <Button variant="primary" size={globalSize} onClick={() => setModalOpen(true)}>
              Launch Modal Dialog
            </Button>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} size={modalSize} closeOnEsc closeOnBackdropClick>
              <Modal.Header>
                <Modal.Title>Edit Profile Information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">Update your account display information below.</p>
                  <Input defaultValue="Rahil Patel" placeholder="Display name" />
                  <Input defaultValue="rahil@example.com" placeholder="Email address" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalOpen(false)
                    success('Profile updated successfully!')
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </ComponentCard>

          <ComponentCard
            title="Drawer"
            id="drawer"
            description="Slide-over sheet panel anchoring from screen edges with smooth spring animations."
            controls={
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">placement</span>
                  <select value={drawerPlacement} onChange={(e) => setDrawerPlacement(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="right">right</option>
                    <option value="left">left</option>
                    <option value="top">top</option>
                    <option value="bottom">bottom</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">size</span>
                  <select value={drawerSize} onChange={(e) => setDrawerSize(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="sm">sm</option>
                    <option value="md">md</option>
                    <option value="lg">lg</option>
                    <option value="full">full</option>
                  </select>
                </div>
              </>
            }
            code={`<Drawer
  open={${drawerOpen}}
  onClose={() => setDrawerOpen(false)}
  placement="${drawerPlacement}"
  size="${drawerSize}"
  closeOnEsc
  closeOnBackdropClick
>
  ...
</Drawer>`}
          >
            <Button variant="outline" size={globalSize} onClick={() => setDrawerOpen(true)}>
              Open Drawer ({drawerPlacement})
            </Button>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} placement={drawerPlacement} size={drawerSize} closeOnEsc closeOnBackdropClick>
              <Drawer.Header>
                <Drawer.Title>Workspace Activity Sheet</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>Recent audit logs and team events:</p>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-black/8 p-3 text-[13px]">🚀 <strong>v1.2.0 released</strong> with 10 new components.</div>
                    <div className="rounded-xl border border-black/8 p-3 text-[13px]">🔑 API Key rotated by <strong>Rahil</strong> 2 hours ago.</div>
                  </div>
                </div>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="ghost" onClick={() => setDrawerOpen(false)}>Dismiss</Button>
                <Button variant="primary" onClick={() => setDrawerOpen(false)}>Mark All as Read</Button>
              </Drawer.Footer>
            </Drawer>
          </ComponentCard>

          <ComponentCard
            title="Tooltip & Whisper"
            id="tooltip"
            description="Hover and focus floating popovers with placement anchors and offset padding."
            controls={
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">placement</span>
                <select value={tooltipPlacement} onChange={(e) => setTooltipPlacement(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                  <option value="top">top</option>
                  <option value="bottom">bottom</option>
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </div>
            }
            code={`<Tooltip content="Saved to cloud" placement="${tooltipPlacement}">
  <Button variant="secondary">Hover Me</Button>
</Tooltip>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip content="Instant tooltip information popover" placement={tooltipPlacement}>
                <Button variant="secondary" size={globalSize}>Hover Tooltip ({tooltipPlacement})</Button>
              </Tooltip>
              <Whisper speaker={<span>React Suite alias speaker</span>} placement={tooltipPlacement}>
                <Button variant="outline" size={globalSize}>Whisper Button</Button>
              </Whisper>
            </div>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 06 */}
      <section id="section-display" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">06</span>
            Data Display & Badges
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Notification count badges, dismissible tag chips, user avatars with initials fallback, collapsible accordions, and divider rules.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Badge"
            id="badge"
            description="Notification badge with count, overflow cap, dot mode, and status colors."
            controls={
              <>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={badgeDot} onChange={(e) => setBadgeDot(e.target.checked)} className="rounded text-cc-primary" /> dot
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">count</span>
                  <input type="number" value={badgeCount} onChange={(e) => setBadgeCount(Number(e.target.value))} className="w-14 rounded-xl border border-black/10 bg-white/80 px-2 py-1 text-xs" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">color</span>
                  <select value={badgeColor} onChange={(e) => setBadgeColor(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="error">error</option>
                    <option value="primary">primary</option>
                    <option value="success">success</option>
                    <option value="warning">warning</option>
                    <option value="info">info</option>
                  </select>
                </div>
              </>
            }
            code={`<Badge count={${badgeCount}} max={99} dot={${badgeDot}} color="${badgeColor}">
  <Button variant="outline">Inbox</Button>
</Badge>`}
          >
            <div className="flex flex-wrap items-center gap-6">
              <Badge count={badgeCount} max={99} dot={badgeDot} color={badgeColor}>
                <Button variant="outline" size={globalSize}>Inbox Notifications</Button>
              </Badge>
              <Badge count={142} max={99} color="primary">
                <Button variant="secondary" size={globalSize}>Overflow 99+</Button>
              </Badge>
              <Badge dot color="success">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-xs">AI</div>
              </Badge>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Tag & Chip"
            id="tag-chip"
            description="Label tags and chips with solid/subtle/outline variants and removable dismiss triggers."
            controls={
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">variant</span>
                  <select value={tagVariant} onChange={(e) => setTagVariant(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="subtle">subtle</option>
                    <option value="solid">solid</option>
                    <option value="outline">outline</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">color</span>
                  <select value={tagColor} onChange={(e) => setTagColor(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="primary">primary</option>
                    <option value="success">success</option>
                    <option value="warning">warning</option>
                    <option value="error">error</option>
                    <option value="info">info</option>
                    <option value="neutral">neutral</option>
                  </select>
                </div>
              </>
            }
            code={`<Tag variant="${tagVariant}" color="${tagColor}" size="${globalSize}">
  Feature Tag
</Tag>`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <Tag variant={tagVariant} color={tagColor} size={globalSize}>{tagColor.toUpperCase()}</Tag>
              <Tag variant={tagVariant} color="success" size={globalSize}>Verified</Tag>
              <Tag variant={tagVariant} color="warning" size={globalSize}>Pending Review</Tag>
              <Tag variant={tagVariant} color="error" size={globalSize} closable onClose={() => info('Dismissed tag')}>Dismissible Chip</Tag>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Avatar & AvatarGroup"
            id="avatar"
            description="User avatar with initials fallback, presence dot, and stacked group with overflow."
            controls={
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">shape</span>
                  <select value={avatarShape} onChange={(e) => setAvatarShape(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="circle">circle</option>
                    <option value="square">square</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">status</span>
                  <select value={avatarStatus} onChange={(e) => setAvatarStatus(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="online">online</option>
                    <option value="busy">busy</option>
                    <option value="away">away</option>
                    <option value="offline">offline</option>
                  </select>
                </div>
              </>
            }
            code={`<Avatar name="Rahil Patel" shape="${avatarShape}" status="${avatarStatus}" size="md" />

<AvatarGroup max={3} size="md">
  <Avatar name="Alex Morgan" />
  ...
</AvatarGroup>`}
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar name="Rahil Patel" shape={avatarShape} status={avatarStatus} size="md" />
                <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="User" shape={avatarShape} status={avatarStatus} size="md" />
                <Avatar name="Sarah Connor" shape={avatarShape} size="lg" />
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-2.5">Stacked Avatar Group</span>
                <AvatarGroup max={3} size="md" shape={avatarShape}>
                  <Avatar name="Alex Morgan" />
                  <Avatar name="David Beckham" />
                  <Avatar name="Lionel Messi" />
                  <Avatar name="Cristiano Ronaldo" />
                  <Avatar name="Kylian Mbappe" />
                </AvatarGroup>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Accordion"
            id="accordion"
            description="Collapsible disclosure sections with animated height transitions and rotating chevrons."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={accordionMultiple} onChange={(e) => setAccordionMultiple(e.target.checked)} className="rounded text-cc-primary" /> multiple
              </label>
            }
            code={`<Accordion defaultActiveKey="1" multiple={${accordionMultiple}}>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Why choose @rahilp010/custom-control?</Accordion.Header>
    <Accordion.Body>...</Accordion.Body>
  </Accordion.Item>
  ...
</Accordion>`}
          >
            <Accordion defaultActiveKey="1" multiple={accordionMultiple}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Why choose @rahilp010/custom-control?</Accordion.Header>
                <Accordion.Body>
                  It bundles 40+ production-ready form controls and UI components under ~29 kB gzipped with zero destructive CSS resets, full TypeScript autocomplete, and Framer Motion micro-interactions.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Is it compatible with Next.js App Router and Server Actions?</Accordion.Header>
                <Accordion.Body>
                  Yes! All inputs and pickers support the `name` prop with hidden input serialization, enabling effortless native FormData extraction.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ComponentCard>

          <ComponentCard
            title="Divider"
            id="divider"
            description="Horizontal or vertical content separators with aligned title labels and dashed styles."
            controls={
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">align</span>
                  <select value={dividerAlign} onChange={(e) => setDividerAlign(e.target.value)} className="rounded-xl border border-black/10 bg-white/80 px-2.5 py-1 text-xs">
                    <option value="center">center</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={dividerDashed} onChange={(e) => setDividerDashed(e.target.checked)} className="rounded text-cc-primary" /> dashed
                </label>
              </>
            }
            code={`<Divider align="${dividerAlign}" dashed={${dividerDashed}}>
  OR CONTINUE WITH
</Divider>`}
          >
            <div className="space-y-4">
              <p className="text-[13px] text-slate-500">Sign in with username and password</p>
              <Divider align={dividerAlign} dashed={dividerDashed}>OR SIGN IN WITH</Divider>
              <p className="text-[13px] text-slate-500">Single Sign-On (Google / GitHub)</p>
            </div>
          </ComponentCard>
        </div>
      </section>

      {/* SECTION 07 */}
      <section id="section-feedback" className="space-y-6">
        <div className="pb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-slate-900 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cc-primary text-cc-on-primary text-sm font-bold shadow-lg shadow-cc-primary/25">07</span>
            Feedback, Toasts & Forms
          </h2>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-2xl">
            Toast notifications with Promise tracking and actions, banners, progress indicators, skeleton placeholders, and drag-and-drop file uploaders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard
            title="Toast (useToast)"
            id="toast"
            description="Notification system supporting action buttons and automatic Promise lifecycle tracking."
            code={`const { success, error, promise } = useToast()

promise(fetch('/api/sync'), {
  loading: 'Syncing...',
  success: 'Synced successfully!',
  error: 'Sync failed'
})`}
          >
            <div className="flex flex-wrap gap-2.5">
              <Button variant="primary" size={globalSize} onClick={handleSimulatePromise}>Trigger toast.promise()</Button>
              <Button variant="outline" size={globalSize} onClick={() => success('Order #9482 confirmed!', { action: { label: 'Track Order', onClick: () => alert('Tracking opened!') } })}>
                Toast with Action
              </Button>
              <Button variant="danger" size={globalSize} onClick={() => error('Database connection timed out.')}>Error Toast</Button>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Alert"
            id="alert"
            description="Inline contextual banner with title, description, and dismiss action."
            code={`<Alert variant="success" title="Deployment Successful!" dismissible>
  Version 1.2.0 has been deployed to the global edge network.
</Alert>`}
          >
            <div className="space-y-3">
              <Alert variant="success" title="Deployment Complete" dismissible>
                Custom controls v1.2.0 is live with zero regression errors.
              </Alert>
              <Alert variant="warning" title="Warning Threshold" dismissible>
                Your cloud database quota has reached 85% capacity.
              </Alert>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Progress & Skeleton"
            id="progress-skeleton"
            description="Visual loading bars and shimmer skeleton placeholders."
            controls={
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={progressIndeterminate} onChange={(e) => setProgressIndeterminate(e.target.checked)} className="rounded text-cc-primary" /> indeterminate
              </label>
            }
            code={`<Progress
  value={${progressVal}}
  max={100}
  label="Processing..."
  showValue
  size="${globalSize}"
/>

<Skeleton width="100%" height={20} />
<Skeleton circle width={40} height={40} />`}
          >
            <div className="space-y-5 max-w-md">
              <Progress
                value={progressIndeterminate ? undefined : progressVal}
                max={100}
                label="Uploading media assets"
                showValue={!progressIndeterminate}
                size={globalSize}
              />
              <div className="flex items-center gap-3 pt-1">
                <Skeleton circle width={40} height={40} />
                <div className="space-y-2 flex-1">
                  <Skeleton width="70%" height={14} />
                  <Skeleton width="45%" height={12} />
                </div>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="FormField & Label"
            id="form-field"
            description="Structured layout wrapper binding label, required indicator, input, and validation error."
            code={`<FormField
  label="Organization Email"
  description="We will send invoice receipts here."
  error="Please enter a valid work email."
  required
>
  <Input defaultValue="invalid-email" size="${globalSize}" />
</FormField>`}
          >
            <div className="max-w-md">
              <FormField
                label="Organization Email"
                description="We will send monthly billing invoices to this address."
                error="Please enter a valid business email."
                required
              >
                <Input defaultValue="contact@" size={globalSize} />
              </FormField>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Uploader"
            id="uploader"
            description="Drag and drop file upload dropzone with drop event handling."
            code={`<Uploader onChange={(files) => console.log('Uploaded:', files)}>
  <div className="p-6 text-center">
    <p>Drag files here, or click to browse</p>
  </div>
</Uploader>`}
          >
            <div className="max-w-md">
              <Uploader onChange={(files) => info(`Added ${files.length} file(s)`)}>
                <div className="rounded-2xl border-2 border-dashed border-black/15 p-6 text-center hover:border-cc-primary/50 transition-colors cursor-pointer bg-white/40">
                  <p className="text-2xl mb-1.5">📁</p>
                  <p className="text-[13px] font-medium text-slate-700">Click to upload or drag files here</p>
                  <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              </Uploader>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Animation"
            id="animation"
            description="Smooth transition helpers including Animation.Collapse, Fade, and Bounce."
            controls={
              <button type="button" onClick={() => setAnimOpen((v) => !v)} className="px-3 py-1.5 rounded-2xl bg-cc-primary text-cc-on-primary text-xs font-semibold shadow-sm transition-all">
                {animOpen ? 'Collapse' : 'Expand'}
              </button>
            }
            code={`<Animation.Collapse in={${animOpen}}>
  <div className="p-4 rounded-xl bg-cc-overlay/10">
    Smooth collapsible accordion panel
  </div>
</Animation.Collapse>`}
          >
            <div className="max-w-md">
              <Animation.Collapse in={animOpen}>
                <div className="rounded-2xl border border-black/8 bg-white/50 p-4 text-[13px] font-medium text-slate-700">
                  🎉 Animation.Collapse dynamically measures content height and renders spring expansion/collapse without manual px heights!
                </div>
              </Animation.Collapse>
            </div>
          </ComponentCard>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [globalSize, setGlobalSize] = useState('md')

  // Force light theme on the document (prevents navy from dark mode)
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
  }, [])

  const navItems = [
    { id: 'section-inputs', label: 'Inputs & Numbers', count: 6 },
    { id: 'section-pickers', label: 'Pickers & Selectors', count: 6 },
    { id: 'section-toggles', label: 'Toggles & Ratings', count: 4 },
    { id: 'section-actions', label: 'Buttons & Tabs', count: 4 },
    { id: 'section-overlays', label: 'Modals & Drawers', count: 3 },
    { id: 'section-display', label: 'Badges & Avatars', count: 5 },
    { id: 'section-feedback', label: 'Toasts & Forms', count: 6 }
  ]

  return (
    <CustomControlsProvider theme="light" colors={{ primary: accentColor }}>
      <ToastProvider position="top-right" duration={3500}>
        {/* Soft gradient background so glass can refract */}
        <div
          className="min-h-screen font-sans antialiased text-slate-900"
          style={{
            background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 40%, #eef2ff 70%, #f8fafc 100%)',
            fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
          }}
        >
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cc-primary text-sm font-bold text-cc-on-primary shadow-sm">
                  CC
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-[15px]">
                      @rahilp010/custom-control
                    </h1>
                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      v1.2.0
                    </span>
                  </div>
                  <p className="mt-0.5 hidden text-[11px] tracking-wide text-slate-500 sm:block">
                    Interactive component playground
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2.5 lg:justify-end">
                <div role="group" aria-label="Default control size" className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <span className="px-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Size</span>
                  {['sm', 'md', 'lg'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setGlobalSize(sz)}
                      aria-pressed={globalSize === sz}
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-primary/40 ${globalSize === sz
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:bg-white/70 hover:text-slate-800'
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <div role="group" aria-label="Accent color" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Accent</span>
                  <div className="flex items-center gap-1.5">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => setAccentColor(p.hex)}
                        aria-label={`Set accent color to ${p.name}`}
                        aria-pressed={accentColor === p.hex}
                        className={`h-4 w-4 rounded-full transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 ${accentColor === p.hex ? 'ring-2 ring-offset-1 ring-slate-500/50' : ''
                          }`}
                        style={{ backgroundColor: p.hex }}
                      />
                    ))}
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      aria-label="Choose a custom accent color"
                      className="h-5 w-5 cursor-pointer rounded-full border border-slate-200 bg-transparent p-0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://www.npmjs.com/package/@rahilp010/custom-control"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cc-primary/40"
                  >
                    npm
                  </a>
                  <a
                    href="https://github.com/rahilp010/custom-control"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Glass sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-5 rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Component Sections
                    </h3>
                    <p className="mt-1 text-[12px] text-slate-500 leading-relaxed">
                      Jump to any category
                    </p>
                  </div>

                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-white/80 transition-all duration-200"
                      >
                        <span>{item.label}</span>
                        <span className="rounded-lg bg-black/[0.04] px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                          {item.count}
                        </span>
                      </a>
                    ))}
                  </nav>

                  <div className="border-t border-black/[0.05] pt-4">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                      Active Settings
                    </h4>
                    <div className="space-y-1.5 text-[12px] text-slate-600 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Theme</span>
                        <strong className="text-cc-primary font-semibold">light</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Accent</span>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: accentColor }} />
                          <strong className="text-cc-primary font-semibold">{accentColor}</strong>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Size</span>
                        <strong className="text-cc-primary font-semibold uppercase">{globalSize}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              <main className="lg:col-span-3">
                <DemoContent globalSize={globalSize} />
              </main>
            </div>
          </div>

          <footer className="mt-24 border-t border-black/[0.05] bg-white/90 py-10 text-center text-[12px] text-slate-500">
            <p>
              Released under the <strong className="font-medium text-slate-700">MIT License</strong>. Built with React, Tailwind CSS, and Framer Motion.
            </p>
            <p className="mt-1.5">
              Package:{' '}
              <a href="https://www.npmjs.com/package/@rahilp010/custom-control" className="text-cc-primary font-medium hover:underline">
                @rahilp010/custom-control
              </a>{' '}
              • Author:{' '}
              <a href="https://github.com/rahilp010" className="hover:underline">
                Rahil Patel
              </a>
            </p>
          </footer>
        </div>
      </ToastProvider>
    </CustomControlsProvider>
  )
}