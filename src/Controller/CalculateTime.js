export const calculateTime = (date) => {
    let todayDate = new Date();
    let packageDate = new Date(date);

    let differenceInDays = Math.floor(
      (todayDate.getTime() - packageDate.getTime()) / (1000 * 24 * 60 * 60)
    );
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