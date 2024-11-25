export const feedbackHandler = async (rating: number | null = null, details: object | null = null) => {
    console.log("IONOS:feedbackHandler", rating, details);

    const result = {
        success: false,
        message: "Failed to post feedback"
    }

    return result;
}


