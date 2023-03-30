using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEvents.Domain;
using ProEvents.Persistence.Context;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Persistence.Services
{
  public class EventPersistence : IEventPersistence
  {
    private readonly ProEventsContext _context;
    //injeção do contexto nesse service    
    public EventPersistence(ProEventsContext context)
    {
        _context = context;
    }
    //ERRO TRACKING: isso acontece pq é como se outro método estivesse em posse do elemento, não deixando ele seguir pra conclusão. Ex: quando é executado o get abaixo, ele fica em posse do Evento e n deixa ir pro método update.
    //Resolver: adicione um .AsNoTracking() na manipulação da query para os métodos get (Ta antes dos OrderBy ou return)
    public async Task<Event[]> GetAllEventsByThemeAsync(string theme, bool includeSpeakers = false /*quando eu atribuo falso, torna opcional, pq só vai atribuir falso como padrão, caso n seja passado true como parametro*/)
    {
      //estou consultando todos os dados do tipo Event, incluindo lote e redes sociais
      IQueryable<Event> query = _context.Events
      .Include(e => e.Lots)
      .Include(e => e.SocialNetworks);

      if(includeSpeakers){
        //se quiser que inclua os palestrantes, incluo na query o atributo d associação PalestranteEvento e, dentro dele, incluo também o Palestrante
        query = query.Include(e => e.SpeakerEvents).ThenInclude(se => se.Speaker);
      }
      //aqui eu ordeno eles por Id, onde o tema do evento contem o tema passado de parametro (transforma tudo em minúsculo)
      query = query.AsNoTracking().OrderBy(e => e.Id)
      .Where(e => e.Theme.ToLower()
      .Contains(theme.ToLower()));
      //aqui eu retorno como toArray pq esse método trabalha com um array d eventos
      return await query.ToArrayAsync();
    }

    public async Task<Event[]> GetAllEventsAsync(bool includeSpeakers = false)
    {
      //estou consultando todos os dados do tipo Event, incluindo lote e redes sociais
      IQueryable<Event> query = _context.Events
      .Include(e => e.Lots)
      .Include(e => e.SocialNetworks);

      if(includeSpeakers){
        //se quiser que inclua os palestrantes, incluo na query o atributo d associação PalestranteEvento e, dentro dele, incluo também o Palestrante
        query = query.Include(e => e.SpeakerEvents).ThenInclude(se => se.Speaker);
      }
      //aqui eu ordeno eles por Id
      query = query.AsNoTracking().OrderBy(e => e.Id);
      //aqui eu retorno como toArray pq esse método trabalha com um array d eventos
      return await query.ToArrayAsync();
    }

    public async Task<Event> GetEventByIdAsync(int eventId, bool includeSpeakers = false)
    {
      //estou consultando todos os dados do tipo Event, incluindo lote e redes sociais
      IQueryable<Event> query = _context.Events
      .Include(e => e.Lots)
      .Include(e => e.SocialNetworks);

      if(includeSpeakers){
        //se quiser que inclua os palestrantes, incluo na query o atributo d associação PalestranteEvento e, dentro dele, incluo também o Palestrante
        query = query.Include(e => e.SpeakerEvents).ThenInclude(se => se.Speaker);
      }
      //aqui eu ordeno eles por Id, onde o id do evento é igual ao id passado como parametro
      query = query.AsNoTracking().OrderBy(e => e.Id)
      .Where(e => e.Id == eventId);
      //aqui eu retorno o primeiro ou padrão pq esse método retorna apenas 1 evento
      return await query.FirstOrDefaultAsync();
    }

  }
}