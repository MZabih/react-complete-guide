import React, {Component} from 'react'
import classes from './Person.css'
import Radium from 'radium'

class Person extends Component {
    render(){
        console.log("Render from Person.js")
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>I am {this.props.name} and i am {this.props.age} year old.</p>
                <input type='text' onChange={this.props.changed} value={this.props.name}/>
            </div>
        )
    }
}

export default Person;