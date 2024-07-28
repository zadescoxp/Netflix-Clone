"use client";

import { useEffect, useState } from "react";
import "./Movie.css";
import Image from "next/image";
import play_icon from "./../../../assets/play_icon.png";
import Link from "next/link";
import back_arrow_icon from "./../../../assets/back_arrow_icon.png";

export default function Movie({ params }) {
  const [data, setData] = useState({
    title: "",
    backdrop_path: "",
    homepage: "",
    origin_country: [],
    original_language: "",
    overview: "",
    poster_path: "",
    release_date: "",
    tagline: "",
    vote_average: "",
    genres: [],
    runtime: "",
  });
  const Id = params.movieId;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2Y1Y2E5YThlZGFkZjgzM2FjN2ExMGFlZTdlZDIzMCIsIm5iZiI6MTcyMTg5NTQzMi40NDU0NzIsInN1YiI6IjY2YTA5NDIyYTM5NTQwNWFlZjQwM2JlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CS5r0DV_5Tzuu2xtq-Phjnmzgom4Jxn86qcRIqmDVjQ",
    },
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${Id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));

    console.log(data.genres);
  }, []);

  const bgImg = `https://image.tmdb.org/t/p/w500` + data.backdrop_path;
  console.log(bgImg);

  return (
    <div className="container">
      <Link className="go_back" href={"/"}>
        <Image src={back_arrow_icon} height={130} width={130} alt="Go Back" />
      </Link>
      <div className="movie">
        <div
          className="banner"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, #000000), url(${bgImg})`,
          }}
        >
          {/* <Image
            className="img"
            src={`https://image.tmdb.org/t/p/w500` + data.backdrop_path}
            height={124}
            width={240}
            alt={data.title}
          /> */}
          <Link href={`/player/${Id}`} className="controller">
            <Image src={play_icon} height={50} width={50} alt="Play" />
            Play
          </Link>
        </div>

        <div className="info-wrapper">
          <div className="info-left">
            <div className="rating">
              <span>{Math.floor(data.vote_average * 10)}%</span>
              <p>{data.release_date.slice(0, 4)}</p>
              <p>
                {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
              </p>
              <p>{data.original_language}</p>
            </div>

            {data.tagline === "" ? (
              <></>
            ) : (
              <div className="tagline">
                <q>{data.tagline}</q>
              </div>
            )}

            <div className="overview">
              <p>Overview: {data.overview}</p>
            </div>
            {data.homepage === "" ? (
              <></>
            ) : (
              <Link className="homepage" href={data.homepage} target="_blank">
                {data.title}
              </Link>
            )}
            <div className="genres">
              <span>Genres: </span>
              {data.genres.map((gen, index) => (
                <p key={index}>{gen.name}</p>
              ))}
            </div>

            <div className="genres">
              <span>Country: </span>
              {data.origin_country.map((org, index) => (
                <p key={index}>{org}</p>
              ))}
            </div>
          </div>

          <div className="info-right">
            <Image
              src={`https://image.tmdb.org/t/p/w500` + data.poster_path}
              height={250}
              width={150}
              alt={data.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
