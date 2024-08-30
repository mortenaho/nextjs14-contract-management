
import jalaali from 'jalaali-js';

export const formDataToJson = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };
  


 export function formatDate(date,seprator='-') {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join(seprator);
}



export  const convertToJalali = (gregorianDate) => {
    const [year, month, day] = gregorianDate.split('/').map(Number);
    const jalaliDate = jalaali.toJalaali(year, month, day);
    return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
};

export const convertToGregorian = (jalaliDate) => {
    const [year, month, day] = jalaliDate.split('/').map(Number);
    const gregorianDate = jalaali.toGregorian(year, month, day);
    return `${gregorianDate.gy}/${gregorianDate.gm}/${gregorianDate.gd}`;
};
