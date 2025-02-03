
const MONTHS = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

/**
 * 
 * @param date 
 * @returns YYYY-MM-dd
 */
export function getDateFormat(date : Date){
  
    let month =  date?.getMonth() < 10 ?  "0"+date.getMonth() :  date.getMonth();
    let day =  date?.getDate() < 10 ?  "0"+date.getDate() :  date.getDate();

     return date.getFullYear() +"-"+ month+"-"+ day;

}

export function isDate (date : string) {
    //@ts-ignore
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}