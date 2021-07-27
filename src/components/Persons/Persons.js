import React, {Component} from 'react'
import Person from './Person/Person'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth-context'

class Persons extends Component{
    /* In shouldComponentUpdate method It will be getting upcoming props and states, Here you have to decide whether you want to
    update your component or not, you must have to return true or false*/

    shouldComponentUpdate (nextProps,nextState) {
        console.log("ShouldComponentUpdate called from Persons.js")
        if(nextProps !== this.props.persons){
            return true
        } else return false
    }

    // static getDerivedStateFromProps (props,state) {
    //     console.log("Get-Derived-State-From-Props-Called-from-Persons.js")
    //     return state
    // }

    /*getSnapshotBeforeUpdate() will give you prev state and props before updating the component like scrolling position
    which you can use after updating of the component to bring back user's cursor to prev position */
    getSnapshotBeforeUpdate (prevProps,prevState) {
        console.log("getSnapshotBeforeUpdate Called from Persons.js")
        return {message: "snapshot-null"}
    }
    // When all the updates are done ComponentDidUpdate method called
    componentDidUpdate (prevProps, prevState, snapshot) {
        console.log("ComponentDidUpdate Called")
        console.log("snapshot: ",snapshot)
    }

    render() {
        return this.props.persons.map((person, personIndex) => {
                return <Person
                    name={person.name}
                    age={person.age}
                    click={() => {
                        this.props.clicked(personIndex)
                    }}
                    key={person.id}
                    changed={(event) => {
                        this.props.changed(event, person.id)
                    }}
                />
            })
    }
}
Person.propTypes = {
    click: PropTypes.func,
    age: PropTypes.number,
    name: PropTypes.string,
    changed: PropTypes.func
}

export default Persons