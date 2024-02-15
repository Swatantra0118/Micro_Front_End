namespace E_Commerce.Services.ShoppingCartAPI.RabbitMQSender
{
    public interface IRabbitMQAuthMessageSender
    {
        void SendMessage(Object message, string queueName);
    }
}
