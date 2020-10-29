const redis = require('redis');
const dotenv = require('dotenv').config();

class Redis {
    constructor() {

        console.log(process.env.REDIS_ENDPOINT, process.env.REDIS_PASSWORD);
        this.client = redis.createClient(
            {
                url: process.env.REDIS_ENDPOINT,
                password: process.env.REDIS_PASSWORD
            }
        );

        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
        
    }

    async get_statuses() {

    }
}

module.exports = Redis;