import React, { Component } from 'react';
import './App.css';
import Item from './Components/Item';
import {csvToList} from './Helpers/Utils'; 

class App extends Component {
    state = {
        recipe_list : [{
            name:'test',
            ingredients:["ingredient 1","ingredient 2"]
        }],
        name_input: '',
        ingredient_input:''
    }

    deleteRecipe = (elementIndex) => {
        let my_recipe_list = [...this.state.recipe_list];
        let updated_recipe_list = my_recipe_list.filter((recipe,i) => i !== elementIndex);
        this.setState({recipe_list:updated_recipe_list});
    }

    saveRecipe = (updatedRecipe,index) => {
        let my_recipe_list = [...this.state.recipe_list];
        my_recipe_list[index] = updatedRecipe;
        this.setState({recipe_list:my_recipe_list});
    }

    addRecipe = (newRecipe) => {
        let updated_recipe_list = [...this.state.recipe_list];
        updated_recipe_list.push(newRecipe);
        this.setState({name_input:'',ingredient_input:'',recipe_list:updated_recipe_list});
    }

    addBtnClick = () => {
        var ingredient_list = csvToList(this.state.ingredient_input);
        var recipe = {
            name : this.state.name_input,
            ingredients:ingredient_list
        }
        this.addRecipe(recipe);
    }

    onInputValueChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        var list =  this.state.recipe_list.map((recipe,index) => {
            return(
                <Item 
                    key={index}
                    rowIndex={index} 
                    data={recipe} 
                    deleteRecipeProp={this.deleteRecipe}
                    saveRecipeProps={this.saveRecipe} />    
            );
        });
        return (
            
            <div className="App">
                <div className="recipe-box">
                    {list}
                </div>
                <div>
                <input type="text" className="recipe-input" name="name_input" placeholder='Recipe name' value={this.state.name_input} onChange={this.onInputValueChange}/>
                </div>
                <div>
                <input type="text" className="recipe-input" name="ingredient_input" placeholder='Ingredients name' value={this.state.ingredient_input} onChange={this.onInputValueChange}/>
                </div>
                <div className="add-btn" onClick={this.addBtnClick}>
                    Add Recipe
                </div>
            </div>
        );
    }
}

export default App;
