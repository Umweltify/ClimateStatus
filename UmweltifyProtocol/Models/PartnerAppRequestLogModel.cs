namespace UmweltifyProtocol.Models;

public class PartnerAppRequestLogModel
{
    public string AppId { get; set; } = string.Empty;
    public string Signature { get; set; } = string.Empty;
    public string Nonce { get; set; } = string.Empty;
    
    public string AppUserId { get; set; } = string.Empty;
    public string AppRequestData { get; set; } = string.Empty;
    
    public string SessionId { get; set; } = string.Empty;
}
