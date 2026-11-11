from urllib.request import Request, urlopen
import urllib.request
import urllib.parse
import lxml.html
import random
import time

wait_seconds = random.uniform(0, 20)
print(f"アクセスまで {wait_seconds:.1f} 秒待機します")
#time.sleep(wait_seconds)

headers = {'User-Agent': 'datascience/1.0 (educational exercise)'}

req = Request('http://localhost:8000/area/gunma.html' , headers=headers)
res = urlopen(req)
html = res.read()

# htmlをツリー構造に変換したデータを生成
root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))

link_path = root.xpath("//li/a[@class='hover']")

for link in link_path:
    
    l = link.get('href')
    
    link_url = 'http://localhost:8000' + l[2:]
    
    req = Request(link_url , headers=headers)
    res = urlopen(req)
    html = res.read()

    # htmlをツリー構造に変換したデータを生成
    #<ul class="menu_material clm2 mt10">
    root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))
    ing_path = root.xpath("//ul[@class='list']")
    #<h2 class="tit06"><span class="name">おきりこみ／おっきりこみ</span></h2>
    title = root.xpath("//h2[@class='tit06']/span[@class='name']")
    print('料理名',title[0].text_content())
    
    
    
    for ing in ing_path:
               
        print(ing.text_content())        

