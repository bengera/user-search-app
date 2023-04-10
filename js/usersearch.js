const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('user-input');
const username = document.getElementById('profile-name');
const searchButton = document.getElementById('search');
const errorEl = document.getElementById('error-message');

const profilePicture = document.getElementById('profile-picture');
const profileUsername = document.getElementById('username');
const joinedDate = document.getElementById('joined');
const biography = document.getElementById('bio');

const repoNumber = document.getElementById('repo-number');
const followerNumber = document.getElementById('followers-number');
const followingNumber = document.getElementById('following-number');

const locationEl = document.getElementById('location');
const company = document.getElementById('company');
const twitter = document.getElementById('twitter');
const website = document.getElementById('website')




function fetchUserData() {
  
  const usernameValue = usernameInput.value.trim();;
  if (!usernameValue) {
    errorEl.style.display = 'block';
    usernameInput.style.width = "40%";
    return;
  }

  if (errorEl.style.display === 'block') {
    errorEl.style.display = 'none';
    // usernameInput.style.width = "60%";
  }

  fetch(`https://api.github.com/users/${usernameValue}`)
  
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
                
      }
      return res.json();
    })
    .then(data => {
      usernameInput.style.width = "60%";
      if (data && data.login) {
        profilePicture.src = data.avatar_url;
        profilePicture.alt = `${data.login} avatar`;
        username.innerHTML = `${data.name}`;
        profileUsername.innerHTML = `${data.login}`;
        biography.innerHTML = data.bio ? `${data.bio}` : 'No bio';
        repoNumber.innerHTML = `${data.public_repos}`;
        followerNumber.innerHTML = `${data.followers}`;
        followingNumber.innerHTML = `${data.following}`;
        joinedDate.innerHTML = formatDate(data.created_at);
        locationEl.innerHTML = data.location ? `${data.location}` : '<span class="na" style="opacity: 0.5;">Not available</span>';
        website.innerHTML = data.blog ? `<a href="${/^https?:\/\//i.test(data.blog) ? data.blog : 'https://' + data.blog}" target="_blank">${data.blog}</a>` : '<span class="na" style="opacity: 0.5;">Not available</span>';
        twitter.innerHTML = data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a>` : '<span class="na" style="opacity: 0.5;">Not available</span>';
        company.innerHTML = data.company ? `<a href="https://github.com/${data.company}" target="_blank">${data.company}</a>` : '<span class="na" style="opacity: 0.5;">Not available</span>';
     
        
    const svgs = document.getElementsByTagName('svg');
    for (let i = 0; i < svgs.length; i++) {
      if (svgs[i].parentNode.innerText.includes("Not available")) {
        svgs[i].style.opacity = "0.5";
      } else {
        svgs[i].style.opacity = "1";
      }
    }

        console.log(data);
      }
    })
    .catch(error => {
      console.error(error);
      errorEl.style.display = 'block';
      console.log('error, invalid input')
      usernameInput.style.width = "40%";
    });
}


searchForm.addEventListener('submit', fetchUserData);
searchButton.addEventListener('click', fetchUserData);
usernameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    fetchUserData();
  }
});


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



