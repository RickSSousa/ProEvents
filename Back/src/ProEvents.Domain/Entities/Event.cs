using System;
using System.Collections.Generic;

namespace ProEvents.Domain
{
  //[Table("EventDetails")] Esse dataAnnotation é pra caso no BD eu queira q essa tabela tenha outro nome
  public class Event
    {
        //[Key] Esse serve pra caso eu queira nomear d outro jeito meu id mas identificar pro BD q essa é minha PK
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? EventDate { get; set; }

        // [NotMapped] caso eu tivesse esse campo pra contar dias restantes pro evento, mas eu n quisesse q ele fosse um campo no BD pois é apenas da regra d negócio, eu usaria esse dataAn
        // public int CountDays { get; set; }   

        // [Required] //pra indicar q no BD o campo é NOT NULL
        // [MaxLength(50)]
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