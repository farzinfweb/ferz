import DateTime from '../src/DateTime';
import PersianCalendar from '../src/PersianCalendar';

describe('DateTime', () => {
	it('should set the calendar passed', () => {
		const date = new DateTime({}, new PersianCalendar);
		expect(date.calendar.name).toBe('persian');
	});
});
