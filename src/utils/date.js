import moment from "moment";
import "moment/locale/ro";

moment.locale("ro");

const formats = {
  time: "HH:mm",
  day: "MMMM DD",
  month: "MMMM DD",
  year: "DD/MM/YYYY",
  full: "DD.MM.YYYY HH:mm",
};

/**
 * @typedef {Object} Tranformers
 * @property {Function} chatItem
 * @property {String} default
 */

/**
 * @param {Date} date
 * @returns {Tranformers}
 */
export default function date(date) {
  if (!moment(date).isValid()) {
    return date;
  }

  const momentDate = moment(date);

  /**
   * @returns {string} time[HH:mm] | day[MMM DD] | year[DD/MM/YYYY]
   */
  const dynamic = () => {
    const today = moment();
    const isDifferentYear = today.year() !== momentDate.year();
    const isDifferentDay = today.day() !== momentDate.day();

    if (isDifferentYear) return momentDate.format(formats.year);
    if (isDifferentDay) return momentDate.format(formats.day);
    return momentDate.format(formats.time);
  };

  return {
    dynamic,
    default: momentDate.format("MMMM DD, YYYY"),
    time: momentDate.format(formats.time),
    full: momentDate.format(formats.full),
    relative: momentDate.fromNow(),
  };
}
