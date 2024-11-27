using System.ComponentModel.DataAnnotations;

namespace Umweltify.Core.Stations.Enums
{
    /// <summary>
    /// It's related to greenness of the station!
    /// </summary>
    public enum ClimateStatus
    {
        [Display(Name = "The status is not yet set")]
        NotSet = 0, // The status is not yet set

        [Display(Name = "Not Green On Contract")]
        NotGreenOnContract = 1, // Pesimistic: Not green if the electricity contract is not green.

        [Display(Name = "Not Green On Carbon Budget")]
        NotGreenOnCarbonBudget = 2, // Pesimistic: Not green if carbon budget is ran out

        [Display(Name = "Not green nor on Carbon budget niether on Contract")]
        NotGreenOnBoth = 3,

        [Display(Name = "Not Green On Device Carbon Budget")]
        NotGreenOnDeviceCarbonBudget = 4, //If a device runs out of carbon budget, its status become 'Not Green'

        [Display(Name = "Green on Contract")]
        GreenOnContract = 5, // Optimistic: It's green if the contract is green regardless of its carbon budget

        [Display(Name = "Green on Carbon Budget")]
        GreenOnCarbonBudget = 6, // Optimistic: It's green if station has a positive carbon budget

        [Display(Name = "Green on both Carbon budget and Contract")]
        GreenOnBoth = 7,

        [Display(Name = "Green on Device Carbon Budget")]
        GreenOnDeviceCarbonBudget = 8, //If a device has carbon budget remaining, it can be green

        [Display(Name = "Green on EACs")]
        GreenOnEACs = 9
    }
}
