'use client'

function BreaseAction(action: string, data: any) {
    window.parent.postMessage(
        {
            action: action,
            data: {
                ...data,
                scrollY: window.scrollY
            }
        },
        '*'
    )
}

interface BreaseEditButtonProps {
    id: string
}

export const BreaseEditButton = ({ id }: BreaseEditButtonProps) => {
    return (
        <button
            className={'BreaseEditButton'}
            onClick={() => BreaseAction('BreaseEditSection', { uuid: id })}
        >
            Edit
        </button>
    )
}

