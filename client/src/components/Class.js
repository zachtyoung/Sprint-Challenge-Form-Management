import React from 'react';


class Class extends React.Component{
   
    render(){
        return (
              <div className="user-container">
          <h1>Recipes</h1>
          <div className="back">
     {this.props.recipes && this.props.recipes.map((el, index) => <h4 key={el.name}className="user-return">{index+ 1 + ". " + el.name}-{el.course}</h4>)}
    </div>
    </div> 
        )
    }
}
export default Class;