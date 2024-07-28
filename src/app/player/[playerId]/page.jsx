"use client";

import "./Player.css";
import back_arrow_icon from "./../../../assets/back_arrow_icon.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Player({params}) {

    const Id = params.playerId

    const [data, setData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2Y1Y2E5YThlZGFkZjgzM2FjN2ExMGFlZTdlZDIzMCIsIm5iZiI6MTcyMTc5OTk0MS4wMzAwMDE0LCJzdWIiOiI2NmEwOTQyMmEzOTU0MDVhZWY0MDNiZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JKBEw8WZVG5dfd4pm3E209cUMEW1vwNg10v5CH_ttDg",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${Id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <Link href={'/'}><Image src={back_arrow_icon} height={130} width={130} alt="Go Back" /></Link>
      <iframe
        height="90%"
        width="90%"
        title="trailer"
        allowFullScreen
        src={`https://www.youtube.com/embed/${data.key}`}
        frameBorder="0"
      ></iframe>
      <div className="player-info">
        <p>{data.published_at.slice(0,10)}</p>
        <p>{data.name}</p>
        <p>{data.type}</p>
      </div>
    </div>
  );
}
