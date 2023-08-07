import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from load_data import restapi_test_data
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")
driver = webdriver.Firefox(options=opts)

driver.get("http://frontend:3000/")


@pytest.mark.title("Testing Delete User  - delete User")
@pytest.mark.description("This test checks the delete process and if the deleted User appear")
def test_delete_user_as_admin():
    # Navigate to the login page and login as admin
    OpenLoginDialogButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenLoginDialogButton"))
    )
    OpenLoginDialogButton.click()

    UserName = driver.find_element(By.ID, 'LoginDialogUserIDText')
    UserName.send_keys(restapi_test_data["login"]["admin"]["username"])
    Password = driver.find_element(By.ID, 'LoginDialogPasswordText')
    Password.send_keys(restapi_test_data["login"]["admin"]["pwd"])

    # Submit the login form
    PerformLoginButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "PerformLoginButton"))
    )
    PerformLoginButton.click()

    OpenUserManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenUserManagementPageButton"))
    )
    OpenUserManagementPageButton.click()
    UserItemButtonID = "UserItemDeleteButton" + \
        restapi_test_data["users"]["user1"]["userID"]
    UserManagementPageEditUserButton = driver.find_element(
        By.ID, UserItemButtonID)
    UserManagementPageEditUserButton.send_keys(Keys.RETURN)
    DeleteUserModalButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "DeleteDialogConfirmButton"))
    )
    DeleteUserModalButton.click()
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    assert len(
        cards) == 1, "The created User should be deleted and only 1 card(Admin) is appeared in the page"


@pytest.mark.title("Testing Degree Course   - Delete Degree Course as Admin")
@pytest.mark.description("This test checks the create process and if the created Degree Course appeared after creation")
def test_delete_degree_course_admin():
    OpenDegreeCourseManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenDegreeCourseManagementPageButton"))
    )
    OpenDegreeCourseManagementPageButton.click()
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseApplicationItem = last_card.find_element(
        By.CLASS_NAME, "card-footer")

    delete_degree_course_button_locator = (
        By.XPATH, ".//button[contains(text(), 'Delete')]")
    delete_degree_course_button = CreatedDegreeCourseApplicationItem.find_element(
        *delete_degree_course_button_locator)
    delete_degree_course_button.click()

    DeleteDegreeCourseModalButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "DeleteDialogConfirmButton"))
    )
    DeleteDegreeCourseModalButton.click()
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    assert cards == [], "The created course should be deleted and no card is appeared in the page"

    # now we are done with our test, we should quit the test
    # close the browser
    driver.quit()
