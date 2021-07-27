import React from 'react';

//1 way of creating higher order component
// const WithClass = (props) => {
//     return(
//         <div className={props.classes}>{props.children}</div>
//     )
// }

// 2nd way of creating higher order component
//To use this you will create an Aux file which will also be higher order component and then while
// exporting this higher order component in that class we do export default withClass(wrappedComponent,classname)
const WithClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
}
export default WithClass;