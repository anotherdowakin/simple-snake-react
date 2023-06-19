import React from 'react';
import modal from './css/modal.css';

function Modal(props) {
    const {isOpen, title, children} = props;

    return (
        <div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;