# Fibre de Kalytis ([@FibreDeKalytis](https://twitter.com/FibreDeKalytis))

This twitter bot is periodically tweeting about the poor Kalytis endlessly waiting for his optic fiber internet connection.

## Customization

 - `src/messages.js` contains the variants of the tweets. A variant is randomly chosen at tweet time, but too tweets in a row can't have the same variant.
 - `src/footer.js` contains the fixed part of the tweet. It is added at the end of the tweet, just after the random variant.
