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
  
