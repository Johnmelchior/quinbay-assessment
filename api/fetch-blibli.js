import fetch from "node-fetch";

fetch("https://www.blibli.com/backend/search/products?searchTerm=apple&start=0&itemPerPage=2", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "Blibli-User-Id=110e2767-1d91-498b-960c-97933ec1465c; Blibli-Is-Member=false; Blibli-Is-Remember=false; Blibli-Session-Id=4d29e9d3-b37c-4783-9303-ba4fb03764c3; Blibli-Signature=3f6793429e219bf620bbefc4e41f67cca3f9b20c; JSESSIONID=0336DA7BE0779BC78E87284096517967; _gcl_au=1.1.1393690060.1656691420; _ga=GA1.1.1454635524.1656691420; cebs=1; _ce.s=v~bf586add6500773314be5acde0c0963982a0e2ae~vpv~0; moe_uuid=5cf3989f-c448-4282-83a5-fc8fb7bf472f; _vwo_uuid_v2=D9A174FF6CB08F97BE4A321D49DF9C57C|bad77a5cd9a9477428ddf5193b915539; {JSESSIONID=41676571CD6F35E91B8CC4884F875C1E; _ga_G3ZP2F3MW9=GS1.1.1656747067.3.0.1656747067.60"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}).then(async(response) => {
    console.dir(await response.json());
});

