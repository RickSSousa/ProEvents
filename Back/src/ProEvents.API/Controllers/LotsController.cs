using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEvents.Application.Dtos;
using ProEvents.Application.Interfaces;

namespace ProEvents.API.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class LotsController : ControllerBase
    {   
        private readonly ILotService _lotService;
        public LotsController(ILotService lotsService, IEventService eventService)
        {
            _lotService = lotsService;
        }

        [HttpGet("all/{eventId}")] //pra chamar os lotes, sabendo q o lote tem q estar em um evento
        public async Task<IActionResult> Get(int eventId)
        {
            try
            {
                var lots = await _lotService.GetLotsByEventIdAsync(eventId);
                if (lots == null) return NoContent();

                return Ok(lots);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to retrieve lots. Error:{ex.Message}");
            }
        }
        
        [HttpPut("put/{eventId}")]
        public async Task<IActionResult> SaveLots(int eventId, LotDto[] models)
        {
            try
            {
                var _lot = await _lotService.SaveLots(eventId, models);
                if(_lot == null) return NoContent();

                return Ok(_lot);
            }
            catch (Exception ex)
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to save the lots. Error:{ex.Message}");
            }
        }

        [HttpDelete("delete/{eventId}/{lotId}")]
        public async Task<IActionResult> Delete(int eventId, int lotId){
            try
            {
                var _lot = await _lotService.GetLotByIdsAsync(eventId, lotId);
                if(_lot == null) return NoContent();

                return await _lotService.DeleteLot(_lot.EventId, _lot.Id) ? 
                    Ok(new { message = "Lot deleted" }) : 
                    throw new Exception("There was a non-specific problem when trying to delete the Lot");
                
            }
            catch (Exception ex)
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Error trying to delete the lot. Error:{ex.Message}");
            }
        }
    }
}
