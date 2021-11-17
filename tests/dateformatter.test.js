import { DateTime } from '../src/DateTime';
import { DateTimeFormatter } from '../src/DateTimeFormatter';
import { GregorianCalendar } from '../src/GregorianCalendar';

describe('DateTimeFormatter', () => {
	beforeAll(() => {
		DateTime.setDefaultCalendar(new GregorianCalendar)
	});

	it('should parse the string format correctly', () => {
		const formatter = new DateTimeFormatter;
        expect(formatter.parse('yyyy-mm-dd')).toEqual(['yyyy', '-', 'mm', '-', 'dd']);
	});

	it('should support three year tokens', () => {
		const formatter = new DateTimeFormatter;
        expect(formatter.stringify(DateTime.now(), 'y yy yyyy')).toEqual('2021 21 2021');
	});

	it('should support two month tokens', () => {
		const formatter = new DateTimeFormatter;
        expect(formatter.stringify(DateTime.fromObj({year: 2021, month: 4, day: 8}), 'M MM')).toEqual('4 04');
	});

	it('should support two day tokens', () => {
		const formatter = new DateTimeFormatter;
        expect(formatter.stringify(DateTime.fromObj({year: 2021, month: 4, day: 8}), 'd dd')).toEqual('8 08');
	});

	it('should support four tokens for hour', () => {
		const formatter = new DateTimeFormatter;
		const time = DateTime.fromObj({hour: 16, minute: 9, second: 26});
        expect(formatter.stringify(time, 'h hh')).toEqual('4 04');
		expect(formatter.stringify(time, 'H HH')).toEqual('16 16');
	});

	it('should support two tokens for minute|second', () => {
		const formatter = new DateTimeFormatter;
		const time = new DateTime({hour: 22, minute: 9, second: 26});
        expect(formatter.stringify(time, 's ss')).toEqual('26 26');
		expect(formatter.stringify(time, 'm mm')).toEqual('9 09');
	});
});