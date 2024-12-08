# Evaluate a News Article with Natural Language Processing

## Project Overview

This project is a web tool that uses Natural Language Processing (NLP) to analyze the sentiment of news articles or blogs using the MeaningCloud Sentiment Analysis API. Users can submit a URL to a news article or blog, and the application returns an analysis of the content, including:

- Polarity (positive, negative, neutral, or mixed)
- Subjectivity (subjective or objective)
- Agreement (agreement or disagreement among the content)
- Confidence (confidence level of the analysis)
- Irony (whether the content is ironic)

## Features

- Users can input a URL and submit it for analysis.
- The application validates the URL before sending it to the API.
- Sentiment analysis results are displayed dynamically on the UI.
- Service workers are implemented for offline functionality.
- Unit tests are provided to ensure the correctness of the code.

## Installation
1. Clone this repository.
2. Run `npm install` to install dependencies.

## Environment Variables
1. SCreate a .env file in the root of your project and add your MeaningCloud API key
2. ```bash
   API_KEY=your_meaningcloud_api_key


## Running the Project in development mode
1. Start the development server:
   ```bash
   npm run build-dev
2. Visit http://localhost:3000 in your browser.

## Running the Project in production mode
1. Start the development server:
   ```bash
   npm run build-prod
2. Start the server:
   ```bash
   npm start

## Testing the Project 
1. Start the development server:
   ```bash
   npm run test
