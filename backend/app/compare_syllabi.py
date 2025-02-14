from sentence_transformers import SentenceTransformer, util
import json

def compare_syllabi(old_syllabus, new_syllabus, similarity_threshold=0.7):
    model = SentenceTransformer('all-MiniLM-L12-v2')

    def extract_topics(syllabus):
        # Directly access the syllabus field to get topics under the units
        if "syllabus" not in syllabus:
            raise ValueError("Syllabus is missing in the data.")
        
        syllabus_data = syllabus["syllabus"]  # Get the syllabus data (this contains the units)
        
        # Extract topics directly from the syllabus
        topics = []
        for unit_name, unit in syllabus_data.items():
            if isinstance(unit, dict) and 'title' in unit and 'topics' in unit:
                for topic in unit['topics']:
                    topics.append((topic, unit_name, unit['title']))
            else:
                continue
        
        return topics

    # Extract topics from both old and new syllabi
    old_topics = extract_topics(old_syllabus)
    new_topics = extract_topics(new_syllabus)

    # Create embeddings for the topics
    old_embeddings = model.encode([t[0] for t in old_topics], convert_to_tensor=True)
    new_embeddings = model.encode([t[0] for t in new_topics], convert_to_tensor=True)

    # Initialize lists for the results
    added, removed, matches, elaborations, shifted = [], [], [], [], []

    # Compare new syllabus topics to old syllabus topics
    for i, (new_topic, new_unit, new_label) in enumerate(new_topics):
        similarities = util.cos_sim(new_embeddings[i], old_embeddings).squeeze()
        max_similarity, max_index = similarities.max().item(), similarities.argmax().item()
        old_topic, old_unit, old_label = old_topics[max_index]

        if max_similarity >= similarity_threshold:
            if new_unit != old_unit:
                shifted.append({"topic": new_topic, "from": old_label, "to": new_label})
            else:
                matches.append({"new": new_topic, "old": old_topic, "similarity": max_similarity})
        elif max_similarity >= similarity_threshold - 0.1:
            elaborations.append({"new": new_topic, "old": old_topic, "similarity": max_similarity})
        else:
            added.append(new_topic)

    # Compare old syllabus topics to new syllabus topics
    for i, (old_topic, old_unit, old_label) in enumerate(old_topics):
        similarities = util.cos_sim(old_embeddings[i], new_embeddings).squeeze()
        max_similarity = similarities.max().item()
        if max_similarity < similarity_threshold - 0.1:
            removed.append(old_topic)

    return {
        "added": added,
        "removed": removed,
        "semantic_matches": matches,
        "elaborations": elaborations,
        "shifted_topics": shifted
    }
