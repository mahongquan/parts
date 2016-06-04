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
def setupBrowser():
	usefirefox=True
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
		browser = webdriver.PhantomJS()
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
	actions.move_to_element(condition)
	actions.click()#_and_hold()
	actions.perform()
	items=search.find_elements_by_class_name("text_overflow")
	items[1].click()
	search.find_element_by_class_name('search_input').send_keys(title)
	search.find_element_by_class_name('search_btn').click()
	return frame
def  showTodo():
	#second_menu_content
	menuUL=mywait_id("menuUL")
	menus=browser.find_elements_by_class_name("main_menu_a")
	co=menus[0]
	actions=ActionChains(browser)
	actions.move_to_element(co)
	actions.click()
	actions.perform()
	#submenu=browser.find_element_by_class_name("second_menu_content")
	items=browser.find_elements_by_class_name("second_menu_item")
	items[4].click()#dai ban
def  downloadTodofiles():
	tbody=mywait_id("list")
	mes=tbody.find_elements_by_tag_name("tr")
	for me in mes:
		tds=me.find_elements_by_tag_name("td")
		tds[1].click()
		time.sleep(2)#wait new summary
		summary=mywait_id("summary")
		browser.switch_to_frame(summary);
		files=mywait_id("attachmentAreashowAttFile")
		link=files.find_element_by_tag_name("a")
		cmd="window.open('%s')" % link.get_attribute("href")
		browser.execute_script(cmd)
		browser.switch_to_default_content()
		frame=browser.find_element_by_id("main");
		browser.switch_to_frame(frame);
if __name__ == "__main__":
	#python3 oa.py name pwd
	print(sys.argv)
	browser=setupBrowser()
	print(dir(browser))
	login(sys.argv[1],sys.argv[2])
	showTodo()#testMessage()
	findTodo("标钢")
	#openTodo()
