using System;
using System.Collections.Generic;

namespace ProEvents.Domain
{
  public class Event
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? EventDate { get; set; }
        public string Theme { get; set; }
        public int AmountPeople { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Lot> Lots { get; set; }
        public IEnumerable<SocialNetwork> SocialNetworks { get; set; }
        public IEnumerable<SpeakerEvent> SpeakerEvents { get; set; } 
    }
}