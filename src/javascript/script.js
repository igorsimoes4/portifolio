const username = 'igorsimoes4'; // Substitua pelo seu nome de usuário do GitHub
const repoList = document.getElementById('repo-list');

async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();

        repositories.forEach(async repo => {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/contents`);
            const repoContents = await response.json();

            const coverFile = repoContents.find(file => file.name === 'cover.png');

            if(coverFile) {
                const repoCard = document.createElement('div');
                repoCard.className = 'col card g-3 p-3';
                repoCard.style.backgroundColor = "#160d18";
                repoCard.style.width = '18rem';

                const cardImg = document.createElement('img');
                cardImg.className = 'card-img-top img-thumbnail';
                cardImg.src = coverFile.download_url;
                cardImg.alt = 'Repository Cover';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.style.color = '#fff';
                cardText.textContent = repo.description || 'No description available';

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.style.color = '#1ca39e';
                repoLink.textContent = "Link do Github do " + repo.name;

                cardBody.appendChild(cardText);
                repoCard.appendChild(cardImg);
                repoCard.appendChild(cardBody);
                repoCard.appendChild(repoLink);

                repoList.appendChild(repoCard);
            }
            
        });
    } catch (error) {
        console.error('Erro ao buscar os repositórios:', error);
    }
}

fetchRepositories();

