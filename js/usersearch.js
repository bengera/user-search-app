const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('user-input');
const username = document.getElementById('profile-name');
const searchButton = document.getElementById('search');

const profilePicture = document.getElementById('profile-picture');
const profileUsername = document.getElementById('username');
const joinedDate = document.getElementById('joined');
const biography = document.getElementById('bio');

const repoNumber = document.getElementById('repo-number');
const followerNumber = document.getElementById('followers-number');
const followingNumber = document.getElementById('following-number');

const locationEl =  document.getElementById('location');
const company = document.getElementById('company');
const twitter = document.getElementById('twitter');
const website = document.getElementById('website')


function fetchUserData() {
  const usernameValue = usernameInput.value;
  fetch(`https://api.github.com/users/${usernameValue}`)
    .then(res => res.json())
    .then(data => {
           
      profilePicture.src = data.avatar_url;
      profilePicture.alt = `${data.login} avatar`;

      username.innerHTML = `${data.name}`;
      profileUsername.innerHTML = `${data.login}`;
      biography.innerHTML = `${data.bio}`;

      repoNumber.innerHTML = `${data.public_repos}`;
      followerNumber.innerHTML = `${data.followers}`;
      followingNumber.innerHTML = `${data.following}`;
      joinedDate.innerHTML = formatDate(data.created_at);

      locationEl.innerHTML = data.location ? `${data.location}` : 'Not available';
      website.innerHTML = data.blog ? `<a href="https://${data.blog}" target="_blank">${data.blog}</a>` : 'Not available';
      twitter.innerHTML = data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a>` : 'Not available';
      company.innerHTML = data.company ? `<a href="https://github.com/${data.company}" target="_blank">${data.company}` : 'Not available';

      console.log(data);
    })
    .catch(error => {
      console.error(error);
      // Display error message to user
    });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchUserData();
});

searchButton.addEventListener('click', () => {
  fetchUserData();
});

usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    fetchUserData();
  }
});

// CHANGE DATE FORMAT

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();
  const suffix = getNumberSuffix(day);
  return `${day}${suffix} ${month} ${year}`;
}

function getNumberSuffix(day) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = day % 10;
  return suffixes[(day > 10 && day < 14) ? 0 : (lastDigit <= 3 ? lastDigit : 0)];
}

