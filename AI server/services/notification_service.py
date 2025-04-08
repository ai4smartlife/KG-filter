import pika
import atexit
import certifi
import ssl

rabbitmq_url = "amqps://secfltgl:VP_BvyM_aEIv3InV9bDls_VNY30WFU_A@rat.rmq2.cloudamqp.com/secfltgl"
params = pika.URLParameters(rabbitmq_url)
params.ssl_options = pika.SSLOptions(
    context=ssl.create_default_context(cafile=certifi.where())
)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue="process_notification")

def send_message(message):
    channel.basic_publish(exchange="", routing_key="process_notification", body=message)
    print(f"✅ Sent: {message}")

atexit.register(lambda: connection.close())