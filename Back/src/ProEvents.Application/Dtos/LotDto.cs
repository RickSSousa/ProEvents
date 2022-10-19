namespace ProEvents.Application.Dtos
{
  public class LotDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string InitialDate { get; set; }
        public string FinalDate { get; set; }
        public int Amount { get; set; }
        public int EventId { get; set; }
        public EventDto Event { get; set; }
    }
}