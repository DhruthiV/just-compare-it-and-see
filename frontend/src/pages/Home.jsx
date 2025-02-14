import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import SyllabusSelection from '../components/SyllabusSelection';
import { useSyllabusContext } from '../context/SyllabusContext';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const Home = () => {
  const { selectedSyllabi } = useSyllabusContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  const handleCompare = async (syllabi, comparisonResult) => {
    try {
      if (selectedSyllabi.length === 2) {
        console.log("Selected syllabi IDs:", selectedSyllabi);
        console.log("All syllabi:", syllabi);
        
        if (!Array.isArray(syllabi)) {
          throw new Error('Syllabi is not an array');
        }
  
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
        console.log('Comparison Result:', comparisonResult);
  
        navigate("/comparison", { state: { comparisonResult } });  
      } else {
        alert('Please select exactly two syllabi for comparison.');
      }
    } catch (error) {
      console.error('Failed to compare syllabi', error);
      setError('Failed to compare syllabi');
    }
  };

  return (
    <Container>
      <h1>Welcome to the Syllabus Comparison Tool</h1>
      <p>Select two syllabi from the list below to compare their topics.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <SyllabusSelection onCompare={handleCompare} />
    </Container>
  );
};

export default Home;
