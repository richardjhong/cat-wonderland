const drawCardHandler = async (e) => {

  const response = await fetch(`/api/cards/draw`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    document.location.replace(`/api/cards`)
  } else {
    alert('Failed to draw card.');
  }
}

const drawCard = document.querySelectorAll('.drawCard')
drawCard.forEach(card => {
  card.addEventListener('click', drawCardHandler);
})