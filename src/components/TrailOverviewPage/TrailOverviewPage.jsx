import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TrailOverviewPage.css';
import { getTrailDetails } from '../../requests';
import { fetchWeatherData } from '../../weatherService';
import { fetchWeatherForecast } from '../../weatherService';
import sunnyIcon from '../../Assets/sunny.jpg';
import humidityIcon from '../../Assets/humidity.svg';
import windIcon from '../../Assets/wind.svg';
import pressureIcon from '../../Assets/pressure.svg';
import nightIcon from '../../Assets/night.svg';
import dayIcon from '../../Assets/day.svg';
import cloudyNightIcon from '../../Assets/cloudy-night.svg';
import cloudyIcon from '../../Assets/cloudy.svg';
import perfectDayIcon from '../../Assets/perfect-day.svg';
import rainIcon from '../../Assets/rain.svg';
import rainNightIcon from '../../Assets/rain-night.svg';
import stormIcon from '../../Assets/storm.svg';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const WeatherIcons = {
    "01d": sunnyIcon,
    "01n": nightIcon,
    "02d": dayIcon,
    "02n": cloudyNightIcon,
    "03d": cloudyIcon,
    "03n": cloudyIcon,
    "04d": perfectDayIcon,
    "04n": cloudyNightIcon,
    "09d": rainIcon,
    "09n": rainNightIcon,
    "10d": rainIcon,
    "10n": rainNightIcon,
    "11d": stormIcon,
    "11n": stormIcon,
};

const TrailOverviewPage = () => {
    const { state_name, id } = useParams();
    const [trail, setTrail] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        getTrailDetails(id, state_name)
            .then(trailDetails => {
                setTrail(trailDetails);
                // Fetch both weather data and forecast after trail details are set
                return Promise.all([
                    fetchWeatherData(trailDetails._geoloc.lat, trailDetails._geoloc.lng),
                    fetchWeatherForecast(trailDetails._geoloc.lat, trailDetails._geoloc.lng)
                ]);
            })
            .then(([weatherData, forecastData]) => {
                setWeather(weatherData);
                setForecast(forecastData);
            })
            .catch(error => {
                console.error('Error fetching trail or weather details:', error);
            });
    }, [state_name, id]);


    const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        return `${hours}:${minutes.substr(-2)}`;
    };

    const prepareForecastTemperatureData = (forecastData) => {
        if (!forecastData) return;

        const labels = forecastData.list.map(item =>
            new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        );
        
        const data = forecastData.list.map(item => (item.main.temp)*(9/5) + 32)

        return {
            labels,
            datasets: [{
                label: 'Temperature (F)',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
    };

    const preparePrecipitationData = (forecastData) => {
        const labels = forecastData.list.map(item =>
            new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        );

        const precipitationData = forecastData.list.map(item =>
            item.rain ? item.rain['3h'] : 0  // Check if rain data exists, otherwise return 0
        );

        return {
            labels,
            datasets: [{
                label: 'Precipitation (mm)',
                data: precipitationData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    };


    if (!trail) {
        return <div>Loading or no trail data available...</div>;
    }

    const getStars = () => {
        const stars = [];
        let rating = Number(trail.avg_rating); // Ensure this is your correct rating property
        for (let i = 0; i < 5; i++) {
            if (rating >= 1) {
                stars.push(<span key={i} className="fullStar">★</span>);
            } else if (rating > 0) {
                stars.push(<span key={i} className="halfStar">★</span>);
            } else {
                stars.push(<span key={i} className="emptyStar">☆</span>);
            }
            rating--;
        }
        return stars;
    };

    return (
        <React.Fragment>
            <section className="home1">
                <div className="seccontainer1 container">
                    <div className="homeText1">
                        <h1 className="title1">{trail.name}</h1>
                        <p className="subTitle">{trail.area_name}</p>
                        <p className="cityState">{trail.city_name}, {trail.state_name}</p>
                        <div className="rating">
                    {getStars()}
                    <span>{trail.avg_rating}/5</span>
                </div>{/* Add this line */}
                    </div>
                </div>
            </section>
            <div className="clearfix">
                <div className="mainContent">
                    <div className="trailDetailsBar">
                        <div className="detailItem">
                            <span className="detailTitle">Length</span>
                            <span className="detailValue">{(trail.length/1609.34).toFixed(2)} mi</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailTitle">Elevation gain</span>
                            <span className="detailValue">{(trail.elevation_gain)} ft</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailTitle">Route type</span>
                            <span className="detailValue">{trail.route_type}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailTitle">Difficulty Rating</span>
                            <span className="detailValue">{trail.difficulty_rating}</span>
                        </div>
                    </div>
                    <div className="descriptionSection">
    <h2>Description</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions o Lorem Ipsum</p>
</div>

<div className="weatherDataSection">
    <h2> weather data</h2>
   <div className="weatherSection">
                    {weather && (
                        <div className="weatherCard">
                            <div className="weatherCardHeader">
                                <h2>{`${((weather.main.temp)*(9/5) + 32).toFixed(2)}°F | ${weather.weather[0].description}`}</h2>
                                <img src={WeatherIcons[weather.weather[0].icon]} alt="Weather icon" />
                            </div>
                            <div className="weatherCardBody">
                                <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
                                <div className="weatherInfo">
                                <div className="weatherInfoRow">
                                    <div className="weatherInfoItem">
                                        <img src={sunnyIcon} alt="sunrise" />
                                        <p>{formatTime(weather.sys.sunrise)}</p>
                                    </div>
                                    <div className="weatherInfoItem">
                                        <img src={humidityIcon} alt="humidity" />
                                        <p>{weather.main.humidity}%</p>
                                    </div>
                                    </div>
                                    <div className="weatherInfoRow">
                                    <div className="weatherInfoItem">
                                        <img src={windIcon} alt="wind" />
                                        <p>{weather.wind.speed} m/s</p>
                                    </div>
                                    <div className="weatherInfoItem">
                                        <img src={pressureIcon} alt="pressure" />
                                        <p>{weather.main.pressure} hPa</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                    <div className="weatherSection">
                        <h2>Forecast</h2>
                                        {forecast && (
                        <div className="chartContainer">
                            <Line data={prepareForecastTemperatureData(forecast)} options={{ responsive: true }} />
                            </div>
                            )}
                            </div>
                            <div className="weatherSection">
                                <h2> Precipitation</h2>{forecast && (
                                <div className="chartContainer">
                            <Bar data={preparePrecipitationData(forecast)} options={{ responsive: true }} />
                        </div>
                    )}
                    </div>
                </div>
                </div>

                <div className="sidebar">
                <div className="sidebarSection">
    <h2>Features</h2>
    <div className="featuresList">
        {trail.features.map((feature, index) => (
            <span key={index} className="featureTag">{feature}</span>
        ))}
    </div>
</div>
                    <div className="sidebarSection">
                        <h2>Activities</h2>
                        {/* Example: Replace with actual data from trail.activities or a similar property */}
                        <div className="featuresList">
        {trail.activities.map((activities, index) => (
            <span key={index} className="featureTag">{activities}</span>
        ))}
    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TrailOverviewPage;
