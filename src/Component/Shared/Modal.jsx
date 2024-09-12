import React from 'react'

export default function SharedModal({ children, modal_id }) {
    return (
        <dialog id={modal_id} className="z-30 modal">
            <div className="bg-white modal-box">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
