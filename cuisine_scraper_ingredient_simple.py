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

req = Request('http://localhost:8000/menu/32_21_gunma.html' , headers=headers)

res = urlopen(req)
html = res.read()

# htmlをツリー構造に変換したデータを生成
root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))
title = root.xpath("//h2[@class='tit06']/span[@class='name']")
print('料理名',title[0].text_content())

ing_path = root.xpath("//ul[@class='list']")
for ing in ing_path:
           
    ingredient = ing.text_content()
    print(ingredient)
    #print(ingredient.strip().replace('\n','').replace('\r\n','')  )      

