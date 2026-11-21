import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as lib from '../dist/index.js'

const el = React.createElement

// Catch any React warnings/errors
const warnings = []
const originalError = console.error
const originalWarn = console.warn
console.error = (...args) => {
    warnings.push({ type: 'error', text: args.join(' ') })
    originalError(...args)
}
console.warn = (...args) => {
    warnings.push({ type: 'warn', text: args.join(' ') })
    originalWarn(...args)
}

const results = []

function testCase(componentName, caseName, fn) {
    try {
        const initialCount = warnings.length
        fn()
        const newWarnings = warnings.slice(initialCount)
        results.push({
            component: componentName,
            test: caseName,
            status: newWarnings.length === 0 ? 'PASS' : 'WARN',
            warnings: newWarnings.map((w) => w.text)
        })
    } catch (err) {
        results.push({
            component: componentName,
            test: caseName,
            status: 'FAIL',
            error: err.message,
            stack: err.stack
        })
    }
}

// 1. INPUT
testCase('Input', 'Default / Uncontrolled with name & defaultValue', () => {
    renderToStaticMarkup(el(lib.Input, { name: 'username', defaultValue: 'defaultUser', size: 'sm', clearable: true }))
})
testCase('Input', 'Controlled with prefix & suffix', () => {
    renderToStaticMarkup(el(lib.Input, { value: 'test', size: 'lg', prefix: el('span', null, '$'), suffix: el('span', null, '.00') }))
})
testCase('Input', 'Null/undefined value edge case', () => {
    renderToStaticMarkup(el(lib.Input, { value: null }))
    renderToStaticMarkup(el(lib.Input, { value: undefined }))
})

// 2. INPUT NUMBER
testCase('InputNumber', 'Default / Uncontrolled with name', () => {
    renderToStaticMarkup(el(lib.InputNumber, { name: 'age', defaultValue: 25, size: 'sm', min: 0, max: 100, step: 5 }))
})
testCase('InputNumber', 'Controlled with prefix & formatter', () => {
    renderToStaticMarkup(el(lib.InputNumber, { value: 50, prefix: '$', formatter: (v) => `${v}.00` }))
})
testCase('InputNumber', 'Empty / Null value', () => {
    renderToStaticMarkup(el(lib.InputNumber, { value: '' }))
    renderToStaticMarkup(el(lib.InputNumber, { value: null }))
})

// 3. INPUT GROUP
testCase('InputGroup', 'Children with Button addon & size', () => {
    renderToStaticMarkup(el(lib.InputGroup, { size: 'lg' },
        el(lib.InputGroup.Button, null, 'Go'),
        el(lib.Input, { placeholder: 'Search...' })
    ))
})

// 4. TEXTAREA
testCase('Textarea', 'showCount with maxLength & defaultValue', () => {
    renderToStaticMarkup(el(lib.Textarea, { defaultValue: 'hello', showCount: true, maxLength: 100, rows: 5 }))
})

// 5. PASSWORD INPUT
testCase('PasswordInput', 'Controlled & Uncontrolled with size & name', () => {
    renderToStaticMarkup(el(lib.PasswordInput, { name: 'pass', defaultValue: 'secret', size: 'sm', showToggle: true }))
    renderToStaticMarkup(el(lib.PasswordInput, { value: 'pass123', size: 'lg' }))
})

// 6. SEARCH INPUT
testCase('SearchInput', 'Controlled & cleanable with size & name', () => {
    renderToStaticMarkup(el(lib.SearchInput, { name: 'query', defaultValue: 'keyword', size: 'md', cleanable: true }))
    renderToStaticMarkup(el(lib.SearchInput, { value: 'active', size: 'lg' }))
})

// 7. OTP INPUT
testCase('OtpInput', 'Default & 6-digit alphanumeric', () => {
    renderToStaticMarkup(el(lib.OtpInput, { length: 6, defaultValue: '123456', type: 'alphanumeric' }))
})

// 8. SELECT PICKER
testCase('SelectPicker', 'Grouped, creatable, loading, size, and name', () => {
    const data = [
        { label: 'React', value: 'react', group: 'Frontend' },
        { label: 'Node', value: 'node', group: 'Backend' }
    ]
    renderToStaticMarkup(el(lib.SelectPicker, {
        name: 'tech',
        data,
        defaultValue: 'react',
        groupBy: 'group',
        creatable: true,
        loading: true,
        size: 'sm'
    }))
})
testCase('SelectPicker', 'Empty data / null value edge case', () => {
    renderToStaticMarkup(el(lib.SelectPicker, { data: [], value: null }))
    renderToStaticMarkup(el(lib.SelectPicker, { data: null, value: undefined }))
})

