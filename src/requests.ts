const BASE_URL = '';

export async function postData(path, reqBody) {
  let responseOk;
  let res;
  let headers: any = {
    'Content-Type': 'application/json',
  };

  await fetch(`${BASE_URL}${path}`,
    {
      method: "PUT",
      headers: headers,
      body: reqBody
    }
  )
    .then(function (response) { responseOk = response.ok; return response.json(); })
    .then(function (myjson) {
      res = myjson;
    })
    .catch(err => { res = err; })

  return [responseOk, res];
}
