using AutoMapper;
using ProEvents.Application.Dtos;
using ProEvents.Domain;

namespace ProEvents.Application.Helpers
{
  public class ProEventsProfile : Profile
    {
        //o q to fzd aqui é pedir pra sempre q um dado vir d evento, ele ser mapeado pra eventoDTO
        public ProEventsProfile()
        {
            //isso mapea do evento pro Dto e do Dto pro evento com esse ReverseMap
            CreateMap<Event, EventDto>().ReverseMap();
            CreateMap<Lot, LotDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
            CreateMap<Speaker, SpeakerDto>().ReverseMap();
        }
    }
}