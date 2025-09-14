
import './Home.css'

import React, { useState, useEffect, useRef } from "react";

import Navbar from '../../components/Navbar/Navbar'
import hero_baner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import greaterIcon from "../../assets/greater.svg";
import join_us from "../../assets/join-us-1.png";
import join_us_2 from "../../assets/join-us-2.png";
import join_us_3 from "../../assets/join-us-3.png";
import join_us_4 from "../../assets/join-us-4.png";






const Home = () => {
    const trendingRef = useRef(null); 
    const [movies, setMovies] = useState([]);
    const API_KEY = "dc3817e72717f4092e25408ea63709ec"; 
  
    useEffect(() => {
      const fetchTrendingMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching trending movies:", error);
        }
      };
  
      fetchTrendingMovies();
    }, []);

      // Scroll function

    
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_baner} alt="" className='banner-img' />
        <div className='hero-caption'>
            <img src={hero_title} alt="" className='caption-img' />
            <p>Discovering his ties to a secret ancient order, a young man is drawn into a dangerous world of power, corruption and mystery</p>
            <div className="hero-btns">
            <button className='btn'>
                Play
                <img src={play_icon} alt="" />
            </button>
            <button className='btn dark-btn'> 
                More Info
                <img src={info_icon} alt="" />
            </button>
        </div>
      </div>
        </div>
{/* //get started */}
        <div className="get-started"> 
 
 <div className='get-started-text'> 
    <h1 className='get-started-title'>Unlimited movies, TV shows, and more</h1>
    <h2 className='get-started-subtitle'>Starts at EUR 4.99. Cancel anytime.</h2>
    <h3 className='get-started-description'>Ready to watch? Enter your email to create or restart your membership.</h3>

    <div className='input_field'>
    <input type="input"  placeholder='Email address' className='get-started-input'/>
    <button className='get-started-btn'>Get Started
         <img src={greaterIcon} alt="" />
         </button>
    </div>
    </div>
        </div>

{/* Trending now */}
<div className="divider-netflix"></div>
<section>
  <h2 className='trending-now-header'>Trending Now</h2>
  <div className="trending-now-wrapper">

  <div className="trending-now" ref={trendingRef}>
    {movies.map((movie, index) => (
      <div key={movie.id} className="trending-card-wrapper">
        <span className="number-style">{index + 1}</span>
        <div className="trending-card">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="trending-img"
            />
          )}
        </div>
      </div>
    ))}
  </div>

</div>


<div className="join-us"> 


    <div className="join-us-block">
        <h1 className="join-us-header">
        Enjoy on your TV
        </h1>
        <p className="join-us-description">
        Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
        </p>

        <div className="join-us-img-container">
            <img src={join_us} alt="" className='join-us-img' />
        </div>
    </div>

    <div className="join-us-block">
        <h1 className="join-us-header">
        Download your shows to watch offline
        </h1>
        <p className="join-us-description">
        Save your favorites easily and always have something to watch.
        </p>

        <div className="join-us-img-container">
            <img src={join_us_2} alt="" className='join-us-img' />
        </div>

    </div>

    <div className="join-us-block">
        <h1 className="join-us-header">
        Watch everywhere
        </h1>
        <p className="join-us-description">
        Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
        </p>

        <div className="join-us-img-container">
            <img src={join_us_3} alt="" className='join-us-img' />
        </div>

    </div>

    <div className="join-us-block">
        <h1 className="join-us-header">
        Create profiles for kids
        </h1>
        <p className="join-us-description">
        Send kids on adventures with their favorite characters in a space made just for them — free with your membership.
        </p>

        <div className="join-us-img-container">
            <img src={join_us_4} alt="" className='join-us-img' />
        </div>

    </div>



</div>
</section>





    
    </div>
  )
}

export default Home
