# Ferz

> Ferz is a library for working with dates, times and 10 different calendars in JavaScript.

## Table of contents

- [Ferz](#ferz)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authors](#authors)
  - [License](#license)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install -S ferz
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev ferz
```

## Usage
To get the current date, you can use the **now** as below:
```
DateTime.now()
```
to get the date in a specific calendar, you can pass it as an argument
```
DateTime.now('persian')
``` 

To format the date, call **stringifyWith** with the format you need, for example:
```
DateTime.now().stringifyWith('yyyy-MM-dd')
```
will give you 2022-02-02


## Authors

* **Farzin Farzanehnia** - *Initial work* - [Farzin Farzanehnia](https://github.com/farzinfweb)

See also the list of [contributors](https://github.com/farzinfweb/ferz/contributors) who participated in this project.

## License

[MIT License](https://farzinfweb.mit-license.org/2019) © Farzin Farzanehnia
