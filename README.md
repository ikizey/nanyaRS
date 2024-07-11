# React routing task

## Setup

1. **Clone the repository:**

   ```bash
   git clone -b hooks-and-routing https://github.com/ikizey/nanyaRS.git
   cd nanyaRS
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Scripts

- **Start the development server:**

  ```bash
  npm run dev

  ```

- **Build the project:**

  ```bash
  npm run build
  ```

- **Run ESLint:**

  ```bash
  npm run lint
  ```

- **Run tests:**

  ```bash
  npm run test
  ```

## Usage

1. **Search for items:**

   - Enter a search term into the search input.
   - Click the **Search** button.
   - The results will be displayed in the main section.
   - If no characters are found, there will be a relevant info string.
   - It is possible to use the search parameter (**?search={search term}**) in the address bar to use search.

2. **Show/hide character info:**

   - Click on a character from the search results. **The character info block will open**.
   - Click the **X** (close) button or anywhere on the search bar to close the character details block.
   - If no character is found, there will be a relevant info string.
   - It is possible to use the **/details/{characterId}** path in the address bar to navigate to the target character.

3. **Pagination:**

   - Under the search results (if there are any), there will be a paginator.
   - Click on any page number to move to another page.
   - It is possible to use the page parameter (**?page={page}**) in the address bar to navigate to the target page.

4. **Not found page:**

   - Go to a non-existent route (**/no-such-path**), the not found page will show up.

5. **Error handling:**

   - The main route is wrapped with an error element to catch and log errors.
   - A fallback UI is displayed if an error occurs.
