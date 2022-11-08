const playCardHandler = async (e) => {
  e.preventDefault();

  const actionEffect = await e.target.dataset.action_effect;
  const cardId = await e.target.dataset.card_id;

  const response = await fetch(`/api/cards/${cardId}`, {
    method: 'POST',
    body: JSON.stringify({
      actionEffect: actionEffect,
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/api/cards`)
  } else {
    alert('Failed to post new data.');
  }
}


const useCard = document.querySelectorAll('.useCard')
useCard.forEach(play => {
  play.addEventListener('click', playCardHandler);
})