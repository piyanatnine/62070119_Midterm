import { Link } from "react-router-dom";
import background from "../assets/bg-img.png";

export default function HomePage() {
  return (
    <div
      className="fullscreen bg-img"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="container py-5 px-3 main-content">
        <div className="row">
          <div className="mt-5" style={{ color: "white" }}>
            <h2 className="lobsterFont">C M S</h2>
            <p className="lobsterFont" style={{ fontSize: "6vh" }}>
              Content Management System
            </p>
            <p className="px-4 openSansFont" style={{ fontSize: "2vh" }}>
              Content Management System using content from CMS API <br />
              this project is imprement for learning and examination in subject{" "}
              <br />
              06016384: SPECIAL TOPICS IN SOFTWARE ENGINEERING 2 <br />
            </p>
              <div
                className="my-2 p-3"
                style={{ marginLeft: "10vw", fontSize: "20px", width: "12vw" }}
              >
                <Link to="/category" className="colorLoop" style={{ textDecoration: "none" }}>
                <p className="kanitFont">{"view Contents >>"}</p>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
