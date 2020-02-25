# UFOCO

> Ver 0.1

---

- `Done` As a user I want UI appearing suitable to my operating system, that it feels like a native app:

  - ~~electron based application~~
  - ~~react + redux + pouchdb~~

- `Done` As a user I want to store my data offline or online database

  - ~~Use pouchdb +pouchdb find+leveldb~~

- `Ongoing` every day, I can add a new stage where I know I should do best to finish them in specific time or later.

  - [ ] create button to add a new stage
    - [ ] stage general means achievement, spend hours and plan day and needed actions
  - [ ] Change title on the agenda view
  - [ ] save stage on the database
  - [ ] Due Mark is recognised by the markdown theme and based on org-modes

- `Ongoing` As a user I want a agenda view for today, that I can see what I have to do today

  - [ ] Agenda View shows all events
  - [ ] Agenda View shows a Timetline for Today
  - [ ] Agenda View shows current day on the menubar
  - [ ] Agenda view shows next/previous/current day
  - [ ] Agenda-View should always updated when it's shown

* `Ongoing` As a user I want to have a focus view for today, that I can see today status

  - [ ] focus View shows current running stage status
  - ~~focus view shows today (month,day,week)~~
  - [ ] focus view show simple statistic about today
    - [ ] total done stages/remaining stages
    - [ ] total done hours /remaining hours
    - [ ] done ratio(remove done, delay, obsolete)

- `Ongoing` As a user I want to be able to search for a event and display search result in the agenda view, that I can find task that I entered a while ago.

  - [x] Filterbox
  - [x] uses all important information: body, Parent node, date, etc.

> Ver 0.2

---

- `TODO` As a user I want to work as undisturb state when I work at focus

  - [ ] focus view should force us working at undisturb state

## TODO As a new Akiee user, I want a some help what to do next, that I don't to guess what features could be usefull to me.

acceptance criteria:

- [x] look at Atom and Scratch, when users have no file open (welcome screen)
- [x] go away from comical style

      1.As a user I want to quickly tell foco my intent but expect foco understand my hinding meaning

- acceptance criteria:

  - []
  - ~~[ ] `right`/`left`/`space`/`shift`+`space` cycle through states~~
  - []] Shortcuts are added to `shortcuts.md`

    7.As a user I want to have status charts to review what I finished last

    8.As a User I want add/edit/delete the details of a intent what I wrote before.

## TODO As a User I want to syncronize my tasks via dropbox and similar services, that I can add tasks from every computer I have access to.

acceptance criteria:

- [ ] reload all task if files is changed
- [ ] Offer a file dialog to choose the path of the liveflow-file

## TODO As a user I want to keep notes (not tasks), that I want to keep for future reference, that I can remember important information.

## TODO As a user I want to change the ranking/order of a task via drag and drop, that I can less cumberstone with ranking.

## TODO AS a user I want that Akiee restores the state right where I left it, that I can pick up my work where I left it.

## TODO As a User I want to have an intelligent Entry-Box for the a new task, that I can add important meta information like due date, projecet, etc. easily.

## TODO As a User I want to add recurring task, that I can track task, that I have to do often.

- [ ] Define the interval at which the task is recurring

## TODO As a user I want to filter my currrent list for project, that I can concentrate on one.

## TODO As a person who plans a FUTURE task, I want to add a DOING-date (scheduled) for a task, that I can forget about tasks that have no urgency right now, but will be in my DOING's when I need them.

acceptance criteria

- [ ] choose a DOING-date in the entry field
- [ ] jumps (only) from TODO to DOING on the given date

## DONE As the user I want to see all my DOING's after livewookie is started, that I can begin with my work instantly.

## DONE As lw developer I want to change the mini-code-edit base to fit my needs, that it is becoming my project and I can learn the things that I need are most valuable to me

AC:

- [x] Changing zepto.min.js to jquery.js - speed should not be in issue in the beginning
- [x] removing unused files (angular, zepto ...)

## DONE As a user I want to see my notes, when I open live wookiee, that I see my notes instantly.

- [x] a standard org file ist loaded (liveflow.md)
- [x] liveflow.org is located at ~/.livewookie/liveflow.md
- [x] liveflow.org doesn't exists it should be created
- [x] It is opened with the start of the program

## DONE As a note keeper I want every change in my notes saved instantly, that I don't have to worry about forgetting them.

- [x] Saving the notes after focus is lost
- [x] Saving should not interfere with the typing or other user actions
- [x] Saving should only be done, if there are any changes to the file

