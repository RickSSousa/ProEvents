using System.Threading.Tasks;
using ProEvents.Application.Dtos;

namespace ProEvents.Application.Interfaces
{
  public interface ILotService
    {
        Task<LotDto[]> SaveLots(int eventId, LotDto[] model);
        Task<bool> DeleteLot(int eventId, int lotId);
        Task<LotDto[]> GetLotsByEventIdAsync(int eventId);
        Task<LotDto> GetLotByIdsAsync(int eventId, int lotId);
    }
}