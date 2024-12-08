const request = require('supertest');
const app = require('./index'); 

describe('Server API Tests', () => {
    it('should return 400 if URL is not provided in POST /api', async () => {
        const response = await request(app).post('/api').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('URL is required');
    });

    it('should return sentiment analysis data on valid POST /api', async () => {
        const response = await request(app).post('/api').send({
            url: 'https://www.france24.com/en/tv-shows/eye-on-africa/20241204-civil-society-scpetical-of-the-lobito-project-impact-on-local-economy' // Use a valid URL for testing
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('score_tag'); 
    });

    it('should return 500 on API fetch error', async () => {
        // Mock the fetch function to simulate an error
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Failed to fetch from MeaningCloud API'))
        );

        const response = await request(app).post('/api').send({
            url: 'https://example.com'
        });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to analyze the URL');
    });
});