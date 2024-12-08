// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "http://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // This is an example code that checks the submitted name. You may remove it from your code
  // checkForName(formText);

  // Check if the URL is valid
  if (!isValidURL(formText)) {
    alert("Please enter a valid URL.");
    return;
  }

  console.log("::: Form Submitted :::");

  // If the URL is valid, send it to the server using the serverURL constant above
  try {
    // Send the URL to the server
    const responseData = await sendDataToServer(formText);

    // Debug: Log the response from the server
    console.log('API Response:', responseData);

    // Update the UI with the server response
    updateUI(responseData);
} catch (error) {
    console.error('Error during API request:', error);
    alert('Something went wrong while processing your request.');
}
}

// Function to validate URL
function isValidURL(formText) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*).)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IPv4
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return !!urlPattern.test(formText);
}

// Function to send data to server
async function sendDataToServer(inputUrl) {
    const response = await fetch(serverURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputUrl}),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch from the server');
    }

    return response.json(); // Return the parsed JSON response
}

// Update the UI with the results from the server
function updateUI(data) {
    const resultsDiv = document.getElementById('results');
    const { score_tag, agreement, subjectivity, irony, confidence, sentence_list} = data;

    resultsDiv.innerHTML = `
        <p><strong>Polarity:</strong> ${score_tag}</p>
        <p><strong>Subjectivity:</strong> ${subjectivity}</p>
        <p><strong>Agreement:</strong> ${agreement}</p>
        <p><strong>Irony:</strong> ${irony}</p>
        <p><strong>Confidence:</strong> ${confidence}%</p>
        <p><strong>Sample Text:</strong> ${sentence_list[0].text}%</p>
    `;
}

// Export the handleSubmit function
export { handleSubmit };
