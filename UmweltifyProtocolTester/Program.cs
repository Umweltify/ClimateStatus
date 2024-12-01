using UmweltifyProtocol;

Console.WriteLine("Hello, World!");

var appId = "ba18497c-2c50-46d0-b68b-af5b01bd3769";
var appSecret = "UBqP0haHzD4/vDj9Jb12/81wrFLA08J0W4Yx8LV/Mi0=";

ClimateinProtocol climateinProtocol = new();
climateinProtocol.GetClimateStatus += ClimateinProtocol_GetClimateStatus;
await climateinProtocol.GetDeviceStatusAsync(appId, appSecret);

void ClimateinProtocol_GetClimateStatus(bool isGreen, UmweltifyProtocol.Models.Enum.ClimateStatusModel climateStatusModel)
{
    Console.WriteLine($"This device is {(isGreen ? "Green" : "Not Green")}, {climateStatusModel.ToString()}");
}

Console.ReadKey();