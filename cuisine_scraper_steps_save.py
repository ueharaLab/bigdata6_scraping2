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

steps = []
#<div class="txt">
step_path = ####
for step in step_path:
           
    step_text = step.####  
    print(step_text)
    
    steps.append(step_text)
    
step_df = pd.DataFrame(steps, columns = ['調理工程'])
###
step_df をcsvに書き出す
###