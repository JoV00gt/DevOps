const amqp = require('amqplib');
require("dotenv").config();
let channel;

startup();
async function startup(){ 
    try {
        const connection = await amqp.connect(process.env.MESSAGEBROKER)
        if(channel === undefined){
            channel = await connection.createChannel();
        }
    }catch (error) {
        console.log ('err in publisher : ' +error);
    }
}
const publish = async function publish(msg, sevirity){  
    try {

        let exchange = 'direct_log'

        channel.assertExchange(exchange, 'direct', {durable: false})
        channel.publish(exchange, sevirity, Buffer.from(JSON.stringify(msg)));
 
    }catch (error) {
        console.log ('err in publisher : ' +error);
    }
}

module.exports=publish;