import "./TitleCards.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import play_icon from "./../../assets/play_icon.png";
import info_icon from "./../../assets/info_icon.png";

export default function TitleCards({ title, category }) {
  const cardsRef = useRef();
  const [data, setData] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "YOUR_AUTHORIZATION",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {data.toReversed().map((card, index) => {
          return (
            <div className="card" key={index}>
              <Link href={`/movie/${card.id}`}>
                <Image
                  className="img"
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                  height={124}
                  width={240}
                  alt={card.original_title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
