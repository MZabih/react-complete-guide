import React from 'react'
import  './Styles/UserOutput.css'

const UserOutput = (props) => {
    return(
        <div className='userOutput'>
            <p>{props.text}</p>
        </div>

    )
}

export default UserOutput;