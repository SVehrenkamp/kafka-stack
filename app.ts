import express from 'express';
import { KafkaClient } from 'kafka-node';
import RegisterConsumer from './lib/consumer';
import RegisterProducer from './lib/producer';

const KAFKA_HOST = '192.168.99.100:9092';
// const KAFKA_HOST = '127.0.0.1:9092';

const kafkaClient = new KafkaClient({ kafkaHost: KAFKA_HOST, idleConnection: 24 * 60 * 60 * 1000 });
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const producer = RegisterProducer(kafkaClient);
const consumer = RegisterConsumer(kafkaClient, {
  topics: [
    { topic: 'cache-updated', offset: 0 },
    { topic: 'product-updated', offset: 0 },
  ],
});

app.get('/', function(req, res) {
  res.json({ greeting: 'Kafka Producer' });
});

app.post('/sendMsg', function(req, res) {
  var sentMessage = JSON.stringify(req.body.message);
  const payloads = [{ topic: req.body.topic, messages: sentMessage }];
  producer.send(payloads, function(err, data) {
    res.json(data);
  });
});

app.listen(5001, function() {
  console.log('Kafka producer running at 5001');
});
