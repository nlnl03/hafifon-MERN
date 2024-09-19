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
  const [plugot, setPlugot] = useState([]);
  const [newData, setNewData] = useState({});
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPlugot = async () => {
      try {
        const res = await axios.get("/api/plugot");
        console.log("plugot ", res.data);
        setPlugot(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPlugot();
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

  const checkIfMahlakot = (name) => {
    const check = plugot.mahlakot?.filter(
      (mahlaka) => mahlaka.plugaName === name
    );
    return check?.length < 2;
  };

  const filteredMahlakot = (name) => {
    return (
      plugot.mahlakot?.filter((mahlaka) => mahlaka.plugaName === name) || []
    );
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
          {plugot &&
            plugot.map((pluga, index) => (
              <div className="flex-item" key={pluga._id}>
                <div
                  onMouseOver={() => setShowDropdown(index)}
                  onMouseLeave={() => setShowDropdown(null)}
                  className="item-container"
                  style={{ backgroundColor: pluga.color }}
                >
                  {checkIfMahlakot(pluga.Title) ? (
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
                          {filteredMahlakot(pluga.Title).map((mahlaka) => (
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