// 9. CHECK PICKER / TAG PICKER
testCase('CheckPicker', 'Multi-select with tagDisplay, groupBy, size & name', () => {
    const data = [
        { label: 'JS', value: 'js', group: 'Web' },
        { label: 'Py', value: 'py', group: 'Data' }
    ]
    renderToStaticMarkup(el(lib.CheckPicker, {
        name: 'skills',
        data,
        defaultValue: ['js'],
        tagDisplay: true,
        groupBy: 'group',
        size: 'lg'
    }))
    renderToStaticMarkup(el(lib.TagPicker, { data, value: ['py'] }))
})
testCase('CheckPicker', 'Empty data / null value edge case', () => {
    renderToStaticMarkup(el(lib.CheckPicker, { data: [], value: [] }))
    renderToStaticMarkup(el(lib.CheckPicker, { data: null, value: null }))
})

// 10. COMBOBOX & AUTOCOMPLETE
testCase('Combobox', 'Options list, defaultValue, allowCustomValue', () => {
    renderToStaticMarkup(el(lib.Combobox, { options: ['Apple', 'Banana'], defaultValue: 'Apple', allowCustomValue: true }))
    renderToStaticMarkup(el(lib.Autocomplete, { options: ['NYC', 'London'], value: 'NYC' }))
})

// 11. DATE PICKER
testCase('DatePicker', 'Shortcuts, disabledDate, format, size & name', () => {
    renderToStaticMarkup(el(lib.DatePicker, {
        name: 'dob',
        defaultValue: '2026-05-15',
        shortcuts: [{ label: 'Today', value: new Date() }],
        disabledDate: (d) => d > new Date(),
        size: 'md',
        cleanable: true
    }))
})
testCase('DatePicker', 'Null / invalid date string edge cases', () => {
    renderToStaticMarkup(el(lib.DatePicker, { value: null }))
    renderToStaticMarkup(el(lib.DatePicker, { value: '' }))
    renderToStaticMarkup(el(lib.DatePicker, { value: 'invalid-date' }))
})

// 12. DATE RANGE PICKER
testCase('DateRangePicker', 'Shortcuts, disabledDate, size & name', () => {
    renderToStaticMarkup(el(lib.DateRangePicker, {
        name: 'range',
        defaultValue: ['2026-01-01', '2026-01-10'],
        shortcuts: [{ label: 'Week', value: [new Date(), new Date()] }],
        size: 'lg'
    }))
})
testCase('DateRangePicker', 'Empty array / null range edge cases', () => {
    renderToStaticMarkup(el(lib.DateRangePicker, { value: [] }))
    renderToStaticMarkup(el(lib.DateRangePicker, { value: null }))
})

// 13. TIME PICKER
testCase('TimePicker', '12h and 24h with size, defaultValue & name', () => {
    renderToStaticMarkup(el(lib.TimePicker, { name: 'time', defaultValue: '09:30 AM', is12h: true, size: 'sm', cleanable: true }))
    renderToStaticMarkup(el(lib.TimePicker, { value: '14:30', is12h: false, size: 'lg' }))
})
testCase('TimePicker', 'Null / empty string edge case', () => {
    renderToStaticMarkup(el(lib.TimePicker, { value: '' }))
    renderToStaticMarkup(el(lib.TimePicker, { value: null }))
})

// 14. TOGGLE
testCase('Toggle', 'Controlled, defaultChecked, size & name', () => {
    renderToStaticMarkup(el(lib.Toggle, { name: 'notify', defaultChecked: true, size: 'lg', checkedChildren: 'ON', unCheckedChildren: 'OFF' }))
    renderToStaticMarkup(el(lib.Toggle, { checked: false, size: 'md' }))
})

// 15. CHECKBOX
testCase('Checkbox', 'Controlled, defaultChecked & name', () => {
    renderToStaticMarkup(el(lib.Checkbox, { name: 'agree', defaultChecked: true }, 'I agree'))
    renderToStaticMarkup(el(lib.Checkbox, { checked: false }, 'Label'))
})

// 16. RADIO & RADIO GROUP
testCase('RadioGroup', 'Vertical & horizontal with name & value', () => {
    renderToStaticMarkup(el(lib.RadioGroup, { name: 'plan', value: 'pro', direction: 'horizontal' },
        el(lib.Radio, { value: 'free' }, 'Free'),
        el(lib.Radio, { value: 'pro' }, 'Pro')
    ))
})

