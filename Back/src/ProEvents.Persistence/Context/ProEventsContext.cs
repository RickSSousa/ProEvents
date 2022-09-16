using Microsoft.EntityFrameworkCore;
using ProEvents.Domain;

namespace ProEvents.Persistence.Context
{
  public class ProEventsContext:DbContext
    {
        public ProEventsContext(DbContextOptions<ProEventsContext> options) : base(options){}
        public DbSet<Event> Events { get; set; }
        public DbSet<Lot> Lots { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<SpeakerEvent> SpeakerEvents { get; set; }
        public DbSet<SocialNetwork> SocialNetworks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
          // modelBuilder, vc tem uma entidade do TypeBaseExtensions SE. Ele tem chave e dadi um SE, o SE E.id está para SE.S.id (isso ta fzd uma associação entre E e S)
            modelBuilder.Entity<SpeakerEvent>().HasKey(se => new {se.EventId, se.SpeakerId});

            //modelBuilder, vc tem uma entidade aí do tipo evento e eu sei q ela tem "muitas" redes sociais. Dado uma rede social, eu sei q ela pode pertencer a 1 evento. Então, sempre q vc estiver deletando, quero q vc se comporte da forma cascateada, para se eu deletar o evento tbm deletar a rede social

            modelBuilder.Entity<Event>().HasMany(e => e.SocialNetworks).WithOne(sn => sn.Event).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Speaker>().HasMany(s => s.SocialNetworks).WithOne(sn => sn.Speaker).OnDelete(DeleteBehavior.Cascade);
        }
    }
}