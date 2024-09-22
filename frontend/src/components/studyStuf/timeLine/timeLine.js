import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Timeline.css";
import LessonCard from "../lessonCard/lessonCard";
import axios from "axios";

const VerticalTimeline = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchAllStudyingStuf = async () => {
      try {
        const res = await axios.get("/api/materials");
        console.log("materials: ", res.data);
        setMaterials(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllStudyingStuf();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="bg"></div>
        <div className="time-line">
          <Container className="mt-5" dir="rtl">
            {materials.map((week, index) => (
              <Row key={index} className="timeline-event">
                <Col md={1} className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                  {index !== materials.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </Col>
                <Col md={10} className="timeline-content">
                  <h4>שבוע {week.number}</h4>
                  <div className="flex-row">
                    {week.lessons.map((lesson, lessonIndex) => (
                      <LessonCard
                        lesson={lesson}
                        lessonIndex={lessonIndex}
                        key={lessonIndex}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
      </div>
    </>
  );
};

export default VerticalTimeline;
