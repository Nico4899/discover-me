document.getElementById('instagram-connect-btn').addEventListener('click', function() {
    var clientId = '1081191459738539'; // Replace with your actual Instagram App ID
    var redirectUri = encodeURIComponent('https://nico4899.github.io/discover-me/'); 
    var authUrl = 'https://api.instagram.com/oauth/authorize?client_id=' + clientId + 
                    '&redirect_uri=' + redirectUri + 
                    '&scope=user_profile,user_media&response_type=code';

    window.open(authUrl, 'InstagramLogin');
});
