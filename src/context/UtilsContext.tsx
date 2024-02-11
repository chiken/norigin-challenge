import { createContext } from 'react';

interface UtilsContextProps {
	currentDate: Date;
	currentMonth: number;
	currentYear: number;
	currentDay: number;
	currentMonthWith2Digits: string;
	currentDayWith2Digits: string;
	daysOfWeek: string[];
	currentDateParsedYMD: string;
	getParsedWithTwoDigits: (value: number) => string;
	getCurrentTimeOnMin: () => number;
	getDateParsedYMD: (date: Date) => string;
	getCurrentTime: () => string;
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

const getCurrentTimeOnMin = (): number => {
	const date = new Date();
	const hour = date.getHours();
	const min = date.getMinutes();

	return hour * 60 + min;
};

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
	getCurrentTimeOnMin,
	PIXELS_PER_MIN: 5,
	CHANNEL_PIXELS_WIDTH: 75,
	DAY_CONTAINER_WIDTH: 98,
};
