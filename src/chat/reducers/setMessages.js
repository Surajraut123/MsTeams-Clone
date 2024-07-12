// In your reducers file
const messagesReducer = (state = { messages: [], receiverDetails : "" }, action) => {
    switch (action.type) {
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                messages: action.payload,
                receiverDetails : action.receiverDetail,
                conversationId: action.conversationId,
                receiveruser: action.user
            };
        default:
            return state;
    }
};

export default messagesReducer;
