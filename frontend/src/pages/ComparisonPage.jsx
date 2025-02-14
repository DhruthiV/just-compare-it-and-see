import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import ComparisonResult from '../components/ComparisonResult';
import { useLocation } from 'react-router-dom';  
const ComparisonPage = () => {
  const location = useLocation();
  const { comparisonResult } = location.state || {}; 

  return (
    <Container>
      {!comparisonResult ? (
        <Alert variant="danger">No comparison result found.</Alert>
      ) : (
        <ComparisonResult comparisonResult={comparisonResult} />
      )}
    </Container>
  );
};

export default ComparisonPage;
