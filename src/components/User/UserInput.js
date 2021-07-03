import React from 'react'

const UserInput = (props) =>{
    const inputStyle = {
        border: '2px solid #ccc',
        margin: '15px auto',
        textAlign: 'center'
    }
    return(
        <input
            type='text'
            style={inputStyle}
            placeholder='Please Enter input'
            onChange={props.changeUserName}
            value={props.name}
        />
    )
}

export default UserInput;