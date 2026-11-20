import React from 'react'

export const ButtonGroup = ({
    size,
    variant,
    className = '',
    children,
    ...props
}) => (
    <div
        {...props}
        role="group"
        className={`inline-flex rounded-xl overflow-hidden [&>button]:rounded-none [&>button:first-child]:rounded-l-xl [&>button:last-child]:rounded-r-xl [&>button:not(:first-child)]:-ml-px ${className}`}
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

export default ButtonGroup
