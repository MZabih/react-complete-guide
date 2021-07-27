import React, {Component} from 'react'
import styles from './App.css';
import Persons from '../components/Persons/Persons'
import UserInput from '../components/User/UserInput'
import Cockpit from '../components/Cockpit/Cockpit'
// import UserOutput from './User/UserOutput'
import Radium, {StyleRoot} from 'radium' //Radium is used to apply our css properties like hover, mediaqueries in our inline-stylings
import ValidationComponent from '../components/Validation/ValidationComponent'
import CharComponent from '../components/AddCharacterComponent/CharComponent'
import WithClass from '../hoc/WithClass'
import Aux from '../hoc/Aux'
import AuthContext from '../context/auth-context'

// const App = (props) => {
//     const[personState,setPersonState] = useState({
//         persons:[
//             {name: 'Zabih', age: 29},
//             {name: 'Mehdi', age: 32},
//             {name: 'Numra', age: 30}
//         ]
//     })
//     const buttonSwitchHandler = (newName) => {
//         let personsUpdateArray = [...personState.persons]
//         let updatedName = personsUpdateArray.findIndex(person => person.name === 'Zabih')
//         if (updatedName >= 0)
//             personsUpdateArray[updatedName].name = newName
//         setPersonState({
//             persons:[...personsUpdateArray]
//         })
//     }
//     const changeTextHandler = (event) => {
//         setPersonState({
//             persons:[
//                 {name: event.target.value, age: 29},
//                 {name: 'Mehdi', age: 32},
//                 {name: 'Numra', age: 30}
//             ]
//         })
//     }
//
//     const style = {
//         backgroundColor: 'white',
//         font: 'inherit',
//         border: '1px solid blue',
//         padding: '8px',
//         cursor: 'pointer'
//     }
//     return(
//         <div className="App">
//             <h1>I am a react app</h1>
//             <Person name = {personState.persons[0].name} age = {personState.persons[0].age}
//                 change={changeTextHandler}/>
//             <Person name = {personState.persons[1].name} age = {personState.persons[1].age}/>
//             <Person name = {personState.persons[2].name} age = {personState.persons[2].age}/>
//             <button style={style} onClick={() => buttonSwitchHandler('Zabihullah')}>Submit</button>
//         </div>)
// }

class App extends Component{
    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef()
    }
    state = {
        persons:[
            {id:'Z2M', name: 'Zabih', age: 29},
            {id:'M5F', name: 'Mehdi', age: 32},
            {id:'U1D', name: 'Usman', age: 30}
        ],
        userName: 'Zabihullah',
        charComponent:[],
        charValue: '',
        newCharValue:'',
        showPersons: false,
        showCockpit: true,
        userInput: '',
        changeCounter: 0,
        authenticate: false
    }
    componentDidMount(){
        this.inputElementRef.current.focus()
    }
    buttonSwitchHandler = () => {
        let personsUpdateArray = [...this.state.persons]
        let updatedName = personsUpdateArray.findIndex(person => person.name === 'Zabih')
        personsUpdateArray[updatedName].name = 'Zabihullah'
        this.setState({
            persons:[...personsUpdateArray]
        })
    }

    changeTextHandler = (event,id) => {
        const selectedPersonIndex = this.state.persons.findIndex(person => {
            return person.id === id
        })
        const persons1 = [...this.state.persons]
        persons1[selectedPersonIndex].name = event.target.value
        this.setState((prevState, props) => {
            return{
                persons:persons1,
                changeCounter:prevState.changeCounter+1
            }
        })
    }
    authenticate = () => {
        this.setState({
            authenticate:true
        })
    }
    changeUserNameHandler = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    changeCharValue = (event) => {
        this.setState({
            newCharValue: event.target.value
        })
    }

    togglePersonData = () => {
        const showPersonData = this.state.showPersons
        this.setState({
            showPersons: !showPersonData
        })
    }

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice() //old Syntax
        const persons = [...this.state.persons] //new ES6 Syntax
        persons.splice(personIndex,1)
        this.setState({persons})
    }

    deleteCharComponent = (characterIndex) => {
        let charArray = [...this.state.charComponent]
        charArray.splice(characterIndex,1)
        this.setState({
            charComponent: charArray
        })

    }

    deleteCharacter = (characterIndex) => {
        let characterArray = this.state.userInput.split('');
        characterArray.splice(characterIndex,1)
        let updatedText = characterArray.join('')
        this.setState({
            userInput: updatedText
        })
    }
    addCharComponent = (character) => {
        this.setState({
            charComponent: [...this.state.charComponent,character],
            newCharValue: ''
        })
        console.log('character: ', character)
    }

    onChangeHandler = (event) => {
        this.setState({
            userInput: event.target.value
        });
    }

    render(){
        const style = {
            backgroundColor: 'Green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            width: '20%',
            margin: '0 auto',
            cursor: 'pointer'
        }
        let person = null
        if (this.state.showPersons) {
            person = <Persons
                        persons = {this.state.persons}
                        clicked = {this.deletePersonHandler}
                        changed = {this.changeTextHandler}
                        authenticate = {this.state.authenticate}
                    />;
        }
        let character = this.state.charComponent.map((characterVal,characterIndex)=>{
            return <CharComponent character={characterVal}
                                  click = {()=>{this.deleteCharComponent(characterIndex)}}
                                  key={characterIndex}/>
        })
        let maxCharacter = this.state.userInput.split('').map((ch,index) => {
            return <CharComponent
                    character = {ch}
                    key = {index}
                    click = {() => this.deleteCharacter(index)}/>
        })
        let userNameLength = this.state.userName.length
        return (
            <StyleRoot>
                <Aux>
                    <button onClick={() =>{this.setState({
                        showCockpit: false
                    })}}>RemoveCockPit</button>
                    <AuthContext.Provider value={{authenticate:this.state.authenticate, login: this.authenticate}}>
                        {       this.state.showCockpit? (<Cockpit
                                 title = {this.props.title}
                                 showPersons = {this.state.showPersons}
                                 togglePersonData = {this.togglePersonData}
                                 persons = {this.state.persons}
                        />): null}
                        {person}
                    </AuthContext.Provider>
                    <UserInput
                        name = {this.state.userName}
                        changeUserName={this.changeUserNameHandler}
                    />
                    <p>UserNameLength: {userNameLength}</p>
                    <ValidationComponent
                        length={userNameLength}
                    />
                    <div style={{background: '#eee', margin: '1% 35% 0'}}>
                        <input placeholder="Enter Text"
                               onChange={this.changeCharValue}
                               value={this.state.newCharValue}/>
                        <button className = "style" onClick = {()=>this.addCharComponent(this.state.newCharValue)}> Add Character Component </button>
                    </div>
                    {character}
                    <div style={{background: '#eee', margin: '1% 35% 0'}}>
                        <input
                            type = "text"
                            ref = {this.inputElementRef}
                            onChange={this.onChangeHandler}
                            value={this.state.userInput}
                        />
                        {maxCharacter}
                    </div>
                </Aux>
            </StyleRoot>
        );
    }
}

export default WithClass(App,styles.App);     //High order Component
