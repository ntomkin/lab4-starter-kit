exports.handler = function(context, event, callback) {
    var redis = require('redis');
    var uniqid = require('uniqid');
    var twiml = new Twilio.twiml.MessagingResponse();

    var redis_client = redis.createClient({
      url: process.env.REDIS_ENDPOINT,
      password: process.env.REDIS_PASSWORD
    });
    
    var incoming_message = event.Body.split(' ');
    var command = incoming_message[0].toLowerCase();
    var action = incoming_message[1];
    var details = incoming_message.splice(2).join(' ');

    switch(command) {
        case "update":
            let data = JSON.stringify({"message": action, "status": details, timestamp: (new Date()).getTime()});
            console.log('data', data);
            let key = uniqid();
  
            redis_client.hset("messages", key, data, redis.print);
            
            twiml.message('Message inserted');
  
            callback(null, twiml);
            break;
  
        case "catfacts":
          //  Where you would implement your API response for texted requests
          //  https://www.twilio.com/docs/runtime/quickstart/serverless-functions-make-a-read-request-to-an-external-api
          break;
            
        case "helpme":
            twiml.message('...your help stuff...');
  
            callback(null, twiml);
            break;
  
    }
  };
  