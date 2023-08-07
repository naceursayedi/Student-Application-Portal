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


@pytest.mark.title("Testing Usermanagement - Create User")
@pytest.mark.description("This test checks the create and if the created user appeared after creation")
def test_create_user():
    # First login as admin
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

    # finally we will open the usermanagement page
    OpenUserManagementPageButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "OpenUserManagementPageButton"))
    )
    OpenUserManagementPageButton.click()
    # Now we should create a user
    UserManagementPageCreateUserButton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.ID, "UserManagementPageCreateUserButton"))
    )
    UserManagementPageCreateUserButton.click()

    # filling the create user form
    UserID = driver.find_element(By.ID, 'CreateUserComponentEditUserID')
    UserID.send_keys(restapi_test_data["users"]["user1"]["userID"])

    FirstName = driver.find_element(By.ID, 'CreateUserComponentEditFirstName')
    FirstName.send_keys(restapi_test_data["users"]["user1"]["firstName"])

    LastName = driver.find_element(By.ID, 'CreateUserComponentEditLastName')
    LastName.send_keys(restapi_test_data["users"]["user1"]["lastName"])

    Password = driver.find_element(By.ID, 'CreateUserComponentEditPassword')
    Password.send_keys(restapi_test_data["users"]["user1"]["password"])

    CreateUserButton = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "CreateUserComponentCreateUserButton"))
    )
    CreateUserButton.click()
    CreatedUserItemID = "UserItem" + \
        restapi_test_data["users"]["user1"]["userID"]

    CreatedUserItem = driver.find_element(By.ID, CreatedUserItemID)
    CreatedUserNameItem = CreatedUserItem.find_element(
        By.CLASS_NAME, "card-header")

    # checks if the created user is appeared directly after creation
    assert restapi_test_data["users"]["user1"]["firstName"] + " " + \
        restapi_test_data["users"]["user1"]["lastName"] in CreatedUserNameItem.get_attribute(
            'innerHTML'), "The created user should be appeared directly after creation"


@pytest.mark.title("Testing Usermanagement - Edit User")
@pytest.mark.description("This test checks the Update Process correct and if the edited user appeared after update")
def test_edit_user():

    # Now we should edit our existed user
    UserItemButtonID = "UserItemEditButton" + \
        restapi_test_data["users"]["user1"]["userID"]
    UserManagementPageEditUserButton = driver.find_element(
        By.ID, UserItemButtonID)
    UserManagementPageEditUserButton.send_keys(Keys.RETURN)

    # filling the edit user form with the new values
    FirstName = driver.find_element(By.ID, 'EditUserComponentEditFirstName')
    FirstName.clear()
    FirstName.send_keys(
        restapi_test_data["users"]["edited_user1"]["firstName"])

    LastName = driver.find_element(By.ID, 'EditUserComponentEditLastName')
    LastName.clear()
    LastName.send_keys(restapi_test_data["users"]["edited_user1"]["lastName"])

    EditUserComponentSaveUserButton = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located(
            (By.ID, "EditUserComponentSaveUserButton"))
    )
    EditUserComponentSaveUserButton.click()

    EditedUserItemID = "UserItem" + \
        restapi_test_data["users"]["user1"]["userID"]

    EditedUserItem = driver.find_element(By.ID, EditedUserItemID)
    EditedUserNameItem = EditedUserItem.find_element(
        By.CLASS_NAME, "card-header")

    # checks if the edited user is appeared directly after update
    assert restapi_test_data["users"]["edited_user1"]["firstName"] + " " + \
        restapi_test_data["users"]["edited_user1"]["lastName"] in EditedUserNameItem.get_attribute(
            'innerHTML'), "The edited user should be appeared directly after editing"
    # Now we will test the update process

    # now we are done with our test, we should quit the test
    # close the browser
    driver.quit()
