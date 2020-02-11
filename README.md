Use GET/POST to send mail.

## Run the Project

- `npm i`, of course.
- Copy `config_demo.js` to `config_.js`, and update the content.
- `node lib`

## Deploy the Project

After `Run the Project`, it's running locally. Of course you want to deploy it in the internet. You need:

- A server with public IP.
- (Optional) A domain forward request to the IP.
- `nginx` or other similiar server to forward request to `127.0.0.1:PORT`.
- (Optional) `forever` or other similiar tool to keep the project running.

## Usage in the client

Method: `GET` or `POST`

Params:

|  Param   | Required  | Means  |
|  ----  | ----  | ----  |
| `s` or `secret`  | `true` | Secret key to use the service. Keep it safe. |
| `t` or `title`  | `true` | Email title. |
| `c` or `content`  | `false` | Email content. |
| `to`  | `false` | Send mail to. |
