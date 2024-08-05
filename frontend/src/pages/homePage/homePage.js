import "./homePage.css";
import imageSrc from "../../assets/383.png";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataProvider,
  DataContext,
} from "../../handleDataChange/context&provider";

const HomePageContent = ({ setBasePath }) => {
  const { data, postData } = useContext(DataContext);
  const [newData, setNewData] = useState({});
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate();

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
    const check = data.mahlakot?.filter(
      (mahlaka) => mahlaka.plugaName === name
    );
    return check?.length < 2;
  };

  const filteredMahlakot = (name) => {
    return data.mahlakot?.filter((mahlaka) => mahlaka.plugaName === name) || [];
  };

  const handleNewData = () => {
    const newData = { Title: "dfdfdf", color: "yellow" };
    postData("plugot", "/api/plugot", newData);
    setNewData(newData);
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
          <button onClick={handleNewData}>הוסף פלוגה</button>
          {data.plugot &&
            data.plugot.map((pluga, index) => (
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
  const endpoints = {
    plugot: "/api/plugot",
    mahlakot: "/api/mahlakot",
  };

  return (
    <DataProvider endpoints={endpoints}>
      <HomePageContent setBasePath={setBasePath} />
    </DataProvider>
  );
};

export default HomePage;
