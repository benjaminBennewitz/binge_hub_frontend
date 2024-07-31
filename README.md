# Netflix clone Frontend - BINGE HUB

## Project Overview
The BINGE HUB is a small video streaming platform with a token-based login/authentication. The user can stream content here at any time and from anywhere. The app communicates with a (DJANGO/ https://github.com/benjaminBennewitz/binge_hub_backend) backend.

## Why This Project is Useful
The BINGE HUB project is purely a learning project. It involves the implementation of authentication mechanisms and the verification of user data.

## Installation Guide
Follow these steps to set up the BINGE HUB Frontend on your local machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 12 or later)
- [Angular CLI](https://angular.io/cli) (version 17 or later)
- [Git](https://git-scm.com/)

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/benjaminBennewitz/binge_hub_frontend.git
    ```
2. Change to the project directory:
    ```bash
    cd binge_hub_frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    ng serve
    ```
5. Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

6. Check URLS and Ports:
    ```right port/url
    make sure to use port :4000 for frontend otherwhise some links doesnt work
    ```
7. Check production URLS:
    ```correct environments
    make sure to use your own website links/urls in environments.ts
    ```

### Configuration
Ensure the backend API URL is correctly set in your environment configuration files. Modify the environment files (`src/environments/environment.ts` and `src/environments/environment.prod.ts`) as needed to match your backend API settings.

### Building for Production
To build the project for production, run:
```bash
ng build --configuration production
```

## How Users Can Get Involved
Users can contribute to the project in several ways:
1. **Report Issues**: If you encounter any bugs or have suggestions for improvements, please report them via the [GitHub Issues](https://github.com/benjaminBennewitz/binge_hub_frontend/issues) page.
2. **Submit Pull Requests**: If you want to contribute code, fork the repository, make your changes, and submit a pull request. Make sure to follow the [contribution guidelines](CONTRIBUTING.md).

## Getting Help
If you have questions or run into problems, you can:
- Open an issue on GitHub
- Contact us via email: support@example.com

## Project Maintainers and Contributors
The TICKETEER Frontend project is managed by the following individuals:
- **Benjamin Bennewitz (https://github.com/benjaminBennewitz)** - Lead Developer


## License

This project is licensed under the MIT License