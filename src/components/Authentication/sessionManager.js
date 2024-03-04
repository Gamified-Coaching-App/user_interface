import { fetchAuthSession } from '@aws-amplify/auth';

export const fetchSession = async () => {
    // First, try to retrieve the JWT token from session storage
    let jwtToken = sessionStorage.getItem('jwtToken');
    console.log("JWT Token: ", jwtToken);

    // If the token isn't in session storage, fetch and store it
    if (!jwtToken) {
        try {
            const session = await fetchAuthSession();

            if (session.tokens && session.tokens.idToken && typeof session.tokens.idToken.toString === 'function') {
                jwtToken = session.tokens.idToken.toString();
                console.log("JWT Token:", jwtToken);
                sessionStorage.setItem('jwtToken', jwtToken);
            } else {
                console.log("JWT token method not found in idToken.");
            }
        } catch (error) {
            console.error("Error fetching JWT token:", error);
        }
    }

    return jwtToken;
};
