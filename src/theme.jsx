import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

const COLOR_VARS = {
    primary: '--cc-primary',
    primaryHover: '--cc-primary-hover',
    onPrimary: '--cc-on-primary',
    surface: '--cc-surface',
    surfaceRaised: '--cc-surface-2',
    text: '--cc-text',
    muted: '--cc-muted',
    subtle: '--cc-subtle',
    overlay: '--cc-overlay',
    scrim: '--cc-scrim'
}

const clampChannel = (n) => Math.min(255, Math.max(0, Math.round(Number(n) || 0)))

const parseHex = (hex) => {
    let value = String(hex).trim().replace(/^#/, '')
    if (value.length === 3) {
        value = value
            .split('')
            .map((c) => c + c)
            .join('')
    }
    if (!/^[0-9a-fA-F]{6}$/.test(value)) return null
    return [
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16)
    ]
}

/**
 * Turns any supported color input ("#daf4aa", "218 244 170", "rgb(218,244,170)")
 * into the "r g b" channel string the CSS variables expect.
 */
export const toRgbChannels = (color) => {
    if (!color) return null

    if (Array.isArray(color) && color.length >= 3) {
        return color.slice(0, 3).map(clampChannel).join(' ')
    }
    if (typeof color !== 'string') return null

    const value = color.trim()
    const hex = parseHex(value)
    if (hex) return hex.join(' ')

    const triple = value.match(/^(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})$/)
    if (triple) return triple.slice(1, 4).map(clampChannel).join(' ')

    const rgb = value.match(/^rgba?\(([^)]+)\)$/i)
    if (rgb) {
        const parts = rgb[1]
            .split(/[\s,/]+/)
            .filter(Boolean)
            .slice(0, 3)
        if (parts.length === 3 && parts.every((p) => /^\d{1,3}$/.test(p))) {
            return parts.map(clampChannel).join(' ')
        }
    }

    return null
}

const toArray = (channels) => channels.split(' ').map(Number)

/** Darkens a channel string, used to derive a hover color. */
export const darken = (channels, amount = 0.08) =>
    toArray(channels)
        .map((c) => clampChannel(c * (1 - amount)))
        .join(' ')

/** Picks a readable foreground for a background color. */
export const contrastOn = (channels, light = '22 22 27', dark = '255 255 255') => {
    const [r, g, b] = toArray(channels)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.55 ? light : dark
}

/**
 * Builds the CSS variable object for a set of custom colors.
 * Only the provided keys are overridden, everything else falls back to the theme.
 */
export const buildThemeStyle = ({ colors, fontFamily, zIndex } = {}) => {
    const style = {}

    if (colors && typeof colors === 'object') {
        Object.entries(COLOR_VARS).forEach(([key, cssVar]) => {
            const channels = toRgbChannels(colors[key])
            if (channels) style[cssVar] = channels
        })

        const primary = toRgbChannels(colors.primary)
        if (primary) {
            if (!toRgbChannels(colors.primaryHover)) {
                style['--cc-primary-hover'] = darken(primary)
            }
            if (!toRgbChannels(colors.onPrimary)) {
                style['--cc-on-primary'] = contrastOn(primary)
            }
        }
    }

    if (fontFamily) style['--cc-font'] = fontFamily
    if (zIndex !== undefined && zIndex !== null) style['--cc-z'] = String(zIndex)

    return style
}

const ThemeContext = createContext({ theme: 'light', style: undefined })

export const useControlsTheme = () => useContext(ThemeContext)

/**
 * Renders popovers/tooltips/menus into a wrapper that carries the active theme
 * variables, so portalled content matches the surrounding theme.
 */
export const ThemedPortal = ({ children }) => {
    const { theme, style } = useControlsTheme()

    if (typeof document === 'undefined') return null

    return createPortal(
        <div className="cc-portal" data-cc-theme={theme} style={style}>
            {children}
        </div>,
        document.body
    )
}

/**
 * Applies a theme (dark | light | system) and optional color overrides to every
 * control rendered inside it, including portalled popovers.
 */
export const CustomControlsProvider = ({
    theme = 'light',
    colors,
    fontFamily,
    zIndex,
    className = '',
    style,
    children,
    ...props
}) => {
    const [systemTheme, setSystemTheme] = useState('light')

    useEffect(() => {
        if (theme !== 'system') return undefined
        if (typeof window === 'undefined' || !window.matchMedia) return undefined

        const query = window.matchMedia('(prefers-color-scheme: light)')
        const apply = () => setSystemTheme(query.matches ? 'light' : 'dark')
        apply()

        if (query.addEventListener) {
            query.addEventListener('change', apply)
            return () => query.removeEventListener('change', apply)
        }
        query.addListener(apply)
        return () => query.removeListener(apply)
    }, [theme])

    const resolvedTheme = theme === 'system' ? systemTheme : theme
    const colorsKey = useMemo(() => JSON.stringify(colors || {}), [colors])
    const themeStyle = useMemo(
        () => buildThemeStyle({ colors, fontFamily, zIndex }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [colorsKey, fontFamily, zIndex]
    )
    const contextValue = useMemo(
        () => ({ theme: resolvedTheme, style: themeStyle }),
        [resolvedTheme, themeStyle]
    )

    return (
        <ThemeContext.Provider value={contextValue}>
            <div
                className={`cc-scope ${className}`}
                data-cc-theme={resolvedTheme}
                style={{ ...themeStyle, ...style }}
                {...props}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const ThemeProvider = CustomControlsProvider

export default CustomControlsProvider
