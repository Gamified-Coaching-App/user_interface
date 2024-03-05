// useGarminConnect.js
import { useState, useEffect } from 'react';
import { fetchSession } from './sessionManager';

export const useGarminConnect = () => {
  const [jwtToken, setJwtToken] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchSession().then(token => {
      setJwtToken(token);
    });
  }, []);

  useEffect(() => {
    const checkForGarminCallback = async () => {
      if (sessionStorage.getItem('oauthInProgress') === 'true' && jwtToken) {
        sessionStorage.removeItem('oauthInProgress');
        const urlParams = new URLSearchParams(window.location.search);
        const oauthVerifier = urlParams.get('oauth_verifier');
        const oauthToken = urlParams.get('oauth_token');
        if (oauthVerifier && oauthToken) {
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
            if (response.ok) {
              setStatusMessage('Successfully connected to Garmin! You can now use Garmin services.');
            } else {
              setStatusMessage('Could not connect to Garmin.');
            }
          } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
          }
        }
      }
    };
    checkForGarminCallback();
  }, [jwtToken]);

  const initiateGarminOAuth = async () => {
    console.log("Initiating Garmin OAuth process")
    sessionStorage.setItem('oauthInProgress', 'true');
    console.log("Initiating Garmin OAuth process")
    
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
      console.log(data.redirect_url);
      window.location.href = data.redirect_url;
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } 
  };

  return { initiateGarminOAuth, jwtToken, statusMessage };
};
