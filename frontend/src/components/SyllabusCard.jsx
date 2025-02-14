import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSyllabusContext } from '../context/SyllabusContext';

const SyllabusCard = ({ syllabus }) => {
  const { selectedSyllabi, addSyllabus, removeSyllabus } = useSyllabusContext();

  const isSelected = selectedSyllabi.includes(syllabus.course_code);

  const handleClick = () => {
    if (isSelected) {
      removeSyllabus(syllabus.course_code);
    } else {
      if (selectedSyllabi.length < 2) {
        addSyllabus(syllabus.course_code);
      } else {
        alert("You can only select two syllabi for comparison.");
      }
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{syllabus.program} - {syllabus.course_code}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{syllabus.year}</Card.Subtitle>
        <Card.Text>{syllabus.description}</Card.Text>

        <Button
          variant={isSelected ? "success" : "primary"}
          onClick={handleClick}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SyllabusCard;
