

## Project: Student Enrollment Form

### Purpose
This form captures and stores student data into the **STUDENT-TABLE** relation of the **SCHOOL-DB** database, ensuring structured data management and smooth enrollment processes.

### Input Fields
- **Roll-No** *(Primary Key)*: Unique identifier for each student.
- **Full-Name**: Student's complete name.
- **Class**: Grade or level of education.
- **Birth-Date**: Date of birth in `YYYY-MM-DD` format.
- **Address**: Residential address for contact purposes.
- **Enrollment-Date**: The date of enrollment in the school.

### Features
1. **Database Integration**: Automatically stores form data in the **SCHOOL-DB** database's **STUDENT-TABLE**.
2. **Data Validation**: Ensures unique Roll-No and proper formatting for all fields.
3. **Efficient Design**: Simplifies student registration while maintaining high data integrity.

### Primary Key Details
- **Roll-No**: This field is set as the **Primary Key** to guarantee the uniqueness of each record. It prevents duplicate entries.

### Technologies
- **Frontend**: HTML, CSS, JavaScript for the form's interface.
- **Backend**:
  - Integration with JSONPowerDB.
  - RESTful API for seamless communication between the form and the database.
- **Database**: Relational database schema within **SCHOOL-DB**, storing structured student data.

### Future Enhancements
- Implementing bulk enrollment functionality.
- Adding validation for **Roll-No** patterns (e.g., alphanumeric or specific formats).
- Providing real-time notifications for successful enrollments.
