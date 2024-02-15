namespace E_Commerce.Services.ShoppingCartAPI.RabbitMQSender
{
    public interface IRabbitMQCartMessageSender
    {
        void SendMessage(Object message, string queueName, string exchangeName);
    }
}
