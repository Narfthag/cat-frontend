import React from 'react'

function Message(props){
    let name_class
    switch(props.type){
        case -1:
            name_class = 'message__error';
            break;
        case 0: 
            name_class = 'message__turn';
            break;
        case 1:
            name_class = 'message__victory';
            break;
        case 2:
            name_class = 'not_shown';
            break;
        default:
            name_class = '';
            break;

            
    }
    return (
        <div className={"message "+name_class}>{props.message}</div>
    )
};

export default Message;
