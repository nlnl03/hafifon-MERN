import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function lessonCard({ lesson, midIndex, setLessonImg }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={setLessonImg(lesson.Img)}
        alt="Lesson"
        className="image-of-items"
      />
      <Card.Body>
        <Card.Title className="text">{lesson.Title}</Card.Title>
        <Card.Text className="num-of-que">
          מספר תרגולים: {lesson.queNumber}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default lessonCard;
