using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEvents.Domain;
using ProEvents.Persistence.Context;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Persistence.Services
{
  public class SpeakerPersistence : ISpeakerPersistence
  {
    private readonly ProEventsContext _context;
    //injeção do contexto nesse service    
    public SpeakerPersistence(ProEventsContext context)
    {
        _context = context;
    }
    public async Task<Speaker[]> GetAllSpeakersByNameAsync(string name, bool includeEvents = false)
    {
      IQueryable<Speaker> query = _context.Speakers
      .Include(e => e.SocialNetworks);

      if(includeEvents){
        query = query.Include(s => s.SpeakerEvents).ThenInclude(se => se.Event);
      }
      query = query.AsNoTracking().OrderBy(s => s.Id)
      .Where(s => s.Name.ToLower()
      .Contains(name.ToLower()));
      return await query.ToArrayAsync();
    }

    public async Task<Speaker[]> GetAllSpeakersAsync(bool includeEvents = false)
    {
      IQueryable<Speaker> query = _context.Speakers
      .Include(s => s.SocialNetworks);

      if(includeEvents){
        query = query.Include(s => s.SpeakerEvents).ThenInclude(se => se.Event);
      }
      query = query.AsNoTracking().OrderBy(s => s.Id);

      return await query.ToArrayAsync();
    }

    public async Task<Speaker> GetSpeakerByIdAsync(int SpeakerId, bool includeEvents = false)
    {
      IQueryable<Speaker> query = _context.Speakers
      .Include(s => s.SocialNetworks);

      if(includeEvents){
        query = query.Include(s => s.SpeakerEvents).ThenInclude(se => se.Event);
      }
      query = query.AsNoTracking().OrderBy(s => s.Id)
      .Where(s => s.Id == SpeakerId);
      return await query.FirstOrDefaultAsync();
    }

  }
}