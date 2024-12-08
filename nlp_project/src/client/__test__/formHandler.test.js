import { handleSubmit } from '../js/formHandler';

// Mocking the DOM elements and functions
document.body.innerHTML = `
    <form id="urlForm">
        <input id="name" type="text" value="http://example.com" />
        <div id="results"></div>
    </form>
`;

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            score_tag: 'P',
            agreement: 'AGREE',
            subjectivity: 'SUBJECTIVE',
            irony: 'NONIRONIC',
            confidence: 85,
            sentence_list: [{ text: 'This is a sample sentence.' }]
        }),
    })
);

describe('Form Handler Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should alert for invalid URL', () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        document.getElementById('name').value = 'invalid-url';
        handleSubmit(new Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('Please enter a valid URL.');
        alertMock.mockRestore();
    });

    test('should call sendDataToServer with valid URL', async () => {
        document.getElementById('name').value = 'http://example.com';
        await handleSubmit(new Event('submit'));
        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.any(Object));
    });

    test('should update UI with server response', async () => {
        document.getElementById('name').value = 'http://example.com';
        await handleSubmit(new Event('submit'));
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.innerHTML).toContain('Polarity: P');
    });

    test('should handle fetch error', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        document.getElementById('name').value = 'http://example.com';
        await handleSubmit(new Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('Something went wrong while processing your request.');
        alertMock.mockRestore();
    });
});