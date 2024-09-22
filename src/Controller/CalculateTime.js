// function takes publishing data and calculate time elapsed since then
export const calculateTime = (date) => {
    // today's date
    let todayDate = new Date();

    // package published date
    let packageDate = new Date(date);

    // (difference in milliseconds) / (milliseconds in a day) = total days elapsed
    let differenceInDays = Math.floor(
      (todayDate.getTime() - packageDate.getTime()) / (1000 * 24 * 60 * 60)
    );

    // calculating time difference in years, months and days
    if (differenceInDays > 365) {
      return `${
        Math.floor(differenceInDays / 365) > 1
          ? `${Math.floor(differenceInDays / 365)} years ago`
          : "a year ago"
      }`;
    } else if (differenceInDays > 30) {
      return `${
        Math.floor(differenceInDays / 30) > 1
          ? `${Math.floor(differenceInDays / 30)} months`
          : "a month ago"
      }`;
    } else {
      return differenceInDays > 1
        ? `${differenceInDays} days ago`
        : differenceInDays === 1
        ? "a day ago"
        : `${Math.floor(
            (todayDate.getTime() - packageDate.getTime()) / (1000 * 60 * 60)
          )} hours ago`;
    }
  };