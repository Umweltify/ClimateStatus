using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umweltify.Core.Stations.Enums;
using UmweltifyProtocol.Models.Enum;

namespace UmweltifyProtocol.Mappers;

public class ClimateStatusMapper
{
    public static ClimateStatusModel ConvertToClimateStatusModel(ClimateStatus src)
    {
        return src switch
        {
            ClimateStatus.GreenOnContract or
            ClimateStatus.GreenOnBoth or
            ClimateStatus.GreenOnEACs => ClimateStatusModel.Green,

            ClimateStatus.NotGreenOnContract or
            ClimateStatus.NotGreenOnCarbonBudget or
            ClimateStatus.NotGreenOnBoth or
            ClimateStatus.NotGreenOnDeviceCarbonBudget => ClimateStatusModel.Red,

            ClimateStatus.GreenOnDeviceCarbonBudget or
            ClimateStatus.GreenOnCarbonBudget or
            ClimateStatus.NotSet => ClimateStatusModel.Aligned,

            _ => ClimateStatusModel.Undefined
        };
    }
}