// 17. SLIDER
testCase('Slider', 'Bounds, step, defaultValue, formatValue', () => {
    renderToStaticMarkup(el(lib.Slider, { defaultValue: 40, min: 0, max: 100, step: 10, showValue: true, formatValue: (v) => `${v}%` }))
})

// 18. COLOR PICKER
testCase('ColorPicker', 'Controlled and defaultValue', () => {
    renderToStaticMarkup(el(lib.ColorPicker, { defaultValue: '#ff0000', showValue: true }))
    renderToStaticMarkup(el(lib.ColorPicker, { value: '#00ff00' }))
})

// 19. BUTTON & BUTTON GROUP
testCase('Button', 'Variants, sizes, loading state', () => {
    renderToStaticMarkup(el(lib.Button, { variant: 'primary', size: 'sm', loading: true }, 'Submit'))
    renderToStaticMarkup(el(lib.Button, { variant: 'danger', size: 'lg', disabled: true }, 'Delete'))
})
testCase('ButtonGroup', 'Variants, sizes, orientation', () => {
    renderToStaticMarkup(el(lib.ButtonGroup, { variant: 'outline', size: 'md', orientation: 'vertical' },
        el(lib.Button, null, 'A'),
        el(lib.Button, null, 'B')
    ))
})

// 20. MODAL
testCase('Modal', 'Sizes, subcomponents, closeOnEsc, closeOnBackdropClick, bodyLock', () => {
    renderToStaticMarkup(el(lib.Modal, { open: true, size: 'lg', closeOnEsc: true, closeOnBackdropClick: true, bodyLock: true },
        el(lib.Modal.Header, null, el(lib.Modal.Title, null, 'Title')),
        el(lib.Modal.Body, null, 'Content'),
        el(lib.Modal.Footer, null, el(lib.Button, null, 'Close'))
    ))
})

// 21. DRAWER
testCase('Drawer', 'Placements, sizes, subcomponents', () => {
    renderToStaticMarkup(el(lib.Drawer, { open: true, placement: 'right', size: 'md', closeOnEsc: true },
        el(lib.Drawer.Header, null, el(lib.Drawer.Title, null, 'Drawer Title')),
        el(lib.Drawer.Body, null, 'Drawer Body'),
        el(lib.Drawer.Footer, null, 'Footer')
    ))
})

// 22. TABS
testCase('Tabs', 'Variants (line, pill, segmented), tab badges, panels', () => {
    renderToStaticMarkup(el(lib.Tabs, { defaultValue: 'tab1', variant: 'segmented', size: 'sm' },
        el(lib.Tabs.List, null,
            el(lib.Tabs.Tab, { value: 'tab1', badge: 3 }, 'Tab 1'),
            el(lib.Tabs.Tab, { value: 'tab2', disabled: true }, 'Tab 2')
        ),
        el(lib.Tabs.Panel, { value: 'tab1' }, 'Panel 1')
    ))
})

// 23. PAGINATION
testCase('Pagination', 'Sizes, total, page, pageSize, showTotal, showPageSize', () => {
    renderToStaticMarkup(el(lib.Pagination, {
        total: 200,
        page: 2,
        pageSize: 20,
        showTotal: true,
        showPageSize: true,
        size: 'md'
    }))
})

// 24. DROPDOWN MENU
testCase('DropdownMenu', 'Trigger, placement, headers, separators, danger items', () => {
    renderToStaticMarkup(el(lib.DropdownMenu, {
        trigger: el('button', null, 'Menu'),
        placement: 'bottom-end'
    },
        el(lib.DropdownMenu.Header, null, 'Header'),
        el(lib.DropdownMenu.Item, null, 'Edit'),
        el(lib.DropdownMenu.Separator),
        el(lib.DropdownMenu.Item, { danger: true }, 'Delete')
    ))
})

// 25. ACCORDION
testCase('Accordion', 'Multiple expand, activeKey, items', () => {
    renderToStaticMarkup(el(lib.Accordion, { defaultActiveKey: ['1'], multiple: true },
        el(lib.Accordion.Item, { eventKey: '1' },
            el(lib.Accordion.Header, null, 'Header 1'),
            el(lib.Accordion.Body, null, 'Body 1')
        ),
        el(lib.Accordion.Item, { eventKey: '2' },
            el(lib.Accordion.Header, null, 'Header 2'),
            el(lib.Accordion.Body, null, 'Body 2')
        )
    ))
})

