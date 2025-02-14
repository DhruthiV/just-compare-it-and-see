import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import SyllabusCard from './SyllabusCard';
import { useSyllabusContext } from '../context/SyllabusContext';

const SyllabusSelection = ({ onCompare }) => {
  const { selectedSyllabi } = useSyllabusContext();
  const [syllabi, setSyllabi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSyllabi = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_syllabus/');
        if (!response.ok) throw new Error('Failed to fetch syllabi');
        const data = await response.json();
        console.log('Fetched syllabi:', data); 
        setSyllabi(data);
      } catch (err) {
        console.error('Error fetching syllabi:', err); 
        setError(err.message);
      }
    };

    fetchSyllabi();
  }, []);

  const handleCompare = async () => {
    try {
      if (selectedSyllabi.length === 2) {
        console.log("Selected syllabi IDs:", selectedSyllabi);
        console.log("All syllabi:", syllabi);
  
        const syllabus1 = syllabi.find(s => s.course_code === selectedSyllabi[0]);
        const syllabus2 = syllabi.find(s => s.course_code === selectedSyllabi[1]);
  
        if (!syllabus1 || !syllabus2) {
          throw new Error('Selected syllabi not found.');
        }
  
        const payload = {
          old_syllabus: {
            year: syllabus1.year,
            course_code: syllabus1.course_code,
            program: syllabus1.program,
            syllabus: syllabus1.syllabus
          },
          new_syllabus: {
            year: syllabus2.year,
            course_code: syllabus2.course_code,
            program: syllabus2.program,
            syllabus: syllabus2.syllabus
          }
        };
  
        console.log('Sending payload for comparison:', payload);
  
        const response = await fetch('http://localhost:8000/compare/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to compare syllabi');
        }
  
        const comparisonResult = await response.json();

        console.log('Raw Comparison Result:', comparisonResult);
        console.log('Type of Comparison Result:', typeof comparisonResult);

        if (typeof comparisonResult === 'string') {
          const parsedResult = JSON.parse(comparisonResult); 
          console.log('Parsed Comparison Result:', parsedResult);
          onCompare(syllabi, parsedResult); 
        } else {
          onCompare(syllabi, comparisonResult); 
        }

      } else {
        alert('Please select exactly two syllabi for comparison.');
      }
    } catch (error) {
      console.error('Failed to compare syllabi', error);
      setError('Failed to compare syllabi');
    }
};;

  return (
    <Container>
      <h2>Select Two Syllabi for Comparison</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {syllabi.map((syllabus) => (
          <Col key={syllabus.course_code} md={4}>
            <SyllabusCard syllabus={syllabus} />
          </Col>
        ))}
      </Row>
      {selectedSyllabi.length === 2 && (
        <Button
          variant="warning"
          onClick={handleCompare}
          className="mt-4"
        >
          Compare Selected Syllabi
        </Button>
      )}
    </Container>
  );
};

export default SyllabusSelection;
