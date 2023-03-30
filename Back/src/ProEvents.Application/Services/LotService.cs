using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEvents.Application.Dtos;
using ProEvents.Application.Interfaces;
using ProEvents.Domain;
using ProEvents.Persistence.Interfaces;

namespace ProEvents.Application.Services
{
  public class LotService : ILotService
  {
    //injeção das interfaces necessárias para a execução dos métodos
    private readonly IBasePersistence _basePersistence;
    private readonly ILotPersistence _lotPersistence;
    public IMapper _mapper { get; }

    public LotService(IBasePersistence basePersistence, ILotPersistence lotPersistence, IMapper mapper)
    {
      _lotPersistence = lotPersistence;
      _basePersistence = basePersistence;
      _mapper = mapper;
      
    }
    public async Task AddLot(int eventId, LotDto model)
    {
      try
      {
        var _lot = _mapper.Map<Lot>(model);
        _lot.EventId = eventId;
        _basePersistence.Add<Lot>(_lot);

        await _basePersistence.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    //Esse método vai poder atualizar lotes já existentes no evento e também inserir outros lotes q eu add no evento
    public async Task<LotDto[]> SaveLots(int eventId, LotDto[] models)
    {
      try
      {
        
        var _lots = await _lotPersistence.GetLotsByEventIdAsync(eventId);
        if(_lots == null) return null;
        
        foreach (var model in models)
        {
          //quando o id for 0, significa q to adicionando um novo evento, então é um post
          if(model.Id == 0){
            await AddLot(eventId,model);
          }else{
            //aqui to fazendo o update do lot já existente
            var lot = _lots.FirstOrDefault(lot => lot.Id == model.Id);
            model.EventId = eventId; 
            _mapper.Map(model, lot);
            _basePersistence.Update<Lot>(lot);
            await _basePersistence.SaveChangesAsync();
          }
        }

        var result = await _lotPersistence.GetLotsByEventIdAsync(eventId);
        
        return _mapper.Map<LotDto[]>(result); 

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<bool> DeleteLot(int eventId, int lotId)
    {
      try
      {
        var _lot = await _lotPersistence.GetLotByIdsAsync(eventId, lotId);

        if (_lot == null) throw new Exception("Lot not found.");

        _basePersistence.Delete<Lot>(_lot);
        return await _basePersistence.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<LotDto[]> GetLotsByEventIdAsync(int eventId)
    {
      try
      {
        var lots = await _lotPersistence.GetLotsByEventIdAsync(eventId);
        if(lots == null) return null;

        var results = _mapper.Map<LotDto[]>(lots);

        return results;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }

    public async Task<LotDto> GetLotByIdsAsync(int eventId, int lotId)
    {
      try
      {
        var _lot = await _lotPersistence.GetLotByIdsAsync(eventId, lotId);
        if(_lot == null) return null;

        var result = _mapper.Map<LotDto>(_lot);

        return result;
      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }
    }
  }
}