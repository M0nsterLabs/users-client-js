const nock = require('nock');
require('isomorphic-fetch');

(async function () {
  nock(/[.]+/)
    .get('/users/v1/users/11/profile')
    .reply(201);

  try {
    const response = await fetch('//api.templatemonster.com/users/v1/users/11/profile');
    console.log({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.log(error);
  }
}());
