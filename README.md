# Simulo - Vocabulary Exercise Platform

Simulo is a full-stack web application for vocabulary learning through exercises. Utilizing Node.js, Express, MongoDB, React, and integrating with ChatGPT and WordsAPI, exercises are generated for words input by users, and the interval for word reiteration is adaptively adjusted according to the user's feedback.

![image](https://github.com/vincentostrowski/simulo-gpt-exercises/assets/92182422/e82801d5-9647-4c02-856b-cda52a76b539)
![image](https://github.com/vincentostrowski/simulo-gpt-exercises/assets/92182422/c63ca394-21fb-4547-a67d-0eb35286e483)

## Technologies Used

- React
- Express
- Node.js
- MongoDB
- ChatGPT API
- WordsAPI
- Tailwind
- Socket.io
- Firebase Auth

## Features

- **Dynamic Vocabulary Exercises**: Users can input words, and Simulo generates exercises for those words. The difficulty feedback from the user determines the frequency of word reiteration.
- **Intelligent Exercise Generation**: Utilizes the ChatGPT API to create varied exercises, ensuring each repetition is a new experience.
- **Optimized Performance**: The backend is engineered for minimal initial API calls for immediate UI responsiveness, followed by asynchronous generation of additional exercises for future use by all users using that word.
- **Vocabulary Packs**: Browse uploaded collections of words you may want to add to your library.

![image](https://github.com/vincentostrowski/simulo-gpt-exercises/assets/92182422/159f0840-eaad-407a-90ff-144dae2fbf67)
![image](https://github.com/vincentostrowski/simulo-gpt-exercises/assets/92182422/c72782cc-d11a-4396-919f-351267c96d0e)

## Try it out: 
https://gpt-vocab-exercise.vercel.app/ 

### Important Notice About Load Times
Please note that this project is hosted on a platform that automatically spins down the backend services during periods of inactivity. As a result, the initial load time may be longer than usual.
