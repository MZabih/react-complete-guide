import React, {useEffect} from 'react'
import styles from './Cockpit.css'

const  Cockpit = (props) => {
    useEffect(() => {
        console.log("It is react hook which contains all the functionality of react life cycle hooks, and it will be called after every state update")
        setTimeout(() => {
            alert("alert shown after 1 sec through useEffect, whenever our person props changes")
        },1000)
        return(()=>{console.log('CleanupWork which we usually do in componentWillunmount')})
    },[])
    const classes = []
    if (props.persons.length <=2){
        classes.push("Red")
    }
    if (props.persons.length <=1){
        classes.push("Bold")
    }
    let buttonClass = ''
    if (props.showPersons) {
        buttonClass = styles.Red
    }
    return(
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working</p>
            <button className={buttonClass} onClick={props.togglePersonData}>Toggle Persons</button>
        </div>
    )
}

export default Cockpit;