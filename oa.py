#coding=utf-8
import selenium
from selenium import webdriver
import time
def findMessage(title):
	frame=browser.find_element_by_id("main");
	browser.switch_to_frame(frame);#switch_to_default_content
	condition=browser.find_element_by_id('condition')#bodyIDmessageList')
	messagecont=browser.find_element_by_id('messageContentDiv')
	condition.find_elements_by_tag_name('option')[1].click()#title
	messagecont.find_element_by_class_name('textfield').send_keys(title)
	browser.find_element_by_class_name('condition-search-button').click()
	time.sleep(1)
def getMessages():
	tbody=browser.find_element_by_id("bodyIDmessageList")
	mes=tbody.find_elements_by_tag_name("tr")
	for me in mes:
		tds=me.find_elements_by_tag_name("td")
		tds[1].find_element_by_class_name("like-a").click()
		break
def login():
	print(dir(browser))
	browser.get("http://oa.ncschina.com")
	time.sleep(2)
	browser.find_element_by_id("login_username").send_keys("mahongquan")
	browser.find_element_by_id("login_password").send_keys("mhq730208")
	browser.find_element_by_id('login_button').click()
	time.sleep(2)
def showMessages():
	while(True):
		try:
			browser.find_element_by_id('remind_msga').click()
			break
		except selenium.common.exceptions.NoSuchElementException as e:
			pass
		except selenium.common.exceptions.WebDriverException as e2:
			pass
		time.sleep(1)
browser = webdriver.Firefox()
login()
showMessages()
findMessage("车辆")
getMessages()

