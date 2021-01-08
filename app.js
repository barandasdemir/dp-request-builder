const resEl = document.querySelector('#res');
const rangeEl = document.querySelector('input[type="range"]');
let delay = rangeEl.value * 1000;
let builder, req, interval;

document.querySelector("form").addEventListener('submit', e => {
  e.preventDefault();
  resEl.innerHTML = '';

  interval = setInterval(() => {
    if (req) {
      resEl.innerHTML = `Request ${JSON.stringify(req, null, 2)}<br>`;
    } else if (builder) {
      resEl.innerHTML = `RequestBuilder ${JSON.stringify(builder, null, 2)}<br>`;
    }
  }, 100);

  const formData = serializeForm(e.target);
  formData.url = decodeURIComponent(formData.url);

  const { status: valid, error } = validateForm(formData);
  if (!valid) {
    resEl.innerHTML = error;
    return;
  }

  builder = new RequestBuilder()
    .forUrl(formData.url)
    .useMethod(formData.method)
    .body(formData.body);

  setTimeout(() => {
    req = builder.build();

    setTimeout(() => {
      fetch(`https://cors-anywhere.herokuapp.com/${req.url}`, {
        method: req.method,
        body: (req.method === 'GET' || req.method === 'HEAD') ? undefined : JSON.stringify(req.payload)
      })
        .then((res) => {
          req.nextState();
          return res.text();
        })
        .then(text => {
          setTimeout(() => {
            req.nextState();
            clearInterval(interval);
            resEl.innerHTML = `Request ${JSON.stringify(req, null, 2)}<br><br>Response:<br><textarea rows="10" cols="100">${text}</textarea>`;
            builder = req = undefined;
          }, delay);
        });
    }, delay);
  }, delay);
});

rangeEl.addEventListener('change', (e) => {
  delay = e.target.value * 1000;
  document.querySelector('h5').innerText = `to clearly see every state, each takes ~${e.target.value} second${(e.target.value > 1) ? 's' : ''}.`
});
