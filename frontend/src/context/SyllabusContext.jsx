import React, { createContext, useContext, useState } from 'react';

const SyllabusContext = createContext();

export const SyllabusProvider = ({ children }) => {
  const [selectedSyllabi, setSelectedSyllabi] = useState([]);

  const addSyllabus = (syllabusId) => {
    setSelectedSyllabi((prevSelected) => [...prevSelected, syllabusId]);
  };

  const removeSyllabus = (syllabusId) => {
    setSelectedSyllabi((prevSelected) =>
      prevSelected.filter((id) => id !== syllabusId)
    );
  };

  return (
    <SyllabusContext.Provider
      value={{
        selectedSyllabi,
        addSyllabus,
        removeSyllabus,
      }}
    >
      {children}
    </SyllabusContext.Provider>
  );
};

export const useSyllabusContext = () => {
  return useContext(SyllabusContext);
};
