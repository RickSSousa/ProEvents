using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEvents.API.Models;

namespace ProEvents.API.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {

        public IEnumerable<Event> _event = new Event[]{
            new Event(){
                EventId = 1,
                Theme = "Angular 11 e .NET 5",
                Local = "Alfenas",
                AmountPeople = 250,
                EventDate = DateTime.Now.AddDays(2).ToString(),
                Lot = "1º Lote",
                ImageURL = "foto.png"
            },
            new Event(){
                EventId = 2,
                Theme = "Angular e suas novidades",
                Local = "Belo Horizonte",
                AmountPeople = 350,
                EventDate = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                Lot = "2º Lote",
                ImageURL = "foto1.png"
            }
        };
        public EventController()
        {
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return _event;
        }
        
        [HttpGet("{id}")]
        public IEnumerable<Event> GetById(int id)
        {
            //retorna o event onde o id desse evente é igual ao do parâmetro
            return _event.Where(e => e.EventId == id);
        }
    }
}
