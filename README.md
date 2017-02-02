# Ufoco

![Ufoco](img/ufoco.png) Ufoco is the your focus coordinatation.Focus on what matters now! It will help you master more, it is not a simple note or writting tool.

##  Project purpose

During the past ten years, to help my work productivity and efficiency.  I have used many tools, like Evernote, typora, and Anki. but I still failed to help my life and work. The most important reason is because I only collected them and did not memory them. Most of time I did not understand them and did not master them so I have to repeat to study and find them from the old trash box. After reading [this blog](https://www.jackkinsella.ie/articles/janki-method),I start to review why I have gone this wrong way. Maybe what I have pursued was not clear for me. Do I really need a text  or markdown editor? or Do I really need master all kinds of editor tool? or Do I really collect the different blog files ? No, We should only get what we wanted the best? "断舍理" is the good point. We need remove many features from our minds. With this product, the user focuses on the what he wants to be memorized content. we    

## Wishlist
1.  quickly make reading digist and save to library
2.  can get info from library
3.  list based data structure and formula supporting with Markdown/AsciiDoc
4.  living preview not 
5.  flash card
6.  mobile display
7.  hash list function

## Features(for now)

1. **Multiple Formats**: Supports both [AsciiDoc](http://www.methods.co.nz/asciidoc/) and [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)

2. **Easy to find files**: Double-click on the file name in the tab and an Explorer/Finder window will appear with the file selected.

3. **Global Shortcut**: For an easy way to return back to main desktop, just press `CTRL + F12` (or `CMD + F12` on a Mac) to bring the main window to focus and on top of all windows.

4. **Distraction-Free Writing**: You can toggle full screen mode by pressing `CTRL + SHIFT + F` and toggle auto-hide of the menu by pressing `CTRL + SHIFT + M`.

5. **Save As HTML**: From the `File` menu you can select to save your current document as HTML or you can use the `CTRL + SHIFT + H` shortcut.

6. **Integration**: You can upload your file to *Evernote*,*workflowy*,*github*,*wechat*

7. **Customization**: Supports editor customized function like themes,font size etc
8. Multiple document tabs management
9. Standard word processor inline tools (bold, italic, underline, strikethrough, add link to selection, superscript, subscript, clear format)
10. 6 levels title tools
11. Block tools (paragraph, quote, unordered & ordered list, image insertion via URL)
12. Web-oriented tools (YouTube / Vimeo / Dailymotion / Twitch video insertion via URL, or ANY embedded content (SoundCloud tracks, Facebook posts, ...))
13. Export to HTML documents with 4 themes (always more to come)
14. Export to Markdown documents
15. Table of Content visualization & navigation system
16. Always on Top window control button
17. Real-time emojis (from http://www.emoji-cheat-sheet.com/ for now)
18. Interface themes system (1 interface theme for now, but more to come)
19. More than 40 mouse & keyboard shortcuts
20. Basic search / replace system (needs improvements)
21. Document information display (number of paragraphs, words, etc.)
22. Minimalist interface that let you focus on what matters : the content
23. Update auto-check system (enable / disable in settings)


## Supported Platforms
UFOCO is provided for 64-bit systems only, on OS X 10.9 and later, Windows 7 and later, Linux (Ubuntu 12.04 and later, Debian 8 and later).

## Setting Up and Running

Right now getting UFOCO up and running should be as simple as installing [node](https://nodejs.org/) and then running `npm install` followed by either `npm run win` (if on Windows) or `npm run mac` if on OS X.

## Coding Style

These are the style guidelines for coding in **Ufoco**

You can run npm run lint to show any style issues detected by cpplint and eslint.

# C++ and Python

For C++ and Python, we follow Chromium’s Coding Style. You can use clang-format to format the C++ code automatically. There is also a script script/cpplint.py to check whether all files conform.

The Python version we are using now is Python 2.7.

The C++ code uses a lot of Chromium’s abstractions and types, so it’s recommended to get acquainted with them. A good place to start is Chromium’s Important Abstractions and Data Structures document. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

# JavaScript

Write standard JavaScript style.
## File names should be concatenated with - instead of _, e.g. file-name.js rather than file_name.js, because in github/atom module names are usually in the module-name form. This rule only applies to .js files.
Use newer ES6/ES2015 syntax where appropriate
const for requires and other constants
let for defining variables
Arrow functions instead of function () { }
Template literals instead of string concatenation using +
Naming Things

Electron APIs uses the same capitalization scheme as Node.js:

When the module itself is a class like BrowserWindow, use CamelCase.
When the module is a set of APIs, like globalShortcut, use mixedCase.
When the API is a property of object, and it is complex enough to be in a separate chapter like win.webContents, use mixedCase.
For other non-module APIs, use natural titles, like <webview> Tag or Process Object.
When creating a new API, it is preferred to use getters and setters instead of jQuery’s one-function style. For example, .getText() and .setText(text) are preferred to .text([text]). There is a discussion on this.