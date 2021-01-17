# EduHome Online Classroom System

## Introduction & Motivations:

The online classroom is a very popular platform for the education system. Many countries are now enforcing the online classroom  system so that the teachers and students can communicate with each other. For example a very common and known to all ‘Google Classroom’. This online classroom system provides many facilities like shared materials, assignments, grade students, create unlimited courses, add students in there, etc.  This is a great opportunity for every educational institute to enlarge and ease their education system. After the covid-19 breakdown, most of the educational institutes all around the world went into the online classroom system. They are using many online classroom platforms like ‘TalentLMS’,’ Google Classroom’, ‘visme’, etc. So, we have got the motivation to make this online classroom system for teachers and students. 
Our Eduhome online classroom system has some similar features like ‘google classroom’ but we have added some different features to it. Also, our classroom had some extra features that can help the teachers to teach their students more efficiently. Our Eduhome online classroom provides some facilities that can be highly mentioned. We have made a whiteboard feature where a teacher can easily draw so that she/he can teach the students more understandably. Also, our system provides an opportunity to see how many students are online in a specific class whenever a teacher creates a class according to the schedule. Also, in the scheduled class, the teacher and students can get a feature where they could start conversations. So, our EduHome online system has some significant facilities that a teacher or a student can utilize for their educational purpose.

## Requirements of EduHome Online Classroom System

### Functional requirements:

##### User Authentication:  
As our system is made for students and teachers and every teacher will have a classroom for his/her student, so there needs to be some authentication to identify the teacher and student. So, we will give an option to the user that is in which role he/she wants to create the account: ‘teacher’ or ‘student’. Also, we have used a different system for registration. That is when the user inserted his/her information in the registration form, after clicking the create account, we will send a token and a user id to the user’s mail and phone number that he/she provided. The user can log in by this token  and user id that she/he gets from the mail or phone number. The user id will be fixed for every user according to their role, for example, if the user role is student, then  it will be S-5 and if the role is teacher, then it will be T-5. After login, the user will go to different interfaces according to their role. The user can change his/her password in the setting option after the login.
  Sign-up:  Role, Full Name, Nick Name, Email address, Phone.
  Log-in:  User Id, Token/Password.
  Logout: The user must be able to logout.
##### Dashboard:
After the login, the user will see some options. One of them is the dashboard. In the dashboard, the user will be able to see the summary details of his/her active courses, archived courses, and requested courses. Like how many courses he/she is active now or get requested to enroll in or the archived courses of his/her. The user also can be able to see the course name, total student, and teacher number of the active, archived, and requested courses.
##### Profile:
There will be a feature where the user can update their profile. The user can change his/her full name, nickname, email, and phone number. Also, the user can create a new password. 
##### Courses:  
In the course option, there will be a different option for teacher and student. The teacher can create a course, but the student only can join a course after giving the course code.  When the teacher creates a course by filling up a form, then a code for the created course will automatically be generated. The student can join the specific course by the generated course code. After this, the user will get a list of the courses that he/she created or joined. After going to a specific course, there will be some features for the user.
##### Stream:
In this feature, the user will see a comment post system. The user can create a post where she/he can share files or links. The teacher can share course materials by creating a post. The user can also comment on anyone’s post. We have used some authentication in the stream system. The teachers of the course can delete anyone’s post or comment. But the students can only delete their comments/posts but not others. Every different user can edit their posts or comments.
##### Teacher List: 
In this feature, the admin of the course can add teachers as a moderator or admin. Also, the admin can delete the other teacher if he/she wants. The list of teachers will be shown in this feature. The student user and moderator only see the list of teachers but not be able to add or delete.
##### Student List:
In this feature, the admin and the moderator of the course can add students. Also, the admin and the moderator can delete the other student if he/she wants. The list of students will be shown in this feature.
##### Course Setting:
The admin of the course can update course information in this feature. Also, the admin of the course can delete or archive the course. All the users in the specific course can leave the course if they want.
##### Schedule: 
In this feature, there will be many facilities for the user. There will be an option for the teacher to create a class with a schedule where he/she will give the start and end time of the scheduled class. The student will see the scheduled class that they will have to attend in their schedule. The teacher can edit and delete the created class. All the users can see their live class time list. After entering the specific scheduled class, the user will get some features, 
##### Whiteboard feature:
The teacher user can use a whiteboard where he/she can write anything using a drawing pencil. Also, he/she can add an image to the whiteboard. Our system will provide a great option that whenever a teacher writes something on the whiteboard, the system will save this and automatically generate a pdf that can be shown to every student and teacher of the class. They can download the pdf after the preview. 
##### Class Conversation:
The teachers and the students of the specific scheduled class can create a conversation in this feature. The conversation will be a live conversation.    Also, all the conversations will be saved in the database.
##### Online Meet:
The teacher can be able to share a meeting link of the created scheduled class. The enrolled students and teachers can join the meeting by clicking the link which will show on the schedule class page.
##### Routine: 
There will be shown the routine of the user’s course. 

### Non-Functional Requirements:
##### Environment friendly:
Environment friendly defines how easy it to use from a user’s view is. It depends on how easily the system can be understood, changed, and tested by the user. We will provide a user-friendly system to the users.
##### Security: 
There will provide a strong security system so that other than the user cannot access the enrolling course. The authentication system will be given with strong security. 	
##### Portability: 
Portability addresses the effort required to migrate a system component from one operating environment to another. Portability may include the ability to internationalize and localize a product and has aspects similar to reusability.
##### Performance: 
Each request will be processed with minimum time.

Language
----------------------------------------------------
- Frontend: HTML, CSS, JavaScript, Jquery, Bootstrap.
- Backend: Laravel
- Database: MySQL.
- Server: Apache

Screen Shot
-----------------------
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/login.png">
<p align="center"><b>Login</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/register.png">
<p align="center"><b>Registration</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/register_success.png">
<p align="center"><b>Registration Success</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/dashboard.png">
<p align="center"><b>Dashboard</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/profile_setting.png">
<p align="center"><b>Profile Update</b></p>

<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/course_list.png">
<p align="center"><b>Course Feature</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/stream.png">
<p align="center"><b>Course Stream</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/strem1.png">
<p align="center"><b>Post/Comment Stream </b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/strem2_update.png">
<p align="center"><b>Update Post/Comment</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/Student_list.png">
<p align="center"><b>Student List</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/teacher_list.png">
<p align="center"><b>Teacher List</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/add_teacher.png">
<p align="center"><b>Add Multiple Teacher</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/course_setting.png">
<p align="center"><b>Course Setting</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/schedule_listt.png">
<p align="center"><b>Schedule List</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/create_schedule.png">
<p align="center"><b>Create Schedule</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/schedule_interface.png">
<p align="center"><b>Course Schedule Interface</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/whiteboard.png">
<p align="center"><b>Whiteboard in a scheduled course</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/whiteboard_pdf.png">
<p align="center"><b>Whiteboard writing PDF download Preview</b></p>
<img src="https://github.com/TanzinaTani/Classroom/blob/master/Interface%20Picture/screenshot%20interface/routine.png">
<p align="center"><b>Course Routine</b></p>











