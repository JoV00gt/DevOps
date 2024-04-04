const amqp = require('amqplib');
const { db } = require("../services/database");
require("dotenv").config();

let channel;

let keys = ['log']

const consume = async ()=>{
    try { 
        const connection = await amqp.connect(process.env.MESSAGEBROKER);
        if(channel === undefined){
            channel = await connection.createChannel();
        }

        let exchange = 'direct_log'

        await channel.assertExchange(exchange,'direct',{durable:false})
        await channel.assertQueue('',{ exclusive: true});

        keys.forEach(function(key) {
            channel.bindQueue('', exchange, key);
        });

        await channel.consume('', message =>{
            let msg = JSON.parse(message.content.toString());

            db.collection('users').insertOne(msg)

            channel.ack(message)
        }); 

    } catch (error) {
        console.log (`error is: ${error}`);
    }
}


module.exports.consume=consume();
