# Vue 3 Currency Converter

A fast and efficient currency converter built with Vue 3, designed for travelers who need to quickly convert currencies on-the-go. This project utilizes the Frankfurter API to fetch real-time currency conversion rates without the need for an API key.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Milestones](#milestones)
- [Contributing](#contributing)
- [License](#license)

## Features

- Two numeric input fields and two select dropdowns for currency selection
- Fetches currency options dynamically from the Frankfurter API
- Real-time currency conversion on input change
- Disables duplicate currency selection to avoid conversion errors (Bonus)
- Optional charting feature to visualize currency trends using Apex Charts (Bonus)
- Organized and clean UI that you can customize as per your requirements

## Demo

Check out a live demo of the Vue 3 Currency Converter [here](https://emiliogall.github.io/vue-currency-converter).

## Installation

To install the Vue Currency Converter, you can use npm or yarn by running the following commands:

```bash
npm install vue-currency-converter
```

or

```bash
yarn add vue-currency-converter
```

## Usage

To use the Vue Currency Converter in your Vue application, follow these steps:

1. **Import the component:**

```javascript
import VueCurrencyConverter from 'vue-currency-converter';
```

2. **Register the component:**

```javascript
export default {
  components: {
    VueCurrencyConverter,
  },
}
```

3. **Use the component in your template:**

```html
<template>
  <div>
    <h1>Currency Converter</h1>
    <vue-currency-converter />
  </div>
</template>
```

## API

The Vue Currency Converter utilizes the following props:

- `baseCurrency`: String - The default currency for conversions (default: "EUR").
- `targetCurrency`: String - The secondary currency for conversions (default: "USD").
- `currencies`: Array - A list of currencies fetched from the Frankfurter API.

### Example

```html
<vue-currency-converter 
  :base-currency="'EUR'" 
  :target-currency="'USD'" 
  :currencies="['EUR', 'USD', 'GBP', 'JPY']" 
/>
```

## Milestones

### Milestone 1
Create a reusable component containing an input field and a select dropdown for currency selection.

### Milestone 2
At application startup, call the Frankfurter API using Axios to populate the select dropdowns with available currencies. Default the first select to "Euro" and the second to "United States Dollar".

### Milestone 3
Implement functionality that triggers an API call whenever the user types in either input field, returning the converted value in the selected currency.

### Milestone 4
Update the conversion result whenever a user changes the selected currency in either select dropdown, making a new API call to reflect the change.

### Bonus 1
Disable the option to select the same currency in both dropdowns to prevent invalid conversions.

### Bonus 2
Integrate a component that displays a chart (using Apex Charts) showing the historical values of the two selected currencies.

### Bonus 3
Utilize Axios with async/await instead of the traditional `.then()` and `.catch()` syntax for cleaner asynchronous code.

## Contributing

We welcome contributions! If you're interested in contributing to the project, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

For more information and updates, check out the project repository on [GitHub](https://github.com/EmilioGall/vue-currency-converter). 

---

Happy coding!
