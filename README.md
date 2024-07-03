# Class Components Task

## Setup
1. **Clone the repository:**
    ```bash
    git clone -b class-components https://github.com/ikizey/nanyaRS.git
    cd nanyaRS
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Scripts
- **Start the development server:**
    ```bash
    npm start

- **Build the project:** 
    ```bash
    npm run build
    ```

- **Run ESLint:**
    ```bash
    npm run lint
    ```
## Usage
1. **Search for items:**
    - Enter a search term into the search input.
    - Click the Search button.
    - The results will be displayed in the main section.

2. **Error handling:**
    - The application is wrapped with an error boundary to catch and log errors.
    - A fallback UI is displayed if an error occurs.
    - To test error boundary use 'Throw Test Error' in the top right corner.