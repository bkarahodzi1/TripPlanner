# TripPlanner Web Application

## Overview

The TripPlanner Web Application is a versatile tool that helps users plan their journeys by providing personalized recommendations based on input parameters such as budget, interests, preferred categories, destination, and trip duration. The application utilizes OpenAI's GPT-4 API for recommendations and opinions, and UNSPLASH API for fetching images of locations.

## Features

- **Personalized Recommendations:** Tailored suggestions for activities, places to visit, and more based on user input.
  
- **Dynamic Itinerary:** The application generates a day-by-day itinerary, complete with titles, descriptions, and estimated daily costs.
  
- **Worldwide Destination:** Specify your desired destination, and the application will curate recommendations accordingly.

- **User-Friendly Interface:** Simple and intuitive interface for a seamless planning experience.

## Technologies Used

- **Node.js:** The backend of the application is built using Node.js, ensuring a scalable and efficient server-side environment.

- **OpenAI's GPT-4 API:** Harness the power of GPT-4 for generating intelligent recommendations and opinions.

- **UNSPLASH API:** Retrieve high-quality images of locations to enhance the visual appeal of the itinerary.

## Getting Started

To run the TripPlanner Web Application locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Bicom-Systems-Hackathon/code-experts.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd trip-planner/backend
    ```

3. Create a `.env` file in the backend directory with the following content:
    ```env
    apiKey=yourOpenAiApiKey
    splashApi=yourSplashApiKey
    ```

4. Install dependencies:
    ```bash
    npm install express
    npm install cors
    npm install axios
    npm install dotenv
    ```

5. Run the application:
    Go to backend folder
    ```bash
    node index.js
    ```

6. Access the application in your browser at `http://localhost:3000/home`.


## Acknowledgments

- Special thanks to Bicom Systems company for this special opportunity.

Happy planning your journey with TripPlanner! 🌍✈️
