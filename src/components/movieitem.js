import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// movie item class where most of the work is done processing the movies list
class MovieItem extends Component {

    constructor(){
        super();
        
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    //delete function connecting to server to delete a list item when hitting the button bellow
    DeleteMovie(e){
        e.preventDefualt();
        console.log("Delete: "+this.props.movie._id);

        axios.delete("http://localhost:4000/api/movies"+ this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch();
    }

    render() {
        return (
            <div>
                {/* main code to build the cards the show the movie and relavent infomation */}
                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.movie.Poster}></img>
                            <footer>
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" +this.props.movie._id} className="btn btn-primary">Edit</Link>
                <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>    
                </Card>
            </div>
        );
    }
}
//export to use on other pages
export default MovieItem;