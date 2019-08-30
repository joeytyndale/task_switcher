# task_switcher

FireFox extension for injecting JS: https://addons.mozilla.org/en-US/firefox/addon/javascript


Project to link finesse and workday with easy buttons for switching tasks

What we know so far:

Workday's POSTs contain a "sessionSecureToken" which is the same throughout an active session and a "clientRequestID" which varies with each POST/GET request. Don't know what that is yet or how necessary it is. 

---------------------------------------

We may need to build a desktop app that uses Okta to authenticate into Workday. Workday heavily relies on browser IDs, cookies, everything. Just sending a session token isn't enough for it to trust us. No maybe an extenstion that injects JavaScript could still work because we could get things to POST from the workday tab itself. But initial tests through Postman using session tokens don't work.


