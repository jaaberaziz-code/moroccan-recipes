'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Download, Upload, Save, Eye, X, ChevronLeft, Clock, Users, ChefHat } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  difficultyAr: string;
  image: string;
  ingredients: string[];
  ingredientsAr: string[];
  instructions: string[];
  instructionsAr: string[];
  source: string;
}

const CATEGORIES = [
  { value: 'Soup', ar: 'شوربة' },
  { value: 'Main Course', ar: 'طبق رئيسي' },
  { value: 'Dessert', ar: 'حلويات' },
  { value: 'Salad', ar: 'سلطة' },
  { value: 'Appetizer', ar: 'مقبلات' },
  { value: 'Breakfast', ar: 'فطور' },
  { value: 'Side Dish', ar: 'طبق جانبي' },
  { value: 'Other', ar: 'أخرى' },
];

const DIFFICULTIES = [
  { value: 'Easy', ar: 'سهل' },
  { value: 'Medium', ar: 'متوسط' },
  { value: 'Hard', ar: 'صعب' },
];

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'edit' | 'view'>('list');
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const response = await fetch('/data/recipes.json');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.titleAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.categoryAr?.includes(searchTerm)
  );

  const handleNewRecipe = () => {
    // EXAMPLE RECIPE - Pre-filled template
    setCurrentRecipe({
      id: '',
      title: 'Couscous Royal',
      titleAr: 'كسكس ملكي',
      description: 'Un délicieux couscous royal avec viande et légumes',
      descriptionAr: 'كسكس ملكي لذيذ باللحم والخضار',
      category: 'Main Course',
      categoryAr: 'طبق رئيسي',
      prepTime: '20 دقيقة',
      cookTime: '45 دقيقة',
      servings: 6,
      difficulty: 'Medium',
      difficultyAr: 'متوسط',
      image: 'https://img.cuisineaz.com/660x660/2016/04/28/i15329-couscous-royal.jpg',
      ingredients: [
        'Semoule (500g)',
        'Agneau (400g)',
        'Poulet (1)',
        'Légumes variés'
      ],
      ingredientsAr: [
        'سميد (500غ)',
        'لحم خروف (400غ)',
        'دجاج (1)',
        'خضار مشكل'
      ],
      instructions: [
        'Préparer la semoule avec de l\'huile et de l\'eau salée',
        'Faire cuire la viande avec les épices',
        'Ajouter les légumes et laisser mijoter'
      ],
      instructionsAr: [
        'حضري السميد بالزيت والماء المالح',
        'اطهي اللحم مع التوابل',
        'أضيفي الخضار واتركيها تتسبك'
      ],
      source: '',
    });
    setImagePreview('https://img.cuisineaz.com/660x660/2016/04/28/i15329-couscous-royal.jpg');
    setViewMode('edit');
  };

  const handleEdit = (recipe: Recipe) => {
    setCurrentRecipe({ ...recipe });
    setImagePreview(recipe.image || null);
    setViewMode('edit');
  };

  const handleView = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    setImagePreview(recipe.image || null);
    setViewMode('view');
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الوصفة؟')) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentRecipe) return;

    if (!currentRecipe.id) {
      const newId = currentRecipe.titleAr
        ? currentRecipe.titleAr
            .toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        : Date.now().toString();
      
      const newRecipe = { ...currentRecipe, id: newId };
      setRecipes([...recipes, newRecipe]);
    } else {
      setRecipes(
        recipes.map((r) => (r.id === currentRecipe.id ? currentRecipe : r))
      );
    }
    setViewMode('list');
    setCurrentRecipe(null);
    setImagePreview(null);
  };

  const handleBack = () => {
    setViewMode('list');
    setCurrentRecipe(null);
    setImagePreview(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'recipes.json');
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setRecipes(imported);
        alert('تم استيراد الوصفات بنجاح!');
      } catch (error) {
        alert('خطأ في قراءة الملف');
      }
    };
    reader.readAsText(file);
  };

  const updateArrayField = (field: keyof Recipe, index: number, value: string) => {
    if (!currentRecipe) return;
    const array = [...(currentRecipe[field] as string[])];
    array[index] = value;
    setCurrentRecipe({ ...currentRecipe, [field]: array });
  };

  const addArrayField = (field: keyof Recipe) => {
    if (!currentRecipe) return;
    setCurrentRecipe({
      ...currentRecipe,
      [field]: [...(currentRecipe[field] as string[]), ''],
    });
  };

  const removeArrayField = (field: keyof Recipe, index: number) => {
    if (!currentRecipe) return;
    const array = [...(currentRecipe[field] as string[])];
    array.splice(index, 1);
    setCurrentRecipe({ ...currentRecipe, [field]: array });
  };

  const handleImageChange = (url: string) => {
    setCurrentRecipe({ ...currentRecipe!, image: url });
    setImagePreview(url || null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // VIEW MODE - Show recipe details
  if (viewMode === 'view' && currentRecipe) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">رجوع</span>
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {currentRecipe.titleAr || currentRecipe.title}
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
            <div className="aspect-video sm:aspect-[21/9] relative bg-gray-100">
              {currentRecipe.image ? (
                <img
                  src={currentRecipe.image}
                  alt={currentRecipe.titleAr || currentRecipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>لا توجد صورة</span>
                </div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-terracotta" />
              <p className="text-xs text-gray-500">التحضير</p>
              <p className="font-medium text-sm">{currentRecipe.prepTime || '-'}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-majorelle" />
              <p className="text-xs text-gray-500">الطهي</p>
              <p className="font-medium text-sm">{currentRecipe.cookTime || '-'}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-saffron" />
              <p className="text-xs text-gray-500">الأشخاص</p>
              <p className="font-medium text-sm">{currentRecipe.servings || '-'}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
              <ChefHat className="w-5 h-5 mx-auto mb-1 text-green-600" />
              <p className="text-xs text-gray-500">الصعوبة</p>
              <p className="font-medium text-sm">{currentRecipe.difficultyAr || currentRecipe.difficulty}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-terracotta rounded-full"></span>
              المقادير
            </h2>
            {currentRecipe.ingredientsAr?.length > 0 ? (
              <ul className="space-y-2">
                {currentRecipe.ingredientsAr.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{ing}</span>
                  </li>
                ))}
              </ul>
            ) : currentRecipe.ingredients?.length > 0 ? (
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">لا توجد مقادير</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-majorelle rounded-full"></span>
              طريقة التحضير
            </h2>
            {currentRecipe.instructionsAr?.length > 0 ? (
              <ol className="space-y-4">
                {currentRecipe.instructionsAr.map((inst, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-8 h-8 bg-majorelle text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{inst}</p>
                  </li>
                ))}
              </ol>
            ) : currentRecipe.instructions?.length > 0 ? (
              <ol className="space-y-4">
                {currentRecipe.instructions.map((inst, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-8 h-8 bg-majorelle text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{inst}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500 text-center py-4">لا توجد خطوات</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleEdit(currentRecipe)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-xl hover:bg-terracotta/90 transition"
            >
              <Edit2 className="w-5 h-5" />
              <span>تعديل الوصفة</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // EDIT MODE
  if (viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">رجوع</span>
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {currentRecipe?.id ? 'تعديل الوصفة' : 'وصفة جديدة'}
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          {/* Image Preview Section */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
            <div className="aspect-video sm:aspect-[21/9] relative bg-gray-100">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <span>معاينة الصورة</span>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رابط الصورة
              </label>
              <input
                type="url"
                value={currentRecipe?.image || ''}
                onChange={(e) => handleImageChange(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-2">
                أدخل رابط الصورة مباشرة للمعاينة
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Arabic Title */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم بالعربية *
                </label>
                <input
                  type="text"
                  value={currentRecipe?.titleAr || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, titleAr: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="مثال: طاجين مغربي"
                />
              </div>

              {/* French/English Title */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم بالفرنسية
                </label>
                <input
                  type="text"
                  value={currentRecipe?.title || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Tajine marocain"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيف
                </label>
                <select
                  value={currentRecipe?.category || ''}
                  onChange={(e) => {
                    const cat = CATEGORIES.find((c) => c.value === e.target.value);
                    setCurrentRecipe({
                      ...currentRecipe!,
                      category: e.target.value,
                      categoryAr: cat?.ar || '',
                    });
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الصعوبة
                </label>
                <select
                  value={currentRecipe?.difficulty || ''}
                  onChange={(e) => {
                    const diff = DIFFICULTIES.find((d) => d.value === e.target.value);
                    setCurrentRecipe({
                      ...currentRecipe!,
                      difficulty: e.target.value,
                      difficultyAr: diff?.ar || '',
                    });
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {DIFFICULTIES.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prep Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وقت التحضير
                </label>
                <input
                  type="text"
                  value={currentRecipe?.prepTime || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, prepTime: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="15 دقيقة"
                />
              </div>

              {/* Cook Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وقت الطهي
                </label>
                <input
                  type="text"
                  value={currentRecipe?.cookTime || ''}
                  onChange={(e) =>
                    setCurrentRecipe({ ...currentRecipe!, cookTime: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="30 دقيقة"
                />
              </div>

              {/* Servings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الأشخاص
                </label>
                <input
                  type="number"
                  value={currentRecipe?.servings || 4}
                  onChange={(e) =>
                    setCurrentRecipe({
                      ...currentRecipe!,
                      servings: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
              </div>
            </div>

            {/* Ingredients Arabic */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                المقادير (بالعربية)
              </label>
              <div className="space-y-2">
                {currentRecipe?.ingredientsAr?.map((ing, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ing}
                      onChange={(e) =>
                        updateArrayField('ingredientsAr', index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="مثال: دجاج (500غ)"
                    />
                    <button
                      onClick={() => removeArrayField('ingredientsAr', index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('ingredientsAr')}
                  className="w-full py-3 border-2 border-dashed border-terracotta text-terracotta rounded-xl hover:bg-terracotta/5"
                >
                  + إضافة مكون
                </button>
              </div>
            </div>

            {/* Instructions Arabic */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                طريقة التحضير (بالعربية)
              </label>
              <div className="space-y-3">
                {currentRecipe?.instructionsAr?.map((inst, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500">الخطوة {index + 1}</span>
                      </div>
                      <textarea
                        value={inst}
                        onChange={(e) =>
                          updateArrayField('instructionsAr', index, e.target.value)
                        }
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        rows={2}
                      />
                    </div>
                    <button
                      onClick={() => removeArrayField('instructionsAr', index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl self-end"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('instructionsAr')}
                  className="w-full py-3 border-2 border-dashed border-majorelle text-majorelle rounded-xl hover:bg-majorelle/5"
                >
                  + إضافة خطوة
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-xl hover:bg-terracotta/90 transition"
              >
                <Save className="w-5 h-5" />
                <span>حفظ الوصفة</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // LIST MODE
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                🍽️ لوحة التحكم
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {recipes.length} وصفة متاحة
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition flex-1 sm:flex-none">
                <Upload className="w-4 h-4" />
                <span className="text-sm">استيراد</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl hover:bg-terracotta/90 transition flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">تصدير</span>
              </button>
              <button
                onClick={handleNewRecipe}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-majorelle text-white rounded-xl hover:bg-majorelle/90 transition flex-1 sm:flex-none"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">جديدة</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن وصفة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-4 border rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent text-base"
            />
          </div>
        </div>

        {/* How to Export Guide */}
        <div className="bg-gradient-to-r from-terracotta/10 to-majorelle/10 border border-terracotta/20 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>📤</span> كيفية حفظ التغييرات
          </h3>
          <ol className="text-sm text-gray-700 space-y-1 mr-5 list-decimal">
            <li>اضغط على زر <strong>"تصدير"</strong> أعلاه</li>
            <li>سيتم تحميل ملف <code>recipes.json</code></li>
            <li>استبدل الملف في GitHub (data/recipes.json)</li>
            <li>سيتم تحديث الموقع تلقائياً خلال 2 دقيقة</li>
          </ol>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-xs text-gray-500">الوصفات</p>
            <p className="text-2xl font-bold text-gray-900">{recipes.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-xs text-gray-500">بالعربية</p>
            <p className="text-2xl font-bold text-green-600">
              {recipes.filter((r) => r.titleAr && /[\u0600-\u06FF]/.test(r.titleAr)).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-xs text-gray-500">فرنسية</p>
            <p className="text-2xl font-bold text-amber-600">
              {recipes.filter((r) => !r.titleAr || !/[\u0600-\u06FF]/.test(r.titleAr)).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
            <p className="text-xs text-gray-500">النتائج</p>
            <p className="text-2xl font-bold text-majorelle">{filteredRecipes.length}</p>
          </div>
        </div>

        {/* Recipe Cards - Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => {
            const hasArabic = recipe.titleAr && /[\u0600-\u06FF]/.test(recipe.titleAr);
            return (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={recipe.image || '/images/placeholder.jpg'}
                    alt={recipe.titleAr || recipe.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        hasArabic
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {hasArabic ? '✓ عربي' : '⚡ فرنسي'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                    {recipe.titleAr || recipe.title}
                  </h3>
                  {recipe.titleAr && recipe.title && (
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">{recipe.title}</p>
                  )}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">
                      {recipe.categoryAr || recipe.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${
                        recipe.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : recipe.difficulty === 'Hard'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {recipe.difficultyAr || recipe.difficulty}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(recipe)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>عرض</span>
                    </button>
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-terracotta/10 text-terracotta rounded-lg hover:bg-terracotta/20 transition text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-500">لا توجد وصفات مطابقة للبحث</p>
          </div>
        )}
      </main>
    </div>
  );
}
