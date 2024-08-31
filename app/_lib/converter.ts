
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



export  const convertToJalali = (gregorianDate:string) => {
    const [year, month, day] = gregorianDate.split('/').map(Number);
    const jalaliDate = jalaali.toJalaali(year, month, day);
    return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
};

export const convertToGregorian = (jalaliDate:string) => {
    
   if(jalaliDate!='' || jalaliDate.length>0){
    const [year, month, day] = convertPersianToEnglish(jalaliDate.toString()).split('/').map(Number);
    const gregorianDate = jalaali.toGregorian(year, month, day);
    return `${gregorianDate.gy}/${gregorianDate.gm}/${gregorianDate.gd}`;
   }
   return ""
};

export const  convertPersianToEnglish=(str:string) =>{
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let convertedStr = str;
    for (let i = 0; i < 10; i++) {
        convertedStr = convertedStr.replace(persianNumbers[i], englishNumbers[i]);
    }
    return convertedStr;
}
