import React from 'react'

const CharComponent = (props) => {
    const style = {
        display: 'inline-block',
        padding: 16,
        margin: 16,
        border: '1px solid black',
        textAlign: 'center'
    }
    return (
        <div style={style} onClick={props.click}>
            <p>{props.character}</p>
        </div>
    )
}

export default CharComponent