# Changes to everything  
## Changes to java
### Login section
takes username + pass and returns hmaced access token.  attach timestamp and shit

### Command section 
add commands for getting server details + ip
verify access tokens when accepting command
### Metrics
write a wrapper around metrics in dynamo
Some metrics id like
* number of times server started
* how long server has been up total
  * can get instance uptime from describeinstancerquest maybe
* number of time each user has loged in
* number of time each user has started the server

## Changes to iron-spider
Make it redirect to the s3 bucket of the frontend ... done

## Changes to front end
write it


#RPC Protocall
##Java server takes requests formatted like
{
    command: "command string",
    user: "username",
    authToken: "authtoken"
}
##Error message
http status will reflect error as well.
{
    errorMessage: "text"
}
