import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";// in layman terms better verrsion of fetch API(reduces lines of code)
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


const apiKey = "0de574b04919bbe45d0248bd6bb324ab";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;//yeh heading ke neeche jo movies h unke liye h 

const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>

        <div>
            {arr.map((item, index) => (
                <Card key={index} img= {`${imgUrl}/${item.poster_path}`} />
            ))}
        </div>
    </div>
);

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    //useEffect ek baar khud hi call hoga kyunki end me [] lga h agr [temp,] likhte to temp ke change hone pe call hota

    useEffect(() => {
        const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
            console.log(results);
        };
        const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setNowPlayingMovies(results);
        };
        const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);
        };
        const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
            setTopRatedMovies(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
            // console.log(genres);
        };

        getAllGenre();

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);

    //to reduce description
    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    
    var x=Math.floor(Math.random() * 20);
    
    const [isOpen,setIsOpen]=useState(false);

    const BUTTON_WRAPPER_STYLES = {
        position: 'relative',
        zIndex: 1
      }
      

    return (
        <section className="home">
            <div
                className="banner"
                style={{
                     //doubt if conditon kaise use ho rhi h..Movies[0] me
                    backgroundImage: popularMovies[x]
                        ? `url(${`${imgUrl}/${popularMovies[x].backdrop_path
                        }`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[x] && <h1>{popularMovies[x].original_title}</h1>}
                {popularMovies[x] && <p>{truncate(popularMovies[x].overview,150)}</p>}

                <div>
                    <button className = "banner__button"><BiPlay />Play</button>

                    <button className = "banner__button"><AiOutlinePlus />My List</button>


                </div>
            </div>
            {/* <div className="banner__fadeBottom"></div> */}

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
            <Row key={nowPlayingMovies.id} arr={nowPlayingMovies} />


            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />
            <Row title={"Watch Again"} arr={popularMovies} />

            
        </section>
    );
};

export default Home;