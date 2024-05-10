
export const fetchMessage = (conversationId, receiver) => async dispatch => {
    const user = JSON.parse(localStorage.getItem('user:detail'));
    const response = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
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

    // Dispatch an action with the fetched messages
    dispatch({
        type: 'FETCH_MESSAGES_SUCCESS',
        payload: messages,
    });
}