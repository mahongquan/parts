page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    //(...)
});
and then call hover on your element:

$('#some_element').trigger('hover');


import requests
from selenium import webdriver

driver = webdriver.PhantomJS()
driver.get('page_with_download_link')
download_link = driver.find_element_by_id('download_link')
session = requests.Session()
cookies = driver.get_cookies()

for cookie in cookies: 
    session.cookies.set(cookie['name'], cookie['value'])
response = session.get(download_link)