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
        expect(formatter.stringify(new DateTime({year: 2021, month: 4, day: 8}), 'M MM')).toEqual('4 04');
	});

	it('should support two day tokens', () => {
		const formatter = new DateTimeFormatter;
        expect(formatter.stringify(new DateTime({year: 2021, month: 4, day: 8}), 'd dd')).toEqual('8 08');
	});
});