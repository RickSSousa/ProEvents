using System;
using System.Threading.Tasks;
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
    public EventService(IBasePersistence basePersistence, IEventPersistence eventPersistence)
    {
      _eventPersistence = eventPersistence;
      _basePersistence = basePersistence;
      
    }
    public async Task<Event> AddEvent(Event model)
    {
      try
      {
        //é adicionado meu evento pelo basePersistence, se der certo de salvar as infos, ele busca por id esse evento que acabou d ser criado e retorna para o user, se não retorna nulo
        _basePersistence.Add<Event>(model);
        if(await _basePersistence.SaveChangesAsync())
        {
          return await _eventPersistence.GetEventByIdAsync(model.Id, false); //coloquei false pq n quero trazer os speakers desse evento aqui
        }
        return null;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Event> UpdateEvent(int eventId, Event model)
    {
      try
      {
        //ERRO TRACKING: isso acontece pq é como se outro método estivesse em posse do elemento, não deixando ele seguir pra conclusão. Ex: quando é executado o get abaixo, ele fica em posse do Evento e n deixa ir pro método update.
        //Resolver: adicione um .AsNoTracking() na manipulação da query para os métodos get (Ta antes dos OrderBy ou return)
        var _event = await _eventPersistence.GetEventByIdAsync(eventId, false);
        if(_event == null) return null;

        model.Id = _event.Id; //isso seta o id no model caso ele tenha vindo sem esse dado

        _basePersistence.Update(model);
        if(await _basePersistence.SaveChangesAsync())
        {
          return await _eventPersistence.GetEventByIdAsync(eventId, false);
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

    public async Task<Event[]> GetAllEventsAsync(bool includeSpeakers = false)
    {
      try
      {
        //aqui eu só busco tds os eventos passando o parametro e retorno null se n achar ou os eventos se achar
        var events = await _eventPersistence.GetAllEventsAsync(includeSpeakers);
        if(events == null) return null;

        return events;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Event[]> GetAllEventsByThemeAsync(string theme, bool includeSpeakers = false)
    {
      //segue o mesmo princípio do anterior, mas puxando por tema
      try
      {
        var events = await _eventPersistence.GetAllEventsByThemeAsync(theme, includeSpeakers);
        if(events == null) return null;

        return events;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<Event> GetEventByIdAsync(int eventId, bool includeSpeakers = false)
    {
      //segue o mesmo princípio do anterior, mas puxando por Id
      try
      {
        var _event = await _eventPersistence.GetEventByIdAsync(eventId, includeSpeakers);
        if(_event == null) return null;

        return _event;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

  }
}