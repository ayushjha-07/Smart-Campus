"""
Smart Campus Database Seeding Script
Populates initial campus departments, demonstration accounts, and realistic complaint records.
WARNING: These credentials and records are intended for development and demonstration purposes only.
"""

import sys
import os
from datetime import datetime, timezone, timedelta

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(__file__))
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.enums import UserRole, UserStatus, ComplaintPriority, ComplaintStatus, DepartmentStatus
from app.models.department import Department
from app.models.user import User
from app.models.complaint import Complaint
from app.models.complaint_update import ComplaintUpdate
from app.models.notification import Notification

DEPARTMENTS_SEED = [
    {"name": "Administration", "department_code": "ADM", "description": "Central university leadership, institutional policies, and executive governance."},
    {"name": "Maintenance", "department_code": "MNT", "description": "Campus facilities, electrical lines, water supply infrastructure, and civil maintenance."},
    {"name": "Hostel", "department_code": "HST", "description": "Student residency halls, room allotment, mess management, and residential welfare."},
    {"name": "IT Support", "department_code": "IT", "description": "Campus Wi-Fi connectivity, server systems, computer lab workstations, and student portal."},
    {"name": "Academics", "department_code": "ACD", "description": "Curriculum management, examination halls, faculty schedules, and grade inquiries."},
    {"name": "Security", "department_code": "SEC", "description": "Campus perimeter vigilance, entry gates, CCTV surveillance, and parking regulation."},
    {"name": "Transport", "department_code": "TRN", "description": "University bus fleet, campus shuttles, commuter routes, and driver scheduling."},
    {"name": "Library", "department_code": "LIB", "description": "Central reading library, book archives, digital journals, and quiet study quadrants."},
    {"name": "Cafeteria", "department_code": "CAF", "description": "Dining halls, food safety standards, canteen vendors, and nutritional hygiene."},
    {"name": "Housekeeping", "department_code": "HSK", "description": "Classroom sanitation, waste recycling, corridor sweeping, and general campus hygiene."}
]


