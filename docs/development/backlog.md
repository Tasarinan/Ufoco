# UFOCO

> Ver 0.1

---

- [x] As a user I want UI appearing suitable to my operating system, that it feels like a native app:

  - [x] <font color=green>electron based application</font>
  - [x] <font color=green>react + redux</font>

- [x] As a user I want to store my data offline database

  - [x] <font color=green>select lowdb as database service</font>

- [x] As a developer I want to reuse open source editor to fit my needs, that it is becoming my project and I can learn the things that I need are most valuable to me

  - [x] <font color=green>draft-js is more better than Quill, so select draft-js </font>
  - [x] <font color=green>select dragfrail as a editor baseline. reuse draft-js-plugin framework </font>

- [x] As a user I want to keep data, that I want to keep for future reference, that I can remember important information.

  - [x] <font color=green>store data in file </font>

- [x] As a user I want to store my data with security password

  - [x] <font color=green>use password prevent invalid login</font>
  - [x] <font color=green>use cryto prevent invalid file access</font>

- [ ] As a user I want every change saved instantly, that I don't have to worry about forgetting them.

  - <font color=red> Saving data after focus is lost</font>
  - <font color=red> Saving data should not interfere with the typing or other user actions</font>
  - [x] <font color=geen> Saving data should be done every 10 seconds</font>

- [ ] As a user I want to organize the present, record the past and plan for the future

  - <font color=green>use nested list to organize innovation ideas and problem solving steps</font>
  - <font color=#ff99>use track keepers to record habbit or streak actions </font>
  - <font color=#ff99>use Post-It to record sticky notes --low priority</font>
  - <font color=#ff99>use heatmap and charts to dispay weekly and monthly used hours</font>
  - <font color=#ff99>use calendar to do daily plan: roll over, do it later, priority </font>

- [ ] As a user I want to use nest list to show our mind flow, that I can quickly navigate through them to organize innovation ideas and problem solving steps

  - [x] <font color=#ff99> support the following control command</font>

    - <kbd>UP</kbd> & <kbd>DOWN</kbd>: navigate through items
    - <kbd>CNTRL+UP</kbd> & <kbd>CNTRL+DOWN</kbd>: shuffle items
    - <kbd>TAB</kbd>: right-indent
    - <kbd>SHIFT</kbd> + <kbd>TAB</kbd>: left-indent
    - <kbd>BACKSPACE</kbd>: Remove an empty task
    - <kbd>ENTER</kbd>: New item
    - Click on a bullet point to fold it
    - Hover on a bullet point and click complete to complete it
    - Hover on a bullet point and click Edit to jump to Edit page

  - [x] <font color=#ff99>navigate item based on focus</font>

- [x] As a user I want to have a tool bar in the GUI

  - <font color=#ff99>support window min,max close</font>
  - <font color=#ff99>support lang flag --Low Priority</font>
  - <font color=#ff99>support traffic light flag</font>
  - <font color=#ff99>support tool button</font>

- [ ] As a user I want to have a markdown support editor based on draft-js

  - <font color=#ff99>support full markdown lang</font>

- `Ongoing` every day, I can get an organized tasklet lists as daily plan where I know I should do best to finish them

  - [ ] create button to add a streak item
  - [ ] As a user I want to use streak to motivate my consecutive affairs
  - [ ] streak general means achievement, spend hours and plan day and needed actions
  - [ ] Change item label on the agenda view
  - [ ] save item label on the database
  - [ ] Due Mark is recognised by the markdown theme and based on org-modes
  - [ ] As a user I want to use golf(important and urgency), stone(important but no urgency), sand(no important but urgency),beer(no important and no urgency) to priority my daily affairs

    - [ ] add a new item with priority support
    - [ ] delete the exist item (if this exist item has only streak, remove streak also)
    - [ ] edit the exist item for priority, title,streak,ship status,arranged stage
    - [ ] group some items as today, others for ToBeDetermined

- `Ongoing` As a user I want a agenda view for today, that I can see what I have to do today

  - [ ] Agenda View group some items as a stage
    - [ ] one stage is fixed 1 or 2 pomodoro timer
  - ~~Agenda View displays all streak items based on Timetline style~~
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

* `Ongoing` As a user I want to stay working based on 20-20-20(25 break 5 minutes) from sunrise to sunset

  - [ ] Automagically set the timer to schedule
  - [ ] auto skip powersave period
    - [ ] total done stages/remaining stages
    - [ ] total done hours /remaining hours
    - [ ] done ratio(remove done, delay, obsolete)

- `Ongoing` As a user I want to be able to search for a event and display search result in the agenda view, that I can find task that I entered a while ago.

  - [x] Filterbox
  - [x] uses all important information: body, Parent node, date, etc.

> Ver 0.2

---

- `Ongoing` As a new User I want to have a nice startpage, that I know what I need to do next and bond emotionally
- `Ongoing` As a user I want to restore the state right where I left it, that I can pick up my work where I left it.

  - <font color=red>load recently change preference </font>
  - <font color=red>locate today tasks</font>

- `Ongoing` As a programmer I want to use an existed react,redux and electrion testing framework

- `TODO` As a user I want to work as undisturb state when I work at focus

  - [ ] focus view should force us working at undisturb state

- `TODO` I want a some help what to do next, that I don't to guess what features could be usefull to me.

  - [ ] from the Scratch, when users have no file open (welcome screen)
  - [ ] go away markdown style
  - [ ] Shortcuts are added to `shortcuts.md`

acceptance criteria:

- [ ] reload all task if files is changed
- [ ] Offer a file dialog to choose the path of the liveflow-file

> Ver 0.3

---

- `TODO` As a user I want to quickly get daily organized affairs based on AI-analysised.

- `TODO` As a User I want to syncronize my tasks via onenote and similar services, that I can add tasks from every computer I have access to.

## TODO As a user I want to change the ranking/order of a task via drag and drop, that I can less cumberstone with ranking.

## TODO As a User I want to have an intelligent Entry-Box for the a new task, that I can add important meta information like due date, projecet, etc. easily.

## TODO As a User I want to add recurring task, that I can track task, that I have to do often.

- [ ] Define the interval at which the task is recurring

## TODO As a user I want to filter my currrent list for project, that I can concentrate on one.

## TODO As a person who plans a FUTURE task, I want to add a DOING-date (scheduled) for a task, that I can forget about tasks that have no urgency right now, but will be in my DOING's when I need them.

acceptance criteria

- [ ] choose a DOING-date in the entry field
- [ ] jumps (only) from TODO to DOING on the given date

## DONE As a task planner I want to add state keywords to headings and list, that I can mark them as tasks

- [x] TODO and DONE are recognised by the markdown theme

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
