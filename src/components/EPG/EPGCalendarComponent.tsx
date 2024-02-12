import { MutableRefObject, useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContext';

type DayType = {
	name: string;
	date: string;
	isToday: boolean;
};

interface EPGCalendarProps {
	calendarRef: MutableRefObject<HTMLDivElement>;
}

const EPGCalendarComponent = ({ calendarRef }: EPGCalendarProps) => {
	const {
		currentMonthWith2Digits,
		currentDateParsedYMD,
		getDateParsedYMD,
		getParsedWithTwoDigits,
		currentMonth,
		currentYear,
		daysOfWeek,
	} = useContext(UtilsContext);

	const getDaysOfMonth = (): DayType[] => {
		const date = new Date(currentYear, currentMonth, 1);
		let days = [];

		while (date.getMonth() === currentMonth) {
			const dateParsedYMD = getDateParsedYMD(date);

			const dateFormatted = `${getParsedWithTwoDigits(
				date.getDate()
			)}.${currentMonthWith2Digits}`;

			const day = {
				name: daysOfWeek[date.getDay()].slice(0, 3),
				date: dateFormatted,
				isToday: currentDateParsedYMD === dateParsedYMD,
			};

			days.push(day);
			date.setDate(date.getDate() + 1);
		}

		return days;
	};

	const renderDayOfTheMonth = (day: DayType) => {
		return (
			<div
				className={`epg-calendar-day ${day.isToday ? 'today' : ''}`}
				key={day.date}
			>
				<span> {day.name}</span>
				<span> {day.date}</span>
			</div>
		);
	};

	const renderCalendar = () => {
		const listOfDays = getDaysOfMonth();

		return listOfDays.map((day) => renderDayOfTheMonth(day));
	};

	return (
		<div className="epg-calendar" ref={calendarRef}>
			{renderCalendar()}
		</div>
	);
};

export default EPGCalendarComponent;
