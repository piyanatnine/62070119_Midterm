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
      <div class="container py-5 px-3 main-content">
        <div class="row">
          <div class="mt-5" style={{ color: "white" }}>
            <h2 class="lobsterFont">C M S</h2>
            <p class="lobsterFont" style={{ fontSize: "6vh" }}>
              Content Management System
            </p>
            <p class="px-4 openSansFont" style={{ fontSize: "2vh" }}>
              Content Management System using content from CMS API <br />
              this project is imprement for learning and examination in subject{" "}
              <br />
              06016384: SPECIAL TOPICS IN SOFTWARE ENGINEERING 2 <br />
            </p>
              <div
                class="my-2 p-3"
                style={{ marginLeft: "10vw", fontSize: "20px", width: "12vw" }}
              >
                <Link to="/category" class="colorLoop" style={{ textDecoration: "none" }}>
                <p class="kanitFont">{"view Contents >>"}</p>
                </Link>
              </div>
          </div>
        </div>
      </div>
      <footer>
        <div class="container">
          <footer class="py-3">
            <p class="text-center text-muted">
              © 2021 - created by 62070119 Piyanat Sangkuttiya
            </p>
          </footer>
        </div>
      </footer>
    </div>
  );
}
