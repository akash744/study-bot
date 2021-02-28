import React from 'react';

export default function Modal({open = false, children, closeHandler}) {
    return open ? (
        <div style={styles.modalContainer} onClick={closeHandler}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    ) : null;
}

const styles = {
    modalContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0px',
        left: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        maxWidth: '800px',
        width: '60%',
        backgroundColor: 'white',
        height: '80%',
        overflowY: 'scroll'
    },
};
