import React from 'react'

const ValidationComponent = (props) => {
    let validationText = <p>This is name of invalid length</p>
    if (props.length >= 3)  validationText = <p>This is name of valid length.</p>

    return(
        <div>
            {validationText}
        </div>
    )
}
export default ValidationComponent;