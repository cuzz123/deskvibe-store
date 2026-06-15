import requests, re, time, pathlib

key = re.search(r'AGNES_API_KEY=(.+)', open('.env.local').read()).group(1).strip()
out = pathlib.Path('public/images')

prods = [
 (41,"floating walnut wood monitor wall shelf above desk, hidden bracket, clean modern, 8k product photo white background"),
 (42,"extra wide walnut dual monitor stand riser on desk, two drawers, spacious, 8k product photo white background"),
 (43,"silver aluminum adjustable monitor arm on clean desk, polished metal modern, 8k product photo white background"),
 (44,"small white oak wood monitor stand for kids study desk, rounded corners, 8k product photo white background"),
 (45,"white adhesive cable raceway channels neatly installed on wall, organized cables, 8k product photo"),
 (46,"black metal under desk power strip holder bracket mounted, clean hidden, 8k product photo"),
 (47,"bamboo wood cable management box on desk hiding power strip, neat organized, 8k product photo"),
 (48,"brown genuine leather desk mat on wooden desk, premium luxury texture, 8k product photo"),
 (49,"natural cork desk mat on white desk, sustainable eco material, 8k product photo"),
 (50,"extra large black desk mat covering entire desk surface, full coverage, 8k product photo"),
 (51,"premium dual light monitor screen bar with front back glow, modern desk, 8k product photo"),
 (52,"mid century modern desk lamp walnut wood base brass stem, elegant, 8k product photo"),
 (53,"motion sensor LED strip light under shelf above desk, warm glow, 8k product photo"),
 (54,"desk ring light with tripod for video calls, soft even lighting, 8k product photo"),
 (55,"walnut wood three tier stackable paper tray on desk, organized, 8k product photo"),
 (56,"walnut wood sticky note holder with pen on desk, minimalist, 8k product photo"),
 (57,"matte black metal small desk trash can with lid, minimalist modern, 8k product photo"),
 (58,"bamboo wood vertical letter sorter organizer on desk, compact, 8k product photo"),
 (59,"white rolling three drawer desk storage unit, organized modern office, 8k product photo"),
 (60,"black gel ergonomic keyboard wrist rest on desk, cooling texture, 8k product photo"),
 (61,"grey memory foam seat cushion on black office chair, ergonomic, 8k product photo"),
 (62,"adjustable height steel wood monitor stand riser three levels, ergonomic, 8k product photo"),
 (63,"wooden standing desk balance board on floor, active standing modern office, 8k product photo"),
 (64,"premium aluminum 12 in 1 USB-C hub on desk multiple ports, professional, 8k product photo"),
 (65,"aluminum vertical dual laptop stand holder, two laptops stored, space saving, 8k product photo"),
 (66,"screen cleaning kit microfiber cloth spray bottle on desk, 8k product photo"),
 (67,"monitor privacy filter screen on display anti glare security, 8k product photo"),
 (68,"rechargeable electric air duster for keyboard cleaning, powerful black, 8k product photo"),
 (69,"three small real succulent plants in concrete mini pots on desk, natural, 8k product photo"),
 (70,"warm white LED neon sign saying FOCUS on wall above desk, motivational, 8k"),
 (71,"elegant black sand hourglass walnut wood base on desk, decorative timer, 8k product photo"),
 (72,"acrylic magnetic photo frames on desk with photos, modern clear, 8k product photo"),
 (73,"flat lay cable management kit bundle magnetic clips tray sleeves velcro, 8k product photo"),
 (74,"flat lay ergonomic office accessories bundle wrist rest lumbar footrest cushion, 8k product photo"),
 (75,"flat lay desk aesthetics bundle walnut stand light bar mat clock planter, 8k product photo"),
]

todo = [(pid, p) for pid, p in prods if not (out / f"product-{pid}.jpg").exists()]
print(f"Missing: {len(todo)}")

for i, (pid, prompt) in enumerate(todo):
    fp = out / f"product-{pid}.jpg"
    print(f"[{i+1}/{len(todo)}] {pid} ", end="", flush=True)
    for t in range(3):
        try:
            r = requests.post('https://apihub.agnes-ai.com/v1/images/generations',
                headers={'Content-Type':'application/json','Authorization':f'Bearer {key}'},
                json={'model':'agnes-image-2.1-flash','prompt':prompt,'n':1,'size':'1024x1024'}, timeout=90)
            d = r.json()
            if d.get('data'):
                url = d['data'][0].get('url','')
                if url:
                    fp.write_bytes(requests.get(url, timeout=30).content)
                    print(f" OK {fp.stat().st_size//1024}KB"); break
        except Exception as e:
            if t < 2: print(".", end="", flush=True); time.sleep(5)
    else: print(" FAIL")
    time.sleep(4)
print(f"\nDone. {sum(1 for p,_ in prods if (out/f'product-{p}.jpg').exists())}/{len(prods)} images")
