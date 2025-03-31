import pika

rabbitmq_url = "amqps://secfltgl:VP_BvyM_aEIv3InV9bDls_VNY30WFU_A@rat.rmq2.cloudamqp.com/secfltgl"

# 🔹 Connect to RabbitMQ
params = pika.URLParameters(rabbitmq_url)
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue="process_notification")

# 🔹 Publish a message
message = "Hello from producer!"
channel.basic_publish(exchange="", routing_key="process_notification", body=message)

print(f"✅ Sent: {message}")

# 🔹 Close connection
connection.close()
