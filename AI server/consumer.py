import pika

rabbitmq_url = "amqps://secfltgl:VP_BvyM_aEIv3InV9bDls_VNY30WFU_A@rat.rmq2.cloudamqp.com/secfltgl"

params = pika.URLParameters(rabbitmq_url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue="process_notification")

def callback(ch, method, properties, body):
    print(f"✅ Received: {body.decode()}")

channel.basic_consume(queue="process_notification", on_message_callback=callback, auto_ack=True)

print("🔄 Waiting for messages... Press CTRL+C to exit.")
channel.start_consuming()
