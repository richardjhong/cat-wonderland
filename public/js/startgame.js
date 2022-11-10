const startGameHandler = async (e) => {
  e.preventDefault();

  const response = await fetch(`/api/cards/start`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/api/cards`)
  } else {
    alert('Failed to start new game.');
  }
}


const startGameButton = document.querySelector('#startGame')
startGameButton.addEventListener('click', startGameHandler)