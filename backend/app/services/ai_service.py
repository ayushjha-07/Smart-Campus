import re
from typing import Dict, Any, List
from app.models.enums import ComplaintPriority


# Keyword patterns for category detection
CATEGORY_PATTERNS = {
    "Water Supply": [
        r"water", r"leak", r"leakage", r"tap", r"pipe", r"drain", r"flush", r"drinking", r"overflow", r"sewage"
    ],
    "Electricity": [
        r"electric", r"power", r"breaker", r"outage", r"socket", r"plug", r"light", r"wiring", r"generator", r"voltage", r"spark"
    ],
    "IT / Wi-Fi": [
        r"wi-?fi", r"internet", r"network", r"router", r"lan", r"portal", r"server", r"login", r"bandwidth", r"cable", r"lab pc"
    ],
    "Infrastructure": [
        r"door", r"window", r"desk", r"chair", r"elevator", r"lift", r"bench", r"ceiling", r"wall", r"tile", r"roof", r"fan", r"air condition", r"ac "
    ],
    "Cleanliness": [
        r"clean", r"garbage", r"trash", r"dustbin", r"dirty", r"sweep", r"washroom", r"toilet", r"smell", r"waste"
    ],
    "Hostel": [
        r"hostel", r"room", r"warden", r"bed", r"mess", r"almirah", r"cupboard", r"corridor", r"geyser"
    ],
    "Security": [
        r"theft", r"stolen", r"lost", r"guard", r"cctv", r"gate", r"unauthorized", r"harass", r"security", r"threat"
    ],
    "Library": [
        r"library", r"book", r"reading room", r"librarian", r"journal", r"borrow"
    ],
    "Transport": [
        r"bus", r"shuttle", r"driver", r"parking", r"commute", r"vehicle"
    ],
    "Food / Cafeteria": [
        r"food", r"canteen", r"cafeteria", r"meal", r"hygiene", r"snack", r"cook"
    ],
    "Academic": [
        r"exam", r"syllabus", r"faculty", r"professor", r"lecture", r"class", r"timetable", r"attendance", r"grade"
    ]
}

# Urgency keywords triggering high or critical priority
CRITICAL_PATTERNS = [
    r"hazard", r"fire", r"danger", r"spark", r"electrocution", r"emergency", r"flooding", r"gas", r"severe", r"smoke", r"threat"
]
HIGH_PATTERNS = [
    r"urgent", r"broken", r"outage", r"interrupted", r"exam tomorrow", r"unable to", r"stopped", r"failure", r"heavy leak"
]


def analyze_complaint(title: str, description: str) -> Dict[str, Any]:
    """
    Rule-based demo AI analysis service for campus complaints.
    Extracts category, assigns priority, computes confidence score, and suggests routing.
    Designed modularly to allow drop-in replacement with machine-learning NLP models.
    """
    text = f"{title} {description}".lower()
    
    # 1. Detect Category by keyword hits
    category_scores: Dict[str, int] = {}
    matched_keywords: List[str] = []

    for cat, patterns in CATEGORY_PATTERNS.items():
        count = 0
        for pattern in patterns:
            matches = re.findall(pattern, text)
            if matches:
                count += len(matches)
                matched_keywords.extend(matches)
        if count > 0:
            category_scores[cat] = count

    if category_scores:
        detected_category = max(category_scores, key=category_scores.get)
        confidence = min(0.95, 0.70 + (category_scores[detected_category] * 0.08))
    else:
        detected_category = "Other"
        confidence = 0.65

    # 2. Detect Priority
    if any(re.search(p, text) for p in CRITICAL_PATTERNS):
        priority = ComplaintPriority.CRITICAL
        confidence = max(confidence, 0.94)
        reason = "Critical campus hazard or emergency detected in description."
    elif any(re.search(p, text) for p in HIGH_PATTERNS) or detected_category in ["Water Supply", "Electricity"]:
        priority = ComplaintPriority.HIGH
        confidence = max(confidence, 0.90)
        reason = "High-impact facility issue likely affecting multiple students."
    elif len(text.split()) > 25:
        priority = ComplaintPriority.MEDIUM
        confidence = max(confidence, 0.85)
        reason = "Detailed standard complaint needing operational maintenance."
    else:
        priority = ComplaintPriority.LOW
        confidence = max(confidence, 0.78)
        reason = "Minor maintenance or convenience inquiry."

    # 3. Department Suggestion
    dept_map = {
        "Water Supply": "Maintenance",
        "Electricity": "Maintenance",
        "Infrastructure": "Maintenance",
        "IT / Wi-Fi": "IT Support",
        "Cleanliness": "Housekeeping",
        "Hostel": "Hostel",
        "Security": "Security",
        "Library": "Library",
        "Transport": "Transport",
        "Food / Cafeteria": "Cafeteria",
        "Academic": "Academics",
        "Other": "Administration",
    }
    suggested_dept = dept_map.get(detected_category, "Administration")

    return {
        "category": detected_category,
        "priority": priority,
        "confidence": round(confidence, 2),
        "suggested_department": suggested_dept,
        "keywords": list(set(matched_keywords))[:6],
        "reason": reason,
        "is_ai_generated": True
    }
