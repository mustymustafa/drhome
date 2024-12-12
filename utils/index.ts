export function formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); // Get abbreviated month
    const year = date.getFullYear();
  
    // Add ordinal suffix to the day
    const suffix = getDaySuffix(day);
  
    return `${day}${suffix} ${month}. ${year}`;
  }
  
  function getDaySuffix(day: number): string {
    if (day % 10 === 1 && day !== 11) return 'st';
    if (day % 10 === 2 && day !== 12) return 'nd';
    if (day % 10 === 3 && day !== 13) return 'rd';
    return 'th';
  }


  export function formatTime(hour: number, min: number): string {
    const formatMin = min < 10 ? `0${min}` : `${min}`

    return `${hour}:${formatMin}`

  }

   // Generate times from 9:00 AM to 9:00 PM with 30-minute intervals 
   export const generateTimeSlots = () => {
    const times = [];
    let currentHour = 9;
    let currentMinute = 0;

    while (currentHour < 21 || (currentHour === 21 && currentMinute === 0)) {
      const time = `${currentHour}:${currentMinute === 0 ? "00" : currentMinute} ${
        currentHour < 12 ? "AM" : "PM"
      }`;
      times.push(time);

      currentMinute += 30;
      if (currentMinute === 60) {
        currentMinute = 0;
        currentHour++;
      }
    }

    return times;
  };
  
