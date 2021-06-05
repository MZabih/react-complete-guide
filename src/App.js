import React, {Component} from 'react'
import './App.css';
import Person from './Person/Person'
import UserInput from './User/UserInput'
// import UserOutput from './User/UserOutput'
import Radium, {StyleRoot} from 'radium'
import ValidationComponent from './Components/ValidationComponent'
import CharComponent from './Components/CharComponent'

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
        userInput: ''
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
        this.setState({persons:persons1})
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
        // console.log('this.state.charComponent.length: ', this.state.charComponent.length)
        // console.log('this.state.newCharValue: ', this.state.newCharValue)
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
            cursor: 'pointer',
            ":hover": {
                backgroundColor: 'lightgreen'
            }
        }
        let person = null
        if (this.state.showPersons) {
            person = this.state.persons.map((person,personIndex) => {
                    return <Person
                            name = {person.name}
                            age = {person.age}
                            click = {()=> {this.deletePersonHandler(personIndex)}}
                            key = {person.id}
                            changed = {(event) =>{this.changeTextHandler(event,person.id)}}/>
            })
            style.backgroundColor = "red"
            style[":hover"] = {
                backgroundColor: "salmon"
            }
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
        const classes = []
        if (this.state.persons.length <=2){
            classes.push("Red")
        }
        if (this.state.persons.length <=1){
            classes.push("Bold")
        }
        return (
            <StyleRoot>
                <div className="App">
                    <h1>I am a react app</h1>
                    <p className={classes.join(' ')}>This is really working</p>
                    <button style = {style} onClick={this.togglePersonData}>Toggle Persons</button>
                    {person}
                    <UserInput name = {this.state.userName} changeUserName={this.changeUserNameHandler}/>
                    <p>UserNameLength: {userNameLength}</p>
                    <ValidationComponent length={userNameLength}/>
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
                            onChange={this.onChangeHandler}
                            value={this.state.userInput}
                        />
                        {maxCharacter}
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default Radium(App);     //High order Component
