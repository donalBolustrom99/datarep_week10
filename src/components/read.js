import React, { Component } from 'react';
import Movies from './movies';
import axios from 'axios';

class Read extends Component
{

    //constructor to control
    constructor(){
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        mymovies: []            
    };

    componentDidMount(){
        axios.get('http://localhost:4000/api/movies')
        .then((response)=>{
            this.setState({mymovies: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    //code to reload the page after something is deleted automatically
    ReloadData(){
        axios.get('http://localhost:4000/api/movies')
        .then((response)=>{
            this.setState({mymovies: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    //main code working to read data
    render(){
        return(
            <div>
                <h1>This is my Read component!</h1>
                <Movies films={this.state.mymovies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}
//exporting
export default Read;