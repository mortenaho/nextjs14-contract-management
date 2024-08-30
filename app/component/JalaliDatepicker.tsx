"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { convertToJalali } from "../_lib/converter";

type dateFormat = {
    year: number;
    month: number;
    day: number;
};

const JalaliDatepicker = ({ defaultValue = ""}) => {
    const [selectedDay, setSelectedDay] = useState<dateFormat>();
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const toDateFormat = (date: string) => {
        var dateObj = date.split("/");
        setSelectedDay({
            year: Number(dateObj[0]),
            month: Number(dateObj[1]),
            day: Number(dateObj[2]),
        });
    };

    const onCahnge = (date: dateFormat) => {
        setSelectedDay(date);
        setIsOpen(false);
    };

    useEffect(() => {
        if (defaultValue) {
            var jalaliDate = convertToJalali(defaultValue);
            toDateFormat(jalaliDate);
        }
    }, [defaultValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <input
                type="text"
                ref={inputRef}
                value={
                    selectedDay?.year + "/" + selectedDay?.month + "/" + selectedDay?.day
                }
                onClick={() => setIsOpen(true)}
                readOnly
                onChange={()=>onCahnge}
            />
            <div
                ref={calendarRef}
                className={`${!isOpen ? "hidden" : "absolute"} z-10`}
            >
                <Calendar
                    value={selectedDay}
                    locale={"fa"}
                    shouldHighlightWeekends
                />
            </div>
        </div>
    );
};

export default JalaliDatepicker;
