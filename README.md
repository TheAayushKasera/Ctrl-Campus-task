
# Ctrl Campus Task Documentation

## Project Setup:

1. Clone the repository from GitHub.
2. Install the necessary dependencies using npm:
   ```
   npm install
   ```
3. Start the server:
   ```
   node src/index.js
   ```

## Dependencies:

The project uses the following npm dependencies:

- **body-parser:** Parse incoming request bodies in a middleware before your handlers, available under req.body.
- **cors:** Middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options.
- **dotenv:** Loads environment variables from a .env file into process.env, making them accessible to your application.
- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** Elegant MongoDB object modeling for Node.js.

## API Endpoint:

Access the live API at: [Ctrl Campus Task API](https://ctrt-campus-task.onrender.com/)

### Students

*Note: Names in the student model may be the same, so CRUD operations are based on unique student IDs.*

- **GET /student**: Get a list of all students.
- **GET /student/:?id=student_id**: Get a specific student by ID. Use student ID for CRUD operations.
- **POST /student**: Add a new student. Body should contain a JSON object with the student's name.
- **PUT /student**: Update a student's name. Query parameters: id (student ID), name (new name).
- **DELETE /student/:id**: Delete a student by ID.

### Courses

*Note: Titles in the course model may be the same, so CRUD operations are based on unique course IDs.*

- **GET /course**: Get a list of all courses.
- **GET /course/:?id=course_id**: Get a specific course by ID. Use course ID for CRUD operations.
- **POST /course**: Add a new course. Body should contain a JSON object with the course's title.
- **PUT /course**: Update a course's title. Query parameters: id (course ID), title (new title).
- **DELETE /course/:id**: Delete a course by ID.

### Enrollments

- **GET /enrollment**: Get a list of all enrollments.
- **GET /enrollment/:course_id**: Get a list of students enrolled in a specific course.
- **POST /enrollment**: Enroll a student in a course. Body should contain a JSON object with student_id and course_id.

## Explore More:

- [GitHub Profile](https://github.com/TheAayushKasera)
- [Live Project - Atrangi Kanban Board](https://atrangi-kanban-board.onrender.com/)
- [Portfolio](https://aayush-kasera-portfolio.onrender.com/)
- [LinkedIn](https://www.linkedin.com/in/aayush-kasera/)

---

Feel free to use this content as the README for your project, and modify it further to include any additional details or formatting you prefer.
