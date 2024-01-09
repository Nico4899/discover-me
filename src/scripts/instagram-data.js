const ACCESS_TOKEN = "IGQWRQU1kybi1kSWdUcHM3aEhDUFpEMFpmSFd0REZAKekc3V09sOGVscUdxSE1BYUdXeGl1ZAXdsTWtvUmtuTEd2TjkzZAXFINTJqSGxzMnFCVmtNY0FaMU1uREstczNfQ3dKZAnBUMG1Ra3NFMmE1VDNzNHIzRWV6ZAXMZD";

function getAuthorizationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

/*
function requestAccessToken(authCode) {
    const clientId = '294516563094892';
    const clientSecret = 'bb35165898df262a61cf3c7a3f09f0f4';
    const redirectUri = 'https://nico4899.github.io/discover-me/';

    // Use Fetch API to make the POST request
    fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code: authCode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            fetchInstagramUserData(data.access_token);
            fetchInstagramMediaData(data.access_token);
        }
    })
    .catch(error => console.error('Error:', error));
}
*/

function fetchInstagramUserData(accessToken) {
    fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                const usernameElement = document.createElement('div');
                usernameElement.textContent = `Instagram Username: ${data.username}`;
                usernameElement.id = 'instagram-username';
                document.getElementById('instagram-placeholder').appendChild(usernameElement);
            }
        })
        .catch(error => console.error('Error:', error));
}


function fetchInstagramMediaData(accessToken) {
    fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                const photosContainer = document.createElement('div');
                photosContainer.id = 'instagram-photos';
                data.data.forEach(media => {
                    if (media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM') {
                        const img = document.createElement('img');
                        img.src = media.media_url;
                        img.alt = 'Instagram Photo';
                        img.className = 'instagram-photo';
                        photosContainer.appendChild(img);
                    }
                });
                document.getElementById('instagram-placeholder').appendChild(photosContainer);
            }
        })
        .catch(error => console.error('Error:', error));
}


(function init() {
    const authCode = getAuthorizationCode();
    if (authCode) {
        // requestAccessToken(authCode);
        fetchInstagramUserData(ACCESS_TOKEN);
        fetchInstagramMediaData(ACCESS_TOKEN);
    }
})();



