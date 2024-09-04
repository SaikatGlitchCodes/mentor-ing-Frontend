const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "client_id": "Z5uBqm30a6Ilsn010QMykpH9RD3CiPmM",
  "client_secret": "XMPmx3MDTA5KzejYQjZz8FKjFyu1dLBSMExp_LlaXt-cxpIJ4kcID29O2t-hkhKc",
  "connection": "email",
  "email": "saikatsamanta052@gmail.com",
  "phone_number": "+918884058512",
  "send": "link",
  "authParams": {
    "scope": "openid - link",
    "state": "data"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
};

const loginUser =()=> fetch("https://dev-4yvrmy2tgbzdtmjl.us.auth0.com/passwordless/start", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

export default loginUser;  