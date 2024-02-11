const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

type DayType = {
	name: string;
	date: string;
	isToday: boolean;
};

const EPGCalendar = () => {
	const getDaysOfMonth = (): DayType[] => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();

		var date = new Date(year, month, 1);
		var days = [];

		const monthParsed = month < 10 ? `0${month + 1}` : `${month + 1}`;

		while (date.getUTCMonth() === month) {
			const numberOfTheDay = date.getDate();

			const todayParsed = `${today.getFullYear()}/${
				today.getMonth() + 1
			}/${today.getDate()}`;

			const dateParsed = `${date.getFullYear()}/${
				date.getMonth() + 1
			}/${date.getDate()}`;

			const day = {
				name: daysOfWeek[date.getDay()],
				date:
					numberOfTheDay < 10
						? `0${numberOfTheDay}.${monthParsed}`
						: `${numberOfTheDay}.${monthParsed}`,
				isToday: todayParsed === dateParsed,
			};

			days.push(day);
			date.setUTCDate(date.getUTCDate() + 1);
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

		return (
			<div className="epg-calendar">
				{listOfDays.map((day) => renderDayOfTheMonth(day))}
			</div>
		);
	};

	return <div>{renderCalendar()}</div>;
};

export default EPGCalendar;