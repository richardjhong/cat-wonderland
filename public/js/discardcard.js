const discardCardHandler = async (e) => {
  e.preventDefault();

  let checkboxes = document.querySelectorAll('input[name="discard-boxes"]:checked')
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(parseInt(checkbox.value));
  });

  const response = await fetch(`/api/cards/discard`, {
    method: 'POST',
    body: JSON.stringify({
      toDiscard: values
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/api/cards`)
  } else {
    alert('Failed to discard selected card(s).');
  }
}

const discardButton = document.querySelector('#discard-button')
discardButton.addEventListener('click', discardCardHandler)