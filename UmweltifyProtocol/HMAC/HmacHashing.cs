using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace UmweltifyProtocol.HMAC;

public class HmacHashing
{
    public static string GenerateHmac(string appId, string appSecret, string nonce)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(appSecret));
        var data = $"{appId}:{nonce}";
        var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
        return Convert.ToHexString(hashBytes);
    }

    public static string GenerateNonce()
    {
        return Guid.NewGuid().ToString("N"); // Generate a unique nonce
    }
}
