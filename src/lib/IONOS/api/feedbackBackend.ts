import { PUBLIC_FEEDBACK_BASE_URL } from '$env/static/public';

let feedbackServiceUrl = '';
if (PUBLIC_FEEDBACK_BASE_URL) {
	feedbackServiceUrl = PUBLIC_FEEDBACK_BASE_URL;
}

export const postFeedback = async (comment: string, rating: number) => {
	const response = await fetch(`${feedbackServiceUrl}/feedback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			comment,
			rating
		})
	});

	if (!response.ok) {
		throw new Error('Failed to post feedback');
	}

	return await response.json();
};

export const postRegistration = async (email: string) => {
	const response = await fetch(`${feedbackServiceUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email
		})
	});

	if (!response.ok) {
		throw new Error('Failed to post registration');
	}

	return await response.json();
};
