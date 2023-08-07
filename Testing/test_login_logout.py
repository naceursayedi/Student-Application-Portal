import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from load_data import restapi_test_data
from selenium.webdriver import FirefoxOptions
import time
import requests

@pytest.mark.title("Login and Lougout")
@pytest.mark.description("This test checks the login and logout process as an admin")
def test_login_logout():
    response = requests.get("http://localhost/api/publicUsers")
    print(response.json())
    opts = FirefoxOptions()
    opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    driver.get("http://localhost:3000/")

    # Navigate to the login page
    # Fill in the login form
    login_btn = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenLoginDialogButton"))
    )
    login_btn.click()
    username = driver.find_element(By.ID, 'LoginDialogUserIDText')
    username.send_keys(restapi_test_data["login"]["admin"]["username"])
    password = driver.find_element(By.ID, 'LoginDialogPasswordText')
    password.send_keys(restapi_test_data["login"]["admin"]["pwd"])

    # Submit the login form
    submit_btn = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "PerformLoginButton"))
    )
    submit_btn.click()
    time.sleep(5)
    logout_btn = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "LogoutButton"))
    )
    logout_btn.click()
    time.sleep(5)
    # we want now to test if we are landed to the public page after login and logout process
    public_page = driver.find_element(By.ID, 'OpenLoginDialogButton')

    assert "Login" in public_page.get_attribute(
        'innerHTML'), "login button doesn't appeared after login logout process as an admin "

    # now we are done with our test, we quit the test
    # close the browser
    driver.quit()
