from urllib.request import Request, urlopen
import urllib.request
import lxml.html
import codecs


headers = {'User-Agent': 'datascience/1.0 (educational exercise)'}

img_url = 'http://localhost:8000/assets/j/keikaku/syokubunka/k_ryouri/img/gunma_1_1.jpg'
print(img_url)
req = Request(img_url, headers=headers)
res = urlopen(req)
image=res.read() 
img_file = open('image.jpg', 'wb')
img_file.write(image)
img_file.close()
