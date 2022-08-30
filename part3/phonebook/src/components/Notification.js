const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: 'green',
        fontSize: 32,
        border: '3px solid green',
        background: 'lightgrey',
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification