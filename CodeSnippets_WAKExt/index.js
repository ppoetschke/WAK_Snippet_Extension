/* Copyright (c) 4D, 2012
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* The Software shall be used for Good, not Evil.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

var actions;
actions = {};

var DefaultOption = [{"name":"<name of snippet>","code":"<insert here your code>"}];

var option = {};
option.selected = "";
var snippets_string = "";

/*
 * STEP 1. Make function name of YOUR_ACTION
 * 
 */
actions.manage_snippets = function manage_snippets() {
	"use strict";
	
	/*
	 *  STEP 2. The definition of YOUR_ACTION here
	 * 
	 */
	option.selected = studio.currentEditor.getSelectedText();
	
	snippets_string = studio.extension.getPref("snippets");
	//studio.alert(snippets_string);
	//snippets_string= "";
	if((snippets_string == null) || (snippets_string == "")) {
		option.snippets = DefaultOption;
	}else{
		option.snippets = JSON.parse(snippets_string);
	};
	
	//studio.alert('This alert comes from manage_snippets function.' + mySel);
	

	studio.extension.showModalDialog("dialog.html", option, {title:"Code Snippets", dialogwidth:500, dialogheight:300, resizable:false}, 'writeOptions');
	
	return true;
};

actions.writeOptions = function writeOptions(message) {
	var result = {};
	result = studio.extension.storage.returnValue;
	//studio.alert(JSON.stringify(result));
	if (result.action=="save")
	{
		studio.extension.setPref("snippets", JSON.stringify(result.snippets));
	}
	
	if (result.action=="insert")
	{
		studio.extension.setPref("snippets", JSON.stringify(result.snippets));
		studio.currentEditor.insertText(result.insert);
	}
	
}

exports.handleMessage = function handleMessage(message) {
	"use strict";
	var
		actionName;

	actionName = message.action;

	if (!actions.hasOwnProperty(actionName)) {
		studio.alert("I don't know about this message: " + actionName);
		return false;
	}
	actions[actionName](message);
};

