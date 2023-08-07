import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException

from load_data import restapi_test_data
from selenium.webdriver import FirefoxOptions

opts = FirefoxOptions()
opts.add_argument("--headless")
driver = webdriver.Firefox(options=opts)

driver.get("http://frontend:3000/")


@pytest.mark.title("Testing login as User")
@pytest.mark.description("This test simulate the login process as User")
def test_login_user():
    # Navigate to the login page
    # Fill in the login form
    OpenLoginDialogButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenLoginDialogButton"))
    )
    OpenLoginDialogButton.click()

    UserName = driver.find_element(By.ID, 'LoginDialogUserIDText')
    UserName.send_keys(restapi_test_data["login"]["user"]["username"])
    Password = driver.find_element(By.ID, 'LoginDialogPasswordText')
    Password.send_keys(restapi_test_data["login"]["user"]["pwd"])

    # Submit the login form
    PerformLoginButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "PerformLoginButton"))
    )
    PerformLoginButton.click()


@pytest.mark.title("Testing Degree Course Application  - Create Degree Course Application as User")
@pytest.mark.description("This test checks the create process and if the created Degree Course Application appeared after creation")
def test_access_rights_user():

    OpenDegreeCourseManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenDegreeCourseManagementPageButton"))
    )
    OpenDegreeCourseManagementPageButton.click()

    try:
        UserManagementPageCreateUserButton = driver.find_element(
            By.ID, "UserManagementPageCreateUserButton")

        # If the button is found, fail the test with a custom message
        assert False, "Button is present on the page"
    except NoSuchElementException:
        # If the button is not found, pass the test
        pass

    OpenDegreeCourseManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenDegreeCourseManagementPageButton"))
    )
    OpenDegreeCourseManagementPageButton.click()

    try:
        DegreeCourseManagementPageCreateDegreeCourseButton = driver.find_element(
            By.ID, "DegreeCourseManagementPageCreateDegreeCourseButton")
        assert False, "Button is present on the page"
    except NoSuchElementException:
        # If the button is not found, pass the test
        pass

    # test if delete degree course is present in the page (Degree course management)
    try:
        cards_locator = (By.CSS_SELECTOR, ".card")
        cards = driver.find_elements(*cards_locator)
        last_card = cards[-1]
        CreatedDegreeCourseApplicationItem = last_card.find_element(
            By.CLASS_NAME, "card-footer")

        delete_degree_course_button_locator = (
            By.XPATH, ".//button[contains(text(), 'Delete')]")
        delete_degree_course_button = CreatedDegreeCourseApplicationItem.find_element(
            *delete_degree_course_button_locator)
        assert False, "Button is present on the page"
    except NoSuchElementException:
        # If the button is not found, pass the test
        pass

    # test if edit degree course is present in the page (Degree course management)
    try:
        cards_locator = (By.CSS_SELECTOR, ".card")
        cards = driver.find_elements(*cards_locator)
        last_card = cards[-1]
        CreatedDegreeCourseApplicationItem = last_card.find_element(
            By.CLASS_NAME, "card-footer")

        edit_degree_course_button_locator = (
            By.XPATH, ".//button[contains(text(), 'Edit')]")
        edit_degree_course_button = CreatedDegreeCourseApplicationItem.find_element(
            *edit_degree_course_button_locator)
        assert False, "Button is present on the page"
    except NoSuchElementException:
        # If the button is not found, pass the test
        pass


@pytest.mark.title("Testing Degree Course Application  - Create Degree Course Application as User")
@pytest.mark.description("This test checks the create process and if the created Degree Course Application appeared after creation")
def test_create_degree_course_application_user():

    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseItem = last_card.find_element(
        By.CLASS_NAME, "card-footer")

    # Find the "Edit" button and click it
    create_application_button_locator = (
        By.XPATH, ".//button[contains(text(), 'Create Application')]")
    create_application_button = CreatedDegreeCourseItem.find_element(
        *create_application_button_locator)
    create_application_button.click()

    # filling the create degree course form
    ApplicantUserID = driver.find_element(
        By.ID, 'CreateDegreeCourseApplicationEditTargetPeriodYear')
    ApplicantUserID.send_keys(
        restapi_test_data["degreeCourseApplication"]["application_user"]["targetPeriodYear"])

    # Find the <select> element by its ID
    select_locator = (
        By.ID, "CreateDegreeCourseApplicationEditTargetPeriodName")
    select_element = driver.find_element(*select_locator)

    # Create a Select object from the <select> element
    select_object = Select(select_element)

    # Select an option by its value attribute
    select_object.select_by_value(
        restapi_test_data["degreeCourseApplication"]["application_user"]["targetPeriodShortName"])

    CreateDegreeCourseApplicationButton = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "CreateDegreeCourseApplicationCreateButton"))
    )
    CreateDegreeCourseApplicationButton.click()

    OpenDegreeCourseApplicationManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenDegreeCourseApplicationManagementPageButton"))
    )
    OpenDegreeCourseApplicationManagementPageButton.click()

    # Find the last card based on its index
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseApplicationItem = last_card.find_element(
        By.CLASS_NAME, "card-header")
    # checks if the created degree course is appeared directly after creation
    assert restapi_test_data["degreeCourseApplication"]["application_user"]["applicantUserID"] + ": " + \
        restapi_test_data["degreeCourseApplication"]["application_user"]["targetPeriodShortName"] + str(restapi_test_data["degreeCourseApplication"]["application_user"]["targetPeriodYear"]) in CreatedDegreeCourseApplicationItem.get_attribute(
            'innerHTML'), "The created course Application should be appeared directly after creation"


@pytest.mark.title("Testing Degree Course Application  - Delete Degree Course Application as User")
@pytest.mark.description("This test checks the create process and if the created Degree Course Application appeared after creation")
def test_delete_degree_course_application_user():

    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    last_card = cards[-1]
    CreatedDegreeCourseApplicationItem = last_card.find_element(
        By.CLASS_NAME, "card-footer")

    delete_application_button_locator = (
        By.XPATH, ".//button[contains(text(), 'Delete')]")
    delete_application_button = CreatedDegreeCourseApplicationItem.find_element(
        *delete_application_button_locator)
    delete_application_button.click()

    DeleteApplicationModalButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "DeleteDialogConfirmButton"))
    )
    DeleteApplicationModalButton.click()
    cards_locator = (By.CSS_SELECTOR, ".card")
    cards = driver.find_elements(*cards_locator)
    assert cards == [], "The created course Application should be deleted and no card is appeared in the page"

    # now we are done with our test, we should quit the test
    # close the browser
    driver.quit()
