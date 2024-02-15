﻿using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace E_Commerce.Services.ShoppingCartAPI.RabbitMQSender
{
    public class RabbitMQAuthMessageSender : IRabbitMQAuthMessageSender
    {
        private readonly string _hostName;
        private readonly string _username;
        private readonly string _password;
        private IConnection _connection;

        public RabbitMQAuthMessageSender()
        {
            _hostName = "localhost";
            _username = "guest";
            _password = "guest";
        }
        public void SendMessage(object message, string queueName)
        {
            var factory = new ConnectionFactory
            {
                HostName = _hostName,
                Password = _password,
                UserName = _username,
            };

            _connection = factory.CreateConnection();

            using var channel = _connection.CreateModel();

            channel.QueueDeclare(queueName,false,false,false,null);
            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange:"",routingKey:queueName,null, body:body);
        }
    }
}
