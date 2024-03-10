import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <ul>
        <li>
          <Link to={{ pathname: "/" }}>Home</Link>
        </li>
        <li>
          {" "}
          <Link to={{ pathname: "/blog" }}>My Blogs</Link>
        </li>
        <li>
          <Link to={{ pathname: "/about" }}>About Me</Link>
        </li>
      </ul>
      <hr />
      <div>About Me</div>

      <div>
        <p>
          Hi there! Welcome to my blog. I am a passionate developer who loves
          to share knowledge and experiences through writing.
        </p>
        <p>
          On this blog, you'll find articles about various topics.
          Feel free to explore and don't hesitate to reach out if you have
          any questions or just want to connect.
        </p>
      </div>
    </>
  );
}
