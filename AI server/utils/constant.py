SELF_RELATIONSHIPS = ['ISA', 'RESEMBLES', 'PARTOF', 'HASROLE']

NODE_TYPES = [
    "Disease", "Food", "Gene", "Reaction", "Symptom", 
    "SideEffect", "Compound", "PharmacologicClass"
]

RELATIONSHIP_TYPES = [
    # Disease relationships
    ("Disease", "ISA", "Disease"),
    ("Disease", "RESEMBLES", "Disease"),
    ("Disease", "ASSOCIATES", "Gene"),
    ("Disease", "PRESENTS", "Symptom"),

    # Food relationships
    ("Food", "CONTAINS", "Compound"),

    # Gene relationships
    ("Gene", "MARKER", "Disease"),

    # Reaction relationships
    ("Reaction", "CONSUMES", "Compound"),
    ("Reaction", "PRODUCES", "Compound"),

    # Compound relationships
    ("Compound", "TREATS", "Disease"),
    ("Compound", "CONTRAINDICATES", "Disease"),
    ("Compound", "INTERACTS", "Food"),
    ("Compound", "PARTICIPATES", "Reaction"),
    ("Compound", "CAUSES", "Side Effect"),
    ("Compound", "ISA", "Compound"),
    ("Compound", "PARTOF", "Compound"),
    ("Compound", "HASROLE", "Compound"),

    # Pharmacologic Class relationships
    ("Pharmacologic Class", "INCLUDES", "Compound")
]