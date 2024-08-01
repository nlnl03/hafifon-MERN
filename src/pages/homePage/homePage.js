import "./homePage.css";
import imageSrc from "../../assets/383.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = ({ setBasePath }) => {
  const navigate = useNavigate();

  const handleLinkClick = (basePath) => {
    localStorage.setItem("mahlaka", basePath);
    setBasePath(basePath);
    navigate(`/${basePath}/UserPage`);
  };

  const [plugaBtns, setBtns] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    const fetchPlugaDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/plugaBtns");
        const data = res.data;
        console.log("pluga details: ", data);
        setBtns(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlugaDetails();
  }, []);

  const btnClick = async (mahlaka, bgColor) => {
    localStorage.setItem("bgColor", bgColor);
    document.documentElement.style.setProperty(
      "--main-background-color",
      bgColor
    );

    // Dispatch selectItem action
    // this.$store.dispatch("selectItem", mahlaka);
    // Assuming you have a similar Redux or Context action in React

    const url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:5000/mahlakot?Title=${mahlaka}`
        : `getByTitle('mahlakot')/items?$filter=Title eq '${mahlaka}'`;

    try {
      const res = await axios.get(url);
      console.log("mahlakot: ", res.data[0]);
      const mahlakaId = res.data[0]?.Id || res.data.value[0]?.Id;
      const testsNames =
        res.data[0]?.testsNames ||
        JSON.stringify(res.data.value[0]?.testsNames);

      localStorage.setItem("mahlakaId", mahlakaId);
      localStorage.setItem("testsNames", testsNames);

      // Navigate to User page
      // this.$router.push({ name: "User" });
      // Use React Router's useHistory hook or similar to navigate
    } catch (error) {
      console.error("Error fetching mahlakot data:", error);
    }
  };

  return (
    <>
      <div className="gray-line">
        <img src={imageSrc} alt="" />
      </div>

      <div className="background">
        <div className="welcome">
          <h1>ברוכים הבאים לאתר חפיפה</h1>
          <div>
            <h2>שלום ...</h2>
          </div>
        </div>

        <div className="flex">
          {plugaBtns.map((pluga, index) => (
            <div className="flex-item" key={pluga.label}>
              <div
                style={{ backgroundColor: pluga.color }}
                onMouseOver={() => setShowDropdown(index)}
                onMouseLeave={() => setShowDropdown(null)}
                className="item-container"
              >
                {pluga.type === "button" ? (
                  <button
                    className="item-btn"
                    onClick={() => handleLinkClick(pluga.baseRoute)}
                  >
                    {pluga.label}
                  </button>
                ) : (
                  <span className="item">{pluga.label}</span>
                )}

                {showDropdown === index && !pluga.type && (
                  <div className="dropdown-menu">
                    <ul>
                      {pluga.mahlakot.map((mahlaka) => (
                        <li
                          key={mahlaka.label}
                          className="mahlaka-item"
                          onClick={() => handleLinkClick(mahlaka.baseRoute)}
                        >
                          {mahlaka.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
