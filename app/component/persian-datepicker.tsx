import React, { useState } from 'react';
import { DatePicker } from 'zaman';
 
const PersianDatePickerDropdown = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div>
          <DatePicker onChange={(e) => console.log(e.value)} />
    </div>
  );
};

export default PersianDatePickerDropdown;
