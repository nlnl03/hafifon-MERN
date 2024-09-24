import "./homePage.css";
import imageSrc from "../../assets/383.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {
//   DataProvider,
//   DataContext,
// } from "../../handleDataChange/context&provider";

const HomePageContent = ({ setBasePath }) => {
  const [plugotAndMahlakot, setPlugotAndMahlakot] = useState([]);
  // const [newData, setNewData] = useState({});
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllPlugotAndMahlakot = async () => {
      try {
        const res = await axios.get("/api/plugotWithMahlakot");
        console.log("plugot&mahlakot ", res.data);
        setPlugotAndMahlakot(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPlugotAndMahlakot();
  }, []);

  const handleLinkClick = (mahlaka) => {
    const basePath = mahlaka.Title;
    const mahlakaId = mahlaka?._id;
    const testsNames = mahlaka?.testsNames;
    localStorage.setItem("mahlakaId", mahlakaId);
    localStorage.setItem("testsNames", testsNames);
    localStorage.setItem("mahlaka", basePath);
    setBasePath(basePath);
    navigate(`/${basePath}/UserPage`);
  };

  // const handleNewData = () => {
  //   const newData = { Title: "dfdfdf", color: "yellow" };
  //   postData("plugot", "/api/plugot", newData);
  //   setNewData(newData);
  // };

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
          {/* <button onClick={handleNewData}>הוסף פלוגה</button> */}
          {plugotAndMahlakot &&
            plugotAndMahlakot.map((pluga, index) => (
              <div className="flex-item" key={pluga._id}>
                <div
                  onMouseOver={() => setShowDropdown(index)}
                  onMouseLeave={() => setShowDropdown(null)}
                  className="item-container"
                  style={{ backgroundColor: pluga.color }}
                >
                  {pluga.mahlakot.length == 1 ? (
                    <button
                      className="item-btn"
                      onClick={() => handleLinkClick(pluga)}
                    >
                      {pluga.Title}
                    </button>
                  ) : (
                    <>
                      <span className="item">{pluga.Title}</span>
                      <div className="dropdown-menu">
                        <ul>
                          {pluga.mahlakot.map((mahlaka) => (
                            <li
                              key={mahlaka.Title}
                              className="mahlaka-item"
                              onClick={() => handleLinkClick(mahlaka)}
                            >
                              {mahlaka.Title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const HomePage = ({ setBasePath }) => {
  // const endpoints = {
  //   plugot: "/api/plugot",
  //   mahlakot: "/api/mahlakot",
  // };

  return <HomePageContent setBasePath={setBasePath} />;
};

export default HomePage;
