import * as dayjs from 'dayjs'

const SEG = 1000;
const MIN = 60000;
const HOUR = 3600000;
const DAY = 86400000;

const unixTime = () => {

	return Date.now();

}

const subDays = (unix, days) => {

	return new Date(unix - (days * DAY));

}

const format = (date) => {


}

export {
	unixTime,
	subDays
}