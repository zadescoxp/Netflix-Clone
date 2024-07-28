"use client";

import Navbar from "@/components/Navbar/Navbar.jsx";
import play_icon from "./../assets/play_icon.png";
import info_icon from "./../assets/info_icon.png";
import TitleCards from "@/components/TitleCards/TitleCards";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";

import Image from "next/image";
import "./Home.css";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export default function Home() {
  const [data, setData] = useState({
    backdrop_path: "",
    overview: "",
    title: "",
    id: "",
  });
  const rand = Math.floor(Math.random() * 20);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        router.push("/");
      } else {
        router.push("/login");
      }
    });
  }, []);

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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.results[rand]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="hero">
          <Image
            src={`https://image.tmdb.org/t/p/w500` + data.backdrop_path}
            width={1000}
            height={1000}
            alt="Banner"
            className="banner-img"
          />
          <div className="hero-caption">
            <h1 className="caption-img">{data.title}</h1>
            <p>{data.overview}</p>

            <div className="hero-btns">
              <Link href={`/player/${data.id}`}>
                <button className="btn">
                  <Image src={play_icon} height={20} width={20} alt="Play" />
                  Play
                </button>
              </Link>
              <Link href={`/movie/${data.id}`}>
                <button className="btn dark-btn">
                  <Image src={info_icon} height={20} width={20} alt="Play" />
                  More Info
                </button>
              </Link>
            </div>

            <TitleCards />
          </div>
        </div>
        <div className="more-cards">
          <TitleCards title={"Top Rated"} category={"top_rated"} />
          <TitleCards title={"Only on Netflix"} category={"popular"} />
          <TitleCards title={"Made For You"} category={"now_playing"} />
          <TitleCards title={"Upcoming"} category={"upcoming"} />
        </div>
        <Footer />
      </div>
    </>
  );
}
