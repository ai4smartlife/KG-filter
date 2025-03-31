import pika
import time

# 🔹 Replace with your CloudAMQP URL
rabbitmq_url = "amqps://secfltgl:VP_BvyM_aEIv3InV9bDls_VNY30WFU_A@rat.rmq2.cloudamqp.com/secfltgl"

# 🔹 Connect to RabbitMQ
params = pika.URLParameters(rabbitmq_url)
def connect():
    while True:
        try:
            connection = pika.BlockingConnection(params)
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("🔁 Reconnecting in 5 seconds...")
            time.sleep(5)

connection = connect()
channel = connection.channel()

# 🔹 Declare a queue (must be the same for producer & consumer)
channel.queue_declare(queue="process_notification")

# 🔹 Publish a message
message = "Hello from producer!"
channel.basic_publish(exchange="", routing_key="process_notification", body=message)

print(f"✅ Sent: {message}")

# 🔹 Close connection
connection.close()
