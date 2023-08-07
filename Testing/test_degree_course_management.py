import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from load_data import restapi_test_data
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")
driver = webdriver.Firefox(options=opts)

driver.get("http://frontend:3000/")


@pytest.mark.title("Testing Degree Course Management  - Create Degree Course")
@pytest.mark.description("This test checks the create process and if the created Degree Course appeared after creation")
def test_create_degree_course():

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

    # finally we will open the DegreeCourseManagement page
    OpenDegreeCourseManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenDegreeCourseManagementPageButton"))
    )
    OpenDegreeCourseManagementPageButton.click()
    # Now we should create a degree course
    DegreeCourseManagementPageCreateDegreeCourseButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "DegreeCourseManagementPageCreateDegreeCourseButton"))
    )
    DegreeCourseManagementPageCreateDegreeCourseButton.click()

    # filling the create degree course form
    Name = driver.find_element(By.ID, 'CreateDegreeCourseComponentEditName')
    Name.send_keys(restapi_test_data["degreeCourses"]["degreeCourse1"]["name"])

    ShortName = driver.find_element(
        By.ID, 'CreateDegreeCourseComponentEditShortName')
    ShortName.send_keys(
        restapi_test_data["degreeCourses"]["degreeCourse1"]["shortName"])

    UniversityName = driver.find_element(
        By.ID, 'CreateDegreeCourseComponentEditUniversityName')
    UniversityName.send_keys(
        restapi_test_data["degreeCourses"]["degreeCourse1"]["universityName"])

    UniversityShortName = driver.find_element(
        By.ID, 'CreateDegreeCourseComponentEditUniversityShortName')
    UniversityShortName.send_keys(
        restapi_test_data["degreeCourses"]["degreeCourse1"]["universityShortName"])

    DepartmentName = driver.find_element(
        By.ID, 'CreateDegreeCourseComponentEditDepartmentName')
    DepartmentName.send_keys(
        restapi_test_data["degreeCourses"]["degreeCourse1"]["departmentName"])

    DepartmentShortName = driver.find_element(
        By.ID, 'CreateDegreeCourseComponentEditDepartmentShortName')
    DepartmentShortName.send_keys(
        restapi_test_data["degreeCourses"]["degreeCourse1"]["departmentShortName"])

    CreateDegreeCourseButton = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "CreateDegreeCourseComponentCreateDegreeCourseButton"))
    )
    CreateDegreeCourseButton.click()
    # Find the last card based on its index
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseItem = last_card.find_element(
        By.CLASS_NAME, "card-header")
    # checks if the created degree course is appeared directly after creation
    assert restapi_test_data["degreeCourses"]["degreeCourse1"]["shortName"] + ": " + \
        restapi_test_data["degreeCourses"]["degreeCourse1"]["name"] in CreatedDegreeCourseItem.get_attribute(
            'innerHTML'), "The created course should be appeared directly after creation"

    # driver.quit()


@pytest.mark.title("Testing Degree Course Management  - Update Degree Course")
@pytest.mark.description("This test checks the Update process and if the Updated Degree Course appeared after Update")
def test_update_degree_course():

    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseItem = last_card.find_element(
        By.CLASS_NAME, "card-footer")

    # Find the "Edit" button and click it
    edit_button_locator = (By.XPATH, ".//button[contains(text(), 'Edit')]")
    edit_button = CreatedDegreeCourseItem.find_element(*edit_button_locator)
    edit_button.click()

    Name = driver.find_element(
        By.ID, 'EditDegreeCourseComponentEditName')
    Name.clear()
    Name.send_keys(
        restapi_test_data["degreeCourses"]["edited_degreeCourse1"]["name"])

    ShortName = driver.find_element(
        By.ID, 'EditDegreeCourseComponentEditShortName')
    ShortName.clear()
    ShortName.send_keys(
        restapi_test_data["degreeCourses"]["edited_degreeCourse1"]["shortName"])

    EditDegreeCourseButton = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "EditDegreeCourseComponentSaveDegreeCourseButton"))
    )
    EditDegreeCourseButton.click()
    # Find the last card based on its index
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    EditedDegreeCourseItem = last_card.find_element(
        By.CLASS_NAME, "card-header")
    # checks if the created degree course is appeared directly after creation
    assert restapi_test_data["degreeCourses"]["edited_degreeCourse1"]["shortName"] + ": " + \
        restapi_test_data["degreeCourses"]["edited_degreeCourse1"]["name"] in EditedDegreeCourseItem.get_attribute(
            'innerHTML'), "The created user should be appeared directly after creation"
    # now we are done with our test, we should quit the test
    # close the browser
    driver.quit()