def seed_database():
    print("[*] Ensuring database tables exist...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        print("[*] Checking existing records...")
        admin_exists = db.query(User).filter(User.email == "admin@smartcampus.edu").first()
        if admin_exists:
            print("[INFO] Demo database has already been seeded. Skipping seed.")
            return

        print("[*] Seeding 10 Campus Departments...")
        dept_map = {}
        for d_data in DEPARTMENTS_SEED:
            dept = Department(
                name=d_data["name"],
                department_code=d_data["department_code"],
                description=d_data["description"],
                status=DepartmentStatus.ACTIVE
            )
            db.add(dept)
            db.flush()
            dept_map[d_data["department_code"]] = dept

        print("[*] Seeding Demo User Accounts (Student, Staff, Administrator)...")
        # 1. Administrator
        admin_user = User(
            full_name="Campus Administrator",
            email="admin@smartcampus.edu",
            phone="+91 98765 00001",
            password_hash=get_password_hash("Admin@123"),
            role=UserRole.ADMINISTRATOR,
            status=UserStatus.ACTIVE,
            employee_id="ADM-2026-001",
            designation="Chief Administrative Officer",
            department_id=dept_map["ADM"].id
        )
        db.add(admin_user)
        db.flush()
        dept_map["ADM"].department_head_id = admin_user.id

        # 2. Department Staff (Maintenance Shift Lead)
        staff_user = User(
            full_name="Rohit Sharma",
            email="maintenance@smartcampus.edu",
            phone="+91 98765 00024",
            password_hash=get_password_hash("Staff@123"),
            role=UserRole.DEPARTMENT_STAFF,
            status=UserStatus.ACTIVE,
            employee_id="EMP-MNT-024",
            designation="Facilities Operations Shift Lead",
            department_id=dept_map["MNT"].id
        )
        db.add(staff_user)
        db.flush()
        dept_map["MNT"].department_head_id = staff_user.id

        # 3. Student
        student_user = User(
            full_name="Ayush Kumar Jha",
            email="student@smartcampus.edu",
            phone="+91 98765 00108",
            password_hash=get_password_hash("Student@123"),
            role=UserRole.STUDENT,
            status=UserStatus.ACTIVE,
            student_id="SC-STU-2026-001",
            course="Bachelor of Technology",
            branch="Computer Science & Engineering",
            year=3
        )
        db.add(student_user)
        db.flush()

        # Additional demo student for realism
        student_user2 = User(
            full_name="Rahul Sharma",
            email="rahul.sharma@campus.edu",
            phone="+91 98765 00014",
            password_hash=get_password_hash("Student@123"),
            role=UserRole.STUDENT,
            status=UserStatus.ACTIVE,
            student_id="SC-STU-2026-014",
            course="Bachelor of Technology",
            branch="Computer Science & Engineering",
            year=2
        )
        db.add(student_user2)
        db.flush()

        print("[*] Seeding Realistic Campus Complaints and Timelines...")
        now = datetime.now(timezone.utc)

        # Complaint 1: In Progress
        c1 = Complaint(
            complaint_number="SC-2026-1848",
            title="Water supply issue in Hostel Block B",
            description="Water supply has stopped in Hostel Block B since this morning. Students on the 2nd floor are unable to access basic washroom utilities.",
            category="Water Supply",
            priority=ComplaintPriority.HIGH,
            status=ComplaintStatus.IN_PROGRESS,
            location="Hostel Block B, 2nd Floor",
            student_id=student_user2.id,
            department_id=dept_map["MNT"].id,
            ai_category="Water Supply",
            ai_priority="HIGH",
            ai_confidence=0.92,
            submitted_at=now - timedelta(hours=3, minutes=15)
        )
        db.add(c1)
        db.flush()

        db.add(ComplaintUpdate(
            complaint_id=c1.id,
            updated_by=student_user2.id,
            status="PENDING",
            message="Complaint registered via student portal.",
            created_at=now - timedelta(hours=3, minutes=15)
        ))
        db.add(ComplaintUpdate(
            complaint_id=c1.id,
            updated_by=admin_user.id,
            status="ASSIGNED",
            message="Auto-triaged by AI rule-engine and routed to Maintenance department.",
            created_at=now - timedelta(hours=3, minutes=5)
        ))
        db.add(ComplaintUpdate(
            complaint_id=c1.id,
            updated_by=staff_user.id,
            status="IN_PROGRESS",
            message="Plumbing team dispatched to inspect main booster pump on terrace.",
            created_at=now - timedelta(hours=1, minutes=45)
        ))

        # Complaint 2: Critical Hazard
        c2 = Complaint(
            complaint_number="SC-2026-1842",
            title="Power outage in Computer Lab 2",
            description="Sub-circuit breaker tripped during lab exam session. Workstations 14 to 35 powered down completely with burning smell near riser box.",
            category="Electricity",
            priority=ComplaintPriority.CRITICAL,
            status=ComplaintStatus.UNDER_REVIEW,
            location="Academic Block 1, Computer Lab 2",
            student_id=student_user.id,
            department_id=dept_map["MNT"].id,
            ai_category="Electricity",
            ai_priority="CRITICAL",
            ai_confidence=0.95,
            submitted_at=now - timedelta(hours=5)
        )
        db.add(c2)
        db.flush()

        db.add(ComplaintUpdate(
            complaint_id=c2.id,
            updated_by=student_user.id,
            status="PENDING",
            message="Complaint submitted by lab assistant.",
            created_at=now - timedelta(hours=5)
        ))
        db.add(ComplaintUpdate(
            complaint_id=c2.id,
            updated_by=admin_user.id,
            status="UNDER_REVIEW",
            message="Critical electrical alert flagged. Duty electrician dispatched.",
            created_at=now - timedelta(hours=4, minutes=40)
        ))

        # Complaint 3: Resolved
        c3 = Complaint(
            complaint_number="SC-2026-1845",
            title="Library AC chiller malfunction in reading room",
            description="Air conditioning unit 3 was vibrating and producing hot air in the 3rd floor reading hall.",
            category="Infrastructure",
            priority=ComplaintPriority.MEDIUM,
            status=ComplaintStatus.RESOLVED,
            location="Central Library, 3rd Floor",
            student_id=student_user.id,
            department_id=dept_map["MNT"].id,
            ai_category="Infrastructure",
            ai_priority="MEDIUM",
            ai_confidence=0.88,
            submitted_at=now - timedelta(days=1, hours=4),
            resolved_at=now - timedelta(hours=2)
        )
        db.add(c3)
        db.flush()

        db.add(ComplaintUpdate(
            complaint_id=c3.id,
            updated_by=staff_user.id,
            status="RESOLVED",
            message="Refrigerant gas replenished and blower belt replaced. Temperature verified at 22°C.",
            created_at=now - timedelta(hours=2)
        ))

        print("[*] Seeding Initial Demo Notifications...")
        db.add(Notification(
            user_id=student_user.id,
            title="Complaint SC-2026-1845 Resolved",
            message="Your report regarding Library AC chiller has been resolved.",
            notification_type="resolved",
            complaint_id=c3.id,
            is_read=True
        ))
        db.add(Notification(
            user_id=student_user.id,
            title="Status Update: SC-2026-1842",
            message="Electrician team is triaging circuit board in Lab 2.",
            notification_type="status",
            complaint_id=c2.id,
            is_read=False
        ))
        db.add(Notification(
            user_id=staff_user.id,
            title="High Priority Assignment: SC-2026-1848",
            message="Hostel B water supply issue has been assigned to Maintenance shift.",
            notification_type="urgent",
            complaint_id=c1.id,
            is_read=False
        ))
        db.add(Notification(
            user_id=admin_user.id,
            title="CRITICAL HAZARD: SC-2026-1842",
            message="Computer Lab 2 electrical trip flagged critical.",
            notification_type="urgent",
            complaint_id=c2.id,
            is_read=False
        ))

        db.commit()
        print("[SUCCESS] Database seeding successfully completed!")
        print("\nDemo Credentials:")
        print("------------------------------------------------------------------")
        print("Student:            student@smartcampus.edu       / Student@123")
        print("Department Staff:   maintenance@smartcampus.edu   / Staff@123")
        print("Administrator:      admin@smartcampus.edu         / Admin@123")
        print("------------------------------------------------------------------\n")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error during seeding: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
