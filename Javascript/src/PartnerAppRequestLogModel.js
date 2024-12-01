class PartnerAppRequestLogModel {
    constructor(appId, signature, nonce, appUserId, appRequestData, sessionId, deviceId="") {
        this.AppId = appId || "";
        this.Signature = signature || "";
        this.Nonce = nonce || "";
        this.AppUserId = appUserId || "";
        this.AppRequestData = appRequestData || "";
        this.SessionId = sessionId || "";
        this.deviceId = deviceId || "";
    }
}

export { PartnerAppRequestLogModel }