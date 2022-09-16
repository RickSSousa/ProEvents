using System.Threading.Tasks;
using ProEvents.Persistence.Context;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Persistence.Services
{
  public class BasePersistence : IBasePersistence
  {
    private readonly ProEventsContext _context;
    //injeção do contexto nesse service    
    public BasePersistence(ProEventsContext context)
    {
        _context = context;
    }
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        _context.Update(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public void DeleteRange<T>(T[] entityArray) where T : class
    {
      _context.RemoveRange(entityArray);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return (await _context.SaveChangesAsync()) > 0;
    }
  }
}