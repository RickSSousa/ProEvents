using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ProEvents.Application.Interfaces;
using ProEvents.Application.Services;
using ProEvents.Persistence.Context;
using ProEvents.Persistence.Interfaces;
using ProEvents.Persistence.Services;
using System;

namespace ProEvents.API
{
  public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //aqui eu defino qual contexto do banco quero usar e suas referências de conexão como params
            services.AddDbContext<ProEventsContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("SQLite"))
            );

            //Esse Newton faz com q os possíveis cycles parem a aplicação. Eles são um looping q acontece se dentro d uma entidade Y e eu estiver instanciando uma entidade X q também instancia a entidade Y, causando o possível looping por uma possível criação de entidades em ciclo
            services.AddControllers().AddNewtonsoftJson( x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //dentro do domínio da minha app e dentro de seu contexto, existe vários assemblies, procura quem ta herdando d Profile. Essa linha injeta no meu serviço a capacidade d eu trabalhar com automapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //"Ô service, vou add um escopo aqui q, td vez q for requisitado um IEventService injete pfv o EventService :)" DEVO FAZER ISSO PARA TODAS AS INJEÇÕES D DEPENDENCIAS DO PROJETO
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IBasePersistence, BasePersistence>();
            services.AddScoped<IEventPersistence, EventPersistence>();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProEvents.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProEvents.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(access => access.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            //dado qualquer config d cabeçalho vindo d qualquer metodo (get, put, push, delete), vindo d qualquer origem, eu to permitindo 

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
