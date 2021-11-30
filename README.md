# Pro Web App
---**** 
The Content-Tag-based content organization system, or at least enough of one for us. Please help me, there's still lots to do and I'm just one dude for now. If you're curious about my vision for this project, please read the manifesto [here](/manifesto).

## Improvements
ought we issue and new token on every command and register that command as a session var or in a k/v store so that when a new request is made the jwt is verified as being the most current one. Someone would also know if their session had been hijacked becuase their token would fail, perhaps with a double-use logging/warning?

cdn hooks to limit requests? Is this a security hazard and potentially a non-starter on the onion protocol?


his is an [express.js]()-based app with the following characteristics:
1) two-stage authentication: first, gpg key-based challenge; second: json web token
