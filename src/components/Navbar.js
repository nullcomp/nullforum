import React, {Component} from 'react';
import logo from '../logo.svg';  
import {InputForm, ButtonForm} from './FormComponents';

export default class Navbar extends Component {
    
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
        this.setSearchText = this.setSearchText.bind(this);
    }

    setSearchText(event){
        this.setState({
            searchText: event.target.value
        });
    }
    
    render() {
        return(
            <nav className="navbar">
                <div className="navbar__logo">
                    <img src={logo} alt="logo" />
                </div>
                {/* <div className="navbar__filter">
                    <DropdownForm />
                </div> */}
                <div className="navbar__search">
                    <InputForm 
                        placeholder="Busque por um tópico no forum" 
                        value={this.state.searchText}
                        onChange={this.setSearchText}/>
                </div>
                <div className="navbar__actions">
                    <ButtonForm name="Fazer login" />
                    <ButtonForm name="Se cadastrar" category="primary" />
                </div>
            </nav>
        );
    }
}