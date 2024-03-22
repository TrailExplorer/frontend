import React from 'react';
import '../Home/Home.scss';
import '../Home/Home.css';

const Home = () => {    
    return (
        <section className='home'>
            <div className="seccontainer container">
                <div className="homeText">
                    <h1 className="title">
                        Find Your Next Adventure
                    </h1>
                    <p className="subTitle">
                        Explore the best trails in the world
                    </p>
                    <button className="btn">
                        <a href='#home'>
                            Explore 
                        </a>
                    </button>    
                </div> 
                <div className="homeCard grid">
                    <div className="inputgroup">
                        <div className="locationDiv">
                            <label htmlFor='location'>Location</label>
                            <input type='text'placeholder='Enter Location'/>
                        </div>

                        <div className="trailLengthDiv">
                            <label htmlFor='trailLength'>Trail Length</label>
                            <input type='number' className='form-control'  placeholder='Trail Length'/>
                        </div>

                    </div>
 

                    <button className='btn'>
                        Search
                    </button>

                </div>
            </div>
        </section>
    )
}

export default Home;
