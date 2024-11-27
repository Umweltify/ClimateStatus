using UmweltifyProtocol;

Console.WriteLine("Hello, World!");

var appId = "ba18497c-2c50-46d0-b68b-af5b01bd3769";
var appSecret = "UBqP0haHzD4/vDj9Jb12/81wrFLA08J0W4Yx8LV/Mi0=";

var res = await ClimateinProtocol.GetDeviceStatusAsync(appId, appSecret);

Console.WriteLine($"This device is {(res.IsGreen? "Green" : "Not Green")}, {res.ClimateStatusModel.ToString()}");

Console.ReadKey();