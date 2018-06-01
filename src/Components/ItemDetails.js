import React, {Component} from 'react';
import './Item.css';
import {csvToList} from '../Helpers/Utils';

export default class ItemDetails extends Component{

    state = {
        edit_mode : false,
        ingredient_input:'',
        selected_index:-1,
    }

    editIngredient = (event,ingredient_selected_index,ingredientName) => {
        event.preventDefault();
        this.setState({
            edit_mode:true,
            selected_index: ingredient_selected_index,
            ingredient_input:ingredientName
        });
    }

    saveIngredients = (event,ingredient_selected_index) => {
        event.preventDefault();
        let new_entered_items_str = this.state.ingredient_input;
        var new_entered_item_list = csvToList(new_entered_items_str);
        console.log();
        var ingredient_index = this.state.selected_index
        
        //check for prop showInput to update prop variable
        if(!this.props.showInput){
            this.props.saveIngredientProps(ingredient_index,new_entered_item_list);
        }else{
            this.props.saveIngredientProps(new_entered_item_list);
        }
        this.setState({
            edit_mode:false,
            ingredient_input:'',
            selected_index:-1

        });
    }
    onChangeIngredient = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        
        if(this.state.edit_mode || this.props.showInput){
            return (
                <div className="input-wrapper">
                    <div className="input-content">
                        <input 
                            type="text" 
                            name='ingredient_input' 
                            placeholder='Ingredients' 
                            value={this.state.ingredient_input} 
                            className="input-input" 
                            onChange={this.onChangeIngredient}/>
                    </div>
                    <div className="save-btn" onClick={(event) => this.saveIngredients(event,this.state.selected_index)}>
                        Save
                    </div>
                </div>
            )
        }else{
            return (
                
                <div className="sub-item-wrapper" key={this.props.index}>
                    <div className="item-content">
                        {this.props.ingredientName}
                    </div>
                    <div className="edit-btn"
                        onClick={(event) => this.editIngredient(event,this.props.index,this.props.ingredientName)}>
                        Edit
                    </div>
                    <div className="cancel-btn"
                        onClick={(event) => this.props.cancelIngredientBtnClickProps(this.props.index,event)}>
                        Cancel
                    </div>
                </div>
            )
        }
    }
}