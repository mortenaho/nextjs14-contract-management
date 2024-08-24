import React, { useState } from 'react';
import  DatePicker  from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

const PersianDatePickerDropdown = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div>
      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
        locale="fa" // برای تنظیم تقویم به شمسی
        renderInput={({ ref }) => (
          <input
            readOnly
            ref={ref} // ورودی متصل به DatePicker
            placeholder="Select a date"
            value={selectedDay ? `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}` : ''}
            style={{ cursor: 'pointer' }}
          />
        )}
      />
    </div>
  );
};

export default PersianDatePickerDropdown;
