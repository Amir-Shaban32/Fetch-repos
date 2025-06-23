const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('User name: ', async (USERNAME) => {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Error:', data.message || 'Unexpected response');
    }
    else {
      const repoNames = data.map(repo => repo.name);
      console.log('repos: ', repoNames);
    }
  }
  catch (err) {
    console.error('Fetch error', err.message);
  }
  finally {
    rl.close();
  }
});
