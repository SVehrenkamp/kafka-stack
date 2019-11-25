import { Consumer as KafkaConsumer } from 'kafka-node';

export default (client: any, config: any) => {
  const Consumer = KafkaConsumer;
  const consumer = new Consumer(client, config.topics, {
    autoCommit: false,
  });

  consumer.on('message', (message: any) => {
    try {
      console.log(JSON.parse(message.value));
    } catch (e) {
      console.log(message.value);
    }
  });

  consumer.on('error', (err: Error) => {
    console.log('Error:', err);
  });

  consumer.on('offsetOutOfRange', (err: Error) => {
    console.log('offsetOutOfRange:', err);
  });

  return consumer;
};
