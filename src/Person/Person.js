import React from 'react'
import './Person.css'
import Radium from 'radium'

const Person = (props) => {
    return (
        <div className='Person'>
            <p onClick={props.click}>I am {props.name} and i am {props.age} year old.</p>
            <input type='text' onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default Person;