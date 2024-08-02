import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Button, Modal } from "react-bootstrap";
import timeLine from "../../components/timeLine";
import "./Timeline.css"; // Custom CSS

const PracticesList = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [ite, setIte] = useState(null);
  const [midIte, setMidIte] = useState(null);
  const [expandedHeight, setExpandedHeight] = useState("200px");
  const [weeks, setWeeks] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [mahlakaId, setMahlakaId] = useState(null);
  const [weeksWithIndex, setWeeksWithIndex] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getWeeks();
      setIsLoad(true);
    };
    setTimeout(fetchData, 200);
  }, []);

  const getMahlakot = async () => {
    const res = await axios.get("http://localhost:5000/mahlakot");
    console.log("mahlakot: ", res.data);
    return res.data;
  };

  const getWeeks = async () => {
    const mahlakaFromLocals = localStorage.getItem("mahlaka");
    console.log(mahlakaFromLocals);
    const mahlakot = await getMahlakot();
    const id = mahlakot.find(
      (mahlaka) => mahlaka.Title === mahlakaFromLocals
    ).Id;

    setMahlakaId(id);

    const url = "http://localhost:5000/weeks";
    const res = await axios.get(url);
    console.log("filtered Weeks: ", +res);

    const filteredWeeks = res.data;
    setWeeks(filteredWeeks);

    if (filteredWeeks.length < 1) {
      // Handle no data case
      console.log("no data");
    }
    loadLesson();
    setWeeksWithIndex(
      filteredWeeks.map((option, index) => ({ ...option, index }))
    );
  };

  const loadLesson = async () => {
    const url = "http://localhost:5000/lessons";
    const res = await axios.get(url);
    const filteredLessons = res.data.filter(
      (lesson) => lesson.mahlakaId === mahlakaId
    );

    if (weeks.length > 0) {
      filteredLessons.unshift({
        Img: "printer.jpg",
        Title: "הכרת הגדוד",
        file: "מצגת הצגת הגדוד.pptx",
        mahlakaId,
        weekId: filteredLessons[0].weekId,
      });
    }
    setLessons(filteredLessons);
    console.log("filtered Lessons: ", +filteredLessons);
    setShowCards(true);
  };

  const weekLessons = (weekId) => {
    return lessons
      .filter((lesson) => lesson.weekId === weekId)
      .slice()
      .sort((a, b) => a.queNumber - b.queNumber);
  };

  const filterPractices = (event) => {
    // Implement filter logic
    console.log(event.target);
  };

  const filteredWeek = selectedValue
    ? weeks.filter((week) => week.Title === selectedValue.Title)
    : weeks;

  return (
    <Container className="timeline-container" dir="rtl">
      {mahlakaId}
      {!isLoad && <div>Loading...</div>}
      {/* <timeLine filteredWeek={filteredWeek} weekLessons={weekLessons} /> */}
    </Container>
  );
};

export default PracticesList;
