import Image from "next/image";
import "./Footer.css";
import youtube_icon from "./../../assets/youtube_icon.png";
import twitter_icon from "./../../assets/twitter_icon.png";
import facebook_icon from "./../../assets/facebook_icon.png";
import instagram_icon from "./../../assets/instagram_icon.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-icons">
        <Link target="_blank" href={"https://www.facebook.com/netflix/"}><Image src={facebook_icon} height={120} width={129} alt="Facebook" /></Link>
        <Link target="_blank" href={"https://www.instagram.com/netflix/?hl=en"}><Image src={instagram_icon} height={120} width={129} alt="Instagram" /></Link>
        <Link target="_blank" href={"https://x.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"}><Image src={twitter_icon} height={120} width={129} alt="Twitter" /></Link>
        <Link target="_blank" href={"https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw"}><Image src={youtube_icon} height={120} width={129} alt="Youtube" /></Link>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information </li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">&copy; 1997-2023 Netflix, Inc.</p>
    </div>
  );
}
