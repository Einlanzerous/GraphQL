const SERVER_URL = 'http://localhost:9000/';

async function fetchGreeting () {
  const resp = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
          greeting
        }
      `
    })
  });
  const { data } = await resp.json();
  return data;
};

fetchGreeting().then(({ greeting }) => {
  const data = document.querySelector('h1');
  data.textContent = greeting;
});
