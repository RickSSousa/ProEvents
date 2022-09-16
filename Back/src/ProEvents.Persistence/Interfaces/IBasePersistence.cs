using System.Threading.Tasks;

namespace ProEvents.Persistence.Interfaces
{
  public interface IBasePersistence
    {
        //GERAL
        //todos os "CRUD" q precisarmos, está declarado aqui
        //estou adicionando algo genérico, esse genérico é uma entidade e esse genérico é uma classe
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        void DeleteRange<T>(T[] entityArray) where T: class;
        Task<bool> SaveChangesAsync();
    }
}