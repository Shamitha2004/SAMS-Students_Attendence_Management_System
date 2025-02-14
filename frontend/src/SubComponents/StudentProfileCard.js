import React from 'react';
import { Card } from 'react-bootstrap';

const StudentProfileCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Student Profiles</Card.Title>
        <Card.Text>View and edit detailed profiles of students.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentProfileCard;