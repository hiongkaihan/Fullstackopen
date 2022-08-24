const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontSize: 32,
        border: '3px solid green',
        background: 'lightgrey',
        margin: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle} className="notifcation">
            {message}
        </div>
    )
}

export default Notification