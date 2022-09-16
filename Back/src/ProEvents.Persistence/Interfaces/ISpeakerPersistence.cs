using System.Threading.Tasks;
using ProEvents.Domain;

namespace ProEvents.Persistence.Interfaces
{
  public interface ISpeakerPersistence
    {
        //PALESTRANTES
        Task<Speaker[]> GetAllSpeakersByNameAsync(string name, bool includeEvents = false);
        Task<Speaker[]> GetAllSpeakersAsync(bool includeEvents = false);
        Task<Speaker> GetSpeakerByIdAsync(int SpeakerId, bool includeEvents = false);
    }
}