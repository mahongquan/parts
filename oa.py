#coding=utf-8
    # ID = "id"
    # XPATH = "xpath"
    # LINK_TEXT = "link text"
    # PARTIAL_LINK_TEXT = "partial link text"
    # NAME = "name"
    # TAG_NAME = "tag name"
    # CLASS_NAME = "class name"
    # CSS_SELECTOR = "css selector"
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import *
import time
import sys
import pickle
from datetime import datetime
browser=None
objSave={}
def mywait_id(id):
	loc=(By.ID,id)#by:By.ID, value:"condition"}
	ec=EC.presence_of_element_located(loc)
	return WebDriverWait(browser,10).until(ec)
def mywait(loc):
	ec=EC.presence_of_element_located(loc)
	return WebDriverWait(browser,10).until(ec)
def findMessage(title):
	frame=browser.find_element_by_id("main");
	browser.switch_to_frame(frame);#switch_to_default_content
	loc=(By.ID,"condition")#by:By.ID, value:"condition"}
	ec=EC.presence_of_element_located(loc)
	condition=WebDriverWait(browser,10).until(ec)#browser.find_element_by_id('condition')#bodyIDmessageList')
	condition.find_elements_by_tag_name('option')[1].click()#title
	messagecont=browser.find_element_by_id('messageContentDiv')
	messagecont.find_element_by_class_name('textfield').send_keys(title)
	browser.find_element_by_class_name('condition-search-button').click()
def getMessages():
	tbody=mywait_id("bodyIDmessageList")
	mes=tbody.find_elements_by_tag_name("tr")
	for me in mes:
		tds=me.find_elements_by_tag_name("td")
		tds[1].find_element_by_class_name("like-a").click()
		break
def login(name,pwd):
	browser.get("http://oa.ncschina.com")
	login_username=mywait_id("login_username")
	login_username.send_keys(name)
	browser.find_element_by_id("login_password").send_keys(pwd)
	browser.find_element_by_id('login_button').click()

def showMessages():
	msg=mywait_id('remind_msga')
	msg.click()
def testMessage():
	showMessages()
	findMessage("车辆")
	getMessages()
def setupBrowser(usefirefox):
	global browser
	if usefirefox:
		profile=webdriver.FirefoxProfile()
		print(dir(profile))
		profile.set_preference("permissions.default.image", 2);
		#禁用浏览器缓存
		profile.set_preference("network.http.use-cache", False);
		profile.set_preference("browser.cache.memory.enable", False);
		profile.set_preference("browser.cache.disk.enable", False);
		profile.set_preference("browser.sessionhistory.max_total_viewers", 3);
		profile.set_preference("network.dns.disableIPv6", True);
		profile.set_preference("Content.notify.interval", 750000);
		profile.set_preference("content.notify.backoffcount", 3);
		#有的网站支持   有的不支持
		profile.set_preference("network.http.pipelining", True);
		profile.set_preference("network.http.proxy.pipelining", True);
		profile.set_preference("network.http.pipelining.maxrequests", 32);

		profile.set_preference("browser.download.folderList",2);
		profile.set_preference("browser.download.manager.showWhenStarting",	False);
		profile.set_preference("browser.download.dir","~/Downloads");
		profile.set_preference("browser.helperApps.neverAsk.saveToDisk","application/octet-stream")
		#profile.set_preference("browser.helperApps.neverAsk.saveToDisk","text/csv");
		browser = webdriver.Firefox(profile)
		return browser
	else:
		browser = webdriver.Ie()#Chrome()#Ie()#PhantomJS()
		#browser.set_window_size(1024,800)
		return browser
def findTodo(title):
	frame=browser.find_element_by_id("main");
	browser.switch_to_frame(frame);#switch_to_default_content
	loc=(By.CLASS_NAME,"common_search")#by:By.ID, value:"condition"}
	ec=EC.presence_of_element_located(loc)
	search=WebDriverWait(browser,10).until(ec)#browser.find_element_by_id('condition')#bodyIDmessageList')	
	loc=(By.CLASS_NAME,"common_drop_list_text")#by:By.ID, value:"condition"}
	ec=EC.presence_of_element_located(loc)
	condition=WebDriverWait(browser,10).until(ec)#browser.find_element_by_id('condition')#bodyIDmessageList')
	actions=ActionChains(browser)
	actions.move_to_element(condition).perform()
	items=search.find_elements_by_class_name("text_overflow")
	items[1].click()
	search.find_element_by_class_name('search_input').send_keys(title)
	search.find_element_by_class_name('search_btn').click()
	return frame
