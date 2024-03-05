export const checkForGarminCallback = async () => {
      let jwtToken = sessionStorage.getItem('jwtToken');
      if (localStorage.getItem('oauthInProgress') === 'true' && jwtToken) {
        localStorage.removeItem('oauthInProgress');
        console.log('URL search params:', window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        console.log("URL: ", urlParams);
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
              console.log('Successfully connected to Garmin! You can now use Garmin services.');
            } else {
              console.log('Could not connect to Garmin.');
            }
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }
        }
        else {
          console.log('Could not retrieve params from URL.');
        }
      }
    };

  export const initiateGarminOAuth = async () => {
    console.log("Initiating Garmin OAuth process");
    localStorage.setItem('oauthInProgress', 'true');
    let jwtToken = sessionStorage.getItem('jwtToken');
    console.log("Token for API request:", jwtToken);
    
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