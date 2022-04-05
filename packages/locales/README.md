# @ferz/locales

Calendar locales for ferz.

## Syntax

To use a locale in your code, first import and register it:

```
import { FaGregorianLocale } from '@ferz/locales';

DateTimeConfiguration.addLocaleSupport(FaGregorianCalendar);
```

Then you can use the locale when formatting dates:

```
DateTime.now().stringfiyWith('EEEE yyyy-mm-dd', 'fa')
```
