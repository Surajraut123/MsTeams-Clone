
export const fetchMessage = (conversationId, receiver) => async dispatch => {
    const loggedUserId = JSON.parse(localStorage.getItem("loggedUser:detail"));
    const response = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${loggedUserId?.id}&&receiverId=${receiver?.userid}`, {
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json' 
        },
    })
    // const resData = await res.json();
    // console.log("From action: index.js : = ",resData);

    // return {
    //     messages: resData,
    //     resData: "click"
    // }
    const messages = await response.json();
    console.log(messages);
    // Dispatch an action with the fetched messages
    dispatch({
        type: 'FETCH_MESSAGES_SUCCESS',
        payload: messages,
        receiverDetail : receiver.fullName
    });
}