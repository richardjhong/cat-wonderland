const discardCardHandler = async (e) => {
  e.preventDefault();
  const cardId = await e.target.dataset.card_id;

  const response = await fetch(`/api/cards/discard`, {
    method: 'POST',
    body: JSON.stringify({
      cardId: cardId,
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/api/cards`)
  } else {
    alert('Failed to dicard selected card.');
  }
}

const discardCard = document.querySelectorAll('.discardCard')
discardCard.forEach(play => {
  play.addEventListener('click', discardCardHandler);
})