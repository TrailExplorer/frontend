import React from "react";
import styles from "./TrailCard.module.css";

const TrailCard = (props) => {
    const getTags = () => {
        const tags = [];
        for (let i = 0; i < Math.min(props?.trail?.tags.length, 3); i++) {
            tags.push(<span>{props?.trail?.tags[i]}</span>);
        }
        return tags;
    };

    const getStars = () => {
        const stars = [];
        let rating = props?.trail?.rating;
        for (let i = 0; i < 5; i++) {
            if (rating >= 1) {
                stars.push(
                    <i
                        className={`fa fa-star ${styles.fa}`}
                        aria-hidden="true"
                    ></i>
                );
                rating--;
            } else if (rating > 0) {
                stars.push(
                    <i
                        className={`fa fa-star-half-o ${styles.fa}`}
                        aria-hidden="true"
                    ></i>
                );
                rating = 0;
            } else {
                stars.push(
                    <i
                        className={`fa fa-star-o ${styles.fa}`}
                        aria-hidden="true"
                    ></i>
                );
            }
        }
        return stars;
    };

    return (
        <button className={styles.card}>
            <div className={styles.poster}>
                <img
                    src={
                        props?.trail?.imageUrl
                            ? props?.trail?.imageUrl
                            : "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    }
                />
            </div>
            <div className={styles.details}>
                <h2>
                    {props?.trail?.title}
                    <br></br>
                    <span>{props?.trail?.location}</span>
                </h2>
                <div className={styles.rating}>
                    {getStars()}
                    <span>{props?.trail?.rating}/5</span>
                </div>
                <div className={styles.tags}>{getTags()}</div>
                <div className={styles.info}>
                    <p>{props?.trail?.description}</p>
                </div>
            </div>
        </button>
    );
};

export default TrailCard;
