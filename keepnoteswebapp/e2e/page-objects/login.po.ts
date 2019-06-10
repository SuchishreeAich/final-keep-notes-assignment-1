import { browser, by, element, ElementFinder, promise } from 'protractor';

export class LoginPage {
  // navigate to login page
  navigateToLogin() {
    browser.waitForAngularEnabled(false);
    return browser.get('/login');
  }
  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 // navigate to  note view dashboard
  navigateToNoteView() {
    browser.waitForAngularEnabled(false);
    console.log('noteviewnavigate');
    return browser.get('/dashboard/view/noteview');
  }
  // get login component
  getloginComponent(): ElementFinder {
    return element(by.tagName('app-login'));
  }
  // get username input box
  getUserNameInputBox(): ElementFinder {
    return element(by.className('username'));
  }
  // check username input box is exist or not
  isUserNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getUserNameInputBox().isPresent();
  }
  // get password input box
  getPasswordInputBox(): ElementFinder {
    return element(by.className('password'));
  }
  // check password input box is exist or not
  isPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getPasswordInputBox().isPresent();
  }
  // get submit button
  getSubmitButton(): ElementFinder {
    return this.getloginComponent().element(by.buttonText('Login'));
  }
  // check submit button is present or not
  isSubmitButtonPresent(): promise.Promise<boolean> {
    return this.getSubmitButton().isPresent();
  }
  // click submit button
  clickSubmitButton(): promise.Promise<void> {
    return this.getSubmitButton().click();
  }
  // default values of input boxes
  getLoginInputBoxesDefaultValues(): any {
    let inputUsername, inputPassword;
    inputUsername = this.getUserNameInputBox().getAttribute('value');
    inputPassword = this.getPasswordInputBox().getAttribute('value');
    return Promise.all([inputUsername, inputPassword]).then( (values) => {
      return values;
    });
  }
  // get username and password details
  getMockLoginDetail(): any {
    const loginDetail: any = { username: 'abc', password : 'abc'};
    return loginDetail;
  }
  // set username and password input box values
  addLoginValues(): any {
    const login: any = this.getMockLoginDetail();
    this.getUserNameInputBox().sendKeys(login.username);
    this.getPasswordInputBox().sendKeys(login.password);
    return Object.keys(login).map(key => login[key]);
  }

}