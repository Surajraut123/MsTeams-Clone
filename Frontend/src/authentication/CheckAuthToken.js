// utils.js or similar
export const checkAuthToken = async () => {
    try {
        const response = await fetch('/api/checkToken', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        return data.isValid;
    } catch (error) {
        console.error("Token check failed:", error);
        return false;
    }
};