## DONE As a note keeper I want to use markdown files as the basis for my list and outlines proper theme for my org file, that I can quickly navigate through them and use ace features for text movement

- [x] use a markdown file as standard file instead of org-file
- [x] Proper Styling for an markdown-file
- [x] Open/Close on code folding via Keyboard (Alt-Shift-9/Alt-0)
- [x] Move Parts of the Structure around via Keyboard, if it's folded (Alt-Up/-Down )

## DONE As a task planner I want to add state keywords to headings and list, that I can mark them as tasks

- [x] TODO and DONE are recognised by the markdown theme

## DONE As a programmer I want to use a testing framework that works like racket, that I can easily transelate the knowledge I gained.

## DONE As lw developer I want to change the mini-code-edit base to fit my needs, that it is becoming my project and I can learn the things that I need are most valuable to me

    AC:
    - [X] Changing zepto.min.js to jquery.js - speed should not be in issue in the beginning
    - [X] removing unused files (angular, zepto ...)

## DONE A a user I want to see my notes, when I open live wookiee, that I see my notes instantly. DEADLINE: <2013-08-24 Sa 11:00>

## DONE As a note keeper I want, that the editor area is focused after the start of livewookie, that I can start writing instantly.

## DONE Find a better solution to the workaraund for the loading problem in main()

## DONE As a user I want to change the state of a task with a simple action, that I can easyly check my task without switching to the editor and breaking my flow.

- [x] Change the color of the task to according to it's state
      -- [X] User the right colors for changed taskstates from bootstrap as with panel titles
- [x] Change the state of the task in the table row
- [x] Change the state of the task in editor

## DONE As a task planner I want to add TODO/DONE via keys/shortcut, to easily decide wich headings/list-items are tasks and in which state they are.

acceptance criteria:

- [x] `up`/`down`/`j`/`k` for selecting tasks, if no task already selected, first one will be selected
- ~~[ ] `right`/`left`/`space`/`shift`+`space` cycle through states~~
- [x] `d`->DONE, `t`->DOING, `shift`+`t`->TODO
- [x] Shortcuts are added to `shortcuts.md`

## DONE As a task planner I want to add new todos via an entry field, that I can add new tasks without switching to the Editor.

acceptance criteria

- [x] entry field gets opened by `ctrl`+`enter` or click on blue "New" button
- [x] events for underlying tables get caught
- [x] default project is "Inbox", if "Inbox" not present, it gets created at end of file, fill project options with first order headlines (#)
- [x] task gets inserted as last entry under it's project
- [x] if taskstate of new task is the curren shown taskstate, task get's added to shown tasklist

## DONE As a task planner I want to order my tasks, that I work with them in the right order and I don't have to invent rankings via prioritys.

acceptance criteria:

- [x] RANK: [n] where n is an integer and a rank is lower rank comes first
- [x] If rank is null, Task comes last
- [x] If rank of two task is the same, these two tasks won't be sorted
- [x] When new task is created, it gets a rank n+1
- [x] order is assigned by a atomar ranking system.
- [x] A ranking should have only one task and a task should have one ranking only; not enforced, but GUI follow this rule
- [x] User can change rank via gui - nothing fancy yet
- [x] Right now tasks without RANK can't be sorted

## DONE As a Linux user, I want Akiee to resemble Gnome 3's Adwaita theme, that I feel Akiee is good integrated in the operating system (Look out for GTK widget factory to view elements of Adwaita theme; "twf" at the cmd).

acceptance criteria

- [x] The menu bar of Akie should be user Gnome 3's Adwaita Colors in Ubuntu
- [x] The font for the task view should be suitable
- [x] The font for the editor should be suitable
- [x] The menu bar should be fixed

## DONE As a new User I want to have a nice startpage, that I know what I need to do next and bond emotionally

## DONE Task-Change throws Error, if Task has an URL in it's headline

## DONE As a User I want the buttons to represent the state of Akiee, that I what view I am seeing rigth now.

## DONE As a user I want to order tasks without ranking yet in the GUI, that I can order them without using the editor

- [x] Remove the dependencies of Ace-Editor for replacing/writing in the task file, instead replace/write in the ListOfNumber-Datastructure and replace the whole editor content.
- ~~[ ] Remove "module"-pattern in app.js, this is not important in a node-webkit app?~~
- ~~[ ] Create tests with PhantomJS for DOM-Manipulation~~

## DONE As a personal kanban user I want to see an overview of all my task, that I

better visualize my work

## DONE As a experienced kanban user I want to have a Kanbanboard, that I can visualize my work.

## DONE As a user I want to know the project node of a task, that I know to which project this task belongs.
