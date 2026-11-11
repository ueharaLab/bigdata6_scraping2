from urllib.request import Request, urlopen
import urllib.request
import urllib.parse
import lxml.html
import random
import pandas as pd
import codecs
import re

headers = {'User-Agent': 'datascience/1.0 (educational exercise)'}

req = Request('####' , headers=headers)

res = urlopen(req)
html = res.read()

# htmlをツリー構造に変換したデータを生成
root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))
title = root.xpath("//h2[@class='tit06']/span[@class='name']")
print('料理名',title[0].text_content())

ingreds = []
ing_path = root.xpath("####")
for ing in ing_path:
           
    ingredient = ing.text_content().strip().replace('\n','').replace('\r\n','')   
    
        
    matched = re.findall('####',ingredient)    
    if len(matched) == 0:
        matched = re.findall('(###)(大さじ)([0-9]+)',ingredient)
    print(ingredient)
    print(matched)
    
    ingreds.append(matched[0])
    
    


##### = pd.DataFrame(####,columns = #####)
with codecs.open("ingredient_reg.csv", "w", "ms932", "ignore") as f: 
    #header=Trueで、見出しを書き出す
    ingreds_df.to_csv(f, index=False, encoding="ms932", mode='w', header=True)
