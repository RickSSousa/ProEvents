using System.Threading.Tasks;
using ProEvents.Application.Dtos;

namespace ProEvents.Application.Interfaces
{
  public interface IEventService
    {
        Task<EventDto> AddEvent(EventDto model);
        Task<EventDto> UpdateEvent(int eventId, EventDto model);
        Task<bool> DeleteEvent(int eventId);
        Task<EventDto[]> GetAllEventsAsync(bool includeSpeakers = false);
        Task<EventDto[]> GetAllEventsByThemeAsync(string theme, bool includeSpeakers = false);
        Task<EventDto> GetEventByIdAsync(int eventId, bool includeSpeakers = false);
    }
}