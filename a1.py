from aip import AipOcr

""" 你的 APPID AK SK """
APP_ID = '10809413'
API_KEY = 'NgefHCEBap9MjUqnRunWqIgA'
SECRET_KEY = 'adup0cAA6KapjfLIye63QtmfM00Mtv8l'

client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
""" 读取图片 """
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

image = get_file_content('example.jpg')

# """ 调用通用文字识别, 图片参数为本地图片 """
# a=client.basicGeneral(image);
# print(a)

""" 如果有可选参数 """
options = {}
options["language_type"] = "CHN_ENG"
options["detect_direction"] = "true"
options["detect_language"] = "true"
#options["probability"] = "true"

""" 带参数调用通用文字识别, 图片参数为本地图片 """
#a=client.basicGeneral(image, options)
a=client.general(image, options)
print(a)

# url = "https//www.x.com/sample.jpg"

# """ 调用通用文字识别, 图片参数为远程url图片 """
# client.basicGeneralUrl(url);

# """ 如果有可选参数 """
# options = {}
# options["language_type"] = "CHN_ENG"
# options["detect_direction"] = "true"
# options["detect_language"] = "true"
# options["probability"] = "true"

# """ 带参数调用通用文字识别, 图片参数为远程url图片 """
# client.basicGeneralUrl(url, options)