// 26. BADGE, TAG & CHIP
testCase('Badge', 'Count, overflow cap, dot mode, colors, placement', () => {
    renderToStaticMarkup(el(lib.Badge, { count: 150, max: 99, color: 'error', placement: 'top-left' }, el('span', null, 'Icon')))
    renderToStaticMarkup(el(lib.Badge, { dot: true, color: 'success' }))
})
testCase('Tag & Chip', 'Variants, colors, closable, sizes', () => {
    renderToStaticMarkup(el(lib.Tag, { variant: 'solid', color: 'primary', size: 'lg', closable: true }, 'Tag 1'))
    renderToStaticMarkup(el(lib.Chip, { variant: 'outline', color: 'warning', size: 'sm' }, 'Chip 1'))
})

// 27. RATE
testCase('Rate', 'allowHalf, character, readOnly, size & name', () => {
    renderToStaticMarkup(el(lib.Rate, { name: 'rating', defaultValue: 3.5, allowHalf: true, size: 'lg', max: 5 }))
    renderToStaticMarkup(el(lib.Rate, { value: 4, readOnly: true }))
})

// 28. AVATAR & AVATAR GROUP
testCase('Avatar & AvatarGroup', 'Sizes, shapes, status, group max overflow', () => {
    renderToStaticMarkup(el(lib.Avatar, { name: 'John Doe', size: 'lg', shape: 'square', status: 'online' }))
    renderToStaticMarkup(el(lib.AvatarGroup, { max: 3, size: 'md' },
        el(lib.Avatar, { name: 'A' }),
        el(lib.Avatar, { name: 'B' }),
        el(lib.Avatar, { name: 'C' }),
        el(lib.Avatar, { name: 'D' })
    ))
})

// 29. DIVIDER
testCase('Divider', 'Alignments, horizontal, vertical, dashed', () => {
    renderToStaticMarkup(el(lib.Divider, { align: 'center', dashed: true }, 'OR'))
    renderToStaticMarkup(el(lib.Divider, { direction: 'vertical' }))
})

// 30. TOOLTIP & WHISPER
testCase('Tooltip & Whisper', 'Placements, speaker prop, children', () => {
    renderToStaticMarkup(el(lib.Tooltip, { content: 'Tooltip text', placement: 'bottom' }, el('button', null, 'Hover')))
    renderToStaticMarkup(el(lib.Whisper, { speaker: el('span', null, 'Whisper text'), placement: 'left' }, el('button', null, 'Whisper')))
})

// 31. ALERT & TOAST
testCase('Alert', 'Variants, dismissible, title', () => {
    renderToStaticMarkup(el(lib.Alert, { variant: 'success', title: 'Great', dismissible: true }, 'Message'))
})
testCase('Toast & ToastProvider', 'Provider, action button, duration', () => {
    renderToStaticMarkup(el(lib.ToastProvider, { position: 'bottom-right' },
        el(lib.Toast, { title: 'Notification', action: { label: 'Undo', onClick: () => {} } }, 'Saved')
    ))
})

// 32. PROGRESS & SKELETON
testCase('Progress & Skeleton', 'Sizes, indeterminate, circle skeleton', () => {
    renderToStaticMarkup(el(lib.Progress, { value: 75, max: 100, label: 'Loading', showValue: true, size: 'lg' }))
    renderToStaticMarkup(el(lib.Progress, { size: 'sm' })) // indeterminate
    renderToStaticMarkup(el(lib.Skeleton, { circle: true, width: 40, height: 40 }))
    renderToStaticMarkup(el(lib.Skeleton, { width: '100%', height: 20 }))
})

// 33. FORM FIELD & LABEL
testCase('FormField & Label', 'Required, description, error state', () => {
    renderToStaticMarkup(el(lib.FormField, {
        label: 'Email',
        description: 'Your work email',
        error: 'Invalid email',
        required: true
    }, el(lib.Input, { placeholder: 'Email' })))
})

// 34. UPLOADER & ANIMATION
testCase('Uploader & Animation', 'Draggable, dropzone, Collapse/Fade/Bounce', () => {
    renderToStaticMarkup(el(lib.Uploader, { draggable: true }, el('div', null, 'Drop files')))
    renderToStaticMarkup(el(lib.Animation.Collapse, { in: true }, el('div', null, 'Collapsed')))
    renderToStaticMarkup(el(lib.Animation.Fade, { in: true }, el('div', null, 'Faded')))
    renderToStaticMarkup(el(lib.Animation.Bounce, { in: true }, el('div', null, 'Bounced')))
})

