from urllib.request import Request, urlopen
import urllib.request
import lxml.html
import codecs


headers = {'User-Agent': 'datascience/1.0 (educational exercise)'}

# 群馬の郷土料理ページを取得
req = Request('http://localhost:8000/area/gunma.html' , headers=headers)
res = urlopen(req)
html = res.read()
 
root = lxml.html.fromstring(html.decode('utf-8',errors='replace'))

# 郷土料理画像へのxpathを定義
img_paths = root.xpath("####")

for i,img_path in enumerate(img_paths): #画像へのpathを１つづつ取り出す

    # 画像URLを取得
    link = img_path.get('####')
    # 画像URLを編集    
    img_url = 'http://localhost:8000' + link[2:]
    print(img_url)
    # 画像をクローリング
    ####
    
    ####
    
    # 画像を１つづつ異なる名前をつけて保存
    ####
    ヒント：i を使って名前を変える    
    ####
