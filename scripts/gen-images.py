import requests, json, re, os, time, pathlib

key = re.search(r'AGNES_API_KEY=(.+)', open('.env.local').read()).group(1).strip()
out = pathlib.Path('public/images')
new = json.load(open('scripts/new-products.json'))

todo = [p for p in new if not (out / f"product-{p['id']}.jpg").exists()]
print(f"Missing: {len(todo)} / {len(new)}")

ok = 0
for i, p in enumerate(todo):
    fp = out / f"product-{p['id']}.jpg"
    print(f"[{i+1}/{len(todo)}] product-{p['id']}.jpg ", end="", flush=True)
    done = False
    for t in range(3):
        try:
            r = requests.post('https://apihub.agnes-ai.com/v1/images/generations',
                headers={'Content-Type':'application/json','Authorization':f'Bearer {key}'},
                json={'model':'agnes-image-2.1-flash','prompt':p['imagePrompt'],'n':1,'size':'1024x1024'},
                timeout=60)
            d = r.json()
            if 'data' in d and d['data']:
                url = d['data'][0].get('url')
                if url:
                    img = requests.get(url, timeout=30).content
                    fp.write_bytes(img)
                    print(f"OK {len(img)//1024}KB")
                    ok += 1
                    done = True
                    break
        except Exception as e:
            if t < 2:
                print(".", end="", flush=True)
                time.sleep(4)
    if not done:
        print("FAIL")
    if i < len(todo) - 1:
        time.sleep(4)

print(f"\nDone: {ok}/{len(todo)}")