// 35. DRAWER OPTIONS
testCase('Drawer', 'bodyLock, sizes, placements', () => {
    renderToStaticMarkup(el(lib.Drawer, { open: true, bodyLock: false, placement: 'left', size: 'xs' }, el('p', null, 'Drawer content')))
    renderToStaticMarkup(el(lib.Drawer, { open: true, placement: 'top', size: 'full' }, el('p', null, 'Top drawer')))
})

// 36. RATE ENHANCEMENTS
testCase('Rate', 'name attribute, allowHalf, character', () => {
    renderToStaticMarkup(el(lib.Rate, { name: 'rating', defaultValue: 3.5, allowHalf: true, character: 'A' }))
    renderToStaticMarkup(el(lib.Rate, { value: 4, readOnly: true, size: 'lg' }))
})

// 37. DROPDOWN MENU TRIGGER
testCase('DropdownMenu', 'Trigger element vs renderTrigger', () => {
    renderToStaticMarkup(el(lib.DropdownMenu, { trigger: el(lib.Button, null, 'Action') }, el(lib.DropdownMenu.Item, null, 'Option 1')))
})

// 38. ACCORDION MULTIPLE & PANEL ALIAS
testCase('Accordion', 'multiple prop and Accordion.Panel alias', () => {
    renderToStaticMarkup(el(lib.Accordion, { multiple: true, defaultActiveKey: ['1', '2'] },
        el(lib.Accordion.Panel, { eventKey: '1' },
            el(lib.Accordion.Header, null, 'Header 1'),
            el(lib.Accordion.Body, null, 'Body 1')
        ),
        el(lib.Accordion.Panel, { eventKey: '2' },
            el(lib.Accordion.Header, null, 'Header 2'),
            el(lib.Accordion.Body, null, 'Body 2')
        )
    ))
})

// 39. BADGE COUNT & TAG COLOR
testCase('Badge & Tag', 'count alias, error color, Tag color', () => {
    renderToStaticMarkup(el(lib.Badge, { count: 120, max: 99, color: 'error' }, el('button', null, 'Notifications')))
    renderToStaticMarkup(el(lib.Tag, { color: 'danger', size: 'sm', closable: true }, 'Danger Tag'))
})

// 40. AVATAR XS & GROUP
testCase('Avatar & Group', 'size="xs", group overflow', () => {
    renderToStaticMarkup(el(lib.Avatar, { size: 'xs', name: 'John Doe', status: 'online' }))
    renderToStaticMarkup(el(lib.AvatarGroup, { max: 2, size: 'sm' },
        el(lib.Avatar, { name: 'A' }),
        el(lib.Avatar, { name: 'B' }),
        el(lib.Avatar, { name: 'C' })
    ))
})

// 41. DIVIDER DIRECTION & DASHED
testCase('Divider', 'direction="vertical", dashed', () => {
    renderToStaticMarkup(el(lib.Divider, { direction: 'vertical', dashed: true }))
    renderToStaticMarkup(el(lib.Divider, { dashed: true }, 'Dashed text'))
})

// 42. BUTTON GROUP ORIENTATION
testCase('ButtonGroup', 'orientation="vertical"', () => {
    renderToStaticMarkup(el(lib.ButtonGroup, { orientation: 'vertical', size: 'sm', variant: 'outline' },
        el(lib.Button, null, 'Top'),
        el(lib.Button, null, 'Middle'),
        el(lib.Button, null, 'Bottom')
    ))
})

// Print full report
console.log('\n=== AUDIT RESULTS SUMMARY ===')
const failed = results.filter((r) => r.status === 'FAIL')
const warned = results.filter((r) => r.status === 'WARN')
const passed = results.filter((r) => r.status === 'PASS')

console.log(`TOTAL TESTS: ${results.length}`)
console.log(`PASSED: ${passed.length}`)
console.log(`WARNED: ${warned.length}`)
console.log(`FAILED: ${failed.length}`)

if (failed.length > 0) {
    console.log('\n--- FAILED TESTS ---')
    failed.forEach((f) => {
        console.log(`[${f.component}] ${f.test}: ${f.error}`)
    })
}

if (warned.length > 0) {
    console.log('\n--- WARNINGS LOGGED ---')
    warned.forEach((w) => {
        console.log(`[${w.component}] ${w.test}:`)
        w.warnings.forEach((txt) => console.log(`   ${txt}`))
    })
}

if (failed.length > 0 || warned.length > 0) {
    process.exit(1)
} else {
    console.log('\nALL AUDIT TEST CASES PASSED WITH ZERO WARNINGS!')
}
