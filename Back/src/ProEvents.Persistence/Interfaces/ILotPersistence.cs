using System.Threading.Tasks;
using ProEvents.Domain;

namespace ProEvents.Persistence.Interfaces
{
  public interface ILotPersistence
    {
      Task<Lot[]> GetLotsByEventIdAsync(int eventId);
      Task<Lot> GetLotByIdsAsync(int eventId, int lotId);
    }
}