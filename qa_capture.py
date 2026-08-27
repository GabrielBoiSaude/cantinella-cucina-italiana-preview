import asyncio
import base64
import json
from pathlib import Path
import urllib.request
import websockets

CDP = "http://127.0.0.1:9222/json/new?http://127.0.0.1:4173/?qa=1"
OUT = Path("qa-visual/full")

async def main():
    request = urllib.request.Request(CDP, method="PUT")
    with urllib.request.urlopen(request) as response:
        target = json.load(response)
    async with websockets.connect(target["webSocketDebuggerUrl"], max_size=None) as ws:
        counter = 0
        async def call(method, params=None):
            nonlocal counter
            counter += 1
            msg_id = counter
            await ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                reply = json.loads(await ws.recv())
                if reply.get("id") == msg_id:
                    if "error" in reply:
                        raise RuntimeError(reply["error"])
                    return reply.get("result", {})
        await call("Page.enable")
        for name, width, height, scale in (("desktop", 1440, 1050, 1), ("mobile", 390, 844, 2)):
            await call("Emulation.setDeviceMetricsOverride", {"width": width, "height": height, "deviceScaleFactor": scale, "mobile": name == "mobile"})
            await call("Page.navigate", {"url": "http://127.0.0.1:4173/?qa=1"})
            await asyncio.sleep(2)
            metrics = await call("Page.getLayoutMetrics")
            size = metrics["contentSize"]
            shot = await call("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": True, "clip": {"x": 0, "y": 0, "width": size["width"], "height": size["height"], "scale": 1}})
            (OUT / f"{name}-full.png").parent.mkdir(parents=True, exist_ok=True)
            (OUT / f"{name}-full.png").write_bytes(base64.b64decode(shot["data"]))
            print(json.dumps({"viewport": name, "content": size, "file": str(OUT / f"{name}-full.png")}))

asyncio.run(main())
