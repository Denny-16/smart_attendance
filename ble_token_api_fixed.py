from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="BLE Token Attendance API", version="1.0.0")

# Simple data structures to store values
x_token = None  # stores single x value
student_data = {}  # stores student name and y value
attendance_records: List[dict] = []  # stores successful matches

# Pydantic models for request bodies
class XToken(BaseModel):
    x: str  # BLE token x value

class StudentSubmission(BaseModel):
    student: str  # student name or ID
    y: str  # BLE token y value

class TokenComparison(BaseModel):
    x: str  # x token
    y: str  # y token

# Endpoint 1: Receive and store x value
@app.post("/receive-x")
async def receive_x_token(token_data: XToken):
    """
    Endpoint 1: Takes single x value and stores it
    This will be called from another file that generates x tokens
    """
    global x_token
    x_token = token_data.x
    
    return {
        "message": "X token received and stored",
        "x": x_token
    }

# Endpoint 2: Receive student name and y value
@app.post("/receive-student-y")
async def receive_student_y(submission: StudentSubmission):
    """
    Endpoint 2: Takes student name and y value and stores them
    This will be called from another file that generates y tokens
    """
    global student_data
    student_data = {
        "student": submission.student,
        "y": submission.y
    }
    
    return {
        "message": "Student and Y token received and stored",
        "student": student_data["student"],
        "y": student_data["y"]
    }

# Endpoint 3: Compare x and y tokens
@app.post("/compare-tokens")
async def compare_tokens(comparison: TokenComparison):
    """
    Endpoint 3: Takes x and y values, compares them
    If same, adds to attendance_records datastructure with student info
    """
    global attendance_records, student_data
    
    # Check if we have student data
    if not student_data:
        raise HTTPException(status_code=400, detail="No student data available")
    
    # Compare x and y tokens
    if comparison.x == comparison.y:
        # Tokens match - add to attendance records
        attendance_record = {
            "student": student_data["student"],
            "token": comparison.x,  # same as y since they match
            "status": "present"
        }
        
        attendance_records.append(attendance_record)
        
        return {
            "message": "Tokens match! Attendance recorded",
            "match": True,
            "student": student_data["student"],
            "token": comparison.x,
            "attendance_record": attendance_record
        }
    else:
        # Tokens don't match
        return {
            "message": "Tokens do not match",
            "match": False,
            "x_token": comparison.x,
            "y_token": comparison.y
        }

# Helper endpoints to access stored data

@app.get("/get-attendance")
async def get_attendance_records():
    """Get all attendance records from the datastructure"""
    return {
        "total_records": len(attendance_records),
        "attendance_records": attendance_records
    }

@app.get("/get-current-data")
async def get_current_data():
    """Get currently stored x token and student data"""
    return {
        "x_token": x_token,
        "student_data": student_data,
        "total_attendance_records": len(attendance_records)
    }

@app.get("/")
async def root():
    return {
        "message": "BLE Token Attendance API",
        "endpoints": {
            "receive_x": "POST /receive-x",
            "receive_student_y": "POST /receive-student-y", 
            "compare_tokens": "POST /compare-tokens",
            "get_attendance": "GET /get-attendance"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
