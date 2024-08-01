import { Row, Col, Card, Button } from "react-bootstrap";
import React, { useRef } from "react";

import lessonCard from "./lessonCard";
function timeLine({ filteredWeek, weekLessons, setLessonImg }) {
  return (
    <div className="timeline">
      {filteredWeek.map((week, index) => (
        <Row key={index} className="timeline-event">
          <Col xs={10} className="timeline-content">
            <h5>{week.Title}</h5>
            <div className="flex-cards">
              {weekLessons(week.Id).map((lesson, midIndex) => (
                <lessonCard
                  lesson={lesson}
                  midIndex={midIndex}
                  setLessonImg={setLessonImg}
                />
              ))}
            </div>
          </Col>
          <Col xs={2} className="timeline-dot">
            <div className="timeline-circle"></div>
            {index < filteredWeek.length - 1 && (
              <div className="timeline-line"></div>
            )}
            <div className="timeline-date">{week.Date}</div>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default timeLine;
