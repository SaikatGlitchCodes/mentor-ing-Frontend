import React from 'react'

export default function SharedModal({ children, modal_id, closeBtn=false }) {
    return (
        <dialog id={modal_id} className="z-30 modal">
            <div className="bg-white modal-box">
                {children}
                <div className="modal-action">
                    { closeBtn && <form method="dialog">
                        <button className="btn">Close</button>
                    </form>}
                </div>
            </div>
        </dialog>
    )
}
