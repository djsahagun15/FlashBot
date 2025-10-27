# FlashBot
AI Chatbot (Gemini 2.0 Flash)

## Setup & Installation
1. **Clone this repository**
    ```
    git clone https://github.com/djsahagun15/FlashBot.git
    cd FlashBot
    ```

2. **Backend setup**
   Install dependencies:
    ```
    cd server
    npm install
    ```

   Create `.env` file inside `server/services/` and add your Gemini API key:
    ```
    API_KEY="YOUR_API_KEY_HERE"
    ```

   Start the server:
    ```
    node server
    ```

3. **Frontend setup**
   Install dependencies:
    ```
    cd client
    npm install
    ```

   Start dev server:
    ```
    npm run dev
    ```


4. **Build for production**
    ```
    npm run build
    npm run preview
    ```
