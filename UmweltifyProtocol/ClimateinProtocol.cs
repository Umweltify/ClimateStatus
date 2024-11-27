using System;
using System.Threading;
using System.Threading.Tasks;
using UmweltifyProtocol.Models;
using UmweltifyProtocol.Models.Enum;
using UmweltifyProtocol.Services;
using UmweltifyProtocol.HMAC;

namespace UmweltifyProtocol
{
    public sealed class ClimateinProtocol
    {
        private const int MaxRetries = 3;
        private const int InitialDelayMilliseconds = 1000;
        private const int UpdateIntervalMilliseconds = 0; //5 * 60 * 1000;

        private static readonly Lazy<ClimateinProtocol> _singleton = new(() => new ClimateinProtocol());
        private static ClimateinProtocol Instance => _singleton.Value;

        private ClimateinProtocol()
        {
            // Private constructor to prevent instantiation
        }

        /// <summary>
        /// Retrieves the environmental status of a device for a partner application.
        /// </summary>
        /// <param name="appId">The application ID.</param>
        /// <param name="appSecret">The application secret.</param>
        /// <param name="cancellationToken">Token to cancel the operation.</param>
        /// <returns>A tuple containing a boolean indicating green status and a ClimateStatusModel.</returns>
        public static async Task<(bool IsGreen, ClimateStatusModel ClimateStatusModel)> GetDeviceStatusAsync(
            string appId,
            string appSecret,
            CancellationToken cancellationToken = default)
        {
            var sessionId = Guid.NewGuid().ToString();

            var model = GenerateModel(appId, appSecret, sessionId);

            await Instance.RegisterPartnerAppRequestLogAsync(model, cancellationToken);

            await Task.Delay(InitialDelayMilliseconds, cancellationToken);

            var response = await Instance.RetrieveDeviceStatusAsync(model, cancellationToken);

            // Schedule log updates in the background
            //_ = Instance.UpdateRequestLogDateTimeAsync(appId, appSecret, sessionId, cancellationToken);

            return response;
        }

        private static PartnerAppRequestLogModel GenerateModel(string appId, string appSecret, string sessionId)
        {
            var naonce = HmacHashing.GenerateNonce();
            var signature = HmacHashing.GenerateHmac(appId, appSecret, naonce);

            var model = new PartnerAppRequestLogModel
            {
                AppId = appId,
                Signature = signature,
                Nonce = naonce,
                AppUserId = "",
                AppRequestData = "",
                SessionId = sessionId
            };

            return model;
        }

        private async Task RegisterPartnerAppRequestLogAsync(PartnerAppRequestLogModel model, CancellationToken cancellationToken)
        {
            await ApiHandlers.PartnerAppRequestLogRegisterAsync(model);
        }

        private async Task UpdateRequestLogDateTimeAsync(string appId, string appSecret, string sessionId, CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var model = GenerateModel(appId, appSecret, sessionId);
                await ApiHandlers.PartnerAppRequestLogDateTimeUpdate(model);
                await Task.Delay(UpdateIntervalMilliseconds, cancellationToken);
            }
        }

        private async Task<(bool IsGreen, ClimateStatusModel ClimateStatusModel)> RetrieveDeviceStatusAsync(
            PartnerAppRequestLogModel model,
            CancellationToken cancellationToken)
        {
            int attempt = 0;

            while (attempt < MaxRetries && !cancellationToken.IsCancellationRequested)
            {
                attempt++;
                var response = await ApiHandlers.GetDeviceStatusAsync(model);

                if (response.ClimateStatusModel == ClimateStatusModel.Undefined)
                {
                    await Task.Delay(InitialDelayMilliseconds, cancellationToken);
                }
                else
                {
                    return response;
                }
            }

            return (false, ClimateStatusModel.Undefined);
        }
    }
}
