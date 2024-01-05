// Assuming you have a function to get the URL parameter
function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var code = getParameterByName('code');
if (code) {
    fetchAccessToken(code);
}

function fetchAccessToken(code) {
    // Make a POST request to your server to exchange the code for an access token
}

function displayInstagramPhotos() {
    // Fetch user's media
    fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            var container = document.getElementById('instagram-placeholder');
            container.innerHTML = ''; // Clear existing content

            data.data.forEach(media => {
                var img = document.createElement('img');
                img.src = media.media_url;
                container.appendChild(img);
            });
        });
}
