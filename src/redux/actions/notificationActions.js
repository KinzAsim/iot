export const addNotification = (data) => async (dispatch, getState) => {

    dispatch({
        type: 'ADD_NOTIFICATION',
        payload: data
    })
}

export const clearNotifications = () => async (dispatch, getState) => {
    dispatch({
        type: 'CLEAR_NOTIFICATIONS'
    })
}