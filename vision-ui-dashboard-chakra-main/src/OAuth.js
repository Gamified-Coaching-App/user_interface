import { useEffect, useState } from 'react';
import "@aws-amplify/ui-react/styles.css";
import { fetchSession } from './sessionManager';
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card
} from "@aws-amplify/ui-react";

function App({ signOut: amplifySignOut }) {
  const [jwtToken, setJwtToken] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchSession().then(token => {
      setJwtToken(token);
    });
  }, []);

  useEffect(() => {
    const checkForGarminCallback = async () => {
      
      // Check if OAuth process was initiated before handling callback
      if (sessionStorage.getItem('oauthInProgress') === 'true' && jwtToken) {
        sessionStorage.removeItem('oauthInProgress');
        const urlParams = new URLSearchParams(window.location.search);
        const oauthVerifier = urlParams.get('oauth_verifier');
        const oauthToken = urlParams.get('oauth_token');
        if (oauthVerifier && oauthToken) {
          console.log("Handling OAuth Callback with URL Parameters:", { oauthVerifier, oauthToken });
          try {
            const accessTokenUrl = 'https://15ta4l9xxf.execute-api.eu-west-2.amazonaws.com/dev_1/access-token';
            const response = await fetch(accessTokenUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
              },
              body: JSON.stringify({
                oauth_verifier: oauthVerifier,
                oauth_token: oauthToken
              })
            });
            console.error("Status code from API:", response.status);
            if (response.ok) {
              setStatusMessage('Successfully connected to Garmin! You can now use Garmin services.');
            } else {
              // Handle non-200 responses
              setStatusMessage(`Could not connect to Garmin.`);
            }
          } catch (error) {
            console.error("Error fetching access token:", error);
            setStatusMessage(`Error: ${error.message}`);
          }
          sessionStorage.removeItem('oauthInProgress'); // Clear the OAuth process flag
        }
      }
    };

    // Trigger the check for Garmin Callback
    checkForGarminCallback();
  }, [jwtToken]); // This useEffect depends on jwtToken to ensure it's available when the callback is checked

  const initiateGarminOAuth = async () => {
    sessionStorage.setItem('oauthInProgress', 'true'); // Set flag in sessionStorage
    try {
      const apiGatewayUrl = 'https://15ta4l9xxf.execute-api.eu-west-2.amazonaws.com/dev_1/request-token';
      const response = await fetch(apiGatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      window.location.href = data.redirect_url; // User is redirected to Garmin for OAuth
    } catch (error) {
      console.error("Error initiating Garmin OAuth:", error);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const signOut = async () => {
    sessionStorage.clear(); // This also clears the 'oauthInProgress' flag
    localStorage.clear();
    await amplifySignOut();
  };

  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
        <Button onClick={initiateGarminOAuth} disabled={!jwtToken}>Connect to Garmin</Button>
        {statusMessage && <p>{statusMessage}</p>}
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);