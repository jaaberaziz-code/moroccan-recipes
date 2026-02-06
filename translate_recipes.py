#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to fix encoding issues and translate French recipe titles to Arabic
"""

import json
import re

# Translation mappings
DISH_TRANSLATIONS = {
    # Main dishes
    "tajine": "طاجين",
    "couscous": "كسكس",
    "salade": "سلطة",
    "soupe": "شوربة",
    "kefta": "كفتة",
    "msemen": "مسمن",
    "chebakia": "شباكية",
    "cornes de gazelle": "قرن الغزال",
    "makrout": "مقروط",
    "basboussa": "بسبوسة",
    "rfissa": "رفيسة",
    "chakchouka": "شكشوكة",
    "pastilla": "بسطيلة",
    "briouate": "بريوات",
    "brick": "بريك",
    "harira": "حريرة",
    "chorba": "شوربة",
    "sellou": "سلو",
    "lentilles": "عدس",
    "beghrir": "بغرير",
    "baghrir": "بغرير",
    
    # Ingredients/additions
    "poisson": "سمك",
    "poulet": "دجاج",
    "agneau": "خروف",
    "mouton": "خروف",
    "boeuf": "لحم بقري",
    "veau": "عجل",
    "thon": "تونة",
    "légumes": "خضار",
    "olives": "زيتون",
    "citron": "ليمون",
    "amandes": "لوز",
    "dattes": "تمر",
    "pruneaux": "برقوق",
    "pomme de terre": "بطاطس",
    "carottes": "جزر",
    "navets": "لفت",
    "courgettes": "كوسة",
    "merguez": "مرقاز",
    "œuf": "بيض",
    "oeuf": "بيض",
    
    # Cooking methods
    "au four": "في الفرن",
    "à la marocaine": "على الطريقة المغربية",
    "marocaine": "مغربية",
    "marocain": "مغربي",
    "traditionnel": "تقليدي",
    "royal": "ملكي",
    
    # Categories
    "main course": "طبق رئيسي",
    "dessert": "حلوى",
    "soup": "شوربة",
    "salad": "سلطة",
    "breakfast": "فطور",
    
    # Difficulty
    "easy": "سهل",
    "medium": "متوسط",
    "hard": "صعب",
}

# Encoding fixes - map garbled characters to correct French characters
ENCODING_FIXES = {
    "Ã ": "à ",
    "Ã ": "à",
    "Ã¢": "â",
    "Ã©": "é",
    "Ã¨": "è",
    "Ãª": "ê",
    "Ã«": "ë",
    "Ã®": "î",
    "Ã¯": "ï",
    "Ã´": "ô",
    "Ã¹": "ù",
    "Ã»": "û",
    "Ã§": "ç",
    "Å": "œ",
    "â": "'",
    "â": "'",
    "â": "'",
    "â": '"',
    "â": '"',
    "Â": "",
    "Ã": "à",
}

def fix_encoding(text):
    """Fix encoding issues in French text"""
    if not text:
        return text
    
    # Apply encoding fixes
    for bad, good in ENCODING_FIXES.items():
        text = text.replace(bad, good)
    
    return text

def has_arabic(text):
    """Check if text contains Arabic characters"""
    if not text:
        return False
    arabic_pattern = re.compile(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]')
    return bool(arabic_pattern.search(text))

def translate_title(french_title):
    """Translate a French title to Arabic"""
    if not french_title:
        return ""
    
    # Fix encoding first
    french_title = fix_encoding(french_title)
    
    french_lower = french_title.lower()
    
    # Special case handling for known patterns
    result_parts = []
    
    # Check for specific dish patterns
    if "tajine" in french_lower or "tagine" in french_lower:
        if "kefta" in french_lower and "oeuf" in french_lower:
            return "طاجين كفتة بالبيض"
        elif "kefta" in french_lower:
            return "طاجين كفتة"
        elif "poulet" in french_lower:
            if "citron" in french_lower or "citrons confits" in french_lower:
                return "طاجين الدجاج بالليمون المخلل"
            elif "olive" in french_lower:
                return "طاجين الدجاج بالزيتون"
            else:
                return "طاجين الدجاج"
        elif "poisson" in french_lower:
            return "طاجين السمك على الطريقة المغربية"
        elif "agneau" in french_lower or "mouton" in french_lower:
            if "legume" in french_lower or "légume" in french_lower:
                return "طاجين الخروف بالخضار"
            else:
                return "طاجين الخروف"
        elif "veau" in french_lower:
            return "طاجين العجل"
        elif "legume" in french_lower or "légume" in french_lower:
            return "طاجين الخضار في الفرن"
        else:
            return "طاجين مغربي"
    
    if "couscous" in french_lower:
        if "royal" in french_lower:
            return "كسكس ملكي"
        elif "legume" in french_lower or "légume" in french_lower:
            if "surgele" in french_lower or "surgelé" in french_lower:
                return "كسكس بالخضار المجمد"
            elif "sept" in french_lower or "7" in french_lower:
                return "كسكس بالسبع خضار"
            else:
                return "كسكس بالخضار"
        elif "boeuf" in french_lower or "bœuf" in french_lower:
            return "كسكس باللحم البقري"
        elif "poulet" in french_lower:
            return "كسكس بالدجاج"
        elif "sans couscoussier" in french_lower:
            return "كسكس بدون كسكاس"
        elif "madfoune" in french_lower:
            return "كسكس مدفون بالدجاج"
        elif "boulettes" in french_lower:
            return "كسكس بكويرات اللحم"
        else:
            return "كسكس مغربي"
    
    if "pastilla" in french_lower:
        if "poulet" in french_lower:
            return "بسطيلة بالدجاج"
        else:
            return "بسطيلة مغربية"
    
    if "brick" in french_lower:
        if "thon" in french_lower:
            return "بريك بالتونة"
        elif "oeuf" in french_lower or "œuf" in french_lower:
            return "بريك بالبيض"
        elif "epinard" in french_lower or "épinard" in french_lower:
            return "بريك بالسبانخ"
        elif "viande hachee" in french_lower or "viande hachée" in french_lower:
            return "بريك بالكفتة"
        else:
            return "بريك"
    
    if "briouate" in french_lower:
        if "poulet" in french_lower:
            return "بريوات بالدجاج"
        else:
            return "بريوات"
    
    if "salade" in french_lower:
        if "orange" in french_lower:
            return "سلطة البرتقال المغربية"
        elif "carotte" in french_lower:
            return "سلطة الجزر المغربية"
        elif "pomme de terre" in french_lower:
            if "thon" in french_lower:
                return "سلطة البطاطس بالتونة"
            else:
                return "سلطة البطاطس"
        elif "pois chiche" in french_lower:
            return "سلطة الحمص"
        else:
            return "سلطة مغربية"
    
    if "chakchouka" in french_lower or "shakshuka" in french_lower:
        if "merguez" in french_lower:
            return "شكشوكة بالمرقاز"
        else:
            return "شكشوكة"
    
    if "rfissa" in french_lower:
        return "رفيسة بالدجاج"
    
    if "msemen" in french_lower:
        if "farci" in french_lower:
            return "مسمن محشو"
        else:
            return "مسمن مغربي"
    
    if "harira" in french_lower:
        return "حريرة مغربية"
    
    if "chorba" in french_lower:
        return "شوربة مغربية"
    
    if "sellou" in french_lower:
        return "سلو مغربي"
    
    if "chebakia" in french_lower:
        return "شباكية مغربية"
    
    if "cornes de gazelle" in french_lower or "corne de gazelle" in french_lower:
        return "قرن الغزال"
    
    if "makrout" in french_lower:
        if "datte" in french_lower or "dattes" in french_lower:
            return "مقروط بالتمر"
        elif "amande" in french_lower:
            return "مقروط باللوز"
        else:
            return "مقروط"
    
    if "basboussa" in french_lower:
        if "citron" in french_lower:
            return "بسبوسة بالليمون"
        elif "amande" in french_lower:
            return "بسبوسة باللوز"
        else:
            return "بسبوسة"
    
    if "kefta" in french_lower:
        return "كفتة على الطريقة المغربية"
    
    if "lentilles" in french_lower:
        return "عدس على الطريقة المغربية"
    
    if "sardines" in french_lower:
        return "سردين مغربي"
    
    if "crepe" in french_lower or "crêpe" in french_lower:
        if "beghrir" in french_lower or "baghrir" in french_lower:
            return "بغرير (الفطائر المغربية)"
        elif "mille trous" in french_lower:
            return "بغرير - الفطائر ذات الألف ثقب"
        else:
            return "مسمن - الرغايف"
    
    if "chtitha" in french_lower:
        return "شطيطحة الدجاج"
    
    if "epaule d'agneau" in french_lower or "épaule d'agneau" in french_lower:
        return "كتف الخروف على الطريقة المغربية"
    
    if "gigot d'agneau" in french_lower:
        return "فخذ الخروف على الطريقة المغربية"
    
    if "jarret de boeuf" in french_lower or "jarret de bœuf" in french_lower:
        return "عرق اللحم البقري على الطريقة المغربية"
    
    if "poulet" in french_lower:
        if "pruneaux" in french_lower:
            return "دجاج بالبرقوق"
        elif "epice" in french_lower or "épicé" in french_lower:
            return "دجاج حار بالتوابل المغربية"
        else:
            return "دجاج على الطريقة المغربية"
    
    if "dorade" in french_lower:
        return "دوراد في الفرن على الطريقة المغربية"
    
    if "tourte" in french_lower:
        return "تورتة مغربية"
    
    if "boulettes de viande" in french_lower:
        return "كويرات اللحم المغربية"
    
    if "galette de pomme de terre" in french_lower:
        return "معقودة بطاطس مغربية"
    
    if "citrons confits" in french_lower:
        return "ليمون مخلل على الطريقة المغربية"
    
    if "sauce marocaine" in french_lower:
        if "foie" in french_lower:
            return "صلصة مغربية بكبد العجل"
        else:
            return "صلصة مغربية"
    
    if "soupe de legumes" in french_lower or "soupe de légumes" in french_lower:
        return "شوربة الخضار المغربية"
    
    if "souris d'agneau" in french_lower:
        return "ساق الخروف على الطريقة المغربية"
    
    # Default: return the French title (encoding fixed) if no pattern matches
    # But check if it looks like it should have been translated
    return ""

def translate_category(category):
    """Translate category to Arabic"""
    if not category:
        return ""
    category_map = {
        "Main Course": "طبق رئيسي",
        "Dessert": "حلوى",
        "Soup": "شوربة",
        "Salad": "سلطة",
        "Breakfast": "فطور",
    }
    return category_map.get(category, category)

def translate_difficulty(difficulty):
    """Translate difficulty to Arabic"""
    if not difficulty:
        return ""
    difficulty_map = {
        "Easy": "سهل",
        "Medium": "متوسط",
        "Hard": "صعب",
    }
    return difficulty_map.get(difficulty, difficulty)

def process_recipes():
    """Main function to process all recipes"""
    
    # Read the JSON file
    with open('/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes.json', 'r', encoding='utf-8') as f:
        recipes = json.load(f)
    
    translated_count = 0
    
    for recipe in recipes:
        # Fix encoding in title
        if 'title' in recipe:
            recipe['title'] = fix_encoding(recipe['title'])
        
        # Fix encoding in description
        if 'description' in recipe:
            recipe['description'] = fix_encoding(recipe['description'])
        
        # Translate titleAr if missing or doesn't contain Arabic
        title_ar = recipe.get('titleAr', '')
        if not title_ar or not has_arabic(title_ar):
            new_title_ar = translate_title(recipe.get('title', ''))
            if new_title_ar:
                recipe['titleAr'] = new_title_ar
                translated_count += 1
                print(f"Translated: {recipe['title']} -> {new_title_ar}")
        
        # Translate categoryAr if missing
        if 'category' in recipe and 'categoryAr' not in recipe or not recipe.get('categoryAr'):
            recipe['categoryAr'] = translate_category(recipe.get('category', ''))
        
        # Translate difficultyAr if missing
        if 'difficulty' in recipe and 'difficultyAr' not in recipe or not recipe.get('difficultyAr'):
            recipe['difficultyAr'] = translate_difficulty(recipe.get('difficulty', ''))
    
    # Write back the updated JSON
    with open('/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes.json', 'w', encoding='utf-8') as f:
        json.dump(recipes, f, ensure_ascii=False, indent=2)
    
    print(f"\nTotal recipes processed: {len(recipes)}")
    print(f"Titles translated: {translated_count}")
    
    return translated_count

if __name__ == "__main__":
    process_recipes()
