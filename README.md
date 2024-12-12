# Vue Currency Converter

A Vue.js application that allows users to convert currencies in real-time using the Frankfurter API. This project showcases dynamic user interaction and API integration for currency conversion features.

## Table of Contents

- [Dependencies](#dependencies)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Milestones](#milestones)
- [Contributing](#contributing)

## Dependencies

This project utilizes the following technologies:

- **Vue.js**: The progressive JavaScript framework for building user interfaces.
- **Vite**: A fast development server and build tool for modern web applications.
- **Axios**: For making HTTP requests to the currency conversion API.
- **Bootstrap**: For styling and responsive design.
- **Frankfurter API**: A free and reliable API for currency exchange rate data.

## Features

1. **Real-Time Currency Conversion**:
   - Users can convert values between different currencies.
   - Exchange rates are fetched dynamically from the Frankfurter API.

2. **Dynamic Currency Selector**:
   - A dropdown menu displays all available currencies supported by the API.

3. **Error Handling**:
   - Displays error messages for invalid inputs or API issues.

4. **Responsive Design**:
   - Optimized for both desktop and mobile devices using Bootstrap.

## Environment Variables

This project does not require custom environment variables for the API, as the Frankfurter API does not require an API key. However, for other configurations, you can define environment variables in a `.env` file.

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/EmilioGall/vue-currency-converter.git
   cd vue-currency-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

## Milestones

1. **Initial Setup**:
   - Initialize the Vue project using Vite.
   - Configure folder structure for components and assets.

2. **API Integration**:
   - Connect to the Frankfurter API to fetch live currency rates.
   - Parse and display data dynamically in the application.

3. **Currency Selector**:
   - Implement dropdown menus populated with currencies retrieved from the API.

4. **Conversion Logic**:
   - Develop logic for converting amounts between selected currencies.
   - Ensure accurate calculations based on real-time rates.

5. **UI/UX Enhancements**:
   - Design a user-friendly interface using Bootstrap.
   - Add interactive feedback for user actions, such as loading indicators and validation errors.

6. **Testing**:
   - Test functionality for accurate conversions and responsive design.
   - Handle edge cases, such as unsupported currencies or zero-value conversions.

7. **Deployment**:
   - Optimize the application for production.
   - Deploy the application to a hosting platform like Netlify or Vercel.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

For more details, visit the [GitHub repository](https://github.com/EmilioGall/vue-currency-converter).

---

Happy coding!