def  showTodo():
	#second_menu_content
	menuUL=mywait_id("menuUL")
	menus=browser.find_elements_by_class_name("main_menu_a")
	for menu in menus:
		print(menu.text)
	browser.execute_script("""
m0=$(".main_menu_a")[0];
$(m0).trigger("mouseenter");
//while(true){
	//items=$(".second_menu_item");
	//if(items!=undefined)
	//{
	//	break;
	//}
//}
//console.log(items);
//i=items[4];
//$(i).trigger("mouseenter");
//$(i.children[0]).trigger("click");//eval(i.children[0].attributes["onclick"].value);
""")
	# menus=browser.find_elements_by_class_name("main_menu_a")
	# for menu in menus:
	# 	print(menu.text)
	# co=menus[0]
	# actions=ActionChains(browser)
	# actions.move_to_element(co).click(co).move_by_offset(0,50).perform()
	items=browser.find_elements_by_class_name("second_menu_item")
	#browser.get_screenshot_as_file("before daiban click.png")
	print(items)
	items[4].click()#dai ban
def checktitle(title):
	# id="colSummaryData" table tbody tr td[1] 
	summarydata=browser.find_element_by_id("colSummaryData")
	tbody=summarydata.find_element_by_tag_name("tbody")
	tr=tbody.find_element_by_tag_name("tr")
	tds=tr.find_elements_by_tag_name("td")
	while True:
		print(tds[1].text,title)
		if tds[1].text==title:
			break
		time.sleep(3)
def  downloadTodofiles():
	tbody=mywait_id("listPending")
	mes=tbody.find_elements_by_tag_name("tr")#here error selenium.common.exceptions.StaleElementReferenceException
	rt=[]
	i=0
	maxtime=None
	for me in mes:
		tds=me.find_elements_by_tag_name("td")
		todotime=datetime.strptime(tds[3].text,"%Y-%m-%d %H:%M")
		print(objSave["lasttime"],todotime)
		if todotime<=objSave["lasttime"]:
			objSave["lasttime"]=maxtime
			save()
			break
		else:
			if maxtime==None:
				maxtime=todotime
		title=tds[1].text
		tds[1].click()
		time.sleep(3)#wait new summary
		summary=mywait_id("summary")
		browser.switch_to_frame(summary);
		files=mywait_id("attachmentAreashowAttFile")
		checktitle(title)
		link=files.find_element_by_tag_name("a")
		cmd="window.open('%s')" % link.get_attribute("href")
		browser.execute_script(cmd)
		print(cmd)
		rt.append(link.get_attribute("href"))
		browser.switch_to_default_content()
		frame=browser.find_element_by_id("main");
		browser.switch_to_frame(frame);
	return rt
def downloadBg():
	rt=downloadTodofiles()#openTodo()
	for i in range(len(rt)):
		print(rt[i])
		cmd="window.open('%s')" % rt[i]
		browser.execute_script(cmd)
		time.sleep(3)
def main(name,pwd):
	global browser
	browser=setupBrowser(False)
	print(dir(browser))
	login(name,pwd)
	showTodo()#testMessage()
	findTodo("标钢")
	downloadTodofiles()
	return browser
def load():
	global objSave
	try:
		objSave=pickle.load(open("save.pickle","rb"))
	except FileNotFoundError as e:
		objSave={}
	return objSave
def save():#'2016-06-07 14:31'
	pickle.dump(objSave, open("save.pickle","wb")) 
if __name__ == "__main__":
	#python3 oa.py name pwd
	load()
	if objSave.get("lasttime")==None:
		t=datetime.strptime('2016-06-07 14:31',"%Y-%m-%d %H:%M")
		objSave["lasttime"]=t
	print(sys.argv)
	if len(sys.argv)>2:
		main(sys.argv[1],sys.argv[2])

