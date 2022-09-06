using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEvents.API.Data;
using ProEvents.API.Models;

namespace ProEvents.API.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {

        private readonly DataContext _context;
        
        public EventController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return _context.Events;
        }
        
        [HttpGet("{id}")]
        public Event GetById(int id)
        {
            //retorna o event onde o id desse evente é igual ao do parâmetro
            return _context.Events.FirstOrDefault(e => e.EventId == id);
        }
    }
}
