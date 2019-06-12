import { browser, by, element, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class NoteViewPage {
  // navigate to note view page
  navigateToNoteView() {
    browser.waitForAngularEnabled(false);
    return browser.get('/dashboard/view/noteview');
  }

  navigateToEditView() {
    browser.waitForAngularEnabled(false);
    return browser.get('/dashboard/note/:noteId/edit');
  }
  // to pause browser
  pauseBrowser(port) {
    browser.pause(port);
  }
  // app component
  getAppComponent(): ElementFinder {
    return element(by.tagName('app-root'));
  }

  getNoteComponent(): ElementFinder {
    return element(by.tagName('app-note'));
  }
  // app component
  getEditNoteViewComponent(): ElementFinder {
    return element(by.tagName('app-edit-note-view'));
  }

  isEditNoteViewPresent(): promise.Promise<boolean> {
    return this.getEditNoteViewComponent().isPresent();
  }

  isEditNoteViewVisible(): promise.Promise<boolean> {
    return this.getEditNoteViewComponent().isDisplayed();
  }

  getNoteTakerComponent(): ElementFinder {
    return element(by.tagName('app-note-taker'));
  }


  isNoteTakerPresent(): promise.Promise<boolean> {
    return this.getNoteTakerComponent().isPresent();
  }

  // get note panel title element
  getNotePanelTitle(): ElementFinder {
    return element(by.css('mat-panel-title'));
  }
  // check note panel title element is present or not
  isNotePanelTitlePresent(): promise.Promise<boolean> {
    return this.getNotePanelTitle().isPresent();
  }
  // get note panel title element value
  getNotePanelTitleText() {
    return this.getNotePanelTitle().getText();
  }
  // get complete note panel
  getNotePanel(): ElementFinder {
    // return this.getNoteTakerComponent().element(by.css('mat-expansion-panel'));
    return element(by.css('mat-expansion-panel'));
  }
  // check note panel is present or not
  isNotePanelPresent(): promise.Promise<boolean> {
    return this.getNotePanel().isPresent();
  }
  // get title input box
  getTitleInputBox(): ElementFinder {
    return element(by.name('title'));
  }
  // check title input box is present or not
  isTitleInputBoxPresent(): promise.Promise<boolean> {
    return this.getTitleInputBox().isPresent();
  }
  // get text input box
  getTextInputBox(): ElementFinder {
    return element(by.name('text'));
  }
  // check text input box is present or not
  isTextInputBoxPresent(): promise.Promise<boolean> {
    return this.getTextInputBox().isPresent();
  }
  // get button
  getDoneButton(): ElementFinder {
    return this.getAppComponent().element(by.buttonText('Add Note'));
  }
  // check button is present or not
  isDoneButtonPresent(): promise.Promise<boolean> {
    return this.getDoneButton().isPresent();
  }
  // click done button
  clickDoneButton(): promise.Promise<void> {
    return this.getDoneButton().click();
  }
  // get note panel default values
  getNotePanelDefaultValues(): any {
    let inputTitle, inputText;
    inputTitle = this.getTitleInputBox().getAttribute('value');
    inputText = this.getTextInputBox().getAttribute('value');
    return Promise.all([inputTitle, inputText]).then((values) => {
      return values;
    });
  }
  // get note data
  getMockNote(): any {
    const note: any = { title: 'Read Angular 5 blog', text: 'Shall do at 6 pm' };
    return note;
  }
  // set input fileds values with mock data
  addNoteValues(): any {
    const newNote: any = this.getMockNote();
    this.getTitleInputBox().sendKeys(newNote.title);
    this.getTextInputBox().sendKeys(newNote.text);
    return Object.keys(newNote).map(key => newNote[key]);
  }

  // get all notes
  getAllNotes(): ElementArrayFinder {
    return element.all(by.className('keep-card-note'));
    // return this.getNoteComponent().element(by.css('mat-card'));
  }
  // get last note
  getLastNote(): ElementFinder {
    return this.getAllNotes().last();
  }

  lengthNotes(): promise.Promise<number> {
    return this.getAllNotes().count();
  }

  isAllNotesPresent(): promise.Promise<boolean> {
    return this.getAllNotes().isPresent();
  }

  isLastNotePresent(): promise.Promise<boolean> {
    return this.getLastNote().isPresent();
  }

  // get last note
  getLastNoteTitle(): promise.Promise<string> {
    // return this.getLastNote().element(by.name('editTitle')).getAttribute('value');
    //  return this.getAllNotes().last().element(by.css('mat-card-title')).getText();
    return this.getLastNote().element(by.css('mat-card-title')).getText();
  }

  getlasttitle(): promise.Promise<string> {
    // return this.getLastNote().element(by.name('editTitle')).getAttribute('value');
    return this.getLastNote().getText();
  }

  getLastElement(): ElementFinder {
    return this.getLastNote().element(by.css('mat-card'));
  }

  isLastElementpresent(): promise.Promise<boolean> {
    return this.getLastElement().isPresent();
  }

  // click on note
  clickLastNote(): promise.Promise<void> {
    // return browser.actions().mouseMove(this.getLastNote()).click().perform();
    return this.getLastNote().click();
  }

  // get title input box
  getEditTitleInputBox(): ElementFinder {
    return element(by.name('editTitle'));
  }
  // check title input box is present or not
  isEditTitleInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditTitleInputBox().isPresent();
  }
  // get text input box
  getEditTextInputBox(): ElementFinder {
    // return element(by.name('editText'));
    return this.getEditNoteViewComponent().element(by.name('editText'));
  }
  // check text input box is present or not
  isEditTextInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditTextInputBox().isPresent();
  }
  // get status select box
  getEditStatusInputBox(): ElementFinder {
    return element(by.name('editStatus'));
  }
  // check text input box is present or not
  isEditStatusInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditTextInputBox().isPresent();
  }
  // get button
  getSaveButton(): ElementFinder {
    // return this.getEditNoteViewComponent().element(by.buttonText('Update Note'));
    return element(by.buttonText('Update Note'));
  }
  // check button is present or not
  isSaveButtonPresent(): promise.Promise<boolean> {
    return this.getSaveButton().isPresent();
  }
  // click save button
  clickSaveButton(): promise.Promise<void> {
    return this.getSaveButton().click();
  }
  // get edit note model default values
  getEditNoteDefaultValues(): any {
    let inputEditTitle, inputEditText, inputEditStatus;
    inputEditTitle = this.getEditTitleInputBox().getAttribute('value');
    inputEditText = this.getEditTextInputBox().getAttribute('value');
    inputEditStatus = this.getEditStatusInputBox().getAttribute('ng-reflect-model');
    return Promise.all([inputEditTitle, inputEditText, inputEditStatus]).then((values) => {
      return values;
    });
  }
  // get note data
  getEditMockNote(): any {
    const note: any = { title: 'Read Angular 1 blog', text: 'Shall do at 10.30 pm', state: 'not-started' };
    return note;
  }
  // set input fileds values with mock data
  editNoteValues(): any {
    const newNote: any = this.getEditMockNote();
    this.getEditTitleInputBox().clear();
    this.getEditTitleInputBox().sendKeys(newNote.title);
    this.getEditTextInputBox().clear();
    this.getEditTextInputBox().sendKeys(newNote.text);
    return Object.keys(newNote).map(key => newNote[key]);
  }

}
