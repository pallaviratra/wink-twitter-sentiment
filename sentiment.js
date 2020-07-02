// Boilerplate code
const winkNLP = require( 'wink-nlp' );
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require( 'wink-eng-lite-model' );
const Twitter = require( 'twitter' );

const nlp = winkNLP( model );
require('dotenv').config()

var user = new Twitter( {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
} );

user.get(
  'search/tweets', {q: '#nlp', include_entities: false, lang: 'en', count: 3}, function(error, tweets, response) {
   // console.log( tweets );
   var s = tweets.statuses.map( ( tweet ) => {
        var tweetSentiment = nlp.readDoc( tweet.text ).out( its.sentiment );

        console.log(`tweet: ${tweet.text},\nuser: ${tweet.user.name},\nsentiment: ${tweetSentiment}\n`);
   } );
} );
