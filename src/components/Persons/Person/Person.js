import React, {Component} from 'react'
import classes from './Person.css'
import Aux from '../../../hoc/Aux'
import withClass from '../../../hoc/WithClass'
import AuthContext from '../../../context/auth-context'
import Radium from 'radium'

class Person extends Component {
    render(){
        console.log("Render from Person.js")
        return (
            <Aux>
                <AuthContext.Consumer>
                    {(context) => context.authenticate ? <p>Authenticated</p> : <p>Please Login</p>}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I am {this.props.name} and i am {this.props.age} year old.</p>
                <input type='text' onChange={this.props.changed} value={this.props.name}/>
            </Aux>
        )
    }
}

export default withClass(Person,classes.Person);