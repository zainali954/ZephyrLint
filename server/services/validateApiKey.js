import axios from 'axios';

async function verifyGeminiApiKey(apiKey) {
    const API_VERSION = 'v1';
    const apiUrl = `https://generativelanguage.googleapis.com/${API_VERSION}/models?key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If the response is successful (status code 200), return true
        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Invalid API key');
        }
    } catch (error) {
        // Handle errors such as invalid key or network issues
        let errorMessage = 'Invalid API key'; // Default error message

        if (error.response) {
            // If we received a response with an error code (e.g., 400, 401)
            errorMessage = error.response.data?.error?.message || errorMessage;
        } else if (error.request) {
            // If the request was made but no response was received
            errorMessage = 'No response received from the server';
        } else {
            // If there was another error (e.g., network failure)
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
}

export default verifyGeminiApiKey;
