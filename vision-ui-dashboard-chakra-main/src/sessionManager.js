//import { fetchAuthSession } from '@aws-amplify/auth';

export const fetchSession = async () => {
    // First, try to retrieve the JWT token from session storage
    //let jwtToken = sessionStorage.getItem('jwtToken');
    const jwtToken = 'eyJraWQiOiI2YmxCTU5iMTkwNVZlKzJEZmRRK0VHVHJzaVVJQTdMdkVxMUNhUFNPZTNvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMmEyNjJlOC1kMzE2LTRjZmItODFhNy0zNWNlNGM3NDAxODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmdnY1FOZWhFIiwiY29nbml0bzp1c2VybmFtZSI6ImYyYTI2MmU4LWQzMTYtNGNmYi04MWE3LTM1Y2U0Yzc0MDE4NCIsIm9yaWdpbl9qdGkiOiJmYzc5NmUzNy05OTYwLTQzZTAtOTU4YS01ZTUxYTMzNzdlYTAiLCJhdWQiOiIyNzlibGEycGJjN2lla2dmaWczdWY5NHQ2YyIsImV2ZW50X2lkIjoiNDA0ODY1YTQtYjhmMy00MDBkLWIzYzYtM2ZmOTRiMzFlOWRhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDgxMTc0MTIsImV4cCI6MTcwODEyMTAxMiwiaWF0IjoxNzA4MTE3NDEyLCJqdGkiOiJjZWM0MDYxYS1lZGJlLTQ0OTAtYWJiOS1iMjJkOTQxYzEyMDciLCJlbWFpbCI6IkdhYnJpZWwub3BwZXJtYW5uMTk5N0BnbWFpbC5jb20ifQ.amgdPU1dz3303skI-Fzs5yG-Bfd3lhJGq1CRMLF64PR3c_KWc_cYUyCYaKepXyIWPTGPRJkx2AEXuO-0LeyuS3GODDtA1qXj9EBWinvQMlFiOZvxrAhIaZldUhRORV0i-si0aij4iOvmfQCck8QrqZrtaIYKKS7SkS7JGw8fPa891EoGf7COEX4eEqg_GKTcapUwQwfRLItowtK36Ig5xEQvx6_45-Fjsz0tvgcwRu8gh0qgF9g7MqOv99NNWvuTecjnJk1vEJZB8VzgoRfKaXyjt_JJuRZL0P0hRdLq_mTFn5HiWVmj7tZp0MxCIB_uQPPadqmZiYOYRitialn6dg';

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