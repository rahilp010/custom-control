import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as lib from '../dist/index.js'

const uniq = (arr) => Array.from(new Set(arr))
const expectedExports = [
    'Input',
    'InputNumber',
    'InputGroup',
    'SelectPicker',
    'CheckPicker',
    'TagPicker',
    'DatePicker',
    'DateRangePicker',
    'TimePicker',
    'Toggle',
    'Checkbox',
    'Radio',
    'RadioGroup',
    'Slider',
    'Textarea',
    'PasswordInput',
    'SearchInput',
    'Tooltip',
    'Whisper',
    'Modal',
    'Uploader',
    'Animation',
    'CustomControlsProvider',
    'ThemeProvider',
    'useControlsTheme',
    'ThemedPortal',
    'toRgbChannels'
]

const missing = expectedExports.filter((name) => !(name in lib))

const el = React.createElement
const html = renderToStaticMarkup(
    el(
        lib.CustomControlsProvider,
        { theme: 'light', colors: { primary: '#7c3aed' } },
        el(
            'div',
            null,
            el(lib.Input, { value: 'x', onChange: () => {} }),
            el(lib.Textarea, { value: 'y', showCount: true }),
            el(lib.PasswordInput, { value: 'z' }),
            el(lib.SearchInput, { value: 'q' }),
            el(lib.SelectPicker, { data: [{ label: 'A', value: 'a' }], value: 'a' }),
            el(lib.CheckPicker, { data: ['a', 'b'], value: ['a'] }),
            el(lib.DatePicker, { value: '2026-01-05' }),
            el(lib.DateRangePicker, { value: [] }),
            el(lib.TimePicker, { value: '09:00' }),
            el(lib.Slider, { value: 30 }),
            el(
                lib.RadioGroup,
                { value: 'a', onChange: () => {} },
                el(lib.Radio, { value: 'a' }, 'A')
            ),
            el(lib.Toggle, { checked: true }),
            el(lib.Checkbox, { checked: true, onChange: () => {} }, 'C'),
            el(lib.Tooltip, { content: 'hi' }, el('button', null, 't')),
            el(lib.Modal, { open: true }, el(lib.Modal.Body, null, 'modal body')),
            el(lib.Uploader, null, el('div', null, 'drop'))
        )
    )
)

const checks = {
    exports: missing.length === 0,
    themeAttribute: html.includes('data-cc-theme="light"'),
    customPrimary: html.includes('--cc-primary:124 58 237'),
    themedClasses: html.includes('bg-cc-surface'),
    sliderRendered: html.includes('cc-slider'),
    modalPortalSkippedOnServer: !html.includes('modal body'),
    noLegacyHex: !/#daf4aa|#16161b/i.test(html),
    darkProvider: renderToStaticMarkup(
        el(lib.CustomControlsProvider, { theme: 'dark' }, el(lib.Input, { value: 'd' }))
    ).includes('data-cc-theme="dark"'),
    themeHelpers: lib.toRgbChannels('#daf4aa') === '218 244 170' && lib.toRgbChannels('rgb(1, 2, 3)') === '1 2 3'
}

console.log(JSON.stringify({ missing: uniq(missing), checks }, null, 2))

const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name)
if (failed.length) {
    console.error('FAILED CHECKS:', failed.join(', '))
    process.exit(1)
}
console.log('SMOKE OK')
