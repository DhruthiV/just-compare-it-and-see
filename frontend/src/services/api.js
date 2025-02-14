// src/services/api.js

const API_URL = 'http://localhost:8000';  // Replace with your backend API URL

export const fetchSyllabi = async () => {
  try {
    const response = await fetch(`${API_URL}/api/syllabi`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching syllabi:", error);
  }
};

export const compareSyllabi = async (oldSyllabusId, newSyllabusId) => {
  try {
    const response = await fetch(`${API_URL}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ old_syllabus_id: oldSyllabusId, new_syllabus_id: newSyllabusId })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error comparing syllabi:", error);
  }
};
