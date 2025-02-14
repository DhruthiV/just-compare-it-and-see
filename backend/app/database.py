from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["syllabus_comparison"]
comparison_collection = db["comparisons"]
syllabus_collection = db["syllabi"]

def get_syllabus_by_coursecode(year: int, course_code: str):
    syllabus = syllabus_collection.find_one({
        "year": str(year),
        "course_code": course_code
    })
    
    return syllabus
