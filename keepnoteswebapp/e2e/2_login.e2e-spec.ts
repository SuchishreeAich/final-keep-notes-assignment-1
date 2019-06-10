import { LoginPage } from './page-objects/login.po';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should get username input box', () => {
    page.navigateToLogin();
    expect(page.isUserNameInputBoxPresent())
    .toBeTruthy(`<input class="username" matInput [formControl]='username'> should exist in login.component.html`);
  });

  it('should get passsword input box', () => {
    page.navigateToLogin();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy(`<input class="password" matInput type = 'password' [formControl]='password'>
      should exist in login.component.html`);
  });

  it('should get Login button', () => {
    page.navigateToLogin();
    expect(page.isSubmitButtonPresent()).toBeTruthy(`<button type="submit" mat-button>Login</button> should
      exist in login.component.html`);
  });

  it('default values of username and password should be empty', () => {
    const emptyLoginValues = ['', ''];
    page.navigateToLogin();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(emptyLoginValues, 'Default values for username and password should be empty');
  });

  it('should login into the system', () => {
    page.navigateToLogin();
    const newNoteValues = page.addLoginValues();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(newNoteValues, 'Should be able to set values for username and password');
    page.clickSubmitButton();
    console.log('login button clicked');
    page.navigateToNoteView();
   // console.log('navigateToNoteView', page.getCurrentURL());
    // page.getCurrentURL().then((url) => {
    //   if (url.indexOf('login') > -1) {
    //     newNoteValues = page.addLoginValues();
    //     page.clickSubmitButton();
    //     page.navigateToNoteView();
    //     console.log('inside login url');
    //     // console.log('current url inside login', page.getCurrentURL());
    //     expect(page.getCurrentURL()).toContain('dashboard/view/noteview', 'Should navigate to note view dashboard');
    //   } else {
    //     console.log('outside login url');
    //     expect(page.getCurrentURL()).toContain('dashboard/view/noteview', 'Should navigate to note view dashboard');
    //   }
    // });
  });
});