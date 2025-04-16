import React from 'react'

const BreaseToggleSection = () => {
    const [open, setOpen] = React.useState(true)

    const toggleSection = (e: any) => {
        setOpen(!open)

        const breasewrapper = e.target.parentElement.parentElement.parentElement
        open
            ? breasewrapper?.classList.add('brease-section-hide')
            : breasewrapper?.classList.remove('brease-section-hide')
    }

    return (
        <button className={'brease-toggle-section-button'} data-open={open} onClick={toggleSection}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
            >
                <path
                    d="M3.5 5.25L7 8.75L10.5 5.25"
                    stroke="#07080A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}

export default BreaseToggleSection