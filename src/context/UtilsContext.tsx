import { createContext } from 'react';

interface UtilsContextProps {
	currentDate: any;
	currentMonth: any;
	currentYear: any;
	currentDay: any;
	currentMonthWith2Digits: any;
	currentDayWith2Digits: any;
	daysOfWeek: any;
	currentDateParsedYMD: any;
	getParsedWithTwoDigits: any;
	getDateParsedYMD: any;
	getCurrentTime: any;
	PIXELS_PER_MIN: number;
	CHANNEL_PIXELS_WIDTH: number;
	DAY_CONTAINER_WIDTH: number;
}

export const UtilsContext = createContext<UtilsContextProps>(undefined);
export const UtilsContextProvider = UtilsContext.Provider;

const getParsedWithTwoDigits = (value: number) => {
	return value < 10 ? `0${value}` : `${value}`;
};

const getDateParsedYMD = (date: Date) => {
	return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
};

const getCurrentTime = (): string => {
	const date = new Date();

	const min = ('0' + date.getMinutes()).slice(-2);
	const hour = ('0' + date.getHours()).slice(-2);

	return `${hour}:${min}:${date.getSeconds()}`;
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const currentDay = currentDate.getDate();

const currentMonthWith2Digits = getParsedWithTwoDigits(currentMonth + 1);
const currentDayWith2Digits = getParsedWithTwoDigits(currentDay);

const currentDateParsedYMD = getDateParsedYMD(currentDate);

const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const utilContextValue = {
	currentDate,
	currentMonth,
	currentYear,
	currentDay,
	currentMonthWith2Digits,
	currentDayWith2Digits,
	daysOfWeek,
	currentDateParsedYMD,
	getParsedWithTwoDigits,
	getDateParsedYMD,
	getCurrentTime,
	PIXELS_PER_MIN: 8,
	CHANNEL_PIXELS_WIDTH: 75,
	DAY_CONTAINER_WIDTH: 98,
};
