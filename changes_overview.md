# Changes to everything

## Changes to java

### Login section

Do auth with this [library](https://github.com/auth0/java-jwt)  
verify JWT from cognito  
just need a singleton? that veryfiys the JWT token on requests.  
will throw an error if not valid.  
[token docs](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)  
follow these [steps](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html) to verify the token \
Have a dynamo db table that contains flag if user has permission to start the server. Might be able to do this though cognito, but easier with just dynamo

### Command section

add commands for getting server details + ip
verify access tokens when accepting command

### Metrics

write a wrapper around metrics in dynamo
Some metrics id like

- number of times server started
- how long server has been up total
  - can get instance uptime from describeinstancerquest maybe
- number of time each user has loged in
- number of time each user has started the server

## Changes to iron-spider

Make it redirect to the s3 bucket of the frontend ... doneish  
nvm i broke it. might want to use actual http server instead of tcp.

## Changes to front end

write it
Use amplify hoc with aws cognito to do login.  
use authData.getSignInUserSession().getAccessToken() to get JWT  
[amplify docs](https://aws-amplify.github.io/docs/js/authentication)

# RPC Protocall

Feel free to suggest changes, like, idk if we need the username field cause its in the jwt

## Java server takes requests formatted like

```json
{
  "user": "username"
}
```

command will come from enum {start,stop,reboot,details,status}  
 no auth needed for status  
authToken is JWT from aws amplify / cognito

## Commands + responses

### status

Auth is not needed  
 returns one of these options

```typescript
export enum ServerStatus {
  Pending = 'pending',
  Running = 'running',
  ShuttingDown = 'shutting-down',
  Terminated = 'terminated',
  Stopping = 'stopping',
  Stopped = 'stopped',
}
```

## Error message

http status will reflect error as well.
This blob might not be accurate. Im currently just grabbing the response text.

```json
{
  "errorMessage": "text"
}
```

# WebAssembly additions

## roadhouse related stuff

- Will need a new route,
  - contains a canvas,
  - async loads a js script or ts
    - script does the webassem stuff

## build stuff

- have code build pull rust docker image,
- build the webassembly and ts definitions
- use git to commit it to a repository?
