# Contract Event Listener

Used Frameworks/Libraries/APIs:
* Google App Engine
* Etherscan API
* Chart.js
* abi-decoder.js
* Bootstrap
* jQuery 
  
Limitations:
* Event Stream: Events are fetched not pushed
* Mail Notification: A mail is only send for the first time a new event occurs
* Mail Quota:  100 mails/day
* Etherscan API Quota: 5 requests/sec 
   
Possible enhancements
* Event Stream: Use of web3 event callbacks with websockets instead of fetching the events from the Etherscan API
* Mail Notification: Use of web3 event callbacks instead of fetching the events from the Etherscan API
  