import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Timeline.css";
import LessonCard from "../lessonCard/lessonCard";

const VerticalTimeline = () => {
  const timelineEvents = [
    {
      title: "Week 1: Web Design Basics",
      date: "21 March, 2014",
      lessons: [
        {
          lessonTitle: "Lesson 1: Introduction to Web Design",
          description: "Learn the basics of HTML, CSS, and web structure.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
        {
          lessonTitle: "Lesson 2: Designing Layouts",
          description: "Explore different layout techniques with CSS.",
        },
      ],
    },
    {
      title: "Week 2: Advanced CSS",
      date: "28 March, 2014",
      lessons: [
        {
          lessonTitle: "Lesson 1: Flexbox",
          description: "Master the Flexbox layout model for responsive design.",
        },
        {
          lessonTitle: "Lesson 2: CSS Grid",
          description:
            "Understand how to create grid-based layouts with CSS Grid.",
        },
      ],
    },
    {
      title: "Week 3: JavaScript Basics",
      date: "4 April, 2014",
      lessons: [
        {
          lessonTitle: "Lesson 1: Introduction to JavaScript",
          description: "Get started with JavaScript fundamentals.",
        },
        {
          lessonTitle: "Lesson 2: DOM Manipulation",
          description:
            "Learn how to dynamically interact with web elements using JavaScript.",
        },
      ],
    },
  ];

  return (
    <Container className="mt-5" dir="rtl">
      <h2 className="text-center mb-5">Course Timeline</h2>
      {timelineEvents.map((event, index) => (
        <Row key={index} className="timeline-event">
          <Col md={1} className="timeline-dot-wrapper">
            <div className="timeline-dot"></div>
            {index !== timelineEvents.length - 1 && (
              <div className="timeline-line"></div>
            )}
          </Col>
          <Col md={10} className="timeline-content" style={{ width: "unset" }}>
            <h4>{event.title}</h4>
            <div className="flex-row">
              {event.lessons.map((lesson, lessonIndex) => (
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
  );
};

export default VerticalTimeline;
