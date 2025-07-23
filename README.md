Project using the last.fm API to make a timeline of when a user listened to certain artists in their rankings.
Measurements available through API are:
The last week, the last month, the last 3 months, the last 6 months, the last 12 months, forever

Using this limited data return, I am using this app to find connections to albums being continuously in the top 50/100 for a user and gathering the playcounts from specific periods. Currently has two different versions of the backend, one in Ruby on Rails and the other in Express.js. The goal is to have the program fully functioning on an Express backend and defunct the Rails version as I am using this project to learn the Express framework.
Express.js backend available [here]([url](https://github.com/nathanielpierson/lastfm-backend-node-version))
