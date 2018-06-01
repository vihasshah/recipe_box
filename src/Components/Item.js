import React, {Component} from 'react';
import './Item.css';
import ItemDetails from './ItemDetails';

export default class Item extends Component{

    state = {
        ingredient_input:'',
        edit_enable:true
    }

    cancelRecipeBtnClick = (event) => {
        event.preventDefault();
        this.props.deleteRecipeProp(this.props.rowIndex);
    }


    cancelIngredientBtnClick = (index,event) => {
        event.preventDefault();

        let rowIndex = this.props.rowIndex;
        var existing_ingredient_list = this.props.data.ingredients;
        let updated_ingredient_list = existing_ingredient_list.filter((ingredient,i) => i !== index);
        
        let updated_recipe = {
            name: this.props.data.name,
            ingredients: updated_ingredient_list
        }
        this.props.saveRecipeProps(updated_recipe,rowIndex);
    }
    

    onChangeIngredient = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    saveIngredients = (new_entered_list) => {
        var existing_ingredient_list = this.props.data.ingredients;
        var new_updated_list = [...existing_ingredient_list,...new_entered_list];
        var row_index = this.props.rowIndex;
        var updated_recipe = {
            name: this.props.data.name,
            ingredients: new_updated_list
        }
        this.props.saveRecipeProps(updated_recipe,row_index);
    }

    saveEditedIngredient = (ingredient_index,new_entered_list) => {
        console.log('ingredient index:'+ingredient_index);
        var ingredient_list = this.props.data.ingredients;
        ingredient_list.splice(ingredient_index,1,...new_entered_list);
        console.log(ingredient_list);
        var updated_recipe = {
            name: this.props.data.name,
            ingredients: ingredient_list
        }
        this.props.saveRecipeProps(updated_recipe,this.props.rowIndex);
    }

    addIngredientRow = (text,index) => {
        return (
            <ItemDetails
                index = {index}
                ingredientName = {text}
                saveIngredientProps = {this.saveEditedIngredient}
                cancelIngredientBtnClickProps = {this.cancelIngredientBtnClick}
                key={index}/>
        );
    }

    // input for ingredients which will append to last row of ingredient list
    addIngredientInput = () =>{
        return (
            <ItemDetails
                saveIngredientProps={this.saveIngredients}
                cancelIngredientBtnClickProps = {this.cancelIngredientBtnClick}
                showInput='true'/>
        );
    }
    
    render(){
        
        if(this.props.data){
            return (
                <div className="item-wrapper" key={this.props.rowIndex}>
                        <div className="item-heading">
                            <div className="item-content">
                                {this.props.data.name}
                            </div>
                            <div className="cancel-btn" onClick={this.cancelRecipeBtnClick}>
                                Cancel
                            </div>
                        </div>
                        {
                            this.props.data.ingredients.map((ingredient,index) => { 
                                return this.addIngredientRow(ingredient,index);
                            })
                        }    
                        {this.addIngredientInput()}
                </div>
            );
        }else{
            return "";
        }
    }
}