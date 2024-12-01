import { ClimateStatus, ClimateStatusModel, mapClimateStatusToModel } from './ClimateStatusMapper.js'

const ApiHandlers = {
    partnerAppRequestLogRegister(model) {
        try {
            const queryString = new URLSearchParams(model).toString();
            const fullUrl = `umweltify://v1/partnerAppRequestLogRegister?${queryString}`;
            this.simulateCustomProtocolCall(fullUrl);
        } catch {
        }
    },

    async getDeviceStatus(model, getDeviceStatusCallback) {
        const apiUrl = "https://localhost:7152/v1/PartnerAppProtocol/GetDeviceStatus";
        const apiKeyName = "UMWELTIFY-API-KEY";
        const apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";

        let attempt = 0;
        const maxAttempts = 20;
        var timeout = 1000;

        while (attempt < maxAttempts) {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        [apiKeyName]: apiKeyValue,
                    },
                    body: JSON.stringify(model),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                const isGreen = responseData.Data?.IsGreen || false;
                const climateStatusModel = mapClimateStatusToModel(responseData.Data?.ClimateStatus ?? ClimateStatusModel.Undefined);
                const deviceId = responseData.Data?.DeviceId;

                if (deviceId) {
                    await this.saveDeviceIdToIndexedDB(deviceId);
                }

                getDeviceStatusCallback(isGreen, climateStatusModel);
                break;
            } catch (error) {                
                attempt++;
                if (attempt >= maxAttempts) {                    
                    return {
                        isGreen: false,
                        climateStatusModel: ClimateStatusModel.Undefined,
                    };
                }
                await new Promise(resolve => setTimeout(resolve, timeout));
                timeout += 500;
            }
        }
    },

    async getDeviceStatusByDeviceId(model, getDeviceStatusCallback) {
        //const apiUrl = "https://localhost:7152/v1/PartnerAppProtocol/GetDeviceStatusByDeviceId";
        const apiUrl = "https://api.umweltify.com/v1/PartnerAppProtocol/GetDeviceStatus";
        const apiKeyName = "UMWELTIFY-API-KEY";
        const apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    [apiKeyName]: apiKeyValue,
                },
                body: JSON.stringify(model),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            const isGreen = responseData.Data?.IsGreen || false;
            const climateStatusModel = responseData.Data?.ClimateStatus ?? ClimateStatusModel.Undefined;

            getDeviceStatusCallback(isGreen, climateStatusModel);
        } catch {            
            return {
                isGreen: false,
                climateStatusModel: ClimateStatusModel.Undefined,
            };
        }
    },

    simulateCustomProtocolCall(url) {
        const a = document.createElement("a");
        a.href = url;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    async saveDeviceIdToIndexedDB(deviceId) {        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('PersistentStorage', 2);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('deviceData')) {
                    db.createObjectStore('deviceData', { keyPath: 'key' });
                }
            };

            request.onsuccess = async (event) => {
                const db = event.target.result;

                const transaction = db.transaction('deviceData', 'readwrite');
                const store = transaction.objectStore('deviceData');

                const putRequest = store.put({ key: 'DeviceId', value: deviceId });

                putRequest.onsuccess = () => {                    
                    resolve();
                };

                putRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }    
};

export { ApiHandlers };