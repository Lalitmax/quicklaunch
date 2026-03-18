function Toast({ message }) {
    return (
        <div className="toast">
            <div className="toast-content">
                <span className="toast-message">{message}</span>
            </div>
        </div>
    );
}

export default Toast;
