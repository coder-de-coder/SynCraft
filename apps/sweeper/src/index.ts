import { PrismaClient } from "@repo/db";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "crafts";
const kafka = new Kafka({
  clientId: "outbox-sweeper",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    const pendingRows = await client.craftRunOutbox.findMany({
      where: {},
      take: 10,
    });

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return { value: r.craftRunId };
      }),
    });

    await client.craftRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });
  }
}

main();
