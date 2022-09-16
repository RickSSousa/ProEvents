using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEvents.Application.Interfaces;
using ProEvents.Domain;

namespace ProEvents.API.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {   
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> Get()
        {
            //aqui n preciso necessáriamente retornar um IEnumerable, pois usando o IActionResult, terei acesso aos status codes http, para trazer cod d erros ou sucessos
            try
            {
                //aqui já vou definir q quero q traga os speakers dos events
                var events = await _eventService.GetAllEventsAsync(true);
                //se n achar eventos retorna erro, se achar retorna os eventos
                if (events == null) return NotFound("Events not found");

                return Ok(events);
            }
            catch (Exception ex)
            {
                //aqui ele retorna um status code completo com msg personalizada que defini
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to retrieve events. Error:{ex.Message}");
            }
        }
        
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Event>> GetById(int id)
        //com o IActionResult, n consigo especificar se to trabalhando com 1 ou uma coleção d eventos, mas com o ActionResult<> consigo
        {
            try
            {
                var _event = await _eventService.GetEventByIdAsync(id, true);
                if(_event == null) return NotFound("Event by Id not found");

                return Ok(_event);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to retrieve event. Error:{ex.Message}");
            }
        }

        //especificar a rota assim é importante pois, se eu só passo o parametro, o http pd tentar jogar um numa chamada pra id e vice-versa
        [HttpGet("theme/{theme}")]
        public async Task<ActionResult<Event>> GetByTheme(string theme)
        {
            try
            {
                var events = await _eventService.GetAllEventsByThemeAsync(theme, true);
                if(events == null) return NotFound("Events by theme not found");

                return Ok(events);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to retrieve events. Error:{ex.Message}");
            }
        }

        [HttpPost("post")]
        public async Task<IActionResult> Post(Event model){
            try
            {
                // se n retornar um verdadeiro ou falso ao adicionar um evento, ele retorna o BadRequest
                var _event = await _eventService.AddEvent(model);
                if(_event == null) return BadRequest("error trying to add an event.");

                return Ok(_event);
            }
            catch (Exception ex)
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to add the event. Error:{ex.Message}");
            }
        }

        [HttpPut("put/{id}")]
        public async Task<IActionResult> Put(int id, Event model){
            try
            {
                var _event = await _eventService.UpdateEvent(id, model);
                if(_event == null) return BadRequest("error trying to update the event.");

                return Ok(_event);
            }
            catch (Exception ex)
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to update the event. Error:{ex.Message}");
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id){
            try
            {
                //nesse ternário, se der verdadeiro ao deletar retorna um Ok(200), se não retorna BadRequest(400)
                return await _eventService.DeleteEvent(id) ? 
                    Ok("Event deleted.") : 
                    BadRequest("Event not deleted.");
                
            }
            catch (Exception ex)
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to delete the event. Error:{ex.Message}");
            }
        }
    }
}
