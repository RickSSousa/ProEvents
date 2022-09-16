namespace ProEvents.Domain
{
  public class SocialNetwork
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Url { get; set; }
        public int? EventId { get; set; }
        public Event Event { get; set; }
        public int? SpeakerId { get; set; }
        public Speaker Speaker { get; set; }
    }
}