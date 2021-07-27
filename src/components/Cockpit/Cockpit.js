import React, {useEffect,useRef} from 'react'
import styles from './Cockpit.css'
import AuthContext from '../../context/auth-context'
const  Cockpit = (props) => {
    const toggleButton = useRef(null)
    useEffect(() => {
        //It is react hook which contains all the functionality of react life cycle hooks,
        // and it will be called after every state update"
        toggleButton.current.click()
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
            <button className={buttonClass}
                    ref = {toggleButton}
                    onClick={props.togglePersonData}>
                    Toggle Persons
            </button>
            <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Login</button>}
            </AuthContext.Consumer>
        </div>
    )
}

export default React.memo(Cockpit);