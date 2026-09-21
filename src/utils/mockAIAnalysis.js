/**
 * Client-side mock NLP analysis utility for the frontend demonstration.
 * Evaluates grievance text, extracts contextual keywords, and predicts priority and category.
 */
export function analyzeComplaint(text = '', userCategory = '') {
  const clean = text.toLowerCase().trim();

  if (clean.length < 15) {
    return null;
  }

  // Critical keywords: emergencies, bodily hazard, active disaster
  const criticalKeywords = [
    'emergency', 'danger', 'fire', 'electric shock', 'spark', 'explosion', 
    'short circuit', 'gas leak', 'accident', 'collapse', 'flooding', 'poison', 'hazard'
  ];

  // High urgency keywords: primary utilities down, severe disruption, security
  const highKeywords = [
    'no water', 'water supply', 'stopped', 'broken', 'not working', 'unsafe', 
    'urgent', 'theft', 'stolen', 'blackout', 'power cut', 'leakage', 'contamination',
    'overflowing', 'ac not working', 'exam', 'medical'
  ];

  // Medium urgency keywords: degraded performance, maintenance request
  const mediumKeywords = [
    'slow', 'delay', 'maintenance', 'noise', 'flickering', 'dirty', 'repair',
    'ac cooling low', 'intermittent', 'damaged', 'projector', 'light bulb', 'fan'
  ];

  // Category detection heuristics
  const categoryKeywords = {
    'Water Supply': ['water', 'tap', 'leak', 'plumbing', 'pipe', 'drainage', 'washroom'],
    'Hostel': ['hostel', 'room', 'warden', 'mess', 'bed', 'bathroom', 'block b', 'corridor'],
    'Electricity': ['power', 'electric', 'plug', 'switch', 'light', 'fan', 'ac', 'voltage'],
    'IT / Wi-Fi': ['wifi', 'wi-fi', 'internet', 'network', 'router', 'ethernet', 'login', 'portal'],
    'Cleanliness': ['clean', 'garbage', 'dustbin', 'smell', 'dirt', 'trash', 'hygiene'],
    'Infrastructure': ['door', 'window', 'ceiling', 'wall', 'stairs', 'lift', 'elevator', 'pothole'],
    'Academic': ['lecture', 'classroom', 'projector', 'whiteboard', 'lab', 'mic', 'faculty'],
    'Food / Cafeteria': ['canteen', 'cafeteria', 'food', 'meal', 'taste', 'stale', 'pricing'],
    'Security': ['guard', 'gate', 'id card', 'stranger', 'harassment', 'lock', 'lost'],
  };

  const detectedKeywords = [];
  let detectedCategory = userCategory || 'Infrastructure';
  let priority = 'LOW';
  let confidence = 0.82;
  let reason = 'The complaint appears to describe a routine service request or inquiry.';

  // Check Category matches
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (clean.includes(kw)) {
        if (!userCategory) detectedCategory = cat;
        if (!detectedKeywords.includes(kw)) detectedKeywords.push(kw);
      }
    }
  }

  // Check Critical Priority
  const foundCritical = criticalKeywords.filter(k => clean.includes(k));
  if (foundCritical.length > 0) {
    priority = 'CRITICAL';
    confidence = 0.96;
    detectedKeywords.unshift(...foundCritical);
    reason = 'Urgent life-safety or structural hazard detected requiring immediate emergency intervention.';
  } else {
    // Check High Priority
    const foundHigh = highKeywords.filter(k => clean.includes(k));
    if (foundHigh.length > 0) {
      priority = 'HIGH';
      confidence = 0.91;
      detectedKeywords.unshift(...foundHigh);
      reason = 'Primary campus facility or utility disruption identified that significantly affects students.';
    } else {
      // Check Medium Priority
      const foundMed = mediumKeywords.filter(k => clean.includes(k));
      if (foundMed.length > 0) {
        priority = 'MEDIUM';
        confidence = 0.86;
        detectedKeywords.unshift(...foundMed);
        reason = 'Operational defect or degraded service request requiring standard maintenance dispatch.';
      }
    }
  }

  // Deduplicate and trim keywords list to top 4
  const uniqueKeywords = Array.from(new Set(detectedKeywords)).slice(0, 4);
  if (uniqueKeywords.length === 0) {
    uniqueKeywords.push('general inquiry', 'campus facility');
  }

  return {
    category: detectedCategory,
    priority,
    confidence,
    keywords: uniqueKeywords,
    reason,
  };
}
