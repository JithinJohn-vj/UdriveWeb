/* eslint-disable */

export const CustomformatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const monthIndex = dateObject.getMonth(); // Note: Month is zero-based
  const year = dateObject.getFullYear();

  // Array of month abbreviations
  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${day}-${monthAbbreviations[monthIndex]}-${year}`;
};

export const CustomconvertTo12HourFormatString = (timeString) => {
  if (typeof timeString === 'string') {
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';

    let formattedHours = parseInt(hours, 10);
    if (formattedHours > 12) {
      formattedHours -= 12;
      period = 'PM';
    }

    // Ensure the formatted hours are displayed with leading zeros if needed
    formattedHours = formattedHours.toString().padStart(2, '0');

    return `${formattedHours}:${minutes} ${period}`;
  }

  // Return the original value if it's not a valid string
  return timeString;
};

export const CustomconvertTo12HourFormatArray = (timeArray) => {
  console.log(timeArray);
  if (Array.isArray(timeArray) && timeArray.length === 1) {
    const [timeString] = timeArray;
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';

    let formattedHours = parseInt(hours, 10);

    if (formattedHours === 0) {
      formattedHours = 12; // Midnight
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = 'PM';
    }

    // Ensure the formatted hours and minutes are displayed with leading zeros if needed
    formattedHours = formattedHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    console.log(formattedHours);
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  // Return the original value if it's not a valid array
  return timeArray;
};

export const formatPhoneNumber = (contactNumber) => {
  // Convert the number to a string and then split it into groups of digits and join them with dashes
  const numberString = contactNumber.toString();
  return `${numberString.substring(0, 3)}-${numberString.substring(3, 6)}-${numberString.substring(6)}`;
};

export const formatToMDY = (inputDate) => {
  if (inputDate) {
    console.log(inputDate);
    const dateParts = inputDate.split(' ');
    const date = dateParts[0];
    const time = dateParts[1];
    const t = dateParts[2];
    console.log(t);
    const [day, month, year] = date.split('-');

    const formattedDate = `${month}-${day}-${year.substr(2)}`;
    const formattedTime = `${time} ${t}`;
    console.log(formattedDate);
    console.log(formattedTime);
    return `${formattedDate} ${formattedTime}`;
  }
};

export const formatToYMD = (dateString) => {
  // Split the date and time parts
  const [datePart, timePart] = dateString.split(' ');

  // Split the date into day, month, and year
  const [day, month, year] = datePart.split('-');

  // Split the time into hours and minutes
  const [time, period] = timePart.split(' ');
  const [hours, minutes] = time.split(':');

  // Convert hours to 24-hour format if needed
  let convertedHours = hours;
  if (period === 'PM' && hours !== '12') {
    convertedHours = String(Number(hours) + 12);
  } else if (period === 'AM' && hours === '12') {
    convertedHours = '00';
  }

  // Format the date in YYYY-MM-DDTHH:mm format
  const isoDate = `${year}-${month}-${day}T${convertedHours}:${minutes}`;

  return isoDate;
};

export const formatSuffixDate = (inputDate) => {
  if (inputDate) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dateParts = inputDate.split(' ');
    const day = parseInt(dateParts[0].split('-')[0]);
    const monthIndex = parseInt(dateParts[0].split('-')[1]) - 1;
    const year = parseInt(dateParts[0].split('-')[2]);
    const hour = parseInt(dateParts[1].split(':')[0]);
    const minute = parseInt(dateParts[1].split(':')[1]);
    const period = dateParts[2].toUpperCase();
    const formattedDay = (() => {
      if (day >= 11 && day <= 13) {
        return day + 'th';
      }
      switch (day % 10) {
        case 1:
          return day + 'st';
        case 2:
          return day + 'nd';
        case 3:
          return day + 'rd';
        default:
          return day + 'th';
      }
    })();

    const formattedMonth = months[monthIndex];

    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    const formattedPeriod = period;

    return `${formattedDay} ${formattedMonth} ${formattedHour}:${formattedMinute} ${formattedPeriod}`;
  }
};
export const formatSuffixDateAdv = (inputDate) => {
  if (inputDate) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dateParts = inputDate.split(' ');
    const day = parseInt(dateParts[0].split('-')[0]);
    const monthIndex = parseInt(dateParts[0].split('-')[1]) - 1;
    const year = parseInt(dateParts[0].split('-')[2]);
    const hour = parseInt(dateParts[1].split(':')[0]);
    const minute = parseInt(dateParts[1].split(':')[1]);
    const period = dateParts[2].toUpperCase();
    const formattedDay = (() => {
      if (day >= 11 && day <= 13) {
        return day + 'th';
      }
      switch (day % 10) {
        case 1:
          return day + 'st';
        case 2:
          return day + 'nd';
        case 3:
          return day + 'rd';
        default:
          return day + 'th';
      }
    })();

    const formattedMonth = months[monthIndex];

    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    const formattedPeriod = period;

    return `${formattedDay} ${formattedMonth}`;
  }
};

export const checkDaysLeft = (dateString) => {
  const passedDate = new Date(dateString);

  const currentDate = new Date();

  if (currentDate > passedDate) {
    return 'expired';
  } else {
    const differenceMs = passedDate - currentDate;
    const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return `${daysLeft} days left`;
  }
};

const result = checkDaysLeft('2024-05-14T18:30:00.000Z');
console.log(result); // Output will vary depending on the current date and time
