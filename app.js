
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('GitHub username: ', async (USERNAME) => {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Error:', data.message || 'Unexpected response');
    } else {
      const repoNames = data.map(repo => repo.name);
      console.log('Repositories:', repoNames);

      fs.writeFile('repoNames.txt', repoNames.join('\n'), (err) => {
        if (err) {
          console.error('File write error:', err.message);
        } else {
          console.log('Repo names saved to repoNames.txt');
        }
      });
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  } finally {
    rl.close();
  }
});

