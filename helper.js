function serializeForm(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  var i, j,
    obj = {};
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            }
            break;
          case 'file':
            break;
        }
        break;
      case 'TEXTAREA':
        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                obj[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
              }
            }
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
            break;
        }
        break;
    }
  }
  return obj;
}

function validateForm(formData) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

  if (formData.url === '') {
    return {
      status: false,
      error: 'gotta give a url'
    };
  }
  if (!urlregex.test(formData.url)) {
    return {
      status: false,
      error: 'gotta give a VALID url'
    };
  }
  return {
    status: true,
  };
}
