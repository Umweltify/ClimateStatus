using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Umweltify.Core.Stations.Enums;
using UmweltifyProtocol.Mappers;
using UmweltifyProtocol.Models;
using UmweltifyProtocol.Models.Enum;

namespace UmweltifyProtocol.Services;

public class ApiHandlers
{
    private const string _thingsAppPartnerAppRequestLogRegisterUrl = @"umweltify://v1/partnerAppRequestLogRegister";
    //private const string _apiKeyName = "UMWELTIFY-API-KEY";
    //private const string _apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";

    public static async Task PartnerAppRequestLogRegisterAsync(PartnerAppRequestLogModel partnerAppRequestLogModel)
    {
        try
        {
            var queryString = $"?AppId={partnerAppRequestLogModel.AppId}" +
                              $"&signature={partnerAppRequestLogModel.Signature}" +
                              $"&nonce={partnerAppRequestLogModel.Nonce}" +
                              $"&AppUserId={partnerAppRequestLogModel.AppUserId}" +
                              $"&AppRequestData={partnerAppRequestLogModel.AppRequestData}" +
                              $"&SessionId={partnerAppRequestLogModel.SessionId}";

            var fullUrl = _thingsAppPartnerAppRequestLogRegisterUrl + queryString;

            // Launch the custom protocol asynchronously
            await Task.Run(() =>
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = fullUrl,
                    UseShellExecute = true // Necessary to handle custom protocols
                });
            });
        }
        catch (Exception ex)
        {
            // log($"Error: {ex.Message}");
        }
    }


    private const string _thingsAppPartnerAppRequestLogDateTimeUpdateUrl = @"umweltify://v1/partnerAppRequestLogDateTimeUpdate";

    public static async Task PartnerAppRequestLogDateTimeUpdate(PartnerAppRequestLogModel partnerAppRequestLogModel)
    {
        try
        {
            var queryString = $"?AppId={partnerAppRequestLogModel.AppId}" +
                              $"&signature={partnerAppRequestLogModel.Signature}" +
                              $"&nonce={partnerAppRequestLogModel.Nonce}" +
                              $"&AppUserId={partnerAppRequestLogModel.AppUserId}" +
                              $"&AppRequestData={partnerAppRequestLogModel.AppRequestData}" +
                              $"&SessionId={partnerAppRequestLogModel.SessionId}";

            var fullUrl = _thingsAppPartnerAppRequestLogDateTimeUpdateUrl + queryString;

            // Launch the custom protocol asynchronously
            await Task.Run(() =>
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = fullUrl,
                    UseShellExecute = true // Necessary to handle custom protocols
                });
            });
        }
        catch (Exception ex)
        {
            // log($"Error: {ex.Message}");
        }
    }


    //private const string _umweltifyGetDeviceStatusUrl = @"https://localhost:7152/v1/PartnerAppProtocol/GetDeviceStatus";
    private const string _umweltifyGetDeviceStatusUrl = @"https://api.umweltify.com/v1/PartnerAppProtocol/GetDeviceStatus";
    private const string _apiKeyName = "UMWELTIFY-API-KEY";
    private const string _apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";
    public static async Task<(bool IsGreen, ClimateStatusModel ClimateStatusModel)> GetDeviceStatusAsync(PartnerAppRequestLogModel requestModel)
    {
        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add($"{_apiKeyName}", $"{_apiKeyValue}");

        try
        {
            var json = JsonSerializer.Serialize(requestModel);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(_umweltifyGetDeviceStatusUrl, content);

            response.EnsureSuccessStatusCode();

            var responseData = await response.Content.ReadAsStringAsync();
            var responseObject = JsonSerializer.Deserialize<JsonElement>(responseData);

            bool isGreen = responseObject.TryGetProperty("IsGreen", out JsonElement isGreenElement) && isGreenElement.ValueKind == JsonValueKind.True;
            var climateStatus = responseObject.TryGetProperty("ClimateStatus", out JsonElement climateStatusElement) && climateStatusElement.TryGetInt32(out int climateStatusValue)
                ? (ClimateStatus)climateStatusValue
                : ClimateStatus.NotSet;
            var climateStatusModel = ClimateStatusMapper.ConvertToClimateStatusModel(climateStatus);

            return (isGreen, climateStatusModel);
        }
        catch (Exception ex)
        {
            //Console.WriteLine($"Error: {ex.Message}");
            return (false, ClimateStatusModel.Undefined);
        }
    }
}