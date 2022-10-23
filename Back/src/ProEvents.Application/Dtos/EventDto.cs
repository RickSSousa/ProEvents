using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEvents.Application.Dtos
{
  public class EventDto
    {
        //A ideia d uma DTO é igual a d uma viewModel. Nossa intenção tbm é desvincular o máximo possível nossa API (controller) do nosso domínio
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime EventDate { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Theme { get; set; }
        [Range(1, 120000)]
        [Display(Name = "Qtd Pessoas")]
        public int AmountPeople { get; set; }
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$")]
        public string ImageUrl { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [EmailAddress]
        [Display(Name = "e-mail")]
        [Required]
        public string Email { get; set; }
        public IEnumerable<LotDto> Lots { get; set; }
        public IEnumerable<SocialNetworkDto> SocialNetworks { get; set; }
        public IEnumerable<SpeakerDto> Speakers { get; set; } 
    }
}