using System;
using System.Threading.Tasks;
using AutoMapper;
using ProEvents.Application.Dtos;
using ProEvents.Application.Interfaces;
using ProEvents.Domain;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Application.Services
{
  public class EventService : IEventService
  {
    //injeção das interfaces necessárias para a execução dos métodos
    private readonly IBasePersistence _basePersistence;
    private readonly IEventPersistence _eventPersistence;
    public IMapper _mapper { get; }

    public EventService(IBasePersistence basePersistence, IEventPersistence eventPersistence, IMapper mapper)
    {
      _eventPersistence = eventPersistence;
      _basePersistence = basePersistence;
      _mapper = mapper;
      
    }
    public async Task<EventDto> AddEvent(EventDto model)
    {
      try
      {
        //aqui to mapeando o tipo eventDto pra Event, pra poder ser recebido pelo meu persistence
        var _event = _mapper.Map<Event>(model);
        _basePersistence.Add<Event>(_event);

        if(await _basePersistence.SaveChangesAsync())
        {
          //como esse metodo tbm retorna um Dto, tenho q fz o caminho inverso (lembrando d passar o _event no parametro, ao invés do model, pq agr são d tipos !=)
          var result = await _eventPersistence.GetEventByIdAsync(_event.Id, false); 
          return _mapper.Map<EventDto>(result); 
        }
        return null;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<EventDto> UpdateEvent(int eventId, EventDto model)
    {
      try
      {
        //ERRO TRACKING: isso acontece pq é como se outro método estivesse em posse do elemento, não deixando ele seguir pra conclusão. Ex: quando é executado o get abaixo, ele fica em posse do Evento e n deixa ir pro método update.
        //Resolver: adicione um .AsNoTracking() na manipulação da query para os métodos get (Ta antes dos OrderBy ou return)
        var _event = await _eventPersistence.GetEventByIdAsync(eventId, false);
        if(_event == null) return null;

        model.Id = _event.Id; //isso seta o id no model caso ele tenha vindo sem esse dado

        _mapper.Map(model, _event);

        _basePersistence.Update<Event>(_event);

        if(await _basePersistence.SaveChangesAsync())
        {
          var result = await _eventPersistence.GetEventByIdAsync(_event.Id, false); 
          return _mapper.Map<EventDto>(result); 
        }
        return null;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<bool> DeleteEvent(int eventId)
    {
      try
      {
        var _event = await _eventPersistence.GetEventByIdAsync(eventId, false);
        //se eu n achar nenhum evento, aqui eu lanço essa exceção (diferente do caso acima, pois n tem como eu retornar um evento já deletado)
        if (_event == null) throw new Exception("Event not found.");

        _basePersistence.Delete(_event);
        return await _basePersistence.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<EventDto[]> GetAllEventsAsync(bool includeSpeakers = false)
    {
      try
      {
        //aqui eu só busco tds os eventos passando o parametro e retorno null se n achar ou os eventos se achar
        var events = await _eventPersistence.GetAllEventsAsync(includeSpeakers);
        if(events == null) return null;

        // SOLUÇÃO DE MAPEAMENTO D DADOS MAIS VERBOSA: 
        //através dessa lista d EventDto, eu consigo retornar apenas os campos necessários no ato do Get, evitando exposição d dados desnecessária
        // var eventReturn = new List<EventDto>();

        // foreach (var item in events)
        // {
        //     eventReturn.Add( new EventDto(){
        //         Id = item.Id,
        //         Local = item.Local,
        //         EventDate = item.EventDate.ToString(),
        //         Theme = item.Theme,
        //         AmountPeople = item.AmountPeople,
        //         ImageUrl = item.ImageUrl,
        //         Phone = item.Phone,
        //         Email = item.Email
        //     });
        // }

        //SOLUÇÃO MENOS VERBOSA:

        var results = _mapper.Map<EventDto[]>(events);

        return results;

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<EventDto[]> GetAllEventsByThemeAsync(string theme, bool includeSpeakers = false)
    {
      //segue o mesmo princípio do anterior, mas puxando por tema
      try
      {
        var events = await _eventPersistence.GetAllEventsByThemeAsync(theme, includeSpeakers);
        if(events == null) return null;

        var results = _mapper.Map<EventDto[]>(events);

        return results;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<EventDto> GetEventByIdAsync(int eventId, bool includeSpeakers = false)
    {
      //segue o mesmo princípio do anterior, mas puxando por Id
      try
      {
        var _event = await _eventPersistence.GetEventByIdAsync(eventId, includeSpeakers);
        if(_event == null) return null;

        //aqui to mapeando meu _event q é recebe o tipo Event da minha persistence para o tipo EventDto, fazendo com q eu n retorna algo do domínio do meu app
        var result = _mapper.Map<EventDto>(_event);

        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

  }
}