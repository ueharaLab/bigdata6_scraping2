from urllib.request import Request, urlopen
import urllib.request
import urllib.parse
import lxml.html
import random
import pandas as pd
import codecs

headers = {'User-Agent': 'datascience/1.0 (educational exercise)'}

req = Request('http://localhost:8000/menu/32_21_gunma.html' , headers=headers)

res = urlopen(req)
html = res.read()

# htmlをツリー構造に変換したデータを生成
root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))
title = root.xpath("//h2[@class='tit06']/span[@class='name']")
print('料理名',title[0].text_content())

ingreds = []
ing_path = root.xpath("//ul[@class='list']")
for ing in ing_path:
           
    ingredient = ing.text_content().strip().replace('\n','').replace('\r\n','')    
    print(ingredient)
    
    ingreds.append(ingredient)
    
ingreds_df = pd.DataFrame(ingreds, columns = ['材料'])
with codecs.open("ingredient.csv", "w", "ms932", "ignore") as f: 
    #header=Trueで、見出しを書き出す
    ingreds_df.to_csv(f, index=False, encoding="ms932", mode='w', header=True)
