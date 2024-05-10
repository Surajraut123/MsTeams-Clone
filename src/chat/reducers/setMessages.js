// In your reducers file
const messagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
};

export default messagesReducer;
