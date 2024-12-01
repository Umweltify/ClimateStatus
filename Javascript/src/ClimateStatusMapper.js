const ClimateStatus = {
    NotSet: 0,
    NotGreenOnContract: 1,
    NotGreenOnCarbonBudget: 2,
    NotGreenOnBoth: 3,
    NotGreenOnDeviceCarbonBudget: 4,
    GreenOnContract: 5,
    GreenOnCarbonBudget: 6,
    GreenOnBoth: 7,
    GreenOnDeviceCarbonBudget: 8,
    GreenOnEACs: 9,
};

const ClimateStatusModel = {
    Green: 0,
    Aligned: 1,
    Red: 2,
    Undefined: 9,
};

function mapClimateStatusToModel(status) {
    switch (status) {
        case ClimateStatus.GreenOnContract:
        case ClimateStatus.GreenOnBoth:
        case ClimateStatus.GreenOnEACs:
            return ClimateStatusModel.Green;

        case ClimateStatus.NotGreenOnContract:
        case ClimateStatus.NotGreenOnCarbonBudget:
        case ClimateStatus.NotGreenOnBoth:
        case ClimateStatus.NotGreenOnDeviceCarbonBudget:
            return ClimateStatusModel.Red;

        case ClimateStatus.GreenOnDeviceCarbonBudget:
        case ClimateStatus.GreenOnCarbonBudget:
        case ClimateStatus.NotSet:
            return ClimateStatusModel.Aligned;

        default:
            return ClimateStatusModel.Undefined;
    }
}

export { ClimateStatus, ClimateStatusModel, mapClimateStatusToModel }