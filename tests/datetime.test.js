import { DateTime } from '../src/DateTime';
import { PersianCalendar } from '../src/PersianCalendar';

describe('DateTime', () => {
	it('should set the calendar passed', () => {
		const date = new DateTime({}, new PersianCalendar);
		expect(date.calendar.name).toBe('persian');
	});

	it('should set the initial date config correctly', () => {
		const date = new DateTime({year: 1399, month: 10, day: 25}, new PersianCalendar);
		expect([date.year, date.month, date.day]).toStrictEqual([1399, 10, 25]);
	});

	it('should set the default calendar', () => {
		DateTime.setDefaultCalendar(new PersianCalendar);
		expect(new DateTime({}).calendar.name).toBe('persian');
	});

	it('should set the time config correctly', () => {
		const time = new DateTime({hour: 22, minute: 56, second: 32}, new PersianCalendar);
		expect([time.hour, time.minute, time.second]).toStrictEqual([22, 56, 32]);
	})
});