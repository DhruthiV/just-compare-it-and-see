import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ComparisonResult = ({ comparisonResult = {} }) => {
  console.log('Comparison Result Prop:', comparisonResult);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Comparison Result</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Added Topics:</strong>
            <ul>
              {comparisonResult?.added?.length > 0 ? (
                comparisonResult.added.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))
              ) : (
                <p>No added topics</p>
              )}
            </ul>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Removed Topics:</strong>
            <ul>
              {comparisonResult?.removed?.length > 0 ? (
                comparisonResult.removed.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))
              ) : (
                <p>No removed topics</p>
              )}
            </ul>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Semantic Matches:</strong>
            <ul>
              {comparisonResult?.semantic_matches?.length > 0 ? (
                comparisonResult.semantic_matches.map((match, index) => (
                  <li key={index}>
                    {match.old} <strong>→</strong> {match.new} (Similarity: {match.similarity.toFixed(2)})
                  </li>
                ))
              ) : (
                <p>No semantic matches</p>
              )}
            </ul>
          </ListGroup.Item>
          
          <ListGroup.Item>
            <strong>Shifted Topics:</strong>
            <ul>
              {comparisonResult?.shifted_topics?.length > 0 ? (
                comparisonResult.shifted_topics.map((shift, index) => (
                  <li key={index}>
                    <strong>{shift.topic}</strong> shifted from <em>{shift.from}</em> to <em>{shift.to}</em>
                  </li>
                ))
              ) : (
                <p>No shifted topics</p>
              )}
            </ul>
          </ListGroup.Item>
          
          <ListGroup.Item>
            <strong>Elaborations:</strong>
            <ul>
              {comparisonResult?.elaborations?.length > 0 ? (
                comparisonResult.elaborations.map((elaboration, index) => (
                  <li key={index}>
                    <strong>{elaboration.old}</strong> → <em>{elaboration.new}</em> (Similarity: {elaboration.similarity.toFixed(2)})
                  </li>
                ))
              ) : (
                <p>No elaborations</p>
              )}
            </ul>
          </ListGroup.Item>
          
        </ListGroup>
      </Card.Body>
    </Card>
  );
};



export default ComparisonResult;
