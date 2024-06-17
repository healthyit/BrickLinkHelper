/**
 * Contact requests
 */

// const base_url = 'http://api.dev.quarry.studio:5000/'
const base_url = 'http://localhost:5000/'


// Query to register a new user
export const sendContactForm = async (contact) => {
    try {
        const response = await fetch(base_url + 'contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        const data = {meta: {'status': 0, 'message': 'Error in sending contact form.'}};
        return data;
    }
}
