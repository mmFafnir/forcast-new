import dayjs from "dayjs";

var timezone = require("dayjs/plugin/timezone"); //
var utc = require("dayjs/plugin/utc");

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
