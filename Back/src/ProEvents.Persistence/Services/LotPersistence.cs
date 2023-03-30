using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEvents.Domain;
using ProEvents.Persistence.Context;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Persistence.Services
{
  public class LotPersistence : ILotPersistence
  {
    private readonly ProEventsContext _context;
    //injeção do contexto nesse service    
    public LotPersistence(ProEventsContext context)
    {
        _context = context;
    }

    public async Task<Lot[]> GetLotsByEventIdAsync(int eventId)
    {
      IQueryable<Lot> query = _context.Lots;
      query = query.AsNoTracking().Where(lot => lot.EventId == eventId);
      return await query.ToArrayAsync();
    }

    public async Task<Lot> GetLotByIdsAsync(int eventId, int lotId)
    {
      IQueryable<Lot> query = _context.Lots;
      query = query.AsNoTracking().Where(lot => lot.EventId == eventId && lot.Id == lotId);
      return await query.FirstOrDefaultAsync();
    }
  }
}