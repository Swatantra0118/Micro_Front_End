 using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;
using System.Threading.Channels;

namespace E_Commerce.Services.ShoppingCartAPI.RabbitMQSender
{
    public class RabbitMQCartMessageSender : IRabbitMQCartMessageSender
    {
        private readonly string RabbitMQConnectionString;
        private IConnection _connection;
        private IConfiguration _configuration;

        public RabbitMQCartMessageSender(IConfiguration configuration)
        {
            _configuration = configuration;
            RabbitMQConnectionString = _configuration.GetConnectionString("RabbitmqConnection");
        }
        public void SendMessage(object message, string queueName, string exchangeName)
        {
            if (ConnectionExists())
            {
                using var channel = _connection.CreateModel();

                channel.ExchangeDeclare(exchangeName, ExchangeType.Direct, true, false);
                channel.QueueDeclare(queueName, true, false, false, null);
                channel.QueueBind(queueName, exchangeName, queueName);
                var json = JsonConvert.SerializeObject(message);
                var body = Encoding.UTF8.GetBytes(json);
                channel.BasicPublish(exchange: "", routingKey: queueName, null, body: body);
            }
        }

        private void CreateConnection()
        {
            try
            {
                var factory = new ConnectionFactory
                {
                    Uri = new Uri(RabbitMQConnectionString)
                };

                _connection = factory.CreateConnection("ShoppinCartSender");
            }
            catch (Exception ex)
            {

            }
        }

        private bool ConnectionExists()
        {
            if(_connection != null )
            {
                return true;
            }
            CreateConnection();
            return true;
        }
    }
}
