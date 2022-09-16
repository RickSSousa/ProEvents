using System.Threading.Tasks;
using ProEvents.Domain;

namespace ProEvents.Persistence.Interfaces
{
  public interface IEventPersistence
    {
        //EVENTS
        //métodos assíncronos com a opção de trazer com ou sem palestrantes
        Task<Event[]> GetAllEventsByThemeAsync(string theme, bool includeSpeakers = false);
        Task<Event[]> GetAllEventsAsync(bool includeSpeakers = false);
        Task<Event> GetEventByIdAsync(int eventId, bool includeSpeakers = false);
    }
}