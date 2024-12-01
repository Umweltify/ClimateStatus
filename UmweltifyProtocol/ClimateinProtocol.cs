using System;
using System.Threading;
using System.Threading.Tasks;
using UmweltifyProtocol.Models;
using UmweltifyProtocol.Models.Enum;
using UmweltifyProtocol.Services;
using UmweltifyProtocol.HMAC;

namespace UmweltifyProtocol
{
    public delegate void GetClimateStatus(bool isGreen, ClimateStatusModel climateStatusModel);

    public class ClimateinProtocol
    {
        
        public event GetClimateStatus GetClimateStatus;
        protected virtual void OnGetClimateStatus(bool isGreen, ClimateStatusModel climateStatusModel)
        {
            GetClimateStatus handler = GetClimateStatus;
            if (handler != null)
            {
                handler(isGreen, climateStatusModel);
            }
        }

        private const int MaxRetries = 3;
        private const int InitialDelayMilliseconds = 1000;
        private const int UpdateIntervalMilliseconds = 0; //5 * 60 * 1000;
               
        /// <summary>
        /// Retrieves the environmental status of a device for a partner application.
        /// </summary>
        /// <param name="appId">The application ID.</param>
        /// <param name="appSecret">The application secret.</param>
        /// <param name="cancellationToken">Token to cancel the operation.</param>
        /// <returns>A tuple containing a boolean indicating green status and a ClimateStatusModel.</returns>
        public async Task GetDeviceStatusAsync(
            string appId,
            string appSecret,
            CancellationToken cancellationToken = default)
        {
            var sessionId = Guid.NewGuid().ToString();

            var model = GenerateModel(appId, appSecret, sessionId);

            await RegisterPartnerAppRequestLogAsync(model, cancellationToken);

            _ = RetrieveDeviceStatusAsync(model, cancellationToken);

            // Schedule log updates in the background
            //_ = Instance.UpdateRequestLogDateTimeAsync(appId, appSecret, sessionId, cancellationToken);
        }

        private PartnerAppRequestLogModel GenerateModel(string appId, string appSecret, string sessionId)
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

        private async Task RetrieveDeviceStatusAsync(
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
                    OnGetClimateStatus(response.IsGreen, response.ClimateStatusModel);
                    return;
                }
            }

            OnGetClimateStatus(false, ClimateStatusModel.Undefined);
        }
    }
}
