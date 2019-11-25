import { Producer as KafkaProducer } from 'kafka-node';

export default (client: any) => {
  const Producer = KafkaProducer;
  const producer = new Producer(client);

  producer.on('ready', () => {
    console.log('Producer is ready');
  });

  producer.on('error', (err: Error) => {
    console.log('Producer is in error state');
    console.log(err);
  });

  return producer;
};
