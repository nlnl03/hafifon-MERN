import React from "react";
import "./lessonCard.css";
import Button from "react-bootstrap/Button";

const lessonCard = ({ lesson, lessonIndex, weekTitle }) => {
  return (
    <div className="card-item">
      <div className="card-content">
        <div className="inner-flex">
          <img className="image-of-items" alt="תמונת שיעור" />
          <h4 className="text">{lesson.Title}</h4>
          <span className="lesson-name">{lesson.description}</span>
          <span className="num-of-que">מספר תרגולים: </span>
        </div>

        <div className="expanded-content">
          <Button className="powerPoint-link" variant="primary">
            מצגת
          </Button>

          <Button className="tirgulim-link">תרגולים</Button>
        </div>
      </div>
    </div>
  );
};

export default lessonCard;
