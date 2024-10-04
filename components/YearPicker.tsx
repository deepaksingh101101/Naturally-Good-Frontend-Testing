// components/YearPicker.tsx
import React, { useState } from 'react';

const YearPicker: React.FC<{ onYearChange: (year: number) => void }> = ({ onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023; // Fixed start year
  const endYear = currentYear; // Current year

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    onYearChange(year);
  };

  return (
    <div className="flex items-center">
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="border p-2 rounded"
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;
