import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import './Details.css';
import Header from '../../common/header/Header';
import Home from '../home/Home';
import movieData from '../../common/movieData';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';


class Details extends Component {

    constructor() {
        super();
        this.state = {
            movie: {},
            starIcons: [
                {
                   id: 1,
                   stateId: "star1",
                   color: "black"
                },
                {
                   id: 2,
                   stateId: "star2",
                   color: "black"
                },
                {
                   id: 3,
                   stateId: "star3",
                   color: "black"
                },
                {
                   id: 4,
                   stateId: "star4",
                   color: "black"
                },
                {
                   id: 5,
                   stateId: "star5",
                   color: "black"
                }
             ]
        };
    }

    componentWillMount() {
        const movie = movieData.find(movie => movie.id === this.props.movieId);
        this.setState({ movie });
    }

    backClickHandler = () => {
        ReactDOM.render(<Home />, document.getElementById("root"));
    }

    artistClickHandler = (url) => {
        window.location = url;
    }

    starClickHandler = (starId) => {
        const { starIcons } = this.state;
        starIcons.forEach((star, i) => {
            star.color =  (i < starId) ? "yellow" : "black";
        });
        this.setState({starIcons});
    }

    render() {
        let { movie } = this.state;
        const opts = {
            height: '300',
            width: '700',
            playerVars: { autoplay: 1 }
        };

        return (
            <div className="details">
                <Header showBookShowBtn="true"/>
                <div className="back">
                    <Typography onClick={this.backClickHandler}>Back to home</Typography>
                </div>
                <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>
                    <div className="middleDetails">
                        <div>
                            <Typography variant="headline" component="h2">{movie.title}</Typography>
                        </div>
                        <br />
                        <div>
                            <Typography>
                                <span className="bold">Genres</span> {movie.genres.join(',')}
                            </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold">Duration:</span> {movie.duration} </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                        </div>
                        <div>
                            <Typography><span className="bold"> Rating:</span> {movie.critics_rating}  </Typography>
                        </div>
                        <div className="marginTop16">
                            <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                        </div>
                        <div className="trailerContainer">
                            <Typography>
                                <span className="bold">Trailer</span>
                            </Typography>
                            <YouTube
                                videoId={movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            >
                            </YouTube>
                        </div>
                    </div>
                    <div className="rightDetails">
                        <Typography><span className="bold">Rate this movie</span></Typography>
                        {this.state.starIcons.map(star => (
                            <StarBorderIcon className={star.color} key={"star" + star.id} onClick={() => { this.starClickHandler(star.id) }}></StarBorderIcon>
                        ))}
                        <div className="bold marginBottom16 marginTop16">
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                        </div>
                        <div className="paddingRight">
                            <GridList cellHeight={160} cols={2}>
                                {movie.artists != null && movie.artists.map(artist => (
                                    <GridListTile
                                        className="gridTile"
                                        onClick={() => this.artistClickHandler(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;