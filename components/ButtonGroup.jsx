import React from 'react'

export const ButtonGroup = ({
    orientation = 'horizontal',
    size,
    variant,
    className = '',
    children,
    ...props
}) => {
    const isVertical = orientation === 'vertical'
    return (
        <div
            {...props}
            role="group"
            className={`inline-flex ${isVertical ? 'flex-col' : 'flex-row'} rounded-xl overflow-hidden ${
                isVertical
                    ? '[&>button]:rounded-none [&>button:first-child]:rounded-t-xl [&>button:last-child]:rounded-b-xl [&>button:not(:first-child)]:-mt-px'
                    : '[&>button]:rounded-none [&>button:first-child]:rounded-l-xl [&>button:last-child]:rounded-r-xl [&>button:not(:first-child)]:-ml-px'
            } ${className}`}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child
                return React.cloneElement(child, {
                    size: child.props.size || size,
                    variant: child.props.variant || variant
                })
            })}
        </div>
    )
}

export default ButtonGroup
