/**
 * @name classNames
 * @param  {...String} classes
 * @returns {String}
 */
 const cs = (...classes) => classes.filter((cls) => !!cls).join(" ");

 export default cs;